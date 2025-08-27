import type slackBolt from '@slack/bolt';
import { WebClient } from '@slack/web-api';
import { runFlow } from 'genkit/beta/client';
import type { AppMentionEvent } from '@slack/types';

export async function getResponse(
  messages: { text: string; user: string; ts: string; }[],
  _event: AppMentionEvent, _client: WebClient, _say: slackBolt.SayFn,
) {
  const response = await runFlow({
    url: 'http://127.0.0.1:3400/helloFlow',
    input: {
      messages: messages,
    }
  });

  return response;
}

export async function formatMessages(
  event: AppMentionEvent, 
  _client: WebClient,
): Promise<{ text: string; user: string; ts: string; }[]> {
  if (event.text && event.user && event.ts) {
    return [{ text: event.text, user: event.user, ts: event.ts }];
  }

  return [];
}
