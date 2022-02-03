import { createServer } from './app/server';

async function start() {
  // Google Cloud Run will set this environment variable
  // It can be used to detect if the service is running in Cloud Run
  const IS_GOOGLE_CLOUD_RUN = process.env.K_SERVICE !== undefined;

  // Must listen on the port Cloud Run provides
  const port = process.env.PORT || 3000;

  // Must listen on all IPV4 addresses in Cloud Run
  const address = IS_GOOGLE_CLOUD_RUN ? '0.0.0.0' : undefined;

  try {
    const server = createServer();
    await server.ready();
    const serverUrl = await server.listen(port, address);
    console.log(`Listening on ${serverUrl}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
