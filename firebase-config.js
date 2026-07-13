/* ============================================================
   FIREBASE — your real project config
============================================================ */
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBNxUJ5rlkoT9oOwE3OBa8d8_eP5tzV9uU",
  authDomain: "trail-8c73a.firebaseapp.com",
  projectId: "trail-8c73a",
  storageBucket: "trail-8c73a.firebasestorage.app",
  messagingSenderId: "666337254770",
  appId: "1:666337254770:web:c62e7d90f828536a4a51eb",
  measurementId: "G-3RGHWPHMR3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* Logs one gate attempt — right or wrong — to the "gate_attempts" collection.
   Security rules (see README) allow writes from anyone but block all reads,
   so only you, signed into the Firebase console, can see this data. */
export function logAttempt(success, enteredDate){
  addDoc(collection(db, "gate_attempts"), {
    success: success,
    enteredDate: enteredDate,
    timestamp: serverTimestamp()
  }).catch((err) => console.error("Firestore log failed:", err));
}
