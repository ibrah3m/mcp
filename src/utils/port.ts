import { execSync } from "node:child_process";
import net from "node:net";

export async function isPortInUse(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(true)); // Port is still in use
    server.once("listening", () => {
      server.close(() => resolve(false)); // Port is free
    });
    server.listen(port);
  });
}

export function killProcessOnPort(port: number) {
  try {
    if (process.platform === "win32") {
      // Try to kill processes on Windows, but ignore errors for already-dead processes
      try {
        execSync(
          `FOR /F "tokens=5" %a in ('netstat -ano ^| findstr :${port}') do taskkill /F /PID %a`,
          { stdio: 'pipe' }
        );
      } catch (error) {
        // Ignore errors - processes may have already terminated
        // This is actually the desired outcome
      }
    } else {
      // Unix-like systems
      try {
        execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: 'pipe' });
      } catch (error) {
        // Ignore errors - no processes found or already killed
      }
    }
  } catch (error) {
    // Final catch-all, but don't log for port cleanup operations
    // as this is expected behavior when no processes are running
  }
}
