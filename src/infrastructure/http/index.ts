import { Server } from "@infrastructure/http/server";
import "../../config/"

async function main() {
  const server = new Server({
    address: process.env.APP_HOST,
    port: process.env.APP_PORT,
  });

  await server.start();
}

main();
