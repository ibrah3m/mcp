# Browser MCP Usage Guide

This guide explains how to use the optimized Browser MCP server with KiloCode and other MCP clients.

## Prerequisites

- Node.js (v18 or higher)
- npm or pnpm package manager
- Chrome browser with the Browser MCP extension

## Quick Start

### 1. Build the Server

```bash
cd d:/programming/browser/mcp
npm install    # Install dependencies (already done)
npm run build  # Build the server (already done)
```

### 2. Verify Installation

```bash
node dist/index.js --version
# Should output: Version 0.1.3

node dist/index.js --help
# Should show usage information
```

### 3. Install Chrome Extension

1. Go to Chrome Web Store
2. Search for "Browser MCP" extension
3. Install the extension
4. Pin the extension to your toolbar

## Using with KiloCode

### Method 1: Direct Configuration

Add this to your KiloCode MCP configuration:

```json
{
  "mcpServers": {
    "browsermcp": {
      "command": "node",
      "args": ["d:/programming/browser/mcp/dist/index.js"]
    }
  }
}
```

### Method 2: Using the Inspector

Test the server with the MCP inspector:

```bash
npm run inspector
```

This will start the inspector on http://localhost:9001 where you can test all tools.

## Available Tools

### Navigation Tools

#### browser_navigate
Navigate to a URL in the browser.

**Usage:**
```json
{
  "url": "https://example.com"
}
```

#### browser_go_back
Navigate back in browser history.

#### browser_go_forward
Navigate forward in browser history.

### Interaction Tools

#### browser_click
Click an element on the page.

**Usage:**
```json
{
  "element": "Login button"
}
```

#### browser_hover
Hover over an element.

**Usage:**
```json
{
  "element": "Menu item"
}
```

#### browser_type
Type text into an element.

**Usage:**
```json
{
  "element": "Search input",
  "text": "Hello World"
}
```

#### browser_select_option
Select an option from a dropdown.

**Usage:**
```json
{
  "element": "Country dropdown"
}
```

### Utility Tools

#### browser_wait
Wait for specified time.

**Usage:**
```json
{
  "time": 2.5
}
```

#### browser_press_key
Press a key.

**Usage:**
```json
{
  "key": "Enter"
}
```

### Debugging Tools

#### browser_snapshot
Capture ARIA snapshot of the current page.

Returns:
- Page URL
- Page Title
- ARIA accessibility tree in YAML format

#### browser_get_console_logs
Get browser console logs.

Returns console messages as JSON text.

#### get_network_logs
Get network requests and responses from the browser's network tab.

Returns network activity including:
- HTTP/HTTPS requests
- Response headers and status codes
- Timing information

#### browser_screenshot
Take a screenshot of the current page.

Returns PNG image data.

## Workflow Example

### 1. Start the Browser MCP Server

```bash
node dist/index.js
```

### 2. Connect Browser Extension

1. Open Chrome
2. Click the Browser MCP extension icon
3. Click "Connect"
4. The extension will connect to the server

### 3. Use Tools

Example automation sequence:

```javascript
// 1. Navigate to a website
browser_navigate({ url: "https://github.com" })

// 2. Wait for page to load
browser_wait({ time: 2 })

// 3. Take a snapshot to see what's on the page
browser_snapshot()

// 4. Click the search button
browser_click({ element: "Search" })

// 5. Type in the search box
browser_type({ element: "Search box", text: "browser automation" })

// 6. Press Enter
browser_press_key({ key: "Enter" })

// 7. Take a screenshot
browser_screenshot()

// 8. Check console logs for any errors
browser_get_console_logs()

// 9. Check network activity
get_network_logs()
```

## Troubleshooting

### "No connection to browser extension"

**Solution**: 
1. Make sure the Chrome extension is installed
2. Click the extension icon and click "Connect"
3. Check that the server is running
4. Verify the WebSocket connection on port 9222

### Build Errors

**Solution**:
```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build
```

### Port Already in Use

**Solution**:
The server automatically kills processes on port 9222, but if you have issues:
```bash
# Windows
netstat -ano | findstr :9222
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:9222 | xargs kill -9
```

## Development

### Project Structure

```
mcp/
├── src/
│   ├── config/          # Configuration files
│   ├── messaging/       # WebSocket messaging
│   ├── tools/           # MCP tools
│   ├── types/           # TypeScript types
│   └── utils/           # Utilities
├── dist/               # Built files
└── package.json
```

### Adding New Tools

1. Define the tool schema in `src/types/tool.ts`
2. Implement the tool in `src/tools/`
3. Add the tool to the appropriate array in `src/index.ts`
4. Update `src/messaging/ws/sender.ts` if needed
5. Build and test

### Testing

```bash
# Run type checking
npm run typecheck

# Run inspector
npm run inspector

# Test specific functionality
node dist/index.js
```

## Integration Examples

### With Claude Desktop

Add to Claude Desktop config:

```json
{
  "mcpServers": {
    "browser": {
      "command": "node",
      "args": ["d:/programming/browser/mcp/dist/index.js"]
    }
  }
}
```

### With Cursor

Add to Cursor MCP settings:

```json
{
  "mcpServers": {
    "browser-automation": {
      "command": "node",
      "args": ["d:/programming/browser/mcp/dist/index.js"],
      "env": {}
    }
  }
}
```

### With KiloCode

KiloCode should automatically detect the MCP server when configured in the MCP settings with the same pattern as above.

## Security Considerations

- The server runs locally and only accepts connections from localhost
- All browser automation happens on your local machine
- No data is sent to external servers
- Uses your existing Chrome profile (keeps you logged in)

## Performance Tips

1. **Use snapshots sparingly** - They can be large for complex pages
2. **Batch operations** - Group related actions together
3. **Use appropriate waits** - Don't rely on fixed timeouts; use `browser_wait()` strategically
4. **Monitor resources** - Use console and network logs to debug performance issues

## Support

For issues specific to this optimized version:
1. Check the [KILOCODE_OPTIMIZATION.md](KILOCODE_OPTIMIZATION.md) file
2. Review the troubleshooting section above
3. Test with the inspector: `npm run inspector`

For general Browser MCP issues:
- Visit: https://github.com/browsermcp/mcp
- Check the official documentation