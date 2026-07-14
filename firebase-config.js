import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getDatabase, ref, push, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBNxUJ5rlkoT9oOwE3OBa8d8_eP5tzV9uU",
  authDomain: "trail-8c73a.firebaseapp.com",
  databaseURL: "https://trail-8c73a-default-rtdb.firebaseio.com", // TODO: confirm this matches your Realtime Database URL exactly
  projectId: "trail-8c73a",
  storageBucket: "trail-8c73a.firebasestorage.app",
  messagingSenderId: "666337254770",
  appId: "1:666337254770:web:c62e7d90f828536a4a51eb",
  measurementId: "G-3RGHWPHMR3"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export function logAttempt(success, enteredDate){
  push(ref(db, "gate_attempts"), {
    success: success,
    enteredDate: enteredDate,
    timestamp: serverTimestamp()
  }).catch((err) => console.error("Realtime Database log failed:", err));
}
