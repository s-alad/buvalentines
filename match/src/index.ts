import * as admin from 'firebase-admin';
import { formdata } from "../../client/types/form";

// firebase ========================================================
admin.initializeApp({ credential: admin.credential.cert(require('./config/buvservicekey.json')) });
const firestore = admin.firestore();
const collectionRef = firestore.collection('unmatched');
// =================================================================
interface Player {
    data: formdata;
    scores: Map<string, number>;
    email: string;
}

let population: Player[] = [];
let populationmap: Map<string, Player> = new Map();

async function unmatched(): Promise<void> {
    return collectionRef.get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                let data = doc.data() as formdata;
                let player = {
                    data: data,
                    scores: new Map<string, number>(),
                    email: data.email
                }
                population.push(player);
                populationmap.set(data.email, player);
            });
        })
        .catch((error) => { console.error('Error getting documents:', error); });
}

async function scorer() {
    // for each player in the population
    for (let p of population) {
        for (let q of population) {
            // don't compare a player to themselves
            if (p.email === q.email) {
                continue;
            }

            let score = 0;
            // Make sure sexuality is compatible. Check both players' preferences
            if (p.data && q.data
                && p.data.preferred_gender === q.data.gender
                && q.data.preferred_gender === p.data.gender
            ) {
                // calculate match score
                const shared_interests = p.data.interests.filter(x => q.data.interests.includes(x));
                const shared_idealdate = p.data.idealdate.filter(x => q.data.idealdate.includes(x));
                const shared_traits = p.data.traits.filter(x => q.data.traits.includes(x));
                const shared_lovelanguage = p.data.lovelanguage.filter(x => q.data.lovelanguage.includes(x));
                const has_ideal_personality = p.data.preferred_personality.includes(q.data.personality);
                const has_ideal_age = p.data.preferred_age.includes(q.data.age.toString() as any);
                const has_simmilar_preferred_intelligence = 5 - Math.abs(parseInt(p.data.preferred_intelligence as string) - parseInt(q.data.preferred_intelligence as string))
                const has_simmilar_preferred_atractiveness = 5 - Math.abs(parseInt(p.data.preferred_atractiveness as string) - parseInt(q.data.preferred_atractiveness as string))
                
                // give one point for each shared interest
                score += 2 * shared_interests.length - Math.min(p.data.interests.length, q.data.interests.length)
                // give one point for each shared ideal date
                score += 2 * shared_idealdate.length - Math.min(p.data.idealdate.length, q.data.idealdate.length);
                // give one point for each shared trait
                score += 2 * shared_traits.length - Math.min(p.data.traits.length, q.data.traits.length);
                // give one and a half points for each shared love language
                score += 2 * shared_lovelanguage.length - Math.min(p.data.lovelanguage.length, q.data.lovelanguage.length);
                // give two points if the personality is ideal
                score += has_ideal_personality ? 2 : 0;
                // give two and a half points if the age is ideal
                score += has_ideal_age ? 2.5 : 0;
                // give zero to two and a half points based on the difference in preferred intelligence
                score += has_simmilar_preferred_intelligence / 2;
                // give zero to two and a half points based on the difference in preferred attractiveness
                score += has_simmilar_preferred_atractiveness / 2;
                
                //console.log(p.data.email, "+", q.data.email)
                //console.log(score)
                //console.log(shared_interests, shared_idealdate, shared_traits, shared_lovelanguage, has_ideal_personality, has_ideal_age, has_simmilar_preferred_intelligence, has_simmilar_preferred_atractiveness)
                
                p.scores.set(q.email, score);
            }
        }
    }
}

// sort the population by scores
async function sorter() {
    for (let p of population) {
        p.scores = new Map([...p.scores.entries()].sort((a, b) => b[1] - a[1]));
    }
}
interface MatchedPairs { [key: string]: { partner: string; score: number } | "unmatched"; }

// Gale–Shapley algorithm
async function matcher() {
    const engaged: MatchedPairs = {};
    const matchedSet = new Set<string>();


    for (let player of population) {
        const { email, scores } = player;
        console.log(email, scores)
        
        for (const [target, score] of scores) {
            if (!matchedSet.has(email) && !matchedSet.has(target)) {

                player.scores.delete(target);

                engaged[email] = { partner: target, score };
                engaged[target] = { partner: email, score };
                matchedSet.add(email);
                matchedSet.add(target);
                break;
            } 
        }
        console.log(engaged)

        if (!matchedSet.has(email)) {
            engaged[email] = "unmatched";
        }
    }

    return engaged;
}

async function match(engaged: MatchedPairs) {

    let sentset = new Set<string>();

    for (let [email, value] of Object.entries(engaged)) {

        if (sentset.has(email)) { continue; }

        if (value === "unmatched") {
            console.log("unmatched", email)
            console.log(populationmap.get(email)?.data)
            try {
                await firestore.collection("nomatches").doc(email).set( populationmap.get(email)?.data!)
            } catch (error) {
                console.error("Error adding user to Firestore:", error);
            }
        } else {
            let matchid = email + "+" + value.partner;
            let matchee1 = populationmap.get(email)?.data;
            let matchee2 = populationmap.get(value.partner)?.data;

            let shared_interests = matchee1?.interests.filter(x => matchee2?.interests.includes(x));
            let shared_idealdate = matchee1?.idealdate.filter(x => matchee2?.idealdate.includes(x));

            let p1 = {
                name: matchee1?.name,
                email: matchee1?.email,
                age: matchee1?.age,
                gender: matchee1?.gender,
                message: matchee1?.message || ""
            }
            let p2 = {
                name: matchee2?.name,
                email: matchee2?.email,
                age: matchee2?.age,
                gender: matchee2?.gender,
                message: matchee2?.message || ""
            }
            let shared = {
                interests: shared_interests,
                idealdate: shared_idealdate
            }

            try {
                await firestore.collection("matched").doc(matchid).set(
                    { p1, p2, shared }
                )
                delete engaged[value.partner];
                delete engaged[email];
            } catch (error) {
                console.error("Error adding user to Firestore:", error);
            }

            sentset.add(value.partner);
            sentset.add(email);
        }

    }
}

// =================================================================
async function main() {
    await unmatched();
    await scorer();
    await sorter();
    for (let p of population) {
        console.log(p.email, p.scores);
    }
    console.log("=====================================")
    let engaged = await matcher();
    console.log("=====================================")
    console.log(engaged);
    //await match(engaged);
}
main()