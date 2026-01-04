import { ClaudeContext, CreateMessageInput, CreateMessageOutput } from '../types';

export const createMessage =
    (ctx: ClaudeContext) =>
    async (input: CreateMessageInput): Promise<CreateMessageOutput> => {
        const { client, logger } = ctx;

        logger?.debug('claude:createMessage:start', { data: input });

        try {
            const response = await client.messages.create(input as any);

            logger?.debug('claude:createMessage:success', { data: response });

            return response as CreateMessageOutput;
        } catch (error) {
            logger?.debug('claude:createMessage:error', { error });
            throw error;
        }
    };
