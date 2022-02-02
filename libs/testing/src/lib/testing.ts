import axios from 'axios';
import { App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

export async function getTestIdToken(
  firebaseApp: App,
  uid: string,
  claims?: Record<string, unknown>
): Promise<string> {
  const customToken = await getAuth(firebaseApp).createCustomToken(uid, claims);
  const response = await axios
    .post<{ idToken: string }>(
      `http://${
        process.env.FIREBASE_AUTH_EMULATOR_HOST ||
        process.env.NX_AUTH_EMULATOR_HOST ||
        'localhost:9021'
      }/www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${
        process.env.REACT_APP_API_KEY
      }`,
      {
        token: customToken,
        returnSecureToken: true,
      }
    )
    .catch((err) => console.error(err));
  return response?.data.idToken || '';
}
