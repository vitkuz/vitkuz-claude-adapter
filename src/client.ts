import Anthropic from '@anthropic-ai/sdk';
import { ClaudeConfig } from './types';

export const createClaudeClient = (config: ClaudeConfig): Anthropic => {
    return new Anthropic({
        apiKey: config.apiKey,
    });
};
