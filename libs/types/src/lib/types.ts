import { z } from 'zod';

// Apigee API Types
export const ApigeeMetadata = z
  .object({
    createdAt: z.string().optional(),
    lastModifiedAt: z.string().optional(),
    subtype: z.string().optional(),
  })
  .passthrough();
export type ApigeeMetadata = z.infer<typeof ApigeeMetadata>;

export const ApigeeApiProxy = z.object({
  name: z.string(),
  revision: z.array(z.string()).optional(),
  latestRevisionId: z.string().optional(),
  labels: z.record(z.string()).optional(),
  metaData: ApigeeMetadata.optional(),
});
export type ApigeeApiProxy = z.infer<typeof ApigeeApiProxy>;

export const ApigeeApiProxyList = z.object({
  proxies: z.array(ApigeeApiProxy),
});
export type ApigeeApiProxyList = z.infer<typeof ApigeeApiProxyList>;

export const ApigeeDeveloper = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  attributes: z.array(z.record(z.string())).optional(),
  apps: z.array(z.string()).optional(),
  companies: z.array(z.string()).optional(),
  developerId: z.string().optional(),
  organizationName: z.string().optional(),
  status: z.string().optional(),
  createdAt: z.string().optional(),
  lastModifiedAt: z.string().optional(),
  accessType: z.string().optional(),
  appFamily: z.string().optional(),
  userName: z.string().optional(),
});
export type ApigeeDeveloper = z.infer<typeof ApigeeDeveloper>;

export const ApigeeDeveloperList = z.object({
  developer: z.array(ApigeeDeveloper),
});
export type ApigeeDeveloperList = z.infer<typeof ApigeeDeveloperList>;
