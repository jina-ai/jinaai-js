import HTTPClientMock from './mock/HTTPClient.mock';
import JinaAI from '../src/jinaai';

jest.mock('../src/clients/HTTPClient', () => ({
    __esModule: true,
    default: HTTPClientMock,
}));

describe('Jina SDK PromptPerfect tests', () => {

    const jinaai = new JinaAI({
        tokens: {
            'promptperfect-token': 'some-fake-token',
            'scenex-token': 'some-fake-token',
            'rationale-token': 'some-fake-token',
            'chatcat-token': 'some-fake-token',
        }
    })

    it('PromptPerfect: Default PromptPerfect API input', async () => {
        const input = ['Give me an Hello World function in Typescript'];
        const r1 = await jinaai.optimize({
            data: input.map(i => ({
                prompt: i,
                targetModel: 'chatgpt',
                features: [],
                target_language: 'it'
            })),
        });
        expect(r1.results).toBeTruthy();
        expect(r1.results.length).toBe(1);
        expect(r1.results[0].output.length > 0).toBeTruthy();
    });

    it('PromptPerfect: Image URL / text as input', async () => {
        const input1 = 'Give me an Hello World function in Typescript';
        const input2 = 'https://picsum.photos/200';
        const r1 = await jinaai.optimize(input1);
        expect(r1.results).toBeTruthy();
        expect(r1.results.length).toBe(1);
        expect(r1.results[0].output.length > 0).toBeTruthy();
        const r2 = await jinaai.optimize(input2, {
            targetModel: 'dalle',
            features: ['shorten'],
            target_language: 'fr'
        });
        expect(r2.results).toBeTruthy();
        expect(r2.results.length).toBe(1);
        expect(r2.results[0].output.length > 0).toBeTruthy();
    });

    it('PromptPerfect: Array of image URL / text as input', async () => {
        const input = ['Give me an Hello World function in Typescript', 'https://picsum.photos/300'];
        const r1 = await jinaai.optimize(input);
        expect(r1.results).toBeTruthy();
        expect(r1.results.length).toBe(2);
        expect(r1.results[0].output.length > 0).toBeTruthy();
        expect(r1.results[1].output.length > 0).toBeTruthy();
        const r2 = await jinaai.optimize(input, {
            targetModel: 'dalle',
            features: ['shorten'],
            target_language: 'fr'
        });
        expect(r2.results).toBeTruthy();
        expect(r2.results.length).toBe(2);
        expect(r2.results[0].output.length > 0).toBeTruthy();
        expect(r2.results[1].output.length > 0).toBeTruthy();
    });

    it('PromptPerfect: Raw output', async () => {
        const input1 = 'Give me an Hello World function in Typescript';
        const input2 = 'https://picsum.photos/200';
        const r1 = await jinaai.optimize(input1, { raw: true });
        expect(r1.raw!.result).toBeTruthy();
        expect(r1.raw!.result.length).toBe(1);
        expect(r1.raw!.result[0].prompt).toBe(input1);
        expect(r1.raw!.result[0].imagePrompt).toBeFalsy();
        expect(r1.raw!.result[0].features.length).toBe(0);
        expect(r1.raw!.result[0].targetModel).toBe('chatgpt');
        expect(r1.raw!.result[0].promptOptimized).toBeTruthy();
        expect(r1.raw!.result[0].language).toBe('en');
        expect(r1.raw!.result[0].targetLanguage).toBeFalsy();
        const r2 = await jinaai.optimize(input2, {
            raw: true,
            target_language: 'it',
            targetModel: 'claude',
            features: ['shorten', 'high_quality']
        });
        expect(r2.raw!.result).toBeTruthy();
        expect(r2.raw!.result.length).toBe(1);
        expect(r2.raw!.result[0].prompt.length > 0).toBeTruthy();
        expect(r2.raw!.result[0].imagePrompt).toBe(input2);
        expect(r2.raw!.result[0].features.length).toBe(2);
        expect(r2.raw!.result[0].targetModel).toBe('claude');
        expect(r2.raw!.result[0].promptOptimized).toBeTruthy();
        expect(r2.raw!.result[0].language).toBe('it');
        expect(r2.raw!.result[0].targetLanguage).toBe('it');
    });

});
