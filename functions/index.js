const functions = require('firebase-functions');
const admin = require("firebase-admin");
const createUser = require('./component/createUser');
const serviceAccount = require("./service_account.json");
const oneTimePassword = require('./component/oneTimePassword');
const verifyPassword = require('./component/verifyPassword');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://serve-ng.firebaseio.com"
});


exports.createUser = functions.https.onRequest(createUser);
exports.oneTimePassword = functions.https.onRequest(oneTimePassword);
exports.verifyPassword = functions.https.onRequest(verifyPassword);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
