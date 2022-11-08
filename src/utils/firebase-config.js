import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAov9MTsDQKFVb4aGggO1LMmizsuOIljK8",
  authDomain: "silo-dda35.firebaseapp.com",
  projectId: "silo-dda35",
  storageBucket: "silo-dda35.appspot.com",
  messagingSenderId: "127129701278",
  appId: "1:127129701278:web:c6687162b9f676fc4e648f",
  measurementId: "G-SMFRDLGW0L"
};


const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
