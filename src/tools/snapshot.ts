import zodToJsonSchema from "zod-to-json-schema";

import {
  ClickTool,
  DragTool,
  HoverTool,
  SelectOptionTool,
  SnapshotTool,
  TypeTool,
} from "../types/tool.js";

import type { Context } from "../context.js";
import { captureAriaSnapshot } from "../utils/aria-snapshot.js";

import type { Tool } from "./tool.js";

export const snapshot: Tool = {
  schema: {
    name: SnapshotTool.shape.name.value,
    description: SnapshotTool.shape.description.value,
    inputSchema: zodToJsonSchema(SnapshotTool.shape.arguments),
  },
  handle: async (context: Context) => {
    return await captureAriaSnapshot(context);
  },
};

export const click: Tool = {
  schema: {
    name: ClickTool.shape.name.value,
    description: ClickTool.shape.description.value,
    inputSchema: zodToJsonSchema(ClickTool.shape.arguments),
  },
  handle: async (context: Context, params) => {
    try {
      const parseResult = ClickTool.shape.arguments.safeParse(params);
      if (!parseResult.success) {
        const errorMessages = parseResult.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
        throw new Error(`Invalid parameters: ${errorMessages}. Please provide an object with an "element" property containing the element name or selector to click.`);
      }
      
      const validatedParams = parseResult.data;
      await context.sendSocketMessage("browser_click", validatedParams);
      const snapshot = await captureAriaSnapshot(context);
      return {
        content: [
          {
            type: "text",
            text: `Clicked "${validatedParams.element}"`,
          },
          ...snapshot.content,
        ],
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to click element: ${error.message}`);
      }
      throw error;
    }
  },
};

export const drag: Tool = {
  schema: {
    name: DragTool.shape.name.value,
    description: DragTool.shape.description.value,
    inputSchema: zodToJsonSchema(DragTool.shape.arguments),
  },
  handle: async (context: Context, params) => {
    try {
      const parseResult = DragTool.shape.arguments.safeParse(params);
      if (!parseResult.success) {
        const errorMessages = parseResult.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
        throw new Error(`Invalid parameters: ${errorMessages}. Please provide an object with "startElement" and "endElement" properties.`);
      }
      
      const validatedParams = parseResult.data;
      await context.sendSocketMessage("browser_drag", validatedParams);
      const snapshot = await captureAriaSnapshot(context);
      return {
        content: [
          {
            type: "text",
            text: `Dragged "${validatedParams.startElement}" to "${validatedParams.endElement}"`,
          },
          ...snapshot.content,
        ],
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to drag element: ${error.message}`);
      }
      throw error;
    }
  },
};

export const hover: Tool = {
  schema: {
    name: HoverTool.shape.name.value,
    description: HoverTool.shape.description.value,
    inputSchema: zodToJsonSchema(HoverTool.shape.arguments),
  },
  handle: async (context: Context, params) => {
    try {
      const parseResult = HoverTool.shape.arguments.safeParse(params);
      if (!parseResult.success) {
        const errorMessages = parseResult.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
        throw new Error(`Invalid parameters: ${errorMessages}. Please provide an object with an "element" property containing the element name or selector to hover.`);
      }
      
      const validatedParams = parseResult.data;
      await context.sendSocketMessage("browser_hover", validatedParams);
      const snapshot = await captureAriaSnapshot(context);
      return {
        content: [
          {
            type: "text",
            text: `Hovered over "${validatedParams.element}"`,
          },
          ...snapshot.content,
        ],
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to hover element: ${error.message}`);
      }
      throw error;
    }
  },
};

export const type: Tool = {
  schema: {
    name: TypeTool.shape.name.value,
    description: TypeTool.shape.description.value,
    inputSchema: zodToJsonSchema(TypeTool.shape.arguments),
  },
  handle: async (context: Context, params) => {
    try {
      const parseResult = TypeTool.shape.arguments.safeParse(params);
      if (!parseResult.success) {
        const errorMessages = parseResult.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
        throw new Error(`Invalid parameters: ${errorMessages}. Please provide an object with "element" and "text" properties.`);
      }
      
      const validatedParams = parseResult.data;
      await context.sendSocketMessage("browser_type", validatedParams);
      const snapshot = await captureAriaSnapshot(context);
      return {
        content: [
          {
            type: "text",
            text: `Typed "${validatedParams.text}" into "${validatedParams.element}"`,
          },
          ...snapshot.content,
        ],
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to type text: ${error.message}`);
      }
      throw error;
    }
  },
};

export const selectOption: Tool = {
  schema: {
    name: SelectOptionTool.shape.name.value,
    description: SelectOptionTool.shape.description.value,
    inputSchema: zodToJsonSchema(SelectOptionTool.shape.arguments),
  },
  handle: async (context: Context, params) => {
    try {
      const parseResult = SelectOptionTool.shape.arguments.safeParse(params);
      if (!parseResult.success) {
        const errorMessages = parseResult.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
        throw new Error(`Invalid parameters: ${errorMessages}. Please provide an object with an "element" property containing the element name or selector.`);
      }
      
      const validatedParams = parseResult.data;
      await context.sendSocketMessage("browser_select_option", validatedParams);
      const snapshot = await captureAriaSnapshot(context);
      return {
        content: [
          {
            type: "text",
            text: `Selected option in "${validatedParams.element}"`,
          },
          ...snapshot.content,
        ],
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to select option: ${error.message}`);
      }
      throw error;
    }
  },
};
