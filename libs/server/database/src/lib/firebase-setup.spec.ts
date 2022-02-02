/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getTestIdToken } from '@cdw/testing';
import { deleteApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirebaseApp, validateToken } from './firebase-setup';
import faker from '@faker-js/faker';
// file.skip
describe('Firebase', () => {
  afterAll(async () => {
    return await Promise.all([deleteApp(getFirebaseApp())]);
  });

  it('Initialized properly', async () => {
    expect(getFirebaseApp).toBeDefined();
    expect(getFirebaseApp()).toBeDefined();
    // await Promise.all([deleteApp(getFirebaseApp())]);
  });

  it(`Can validate a token`, async () => {
    expect(getFirebaseApp).toBeDefined();
    const email = faker.internet.exampleEmail();
    const userRecord = await getAuth(getFirebaseApp()).createUser({
      email,
      password: 'test123',
    });
    const token = await getTestIdToken(getFirebaseApp(), userRecord.uid);
    expect(token).toBeDefined();
    const result = await validateToken(token);
    expect(result.uid).toEqual(userRecord.uid);
    expect(result.email).toEqual(userRecord.email);
    const withBearer = await validateToken(`bearer ${token}`);
    expect(withBearer.uid).toEqual(userRecord.uid);
    // @ts-ignore
    await expect(validateToken(123)).rejects.toThrow();
  }, 10000);
});
