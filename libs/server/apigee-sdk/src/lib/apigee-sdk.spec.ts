import { Blob } from 'buffer';
import { writeFileSync } from 'fs';
import { inspect } from 'util';
import {
  createDeveloper,
  deleteDeveloper,
  getApi,
  getDeveloper,
  getGoogleApiClient,
  listApis,
  listDevelopers,
} from './apigee-sdk';

describe('apigeeSdk', () => {
  it('should get a list of Apigee APIs', async () => {
    const result = await listApis();
    expect(result).toBeTruthy();
    expect(result.proxies).toBeTruthy();
    console.log(inspect(result, false, 10, false));
  });

  it('should get an api', async () => {
    const result = await getApi('One-API-to-Rule-Them-All');
    expect(result).toBeTruthy();
    console.log(inspect(result, false, 10, false));
  });

  it('should get a list of developers', async () => {
    const result = await listDevelopers();
    expect(result).toBeTruthy();
    expect(result.developer).toBeTruthy();
    console.log(inspect(result, false, 10, false));
  });

  it('should create, get then delete a developer', async () => {
    const developer = {
      email: 'someone@example.com',
      firstName: 'John',
      lastName: 'Doe',
      userName: 'jdoe',
    };
    const createResult = await createDeveloper(developer);
    expect(createResult).toBeTruthy();
    console.log(inspect(createResult, false, 10, false));

    const getResult = await getDeveloper(developer.email);
    expect(getResult).toBeTruthy();
    expect(getResult).toEqual(expect.objectContaining(developer));
    console.log(inspect(getResult, false, 10, false));

    const email = 'someone@example.com';
    const deleteResult = await deleteDeveloper(email);
    expect(deleteResult).toBeTruthy();
    console.log(inspect(deleteResult, false, 10, false));
  });

  it('experiment', async () => {
    const { client, projectId } = await getGoogleApiClient();
    // const url = `https://apigee.googleapis.com/v1/organizations/${projectId}/developers/brianm@ignw.io/apps/BrianTestApp`;
    // const url = `https://apigee.googleapis.com/v1/organizations/${projectId}/apiproducts/lord-of-the-rings`;
    // const url = `https://apigee.googleapis.com/v1/organizations/${projectId}/deployments`;
    // const url = `https://apigee.googleapis.com/v1/organizations/${projectId}/reports`;
    // const url = `https://apigee.googleapis.com/v1/organizations/${projectId}/apis/One-API-to-Rule-Them-All/revisions/10?format=bundle`;
    const url = `https://apigee.googleapis.com/v1/organizations/${projectId}/apis/One-API-to-Rule-Them-All/keyvaluemaps`;
    const result = await client
      .request({ url })
      .catch((err) => console.error(err));
    console.log(inspect(result?.data, false, 10, false));
  });

  // it('download zip blob', async () => {
  //   const { client, projectId } = await getGoogleApiClient();
  //   const url = `https://apigee.googleapis.com/v1/organizations/${projectId}/apis/One-API-to-Rule-Them-All/revisions/10?format=bundle`;
  //   const result = await client
  //     .request({ url, responseType: 'blob' })
  //     .catch((err) => console.error(err));
  //   const arrayBuffer = await (result?.data as Blob).arrayBuffer();
  //   const buffer = Buffer.from(arrayBuffer);
  //   const data = Buffer.from(buffer);
  //   writeFileSync('./apigee-sdk.spec.zip', data);
  // });
});
