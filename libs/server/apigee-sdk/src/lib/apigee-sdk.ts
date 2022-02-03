import { GoogleAuth } from 'google-auth-library';

export interface ApigeeApiProxy {
  name: string;
  revision?: string[];
  latestRevisionId?: string;
  labels?: Record<string, string>;
  metaData?: {
    createdAt?: string;
    lastModifiedAt?: string;
    subType?: string;
    [key: string]: string | undefined;
  };
}

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

export interface ApigeeDeveloper {
  email: string;
  firstName?: string;
  lastName?: string;
  attributes?: Record<string, string>[];
  apps?: string[];
  companies?: string[];
  developerId?: string;
  organizationName?: string;
  status?: string;
  createdAt?: string;
  lastModifiedAt?: string;
  accessType?: string;
  appFamily?: string;
  userName?: string; // Added for create
}

export async function listDevelopers() {
  const { client, projectId } = await getGoogleApiClient();
  const url = `https://apigee.googleapis.com/v1/organizations/${projectId}/developers`;
  const res = await client.request({ url });
  return res?.data as { developer: ApigeeDeveloper[] };
}

export interface ApigeeCreateDeveloper
  extends Omit<
    ApigeeDeveloper,
    'email' | 'firstName' | 'lastName' | 'userName'
  > {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
}

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
