import { zodToJsonSchema } from "zod-to-json-schema";

import { GetConsoleLogsTool, GetNetworkLogsTool, ScreenshotTool } from "../types/tool.js";

import { Tool } from "./tool.js";

export const getConsoleLogs: Tool = {
  schema: {
    name: GetConsoleLogsTool.shape.name.value,
    description: GetConsoleLogsTool.shape.description.value,
    inputSchema: zodToJsonSchema(GetConsoleLogsTool.shape.arguments),
  },
  handle: async (context, _params) => {
    try {
      const consoleLogs = await context.sendSocketMessage(
        "browser_get_console_logs",
        {},
      );
      const text: string = consoleLogs
        .map((log) => JSON.stringify(log))
        .join("\n");
      return {
        content: [{ type: "text", text }],
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get console logs: ${error.message}`);
      }
      throw error;
    }
  },
};

export const getNetworkLogs: Tool = {
  schema: {
    name: GetNetworkLogsTool.shape.name.value,
    description: GetNetworkLogsTool.shape.description.value,
    inputSchema: zodToJsonSchema(GetNetworkLogsTool.shape.arguments),
  },
  handle: async (context, _params) => {
    try {
      const networkLogs = await context.sendSocketMessage(
        "browser_get_network_logs",
        {},
      );
      const text: string = networkLogs
        .map((log: any) => JSON.stringify(log, null, 2))
        .join("\n\n");
      return {
        content: [{ type: "text", text }],
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get network logs: ${error.message}`);
      }
      throw error;
    }
  },
};

export const screenshot: Tool = {
  schema: {
    name: ScreenshotTool.shape.name.value,
    description: ScreenshotTool.shape.description.value,
    inputSchema: zodToJsonSchema(ScreenshotTool.shape.arguments),
  },
  handle: async (context, _params) => {
    try {
      const screenshot = await context.sendSocketMessage(
        "browser_screenshot",
        {},
      );
      return {
        content: [
          {
            type: "image",
            data: screenshot,
            mimeType: "image/png",
          },
        ],
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to take screenshot: ${error.message}`);
      }
      throw error;
    }
  },
};
