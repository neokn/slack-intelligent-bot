import { type Genkit, type StreamingCallback } from "genkit";
import { type GenkitMcpHost } from '@genkit-ai/mcp';

export function organizeMessages(
    messages: { text: string; user: string; ts: string }[],
): { newMessages: string[], history: { role: 'user' | 'model', content: { text: string }[] }[] } {
    return {
        newMessages: messages.map(m => m.text),
        history: [],
    };
}

export async function generate(
    ai: Genkit, 
    host: GenkitMcpHost,
    organizedMessages: { newMessages: string[]; history: { role: 'user' | 'model'; content: { text: string; }[]; }[]; },
    _sendChunk: StreamingCallback<any>,
): Promise<string> {
    
    const tools = await host.getActiveTools(ai);
    const resources = await host.getActiveResources(ai);

    const { text } = await ai.prompt('slack-bot')({
        botUserId: process.env['SLACK_BOT_USER_ID']!,
        userMessages: organizedMessages.newMessages,
    }, {
        messages: organizedMessages.history,
        tools,
        resources,
        toolChoice: 'auto',
    });

    return text;
}
