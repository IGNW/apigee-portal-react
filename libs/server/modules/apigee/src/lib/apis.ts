import { getApi, listApis } from '@cdw/server/apigee-sdk';
import { ApigeeApiProxy, ApigeeApiProxyList } from '@cdw/types';
import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyPluginOptions,
} from 'fastify';
import fp from 'fastify-plugin';
import { buildJsonSchemas } from 'fastify-zod';

const { schemas, $ref } = buildJsonSchemas({
  ApigeeApiProxyList,
  ApigeeApiProxy,
});
export const apiSchemas = schemas;

export const apiRoute: FastifyPluginAsync = fp(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (server: FastifyInstance, options: FastifyPluginOptions) => {
    server.get<{ Reply: ApigeeApiProxyList }>(
      `/api`,
      {
        schema: {
          operationId: `listApis`,
          response: {
            200: $ref(`ApigeeApiProxyList`),
          },
        },
      },
      async () => listApis()
    );

    server.get<{ Params: { name: string }; Reply: ApigeeApiProxy }>(
      `/api/:name`,
      {
        schema: {
          operationId: `getApi`,
          params: {
            name: {
              type: `string`,
            },
          },
          response: {
            200: $ref(`ApigeeApiProxy`),
          },
        },
      },
      async (req) => {
        const { name } = req.params;
        return getApi(name);
      }
    );
  }
);
