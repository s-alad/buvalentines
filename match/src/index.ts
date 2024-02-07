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
                score += shared_interests.length;
                // give one point for each shared ideal date
                score += shared_idealdate.length;
                // give one point for each shared trait
                score += shared_traits.length;
                // give one and a half points for each shared love language
                score += shared_lovelanguage.length * 1.5;
                // give two points if the personality is ideal
                score += has_ideal_personality ? 2 : 0;
                // give two and a half points if the age is ideal
                score += has_ideal_age ? 2.5 : 0;
                // give zero to two and a half points based on the difference in preferred intelligence
                score += has_simmilar_preferred_intelligence / 2;
                // give zero to two and a half points based on the difference in preferred attractiveness
                score += has_simmilar_preferred_atractiveness / 2;
                
                console.log(p.data.email, "+", q.data.email)
                console.log(score)
                console.log(shared_interests, shared_idealdate, shared_traits, shared_lovelanguage, has_ideal_personality, has_ideal_age, has_simmilar_preferred_intelligence, has_simmilar_preferred_atractiveness)
            }

            p.scores.set(q.email, score);
        }
    }
}

// sort the population by scores
async function sorter() {
    for (let p of population) {
        p.scores = new Map([...p.scores.entries()].sort((a, b) => b[1] - a[1]));
    }
}

let engaged: Map<string, string> = new Map<string, string>();
// Gale–Shapley algorithm, however if there are people who are not matched, and there is no more of the gender to match with, then they will be unmatched
async function matcher() {
    let free: string[] = [];
    let proposals: Map<string, string[]> = new Map<string, string[]>();

    for (let p of population) {
        free.push(p.email);
        proposals.set(p.email, Array.from(p.scores.keys()));
    }

    let unmatched: Set<string> = new Set<string>(); // Set to store unmatched individuals

    while (free.length > 0) {
        let p = free.shift()!; // Dequeue the first element
        let q = proposals.get(p)!.shift()!; // Dequeue the first preference of p
        console.log(p, q)

        if (!engaged.has(q)) {
            engaged.set(q, p);
        } else {
            let p1 = engaged.get(q)!;
            if (population.find(x => x.email === p1)!.scores.get(q)! < population.find(x => x.email === p)!.scores.get(q)!) {
                free.push(p1);
                engaged.set(q, p);
            }
        }
        if (proposals.get(p)!.length === 0) {
            unmatched.add(p); // If p exhausts all preferences without getting engaged, add to unmatched set
        }
    }

    // Handle unmatched individuals
    unmatched.forEach(email => {
        // Store or handle the unmatched individuals as needed
        console.log(`${email} is unmatched.`);
    });
}

async function main() {
    await unmatched();
    await scorer();
    await sorter();
    await matcher();
    //console.log(population)
    console.log(engaged)
}
main()

interface Matchee {
    name: string;
    email: string;
    age: number
    gender: string;
    message: string;
}

async function match() {
    const matchexample = {
        p1: {
            name: "Bob",
            email: "bob@bu.edu",
            age: 20,
            gender: "male",
            message: "hey"
        },
        p2: {
            name: "Alice",
            email: "alice@bu.edu",
            age: 20,
            gender: "female",
            message: "hi"
        },
        shared: {
            interests: ["x1", "x2", "x3"],
            idealdate: ["y1", "y2", "y3"]
        }
    }
    const matchidexample = matchexample.p1.email + "+" + matchexample.p2.email;

    // write this data to a firestore collection called "matched"
    try {
        await firestore.collection("matched").doc(matchidexample).set(matchexample);
        console.log(`Match ${matchidexample} added to Firestore.`);
    } catch (error) {
        console.error("Error adding user to Firestore:", error);
    }
}
// match();