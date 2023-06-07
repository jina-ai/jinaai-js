/* eslint-disable max-len */
import JinaClientMock from './mock/JinaClient.mock';
import jinaai from '../src/jinaai';

jest.mock('../src/clients/JinaClient', () => ({
    __esModule: true,
    default: JinaClientMock,
}));

describe('Jina SDK PromptPerfect tests', () => {

    beforeAll(() => {
        jinaai.configure({
            'promptperfect-token': 'some-fake-token',
            'scenex-token': 'some-fake-token',
            'rationale-token': 'some-fake-token'
        });
    });

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
        expect(r1.result).toBeTruthy();
        expect(r1.result.length).toBe(1);
        expect(r1.result[0].prompt).toBe(input[0]);
        expect(r1.result[0].imagePrompt).toBeFalsy();
        expect(r1.result[0].features.length).toBe(0);
        expect(r1.result[0].targetModel).toBe('chatgpt');
        expect(r1.result[0].promptOptimized).toBeTruthy();
        expect(r1.result[0].language).toBe('it');
        expect(r1.result[0].targetLanguage).toBe('it');
    });

    it('PromptPerfect: Image URL / text as input', async () => {
        const input1 = 'Give me an Hello World function in Typescript';
        const input2 = 'https://picsum.photos/200';
        const r1 = await jinaai.optimize(input1);
        expect(r1.result).toBeTruthy();
        expect(r1.result.length).toBe(1);
        expect(r1.result[0].prompt).toBe(input1);
        expect(r1.result[0].imagePrompt).toBeFalsy();
        expect(r1.result[0].features.length).toBe(0);
        expect(r1.result[0].targetModel).toBe('chatgpt');
        expect(r1.result[0].promptOptimized).toBeTruthy();
        expect(r1.result[0].language).toBe('en');
        expect(r1.result[0].targetLanguage).toBeFalsy();
        const r2 = await jinaai.optimize(input2, {
            targetModel: 'dalle',
            features: ['shorten'],
            target_language: 'fr'
        });
        expect(r2.result).toBeTruthy();
        expect(r2.result.length).toBe(1);
        expect(r2.result[0].prompt).toBeTruthy();
        expect(r2.result[0].imagePrompt).toBe(input2);
        expect(r2.result[0].features.length).toBe(1);
        expect(r2.result[0].features[0]).toBe('shorten');
        expect(r2.result[0].targetModel).toBe('dalle');
        expect(r2.result[0].promptOptimized).toBeTruthy();
        expect(r2.result[0].language).toBe('fr');
        expect(r2.result[0].targetLanguage).toBe('fr');
    });

    it('PromptPerfect: Array of image URL / text as input', async () => {
        const input = ['Give me an Hello World function in Typescript', 'https://picsum.photos/300'];
        const r1 = await jinaai.optimize(input);
        expect(r1.result).toBeTruthy();
        expect(r1.result.length).toBe(2);
        expect(r1.result[0].prompt).toBe(input[0]);
        expect(r1.result[1].prompt).toBeTruthy();
        expect(r1.result[0].imagePrompt).toBeFalsy();
        expect(r1.result[1].imagePrompt).toBe(input[1]);
        expect(r1.result[0].features.length).toBe(0);
        expect(r1.result[1].features.length).toBe(0);
        expect(r1.result[0].targetModel).toBe('chatgpt');
        expect(r1.result[1].targetModel).toBe('chatgpt');
        expect(r1.result[0].promptOptimized).toBeTruthy();
        expect(r1.result[1].promptOptimized).toBeTruthy();
        expect(r1.result[0].language).toBe('en');
        expect(r1.result[1].language).toBe('en');
        expect(r1.result[0].targetLanguage).toBeFalsy();
        expect(r1.result[1].targetLanguage).toBeFalsy();
        const r2 = await jinaai.optimize(input, {
            targetModel: 'dalle',
            features: ['shorten'],
            target_language: 'fr'
        });
        expect(r2.result).toBeTruthy();
        expect(r2.result.length).toBe(2);
        expect(r2.result[0].prompt).toBe(input[0]);
        expect(r2.result[1].prompt).toBeTruthy();
        expect(r2.result[0].imagePrompt).toBeFalsy();
        expect(r2.result[1].imagePrompt).toBe(input[1]);
        expect(r2.result[0].features.length).toBe(1);
        expect(r2.result[1].features.length).toBe(1);
        expect(r2.result[0].features[0]).toBe('shorten');
        expect(r2.result[1].features[0]).toBe('shorten');
        expect(r2.result[0].targetModel).toBe('dalle');
        expect(r2.result[1].targetModel).toBe('dalle');
        expect(r2.result[0].promptOptimized).toBeTruthy();
        expect(r2.result[1].promptOptimized).toBeTruthy();
        expect(r2.result[0].language).toBe('fr');
        expect(r2.result[1].language).toBe('fr');
        expect(r2.result[0].targetLanguage).toBe('fr');
        expect(r2.result[1].targetLanguage).toBe('fr');
    });

    it('PromptPerfect: SceneX output as input', async () => {
        const input = await jinaai.describe('https://picsum.photos/200', { languages: ['fr'] });
        const r1 = await jinaai.optimize(input, { target_language: 'fr' });
        expect(r1.result).toBeTruthy();
        expect(r1.result.length).toBe(1);
        expect(r1.result[0].prompt).toBe(input.result[0].text);
        expect(r1.result[0].imagePrompt).toBeFalsy();
        expect(r1.result[0].features.length).toBe(0);
        expect(r1.result[0].targetModel).toBe('chatgpt');
        expect(r1.result[0].promptOptimized).toBeTruthy();
        expect(r1.result[0].language).toBe('fr');
        expect(r1.result[0].targetLanguage).toBe('fr');
    });

});
