import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// console.log(firebaseConfig);

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

async function googleAuth() {
  try {
    const data = await signInWithPopup(auth, provider);
    const { user } = data;
    const credential = GoogleAuthProvider.credentialFromResult(data);
    // const token = credential.accessToken;
    console.log(data, credential);

    const formData: any = {
      data: user,
      credential,
    };
    console.log(formData);
    await axios.post(
      `${import.meta.env.VITE_BACKEND_PATH}/api/signinwithgoogle`,
      formData
    );

    return true;
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
}

export default googleAuth;
