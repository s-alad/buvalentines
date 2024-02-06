import * as admin from 'firebase-admin';

const serviceAccount = require('./buvservicekey.json');
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


async function match() {
    const matchexample = {
        p1: {
            name: "Bob",
            email: "bob@bu.edu",
            message: ""
        },
        p2: {
            name: "Alice",
            email: "Alice@bu.edu",
            message: "hi"
        },
        shared: {
            interests: ["x1", "x2", "x3"],
            ideal: ["y1", "y2", "y3"]
        }
    }
}