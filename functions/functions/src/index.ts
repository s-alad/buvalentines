/**
 * triggers at https://firebase.google.com/docs/functions
 */

import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();

export const onAccountCreated = functions.auth.user().onCreate(async (user) => {
  try {
    const {uid, email, displayName} = user;

    // Add user information to Firestore
    await admin.firestore().collection("users").doc(email || uid).set({
      email,
      uid,
      name: displayName,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      submitted: false,
    });

    console.log(`User ${email + uid} added to Firestore.`);
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
  }
});

export const onUnmatchedDocumentCreated = functions.firestore
  .document("unmatched/{email}")
  .onCreate(async (snapshot, context) => {
    const data = snapshot.data();

    // Your logic here for handling the newly created document
    console.log("New document created in \"unmatched\" collection:", data, context);
    functions.logger.log("New document created in \"unmatched\" collection:", data);

    const email = context.params.email;
    console.log("Email:", email);

    // Update the User document with the same email in Firestore: set submitted to true
    const userDocRef = admin.firestore().collection("users").doc(email);
    await userDocRef.update({submitted: true});
    console.log(`User ${email} updated in Firestore.`);
  });
