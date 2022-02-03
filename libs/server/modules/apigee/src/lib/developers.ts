import {
  ApigeeCreateDeveloper,
  createDeveloper,
  getDeveloper,
  listDevelopers,
} from '@cdw/server/apigee-sdk';
import { ApigeeDeveloper, ApigeeDeveloperList } from '@cdw/types';
import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyPluginOptions,
} from 'fastify';
import fp from 'fastify-plugin';
import { buildJsonSchemas } from 'fastify-zod';

const { schemas, $ref } = buildJsonSchemas({
  ApigeeDeveloper,
  ApigeeDeveloperList,
  ApigeeCreateDeveloper,
});
export const developerSchemas = schemas;

export const developersRoute: FastifyPluginAsync = fp(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (server: FastifyInstance, options: FastifyPluginOptions) => {
    server.get<{ Reply: ApigeeDeveloperList }>(
      `/developers`,
      {
        schema: {
          operationId: `listDevelopers`,
          response: {
            200: $ref(`ApigeeDeveloperList`),
          },
        },
      },
      async () => listDevelopers()
    );

    server.get<{ Params: { email: string }; Reply: ApigeeDeveloper }>(
      `/developers/:email`,
      {
        schema: {
          operationId: `getDevelopers`,
          params: {
            email: {
              type: `string`,
              format: `email`,
            },
          },
          response: {
            200: $ref(`ApigeeDeveloper`),
          },
        },
      },
      async (req) => {
        const { email } = req.params;
        return getDeveloper(email);
      }
    );

    server.post<{ Body: ApigeeCreateDeveloper }, { Reply: ApigeeDeveloper }>(
      `/developers`,
      {
        schema: {
          operationId: `createDeveloper`,
          body: $ref(`ApigeeCreateDeveloper`),
          response: {
            200: $ref(`ApigeeDeveloper`),
          },
        },
      },
      async (req) => {
        const { body } = req;
        const developer = await createDeveloper(body);
        return developer;
      }
    );
  }
);
