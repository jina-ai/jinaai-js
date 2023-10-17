import { HTTPClient } from './mock/HTTPClient.mock';
import JinaAI from '../src/jinaai';

jest.mock('../src/clients/HTTPClient', () => ({
    __esModule: true,
    HTTPClient: HTTPClient,
}));

describe('Jina SDK SceneX tests', () => {

    const jinaai = new JinaAI({
        secrets: {
            'promptperfect-secret': 'some-fake-secret',
            'scenex-secret': 'some-fake-secret',
            'rationale-secret': 'some-fake-secret',
            'jinachat-secret': 'some-fake-secret',
        }
    });

    it('SceneX: Default SceneX API input', async () => {
        const input = ['https://picsum.photos/200'];
        const r1 = await jinaai.describe({
            data: input.map(i => ({
                image: i,
                features: [],
                algorithm: 'Ember',
                languages: ['it'],
                style: 'concise',
            })),
        });
        expect(r1.results).toBeTruthy();
        expect(r1.results.length).toBe(1);
        expect(r1.results[0].output.length > 0).toBeTruthy();
        expect(r1.results[0].i18n?.it).toBeTruthy();
    });

    it('SceneX: Image URL as input', async () => {
        const input = 'https://picsum.photos/200';
        const r1 = await jinaai.describe(input);
        expect(r1.results).toBeTruthy();
        expect(r1.results.length).toBe(1);
        expect(r1.results[0].output.length > 0).toBeTruthy();
        const r2 = await jinaai.describe(input, {
            features: ['high_quality'],
            algorithm: 'Comet',
            languages: ['fr', 'de']
        });
        expect(r2.results).toBeTruthy();
        expect(r2.results.length).toBe(1);
        expect(r2.results[0].output.length > 0).toBeTruthy();
        expect(r2.results[0].i18n?.fr).toBeTruthy();
        expect(r2.results[0].i18n?.de).toBeTruthy();
    });

    it('SceneX: Image URL as input & shortened answer', async () => {
        const input = 'https://picsum.photos/200';
        const r1 = await jinaai.describe(input, {
            output_length: 50,
        });
        expect(r1.results).toBeTruthy();
        expect(r1.results.length).toBe(1);
        expect(r1.results[0].output.length > 0).toBeTruthy();
        expect(r1.results[0].output.length > 50).toBeTruthy();
        expect(r1.results[0].i18n?.en).toBeTruthy();
        expect(r1.results[0].i18n?.en.length == 50).toBeTruthy();
        const r2 = await jinaai.describe(input, {
            output_length: 50,
            languages: ['fr', 'de']
        });
        expect(r2.results).toBeTruthy();
        expect(r2.results.length).toBe(1);
        expect(r2.results[0].output.length > 0).toBeTruthy();
        expect(r2.results[0].output.length > 50).toBeTruthy();
        expect(r2.results[0].i18n?.fr).toBeTruthy();
        expect(r2.results[0].i18n?.fr.length == 50).toBeTruthy();
        expect(r2.results[0].i18n?.de).toBeTruthy();
        expect(r2.results[0].i18n?.de.length == 50).toBeTruthy();
    });

    it('SceneX: Image URL as input & json answer', async () => {
        const input = 'https://picsum.photos/200';
        const r1 = await jinaai.describe(input, {
            json_schema: {
                type: 'object',
                properties: {
                    headcount:{
                        type: 'number',
                        description: 'How many people in this image'
                    }
                }
            }
        });
        expect(r1.results).toBeTruthy();
        expect(r1.results.length).toBe(1);
        expect(r1.results[0].output.length > 0).toBeTruthy();
        expect(r1.results[0].output.length > 50).toBeTruthy();
        expect(r1.results[0].i18n?.en).toBeTruthy();
        expect(JSON.parse(r1.results[0].i18n?.en)).toBeTruthy();
    });

    it('SceneX: Image URL as input & Hearth algo', async () => {
        const input = 'https://picsum.photos/200';
        const r1 = await jinaai.describe(input, {
            algorithm: 'Hearth'
        });
        expect(r1.results).toBeTruthy();
        expect(r1.results.length).toBe(1);
        expect(r1.results[0].output.length > 0).toBeTruthy();
        expect(r1.results[0].i18n?.en).toBeTruthy();
        expect(r1.results[0].i18n?.en.length == 2).toBeTruthy();
        expect(r1.results[0].i18n?.en[0].message.length > 50).toBeTruthy();
        expect(r1.results[0].tts?.en).toBeTruthy();
        expect(r1.results[0].ssml?.en).toBeTruthy();
        const r2 = await jinaai.describe(input, {
            algorithm: 'Hearth',
            output_length: 50,
            languages: ['fr', 'de']
        });
        expect(r2.results).toBeTruthy();
        expect(r2.results.length).toBe(1);
        expect(r2.results[0].output.length > 0).toBeTruthy();
        expect(r2.results[0].output.length > 50).toBeTruthy();
        expect(r2.results[0].i18n?.fr).toBeTruthy();
        expect(r2.results[0].i18n?.fr.length == 2).toBeTruthy();
        expect(r2.results[0].i18n?.fr[0].message.length == 50).toBeTruthy();
        expect(r2.results[0].i18n?.de).toBeTruthy();
        expect(r2.results[0].i18n?.de.length == 2).toBeTruthy();
        expect(r2.results[0].i18n?.de[0].message.length == 50).toBeTruthy();
        expect(r2.results[0].tts?.fr).toBeTruthy();
        expect(r2.results[0].ssml?.fr).toBeTruthy();
        expect(r2.results[0].tts?.de).toBeTruthy();
        expect(r2.results[0].ssml?.de).toBeTruthy();
    });

    it('SceneX: Array of image URL as input', async () => {
        const input = ['https://picsum.photos/200', 'https://picsum.photos/300'];
        const r1 = await jinaai.describe(input);
        expect(r1.results).toBeTruthy();
        expect(r1.results.length).toBe(2);
        expect(r1.results[0].output.length > 0).toBeTruthy();
        expect(r1.results[1].output.length > 0).toBeTruthy();
        const r2 = await jinaai.describe(input, {
            features: ['high_quality'],
            algorithm: 'Dune',
            languages: ['fr']
        });
        expect(r2.results).toBeTruthy();
        expect(r2.results.length).toBe(2);
        expect(r2.results[0].output.length > 0).toBeTruthy();
        expect(r2.results[1].output.length > 0).toBeTruthy();
        expect(r2.results[0].i18n?.fr).toBeTruthy();
        expect(r2.results[1].i18n?.fr).toBeTruthy();
    });

    it('SceneX: Raw output', async () => {
        const input = ['https://picsum.photos/200', 'https://picsum.photos/300'];
        const r1 = await jinaai.describe(input, { raw: true });
        expect(r1.raw!.result).toBeTruthy();
        expect(r1.raw!.result.length).toBe(2);
        expect(r1.raw!.result[0].image).toBe(input[0]);
        expect(r1.raw!.result[1].image).toBe(input[1]);
        expect(r1.raw!.result[0].features.length).toBe(0);
        expect(r1.raw!.result[0].algorithm).toBe('Aqua');
        expect(r1.raw!.result[1].algorithm).toBe('Aqua');
        expect(r1.raw!.result[0].text).toBeTruthy();
        expect(r1.raw!.result[1].text).toBeTruthy();
        expect(r1.raw!.result[0].answer).toBeFalsy();
        expect(r1.raw!.result[1].answer).toBeFalsy();
        expect(r1.raw!.result[0].i18n.en).toBeTruthy();
        expect(r1.raw!.result[1].i18n.en).toBeTruthy();
        const r2 = await jinaai.describe(input, {
            question: 'How many people are on this photo?',
            features: ['high_quality'],
            algorithm: 'Dune',
            languages: ['fr'],
            raw: true
        });
        expect(r2.raw!.result).toBeTruthy();
        expect(r2.raw!.result.length).toBe(2);
        expect(r2.raw!.result[0].image).toBe(input[0]);
        expect(r2.raw!.result[1].image).toBe(input[1]);
        expect(r2.raw!.result[0].features.length).toBe(2);
        expect(r2.raw!.result[1].features.length).toBe(2);
        expect(r2.raw!.result[0].features[0]).toBe('high_quality');
        expect(r2.raw!.result[0].features[1]).toBe('question_answer');
        expect(r2.raw!.result[1].features[0]).toBe('high_quality');
        expect(r2.raw!.result[1].features[1]).toBe('question_answer');
        expect(r2.raw!.result[0].algorithm).toBe('Dune');
        expect(r2.raw!.result[1].algorithm).toBe('Dune');
        expect(r2.raw!.result[0].text).toBeTruthy();
        expect(r2.raw!.result[1].text).toBeTruthy();
        expect(r2.raw!.result[0].answer).toBeTruthy();
        expect(r2.raw!.result[1].answer).toBeTruthy();
        expect(r2.raw!.result[0].i18n.en).toBeFalsy();
        expect(r2.raw!.result[1].i18n.en).toBeFalsy();
        expect(r2.raw!.result[0].i18n.fr).toBeTruthy();
        expect(r2.raw!.result[1].i18n.fr).toBeTruthy();
    });

});
