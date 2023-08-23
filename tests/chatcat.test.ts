import { HTTPClient } from './mock/HTTPClient.mock';
import JinaAI from '../src/jinaai';

jest.mock('../src/clients/HTTPClient', () => ({
    __esModule: true,
    HTTPClient: HTTPClient,
}));

describe('Jina SDK JinaChat tests', () => {

    const jinaai = new JinaAI({
        secrets: {
            'promptperfect-secret': 'some-fake-secret',
            'scenex-secret': 'some-fake-secret',
            'rationale-secret': 'some-fake-secret',
            'jinachat-secret': 'some-fake-secret',
        }
    });

    it('JinaChat: Default JinaChat API input', async () => {
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

    it('JinaChat: Text as input', async () => {
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

    it('JinaChat: Text with image as input', async () => {
        const input = 'What could I do with this?';
        const url = 'https://picsum.photos/200';
        const r1 = await jinaai.generate(input, { image: url });
        expect(r1.output).toBeTruthy();
        expect(r1.output.length > 0).toBeTruthy();
        expect(r1.chatId).toBe('aaaaaaaaaaaaaaaaaaaaaaaaaaa');
    });

    it('JinaChat: Array of text as input', async () => {
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

    it('JinaChat: Raw output', async () => {
        const input = 'Give me an Hello World function in Typescript';
        const r1 = await jinaai.generate(input, { raw: true });
        expect(r1.raw!.choices).toBeTruthy();
        expect(r1.raw!.choices.length > 0).toBeTruthy();
        expect(r1.raw!.choices[0].message.content.length > 0).toBeTruthy();
        expect(r1.raw!.choices[0].finish_reason).toBeTruthy();
        expect(r1.raw!.usage).toBeTruthy();
        expect(r1.raw!.usage.prompt_tokens).toBeTruthy();
        expect(r1.raw!.usage.completion_tokens).toBeTruthy();
        expect(r1.raw!.usage.total_tokens).toBeTruthy();
        expect(r1.raw!.chatId).toBe('aaaaaaaaaaaaaaaaaaaaaaaaaaa');
    });

});
