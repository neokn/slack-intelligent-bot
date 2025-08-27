#!/usr/bin/env node

import { readFileSync } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
const sleep = promisify(setTimeout);
import 'dotenv/config';
import chalk from 'chalk';
import googleAI from '@genkit-ai/googleai';
import { genkit, z } from 'genkit';
import { startFlowServer } from '@genkit-ai/express';
import { createMcpHost } from '@genkit-ai/mcp';
import { App } from '@slack/bolt';
import { generate, organizeMessages } from './genkit/flowHandler.js';
import { formatMessages, getResponse } from './slack/messageHandler.js';

async function startSlackBolt() {

  // Initialize Slack Bot
  console.log(chalk.blue('⚡️ [SLACK BOLT] App booting ...'), '\n');

  const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true,
  });

  app.event('app_mention', async ({ event, client, say }) => {
    console.debug(chalk.blue('[SLACK BOLT] App mention received: '), JSON.stringify(event), '\n');

    let messages = await formatMessages(event, client);

    const response = await getResponse(event, client, say, messages );

    await say({ text: response, thread_ts: event.thread_ts || event.ts });
  });

  await app.start();
  console.log(chalk.blue('⚡️ [SLACK BOLT] App is running'), '\n');
}

async function startGenkitFlow() {
  console.log(chalk.green('⚡️ [GENKIT] Flow booting ...'), '\n');

  const ai = genkit({
    plugins: [
      googleAI(),
    ],
  });

  const helloFlow = ai.defineFlow(
    {
      name: 'helloFlow',
      inputSchema: z.object({
        messages: z.array(z.object({
          text: z.string(),
          user: z.string(),
          ts: z.string(),
        })),
      }),
    },
    async ({ messages }, { sendChunk }) => {
      // Random delay between 0-8 seconds for flash-lite RPM 15
      const delay = Math.floor(Math.random() * 8000);
      console.log(chalk.green(`[GENKIT] Applying random delay: ${delay}ms`));
      await sleep(delay);

      const organizedMessages = organizeMessages(messages);

      const host = createMcpHost(JSON.parse(readFileSync(join(process.cwd(), 'config/mcp-config.json'), 'utf-8')));

      const response = await generate(ai, host, sendChunk, organizedMessages);

      console.log(chalk.green('[GENKIT] Response:'), response);
      return response;
    }
  );

  startFlowServer({
    flows: [helloFlow],
  });

  console.log(chalk.green('✅ [GENKIT] Flow registered successfully!'));

}

async function main() {
  console.log(chalk.yellow('⚡️ Starting Slack Intelligent Bot with integrated Genkit and Slack services...'));

  await Promise.all([
    startGenkitFlow(),
    startSlackBolt()
  ]);

  console.log(chalk.yellow('📝 Both Genkit flow server and Slack bot are running in the same process'));
}

if (require.main === module) {
  main().catch(console.error);
}
