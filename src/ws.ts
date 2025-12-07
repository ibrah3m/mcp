import { WebSocketServer } from "ws";

import { mcpConfig } from "./config/mcp.config.js";
import { wait } from "./utils/wait.js";
import { isPortInUse, killProcessOnPort } from "./utils/port.js";

export async function createWebSocketServer(
  port: number = mcpConfig.defaultWsPort,
): Promise<WebSocketServer> {
  killProcessOnPort(port);
  // Wait until the port is free
  while (await isPortInUse(port)) {
    await wait(100);
  }
  return new WebSocketServer({ port });
}
