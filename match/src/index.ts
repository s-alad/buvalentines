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
