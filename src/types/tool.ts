import { z } from "zod";

// Define the argument schemas
export const NavigateArgumentsSchema = z.object({
  url: z.string().describe("URL to navigate to"),
});

export const WaitArgumentsSchema = z.object({
  time: z.number().describe("Time to wait in seconds"),
});

export const PressKeyArgumentsSchema = z.object({
  key: z.string().describe("Key to press"),
});

export const ClickArgumentsSchema = z.object({
  element: z.string().describe("Element name or selector to click"),
});

export const HoverArgumentsSchema = z.object({
  element: z.string().describe("Element name or selector to hover"),
});

export const TypeArgumentsSchema = z.object({
  element: z.string().describe("Element name or selector"),
  text: z.string().describe("Text to type"),
});

export const DragArgumentsSchema = z.object({
  startElement: z.string().describe("Element to drag from"),
  endElement: z.string().describe("Element to drag to"),
});

export const SelectOptionArgumentsSchema = z.object({
  element: z.string().describe("Element name or selector"),
});

// Define tool schemas for use in the tools
export const NavigateTool = {
  shape: {
    name: { value: "browser_navigate" as const },
    description: { value: "Navigate to a URL in the browser" },
    arguments: NavigateArgumentsSchema,
  },
};

export const GoBackTool = {
  shape: {
    name: { value: "browser_go_back" as const },
    description: { value: "Navigate back in browser history" },
    arguments: z.object({}),
  },
};

export const GoForwardTool = {
  shape: {
    name: { value: "browser_go_forward" as const },
    description: { value: "Navigate forward in browser history" },
    arguments: z.object({}),
  },
};

export const SnapshotTool = {
  shape: {
    name: { value: "browser_snapshot" as const },
    description: { value: "Capture ARIA snapshot of the current page" },
    arguments: z.object({}),
  },
};

export const ClickTool = {
  shape: {
    name: { value: "browser_click" as const },
    description: { value: "Click an element on the page" },
    arguments: ClickArgumentsSchema,
  },
};

export const HoverTool = {
  shape: {
    name: { value: "browser_hover" as const },
    description: { value: "Hover over an element on the page" },
    arguments: HoverArgumentsSchema,
  },
};

export const TypeTool = {
  shape: {
    name: { value: "browser_type" as const },
    description: { value: "Type text into an element" },
    arguments: TypeArgumentsSchema,
  },
};

export const DragTool = {
  shape: {
    name: { value: "browser_drag" as const },
    description: { value: "Drag element from start to end position" },
    arguments: DragArgumentsSchema,
  },
};

export const SelectOptionTool = {
  shape: {
    name: { value: "browser_select_option" as const },
    description: { value: "Select an option from a dropdown" },
    arguments: SelectOptionArgumentsSchema,
  },
};

export const WaitTool = {
  shape: {
    name: { value: "browser_wait" as const },
    description: { value: "Wait for specified time" },
    arguments: WaitArgumentsSchema,
  },
};

export const PressKeyTool = {
  shape: {
    name: { value: "browser_press_key" as const },
    description: { value: "Press a key" },
    arguments: PressKeyArgumentsSchema,
  },
};

export const GetConsoleLogsTool = {
  shape: {
    name: { value: "browser_get_console_logs" as const },
    description: { value: "Get browser console logs" },
    arguments: z.object({}),
  },
};

export const ScreenshotTool = {
  shape: {
    name: { value: "browser_screenshot" as const },
    description: { value: "Take a screenshot of the current page" },
    arguments: z.object({}),
  },
};

export const GetNetworkLogsTool = {
  shape: {
    name: { value: "get_network_logs" as const },
    description: { value: "Get network requests and responses from the browser's network tab" },
    arguments: z.object({}),
  },
};

export const MessagePayload = z.any();
export const MessageType = z.any();
export const SocketMessageMap = z.any();

// Type exports for messaging
export type { MessagePayload, MessageType, SocketMessageMap };