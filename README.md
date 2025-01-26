# Trillet Web Agent SDK Example

This project demonstrates how to implement a web agent using React and the Trillet SDK. It serves as a sample implementation that you can use as a reference for integrating a web agent into your own website.

## Prerequisites

Before running this project, make sure you have:
- Node.js installed (version 14 or higher recommended)
- A Trillet account and API credentials
- Basic knowledge of React

## Setup

1. Clone this repository
2. Copy `.env.sample` to `.env`
3. Fill in your Trillet credentials in the `.env` file
4. Install dependencies:
```bash
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.\
The build is optimized and ready for deployment.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
REACT_APP_TRILLET_API_KEY=your_api_key
REACT_APP_TRILLET_AGENT_ID=your_agent_id
REACT_APP_TRILLET_WORKSPACE_ID=your_workspaceId
```

## Features

This sample implementation includes:
- Basic web agent setup
- Real-time communication
- Chat interface
- Agent status handling

## Learn More

- [Trillet SDK Documentation](https://docs.trillet.ai)
- [React Documentation](https://reactjs.org/)

## Support

For questions about:
- This sample implementation: Open an issue in this repository
- Trillet SDK: Contact Trillet support
- React: Check the [React documentation](https://reactjs.org/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
