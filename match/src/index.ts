import * as admin from 'firebase-admin';

const serviceAccount = require('./config/buvservicekey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();
const collectionRef = firestore.collection('unmatched');

collectionRef.get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            console.log('Document ID:', doc.id, 'Data:', doc.data());
        });
    })
    .catch((error) => {
        console.error('Error getting documents:', error);
    });

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