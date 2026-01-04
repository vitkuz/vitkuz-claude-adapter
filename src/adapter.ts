import Anthropic from '@anthropic-ai/sdk';
import { ClaudeConfig, ClaudeContext, Logger } from './types';
import { createClaudeClient } from './client';
import { createMessage } from './operations/create-message';

export interface ClaudeAdapter {
    createMessage: ReturnType<typeof createMessage>;
}

export const createAdapter = (config: ClaudeConfig, logger?: Logger): ClaudeAdapter => {
    const client = createClaudeClient(config);
    const context: ClaudeContext = { client, logger };

    return {
        createMessage: createMessage(context),
    };
};
