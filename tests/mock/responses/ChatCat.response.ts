/* eslint-disable max-len */
import { ChatCatInput, ChatCatOutput } from '../../../src/clients/ChatCatClient';

export default (input: ChatCatInput): ChatCatOutput => {
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
