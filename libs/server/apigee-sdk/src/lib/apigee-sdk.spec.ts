import {
  apigeeSdk,
  createDeveloper,
  deleteDeveloper,
  listApis,
  listDevelopers,
} from './apigee-sdk';
import {
  auth,
  GoogleAuth,
  LoginTicket,
  OAuth2Client,
  Compute,
} from 'google-auth-library';
import axios from 'axios';
import {
  ConnectionServiceClient,
  TetherClient,
} from '@google-cloud/apigee-connect';
import { inspect } from 'util';

describe('apigeeSdk', () => {
  it('should work', () => {
    expect(apigeeSdk()).toEqual('apigee-sdk');
  });

  it('should get a list of Apigee APIs', async () => {
    const result = await listApis();
    expect(result).toBeTruthy();
    expect(result.proxies).toBeTruthy();
    console.log(inspect(result, false, 10, false));
  });

  it('should get a list of developers', async () => {
    const result = await listDevelopers();
    expect(result).toBeTruthy();
    expect(result.developer).toBeTruthy();
    console.log(inspect(result, false, 10, false));
  });

  it('should create then delete a developer', async () => {
    const developer = {
      email: 'someone@example.com',
      firstName: 'John',
      lastName: 'Doe',
      userName: 'jdoe',
    };
    const createResult = await createDeveloper(developer);
    expect(createResult).toBeTruthy();
    console.log(inspect(createResult, false, 10, false));

    const email = 'someone@example.com';
    const deleteResult = await deleteDeveloper(email);
    expect(deleteResult).toBeTruthy();
    console.log(inspect(deleteResult, false, 10, false));
  });
});
