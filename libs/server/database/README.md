# server-database

## Firebase

```typescript

import { getAuth } from 'firebase-admin/auth';
import { getFirebaseApp, validateToken } from './firebase-setup';

const userRecord = await getAuth(getFirebaseApp()).createUser({
      email,
      password: 'test123',
    });

```
