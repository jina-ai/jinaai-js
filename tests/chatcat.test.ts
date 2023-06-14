import HTTPClientMock from './mock/HTTPClient.mock';
import JinaAI from '../src/jinaai';

jest.mock('../src/clients/HTTPClient', () => ({
    __esModule: true,
    default: HTTPClientMock,
}));

describe('Jina SDK ChatCat tests', () => {

    const jinaai = new JinaAI({
        tokens: {
            'promptperfect-token': 'some-fake-token',
            'scenex-token': 'some-fake-token',
            'rationale-token': 'some-fake-token',
            'chatcat-token': 'some-fake-token',
        }
    })

    it('ChatCat: Default ChatCat API input', async () => {
        const input = ['Give me an Hello World function in Typescript'];
        const r1 = await jinaai.generate({
            messages: input.map(i => ({
                role: 'user',
                content: i,
            })),
        });
        expect(r1.output).toBeTruthy();
        expect(r1.output.length > 0).toBeTruthy();
        expect(r1.chatId).toBe('aaaaaaaaaaaaaaaaaaaaaaaaaaa');
        const r2 = await jinaai.generate({
            messages: input.map(i => ({
                role: 'user',
                content: i,
            })),
            chatId: '1234567890'
        });
        expect(r2.output).toBeTruthy();
        expect(r2.output.length > 0).toBeTruthy();
        expect(r2.chatId).toBe('1234567890');
    });

    it('ChatCat: Text as input', async () => {
        const input = 'Give me an Hello World function in Typescript';
        const r1 = await jinaai.generate(input);
        expect(r1.output).toBeTruthy();
        expect(r1.output.length > 0).toBeTruthy();
        expect(r1.chatId).toBe('aaaaaaaaaaaaaaaaaaaaaaaaaaa');
        const r2 = await jinaai.generate(input, { chatId: '1234567890' });
        expect(r2.output).toBeTruthy();
        expect(r2.output.length > 0).toBeTruthy();
        expect(r2.chatId).toBe('1234567890');
    });

    it('ChatCat: Array of text as input', async () => {
        const input = [
            'Give me an Hello World function in Typescript',
            'Make it take an optional param NAME and replace world by NAME if set'
        ];
        const r1 = await jinaai.generate(input);
        expect(r1.output).toBeTruthy();
        expect(r1.output.length > 0).toBeTruthy();
        expect(r1.chatId).toBe('aaaaaaaaaaaaaaaaaaaaaaaaaaa');
        const r2 = await jinaai.generate(input, { chatId: '1234567890' });
        expect(r2.output).toBeTruthy();
        expect(r2.output.length > 0).toBeTruthy();
        expect(r2.chatId).toBe('1234567890');
    });

    it('ChatCat: Raw output', async () => {
        const input = 'Give me an Hello World function in Typescript';
        const r1 = await jinaai.generate(input, { raw: true });
        expect(r1.raw!.responseContent).toBeTruthy();
        expect(r1.raw!.responseContent.length > 0).toBeTruthy();
        expect(r1.raw!.chatId).toBe('aaaaaaaaaaaaaaaaaaaaaaaaaaa');
    });

});
