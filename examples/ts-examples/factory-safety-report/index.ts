/* eslint-disable max-len */
import JinaAI from 'jinaai';
import fs from 'fs';

const jinaai = new JinaAI({
    secrets: {
        'promptperfect-secret': process.env.PROMPTPERFECT_SECRET || '',
        'scenex-secret': process.env.SCENEX_SECRET || '',
        'rationale-secret': process.env.RATIONALE_SECRET || '',
        'jinachat-secret': process.env.JINACHAT_SECRET || '',
        'bestbanner-secret': process.env.BESTBANNER_SECRET || '',
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

const situations = [
    'factory-1.png',
    'factory-2.png',
    'factory-3.png',
    'factory-4.png',
].map(i => toBase64(i));

const evaluate = async () => {
    try {
        // 1. get a description of each situations
        const descriptions = await jinaai.describe(situations);
        descriptions.results.forEach((desc, i) => console.log('DESCRIPTION ' + (i + 1) + ':\n', desc.output, '\n'));
        // 2. get an analysis based on those descriptions
        const analysis = await jinaai.generate([
            'Does any of those situations present a danger?',
            'Reply with [SITUATION_NUMBER] [YES] or [NO] and explain why',
            ...descriptions.results.map((desc, i) => 'SITUATION ' + (i + 1) + ':\n' + desc.output),
        ].join('\n'));
        console.log('ANALYSIS: \n', analysis.output);
        // 3. get a recommendation on the most urgent action to take
        const recommendation = await jinaai.generate([
            'According to those situations, what should be done first to make everything safer?',
            'I only want the most urgent situation',
            ...descriptions.results.map((desc, i) => 'SITUATION ' + (i + 1) + ':\n' + desc.output),
        ].join('\n'));
        console.log('RECOMMENDATION: \n', recommendation.output);
        // 4. get a swot analysis of the recommendation
        const swot = await jinaai.decide(
            recommendation.output,
            { analysis: 'swot' }
        );
        console.log('SWOT: \n', swot.results[0].swot);
        // 5. get a banner for the report
        const banners = await jinaai.imagine(descriptions!.results[0].output);
        console.log('BANNERS: \n', banners.results);
    } catch (e: any) {
        console.log('ERROR:', e);
    }
};

evaluate();
