import * as dotenv from 'dotenv';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createAdapter } from '../src/index';

dotenv.config({ path: join(__dirname, '../.env') });

const apiKey = process.env.ANTHROPIC_API_KEY;

if (!apiKey) {
    console.error('ANTHROPIC_API_KEY environment variable is required');
    process.exit(1);
}

const adapter = createAdapter(
    { apiKey },
    {
        debug: (msg, ctx) => console.log(`[DEBUG] ${msg}`, ctx),
    },
);

async function main() {
    try {
        console.log('Testing createMessage with Claude...');
        const result = await adapter.createMessage({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1024,
            messages: [{ role: 'user', content: 'Hello! How are you?' }],
        });

        console.log('Result:', JSON.stringify(result, null, 2));

        const resultPath = join(__dirname, 'create-message.result.json');
        await writeFile(resultPath, JSON.stringify(result, null, 2));
        console.log(`Saved result to ${resultPath}`);

        console.log('SUCCESS');
    } catch (error) {
        console.error('FAILED:', error);
        process.exit(1);
    }
}

main();
