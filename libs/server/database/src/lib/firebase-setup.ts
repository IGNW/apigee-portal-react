/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeApp, applicationDefault, App } from 'firebase-admin/app';
import {
  getFirestore,
  Firestore,
  DocumentData,
  QueryDocumentSnapshot,
  FirestoreDataConverter,
  Timestamp,
} from 'firebase-admin/firestore';
import { DecodedIdToken, getAuth } from 'firebase-admin/auth';
import deepCloneMap from 'deep-clone-map';
// import isISO8601 from 'validator/lib/isISO8601';

// export const RTDB_MICROSERVICES = `https://${process.env.PROJECT_ID}.firebaseio.com`;

let firebaseApp: App | undefined;
export const getFirebaseApp = (): App => {
  if (firebaseApp) {
    return firebaseApp;
  }
  let databaseURL = process.env.FIREBASE_DATABASE_URL;
  if (!databaseURL && process.env.FIREBASE_CONFIG) {
    try {
      const config = JSON.parse(process.env.FIREBASE_CONFIG);
      databaseURL = config.databaseURL;
    } catch (e) {
      console.error(e);
    }
  }

  firebaseApp = initializeApp({
    credential: applicationDefault(),
    databaseURL,
  });
  const firestore = getFirestore(firebaseApp);
  firestore.settings({
    timestampsInSnapshots: true,
    ignoreUndefinedProperties: true,
  });
  return firebaseApp;
};
getFirebaseApp();

export async function validateToken(
  token: string,
  app = getFirebaseApp()
): Promise<DecodedIdToken> {
  return new Promise((resolve, reject) => {
    // Just for sanity, ensure it's a string
    if (typeof token !== 'string') {
      throw new TypeError('Token is not a string');
    }

    const cleanToken = token.toLowerCase().startsWith('bearer ')
      ? token.slice(7, token.length)
      : token;

    // Logger.log('Valid token in header');

    // Auth against the Firebase endpoint
    getAuth(app)
      .verifyIdToken(cleanToken)
      .then((decodedToken) => {
        resolve(decodedToken);
      })
      .catch((err) => reject(err));
  });
}

const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as T,
});

export const castCollection = <T = DocumentData>(
  collectionPath: string,
  db: Firestore
) => db.collection(collectionPath).withConverter(converter<T>());

export function getNowTimestamp() {
  return Timestamp.now();
}

export class TimestampConverter<T extends DocumentData>
  implements FirestoreDataConverter<DocumentData>
{
  toFirestore(data: T): DocumentData {
    return deepCloneMap<T>(data, (value) => {
      if (value instanceof Date) {
        return Timestamp.fromDate(value);
      } else {
        return value;
      }
    });
  }

  fromFirestore(snapshot: QueryDocumentSnapshot<T>): T {
    return deepCloneMap<T>(snapshot.data(), (value) => {
      if (value instanceof Timestamp) {
        // return formatISO(data[key].toDate());  // Creates an ISO string with date-fns
        return new Date(value.toMillis());
      } else {
        return value;
      }
    });
  }
}
