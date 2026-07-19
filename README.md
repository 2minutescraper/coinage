# coinage
coinapp

## MCP servers

- **kie-mcp** (`mcp-servers/kie-mcp`) — KIE.ai media generation (image/video/music) connector, vendored from the `kie-mcp` v0.3.0 Claude Desktop extension. Registered in `.mcp.json`.
  - Copy `.env.example` to `.env` and set `KIE_API_KEY` (get one at https://kie.ai).
  - `KIE_API_KEY` must be present in the environment before Claude Code starts (e.g. `set -a && source .env && set +a`) so `.mcp.json`'s `${KIE_API_KEY}` reference resolves.

