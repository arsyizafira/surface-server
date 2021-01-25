const admin = require('firebase-admin')
var serviceAccount = require("./servicekey.json");

// Initialize firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'sistem-pakar-5253d.appspot.com'
})
// Cloud storage
const bucket = admin.storage().bucket()

module.exports = {
  bucket
}