import { getAuth, connectAuthEmulator } from 'firebase/auth';
import {
  FirebaseApp,
  FirebaseError,
  getApp,
  initializeApp,
} from 'firebase/app';

export const firebaseTestConfig = {
  projectId:
    process.env.FIRESTORE_PROJECT_ID ||
    process.env.PROJECT_ID ||
    process.env.GCLOUD_PROJECT,
  apiKey: process.env.FIREBASE_APP_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

export function getTestingApp(name: string) {
  let app: FirebaseApp;
  try {
    app = getApp(name);
  } catch (e: unknown) {
    if (e instanceof FirebaseError && e.code === 'app/no-app') {
      app = initializeApp(firebaseTestConfig, name);
    } else {
      throw e;
    }
  }
  const auth = getAuth(app);
  connectAuthEmulator(
    auth,
    'http://' +
      (process.env.FIREBASE_AUTH_EMULATOR_HOST ||
        process.env.NX_AUTH_EMULATOR_HOST ||
        'localhost:9021'),
    { disableWarnings: true }
  );

  return {
    app,
    auth,
  };
}
