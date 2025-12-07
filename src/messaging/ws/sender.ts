import { z } from "zod";

export type SocketMessageMap = {
  browser_navigate: { url: string };
  browser_go_back: {};
  browser_go_forward: {};
  browser_snapshot: {};
  browser_click: { element: string };
  browser_hover: { element: string };
  browser_type: { element: string; text: string };
  browser_drag: { startElement: string; endElement: string };
  browser_select_option: { element: string };
  browser_wait: { time: number };
  browser_press_key: { key: string };
  browser_get_console_logs: {};
  browser_get_network_logs: {};
  browser_screenshot: {};
  getUrl: {};
  getTitle: {};
};

export type MessageType<T extends Record<string, any>> = keyof T;
export type MessagePayload<T extends Record<string, any>, K extends MessageType<T>> = T[K];

export function createSocketMessageSender<T extends Record<string, any>>(ws: any) {
  return {
    sendSocketMessage: async <K extends MessageType<T>>(
      type: K,
      payload: MessagePayload<T, K>,
      options: { timeoutMs?: number } = { timeoutMs: 30000 }
    ): Promise<any> => {
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Timeout"));
        }, options.timeoutMs || 30000);

        const messageHandler = (event: any) => {
          try {
            const data = typeof event.data === "string" ? JSON.parse(event.data) : event;
            clearTimeout(timeout);
            resolve(data);
          } catch (error) {
            clearTimeout(timeout);
            reject(error);
          }
        };

        ws.once("message", messageHandler);
        
        ws.send(JSON.stringify({ type, payload }));
      });
    },
  };
}