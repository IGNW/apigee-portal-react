import {
  ApigeeApiProxy,
  ApigeeDeveloper,
  ApigeeDeveloperList,
} from '@cdw/types';
import { GoogleAuth } from 'google-auth-library';
import { z } from 'zod';

export async function getGoogleApiClient() {
  const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
  const client = await auth.getClient();
  const projectId = await auth.getProjectId();
  return { auth, client, projectId };
}

export async function listApis(): Promise<{ proxies: ApigeeApiProxy[] }> {
  const { client, projectId } = await getGoogleApiClient();
  const url = `https://apigee.googleapis.com/v1/organizations/${projectId}/apis`;
  const res = await client.request({ url });
  return res?.data as { proxies: ApigeeApiProxy[] };
}

export async function getApi(apiName: string) {
  const { client, projectId } = await getGoogleApiClient();
  const url = `https://apigee.googleapis.com/v1/organizations/${projectId}/apis/${apiName}`;
  const res = await client.request({ url });
  return res?.data as ApigeeApiProxy;
}

export async function listDevelopers() {
  const { client, projectId } = await getGoogleApiClient();
  const url = `https://apigee.googleapis.com/v1/organizations/${projectId}/developers`;
  const res = await client.request({ url });
  return res?.data as ApigeeDeveloperList;
}

export async function getDeveloper(email: string) {
  const { client, projectId } = await getGoogleApiClient();
  const url = `https://apigee.googleapis.com/v1/organizations/${projectId}/developers/${email}`;
  const res = await client.request({ url });
  const result = await ApigeeDeveloper.parseAsync(res?.data);
  console.log(result);
  return result;
}

export const ApigeeCreateDeveloper = ApigeeDeveloper.extend({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  userName: z.string(),
});
export type ApigeeCreateDeveloper = z.infer<typeof ApigeeCreateDeveloper>;

export async function createDeveloper(developer: ApigeeCreateDeveloper) {
  const { client, projectId } = await getGoogleApiClient();
  const url = `https://apigee.googleapis.com/v1/organizations/${projectId}/developers`;
  const res = await client.request({ url, method: 'POST', data: developer });
  return res?.data as ApigeeDeveloper;
}

export async function deleteDeveloper(email: string) {
  const { client, projectId } = await getGoogleApiClient();
  const url = `https://apigee.googleapis.com/v1/organizations/${projectId}/developers/${email}`;
  const res = await client.request({ url, method: 'DELETE' });
  return res?.data as ApigeeDeveloper;
}
