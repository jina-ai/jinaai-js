/* eslint-disable max-len */
import JinaAI from 'jinaai';

const jinaai = new JinaAI({
    secrets: {
        'scenex-secret': process.env.SCENEX_SECRET || '',
    }
});

const toBase64 = (img: string) => jinaai.utils.imageToBase64(`../../images/${img}`);

const fridge = toBase64('fridge-1.png');

const generate = async () => {
    try {
        // 1. generate a story
        const descriptions = await jinaai.describe(
            fridge,
            { algorithm: 'Hearth', languages: ['en'] }
        );
        console.log('TTS: ', descriptions.results[0].tts?.en);
        console.log('SSML: ', descriptions.results[0].ssml?.en);
        console.log('STORY')
        for (const line of descriptions.results[0].i18n.en)
            console.log(line.name, ': ', line.message)
    } catch (e: any) {
        console.log('ERROR:', e);
    }
};

generate();
