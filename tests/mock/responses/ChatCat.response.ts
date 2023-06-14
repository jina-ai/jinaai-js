/* eslint-disable max-len */
import { ChatCatRawInput, ChatCatRawOutput } from '../../../src/clients/ChatCatClient';

export default (input: ChatCatRawInput): ChatCatRawOutput => {
    return {
        chatId: input.chatId || 'aaaaaaaaaaaaaaaaaaaaaaaaaaa',
        inputMessageId: 'aaaaaaaaaaaaaaaaaaaaaaaaaaa',
        responseMessageId: 'aaaaaaaaaaaaaaaaaaaaaaaaaaa',
        responseContent: input.messages.reduce((a, b) => a + '-' + b.content, ''),
        usage: {
            inputTokenCount: 1,
            responseTokenCount: 5
        }
    };
};
