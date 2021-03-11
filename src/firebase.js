import firebase from "firebase/app"
import "firebase/auth"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
    apiKey: "AIzaSyBCSb-jKP3YfRijpCLyYWHxNHgeXt2TAwc",
    authDomain: "ecommerce-4c8b6.firebaseapp.com",
    projectId: "ecommerce-4c8b6",
    storageBucket: "ecommerce-4c8b6.appspot.com",
    messagingSenderId: "430976807644",
    appId: "1:430976807644:web:72e862885ced2beece3a19",
    measurementId: "G-NSY7N6Z04F"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
//firebase.analytics();

//export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
