import JinaAI from '../../src/jinaai';
import { imageToBase64 } from '../utils';

// THIS TEST USES REAL CREDITS

describe('Jina SDK story example tests', () => {

    const jinaai = new JinaAI({
        secrets: {
            'scenex-secret': process.env.SCENEX_SECRET || '',
        }
    });

    const fridge = ['fridge-1.png']
        .map(i => imageToBase64(`./examples/images/${i}`));
    
    it('SceneX: generate story from fridge image', async () => {

        const descriptions = await jinaai.describe(
            fridge,
            { algorithm: 'Hearth', languages: ['en'] }
        );
        expect(descriptions.results[0].tts?.en).toBeTruthy();
        expect(descriptions.results[0].ssml?.en).toBeTruthy();
        console.log('TTS: ', descriptions.results[0].tts?.en);
        console.log('SSML: ', descriptions.results[0].ssml?.en);
        expect(descriptions.results[0].i18n.en).toBeTruthy();
        expect(descriptions.results[0].i18n.en.length > 0).toBeTruthy();
        expect(descriptions.results[0].i18n.en[0].message).toBeTruthy();
        for (const line of descriptions.results[0].i18n.en)
            console.log(line.name, ': ', line.message);
    });

});

