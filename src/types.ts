import Anthropic from '@anthropic-ai/sdk';

export interface Logger {
    debug: (message: string, context?: { error?: any; data?: any }) => void;
    [key: string]: any;
}

export interface ClaudeConfig {
    apiKey: string;
}

export interface ClaudeContext {
    client: Anthropic;
    logger?: Logger;
}

export type ClaudeMessageRole = 'user' | 'assistant';

export interface ClaudeMessage {
    role: ClaudeMessageRole;
    content: string;
}

export interface CreateMessageInput {
    model:
        | 'claude-3-5-sonnet-20241022'
        | 'claude-3-5-haiku-20241022'
        | 'claude-3-opus-20240229'
        | string;
    messages: ClaudeMessage[];
    system?: string;
    max_tokens: number;
    temperature?: number;
    top_p?: number;
    top_k?: number;
    stop_sequences?: string[];
    metadata?: {
        user_id?: string;
    };
}

export interface CreateMessageOutput {
    id: string;
    type: 'message';
    role: 'assistant';
    content: Array<{
        type: 'text';
        text: string;
    }>;
    model: string;
    stop_reason: 'end_turn' | 'max_tokens' | 'stop_sequence' | 'tool_use' | null;
    stop_sequence: string | null;
    usage: {
        input_tokens: number;
        output_tokens: number;
    };
}
