export const TRILLET_CONFIG = {
  // The API key will be used as the token for the WebSocket connection
  API_KEY: process.env.REACT_APP_TRILLET_API_KEY || '',
  WORKSPACE_ID: process.env.REACT_APP_TRILLET_WORKSPACE_ID || '',
  AGENT_ID: process.env.REACT_APP_TRILLET_AGENT_ID || ''
}; 