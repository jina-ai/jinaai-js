/* eslint-disable max-len */
import { ChatCatRawInput, ChatCatRawOutput } from '../../../src/clients/ChatCatClient';

export default (input: ChatCatRawInput): ChatCatRawOutput => {
    return {
        chatId: input.chatId || 'aaaaaaaaaaaaaaaaaaaaaaaaaaa',
        inputMessageId: 'aaaaaaaaaaaaaaaaaaaaaaaaaaa',
        responseMessageId: 'aaaaaaaaaaaaaaaaaaaaaaaaaaa',
        choices: [{
            index: 0,
            message: {
                role: 'assistant',
                content: input.messages.reduce((a, b) => a + '-' + b.content, '')
            },
            finish_reason: 'stop'
        }],
        usage: {
            prompt_tokens: 7,
            completion_tokens: 18,
            total_tokens: 25
        }
    };
};
