import JinaClientMock from './mock/JinaClient.mock';
import jinaai from '../src/jinaai';

jest.mock('../src/clients/JinaClient', () => ({
    __esModule: true,
    default: JinaClientMock,
}));

describe('Jina SDK SceneX tests', () => {

    beforeAll(() => {
        jinaai.configure({
            'promptperfect-token': 'some-fake-token',
            'scenex-token': 'some-fake-token',
            'rationale-token': 'some-fake-token'
        });
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
        expect(r1.result).toBeTruthy();
        expect(r1.result.length).toBe(1);
        expect(r1.result[0].image).toBe(input[0]);
        expect(r1.result[0].features.length).toBe(0);
        expect(r1.result[0].algorithm).toBe('Ember');
        expect(r1.result[0].text).toBeTruthy();
        expect(r1.result[0].i18n.en).toBeFalsy();
        expect(r1.result[0].i18n.it).toBeTruthy();
    });

    it('SceneX: Image URL as input', async () => {
        const input = 'https://picsum.photos/200';
        const r1 = await jinaai.describe(input);
        expect(r1.result).toBeTruthy();
        expect(r1.result.length).toBe(1);
        expect(r1.result[0].image).toBe(input);
        expect(r1.result[0].features.length).toBe(0);
        expect(r1.result[0].algorithm).toBe('Aqua');
        expect(r1.result[0].text).toBeTruthy();
        expect(r1.result[0].i18n.en).toBeTruthy();
        const r2 = await jinaai.describe(input, {
            features: ['high_quality'],
            algorithm: 'Comet',
            languages: ['fr', 'de']
        });
        expect(r2.result).toBeTruthy();
        expect(r2.result.length).toBe(1);
        expect(r2.result[0].image).toBe(input);
        expect(r2.result[0].features.length).toBe(1);
        expect(r2.result[0].features[0]).toBe('high_quality');
        expect(r2.result[0].algorithm).toBe('Comet');
        expect(r2.result[0].text).toBeTruthy();
        expect(r2.result[0].i18n.en).toBeFalsy();
        expect(r2.result[0].i18n.fr).toBeTruthy();
        expect(r2.result[0].i18n.de).toBeTruthy();
    });

    it('SceneX: Array of image URL as input', async () => {
        const input = ['https://picsum.photos/200', 'https://picsum.photos/300'];
        const r1 = await jinaai.describe(input);
        expect(r1.result).toBeTruthy();
        expect(r1.result.length).toBe(2);
        expect(r1.result[0].image).toBe(input[0]);
        expect(r1.result[1].image).toBe(input[1]);
        expect(r1.result[0].features.length).toBe(0);
        expect(r1.result[0].algorithm).toBe('Aqua');
        expect(r1.result[1].algorithm).toBe('Aqua');
        expect(r1.result[0].text).toBeTruthy();
        expect(r1.result[1].text).toBeTruthy();
        expect(r1.result[0].i18n.en).toBeTruthy();
        expect(r1.result[1].i18n.en).toBeTruthy();
        const r2 = await jinaai.describe(input, {
            features: ['high_quality'],
            algorithm: 'Dune',
            languages: ['fr']
        });
        expect(r2.result).toBeTruthy();
        expect(r2.result.length).toBe(2);
        expect(r2.result[0].image).toBe(input[0]);
        expect(r2.result[1].image).toBe(input[1]);
        expect(r2.result[0].features.length).toBe(1);
        expect(r2.result[1].features.length).toBe(1);
        expect(r2.result[0].features[0]).toBe('high_quality');
        expect(r2.result[1].features[0]).toBe('high_quality');
        expect(r2.result[0].algorithm).toBe('Dune');
        expect(r2.result[1].algorithm).toBe('Dune');
        expect(r2.result[0].text).toBeTruthy();
        expect(r2.result[1].text).toBeTruthy();
        expect(r2.result[0].i18n.en).toBeFalsy();
        expect(r2.result[1].i18n.en).toBeFalsy();
        expect(r2.result[0].i18n.fr).toBeTruthy();
        expect(r2.result[1].i18n.fr).toBeTruthy();
    });

});
