import { initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import {
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APP_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_APP_ID,
};

console.warn('>>> firebaseConfig', process.env.FIREBASE_CONFIG);

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const rtdb = getDatabase(firebaseApp, firebaseConfig.databaseURL);
export const functions = getFunctions(firebaseApp);
if (process.env.NX_USE_EMULATORS || process.env.GATSBY_USE_EMULATORS) {
  // Set auth emulator
  const authEmulatorUrl = `http://${
    process.env.NX_AUTH_EMULATOR_HOST ||
    process.env.FIREBASE_AUTH_EMULATOR_HOST ||
    process.env.GATSBY_FIREBASE_AUTH_EMULATOR_HOST ||
    'localhost:9021'
  }`;
  console.log(`Connecting to Firebase Auth emulator at ${authEmulatorUrl}`);
  connectAuthEmulator(firebaseAuth, authEmulatorUrl);

  // Set firestore emulator
  const firestoreEmulatorUrl =
    process.env.NX_FIRESTORE_EMULATOR_HOST ||
    process.env.FIREBASE_FIRESTORE_EMULATOR_HOST ||
    process.env.GATSBY_FIREBASE_FIRESTORE_EMULATOR_HOST ||
    'localhost:9022';
  const [firestoreHost, firestorePort] = firestoreEmulatorUrl.split(':');
  connectFirestoreEmulator(
    firestore,
    firestoreHost,
    parseInt(firestorePort, 10)
  );
  // Set functions emulator
  const functionsEmulatorUrl =
    process.env.NX_FUNCTIONS_EMULATOR_HOST ||
    process.env.FIREBASE_FUNCTIONS_EMULATOR_HOST ||
    process.env.GATSBY_FIREBASE_FUNCTIONS_EMULATOR_HOST ||
    'localhost:5001';
  const [functionsHost, functionsPort] = functionsEmulatorUrl.split(':');
  connectFunctionsEmulator(
    functions,
    functionsHost,
    parseInt(functionsPort, 10)
  );

  // Set database emulator
  const databaseEmulatorUrl =
    process.env.NX_DATABASE_EMULATOR_HOST ||
    process.env.FIREBASE_DATABASE_EMULATOR_HOST ||
    process.env.GATSBY_FIREBASE_DATABASE_EMULATOR_HOST ||
    'localhost:9023';
  const [databaseHost, databasePort] = databaseEmulatorUrl.split(':');
  connectDatabaseEmulator(
    rtdb,
    'log4j-vul-dev.' + databaseHost,
    parseInt(databasePort, 10)
  );
}
export const providerGoogle = new GoogleAuthProvider();
