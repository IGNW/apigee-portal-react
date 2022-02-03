import {
  apiRoute,
  apiSchemas,
  developerSchemas,
  developersRoute,
} from '@cdw/server/modules/apigee';
import fastify, { FastifyInstance } from 'fastify';
import swagger from 'fastify-swagger';
import { withRefResolver } from 'fastify-zod';

export const createServer = (): FastifyInstance => {
  const app: FastifyInstance = fastify();

  for (const schema of [...developerSchemas, ...apiSchemas]) {
    const current = app.getSchema(schema.$id);
    if (current) {
      console.warn(`Trying to add schema ${schema.$id} twice`);
      return;
    } else {
      app.addSchema(schema);
    }
  }

  app.register(
    swagger,
    withRefResolver({
      routePrefix: `/openapi`,
      exposeRoute: true,
      staticCSP: true,
      openapi: {
        info: {
          title: `CDW Apigee Api Explorer Services`,
          description: `Adminstration services for CDW's ReactJS Apigee Api Explorer.`,
          version: `0.1.0`,
        },
      },
    })
  );

  app.register(developersRoute, { prefix: `/apigee` });
  app.register(apiRoute, { prefix: `/apigee` });

  return app;
};
