# Slack Intelligent Bot

An intelligent chatbot that combines Firebase Genkit and Slack Bolt to provide AI-powered conversational experiences in Slack channels.

## Project Overview

This project integrates:

- **Firebase Genkit** - For AI flow management and generative AI capabilities
- **Slack Bolt** - For Slack application development
- **Node** - As runtime environment

## Tech Stack

- **Runtime**: Node
- **Language**: TypeScript
- **AI Framework**: Firebase Genkit
- **Slack SDK**: Slack Bolt
- **License**: MIT

## Getting Started

### Prerequisites

- Node.js v22.18+
- One of the package managers: `pnpm` **(Recommended)**, `npm`, `yarn`

### Installation

1. Install dependencies

    ```bash
    pnpm install
    ```

2. Set up environment variables

    ```bash
    cp template.env .env
    # Edit .env with your actual tokens and API keys
    ```

Get Slack Related tokens from [Slack API App](https://api.slack.com/apps)

- SLACK_BOT_TOKEN - Your Slack bot token (starts with `xoxb-`)
- SLACK_APP_TOKEN - Your Slack app token (starts with `xapp-`)

Get Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

- GEMINI_API_KEY

### Running the Application

#### Quick Start (Recommended)

```bash
pnpm run dev
```

> 1. If you encounter an error like "_Schema 'string\r' not found_", this may be caused by Git changing the line endings from LF to CRLF. You need to change the line endings back to LF for all [`*.prompt`](./prompts/slack-bot.prompt) files in the prompts folder.
> 2. If there are any unexpected errors, you can delete the `.genkit` folder and try again

## Configuration

### Environment Variables

Copy the template and fill in your credentials:

```bash
cp template.env .env
```

Required environment variables:

- `SLACK_BOT_TOKEN` - Your Slack bot token (starts with `xoxb-`)
- `SLACK_APP_TOKEN` - Your Slack app token (starts with `xapp-`) for Socket Mode
- `GEMINI_API_KEY` - Your Google Gemini API key

### Slack App Setup

Using App Manifest

The [`slack_app_manifest.json`](./slack_app_manifest.json) file contains all the basic necessary configuration for your Slack app

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Neo Kusanagi - Copyright (c) 2025
