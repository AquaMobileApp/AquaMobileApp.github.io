import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getFirestore, collection, addDoc, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyCQDrKrV_Lw6tcH8J3s86GncME2YG87wQE",
  authDomain: "aquamobile-60ef1.firebaseapp.com",
  projectId: "aquamobile-60ef1",
  storageBucket: "aquamobile-60ef1.firebasestorage.app",
  messagingSenderId: "173078000814",
  appId: "1:173078000814:web:dd941af27bf13100dbe93f",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const tipInput = document.getElementById('tip');
    const addTipButton = document.getElementById('addTip');
    const tipsList = document.getElementById('tipsList');

    signUpButton.addEventListener('click', async () => {
        try {
            await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
            alert('User registered!');
        } catch (error) {
            alert(error.message);
        }
    });

    signInButton.addEventListener('click', async () => {
        try {
            await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
            alert('User signed in!');
        } catch (error) {
            alert(error.message);
        }
    });

    addTipButton.addEventListener('click', async () => {
        if (tipInput.value.trim()) {
            await addDoc(collection(db, 'tips'), { text: tipInput.value, timestamp: new Date() });
            tipInput.value = '';
        }
    });

    onSnapshot(collection(db, 'tips'), (snapshot) => {
        tipsList.innerHTML = '';
        snapshot.docs.forEach((doc) => {
            const tipItem = document.createElement('li');
            tipItem.textContent = doc.data().text;
            tipsList.appendChild(tipItem);
        });
    });
});
