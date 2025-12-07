import { zodToJsonSchema } from "zod-to-json-schema";

import {
  GoBackTool,
  GoForwardTool,
  NavigateTool,
  PressKeyTool,
  WaitTool,
} from "../types/tool.js";

import { captureAriaSnapshot } from "../utils/aria-snapshot.js";

import type { Tool, ToolFactory } from "./tool.js";

export const navigate: ToolFactory = (snapshot) => ({
  schema: {
    name: NavigateTool.shape.name.value,
    description: NavigateTool.shape.description.value,
    inputSchema: zodToJsonSchema(NavigateTool.shape.arguments),
  },
  handle: async (context, params) => {
    try {
      const parseResult = NavigateTool.shape.arguments.safeParse(params);
      if (!parseResult.success) {
        const errorMessages = parseResult.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
        throw new Error(`Invalid parameters: ${errorMessages}. Please provide an object with a "url" property containing the URL to navigate to.`);
      }
      
      const { url } = parseResult.data;
      await context.sendSocketMessage("browser_navigate", { url });
      if (snapshot) {
        return captureAriaSnapshot(context);
      }
      return {
        content: [
          {
            type: "text",
            text: `Navigated to ${url}`,
          },
        ],
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to navigate: ${error.message}`);
      }
      throw error;
    }
  },
});

export const goBack: ToolFactory = (snapshot) => ({
  schema: {
    name: GoBackTool.shape.name.value,
    description: GoBackTool.shape.description.value,
    inputSchema: zodToJsonSchema(GoBackTool.shape.arguments),
  },
  handle: async (context) => {
    await context.sendSocketMessage("browser_go_back", {});
    if (snapshot) {
      return captureAriaSnapshot(context);
    }
    return {
      content: [
        {
          type: "text",
          text: "Navigated back",
        },
      ],
    };
  },
});

export const goForward: ToolFactory = (snapshot) => ({
  schema: {
    name: GoForwardTool.shape.name.value,
    description: GoForwardTool.shape.description.value,
    inputSchema: zodToJsonSchema(GoForwardTool.shape.arguments),
  },
  handle: async (context) => {
    await context.sendSocketMessage("browser_go_forward", {});
    if (snapshot) {
      return captureAriaSnapshot(context);
    }
    return {
      content: [
        {
          type: "text",
          text: "Navigated forward",
        },
      ],
    };
  },
});

export const wait: Tool = {
  schema: {
    name: WaitTool.shape.name.value,
    description: WaitTool.shape.description.value,
    inputSchema: zodToJsonSchema(WaitTool.shape.arguments),
  },
  handle: async (context, params) => {
    try {
      const parseResult = WaitTool.shape.arguments.safeParse(params);
      if (!parseResult.success) {
        const errorMessages = parseResult.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
        throw new Error(`Invalid parameters: ${errorMessages}. Please provide an object with a "time" property containing the number of seconds to wait.`);
      }
      
      const { time } = parseResult.data;
      await context.sendSocketMessage("browser_wait", { time });
      return {
        content: [
          {
            type: "text",
            text: `Waited for ${time} seconds`,
          },
        ],
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to wait: ${error.message}`);
      }
      throw error;
    }
  },
};

export const pressKey: Tool = {
  schema: {
    name: PressKeyTool.shape.name.value,
    description: PressKeyTool.shape.description.value,
    inputSchema: zodToJsonSchema(PressKeyTool.shape.arguments),
  },
  handle: async (context, params) => {
    try {
      const parseResult = PressKeyTool.shape.arguments.safeParse(params);
      if (!parseResult.success) {
        const errorMessages = parseResult.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
        throw new Error(`Invalid parameters: ${errorMessages}. Please provide an object with a "key" property containing the key to press.`);
      }
      
      const { key } = parseResult.data;
      await context.sendSocketMessage("browser_press_key", { key });
      return {
        content: [
          {
            type: "text",
            text: `Pressed key ${key}`,
          },
        ],
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to press key: ${error.message}`);
      }
      throw error;
    }
  },
};
