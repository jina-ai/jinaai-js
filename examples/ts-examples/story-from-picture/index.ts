/* eslint-disable max-len */
import JinaAI from 'jinaai';
import fs from 'fs';

const jinaai = new JinaAI({
    secrets: {
        'scenex-secret': process.env.SCENEX_SECRET || '',
    }
});

function imageToBase64(filePath: string): string {
    try {
        const fileData = fs.readFileSync(filePath);
        const base64Data = fileData.toString('base64');
        const mimeType = getMimeType(filePath);
        const base64String = `data:${mimeType};base64,${base64Data}`;
        return base64String;
    } catch (error) {
        throw 'Image to base64 error: ' + JSON.stringify(error, null, 4);
    }
}

function getMimeType(filePath: string): string {
    const mimeTypeMap: { [key: string]: string } = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
    };
    const extension = filePath.substring(filePath.lastIndexOf('.')).toLowerCase();
    const mimeType = mimeTypeMap[extension];
    return mimeType || 'application/octet-stream';
}

const toBase64 = (img: string) => imageToBase64(`../../images/${img}`);

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
