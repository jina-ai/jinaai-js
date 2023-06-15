/* eslint-disable max-len */
import JinaAI from 'jinaai';

const jinaai = new JinaAI({
    tokens: {
        'promptperfect-token': process.env.PROMPTPERFECT_TOKEN || '',
        'scenex-token': process.env.SCENEX_TOKEN || '',
        'rationale-token': process.env.RATIONALE_TOKEN || '',
        'chatcat-token': process.env.CHATCAT_TOKEN || '',
    }
});

const toBase64 = (img: string) => jinaai.utils.imageToBase64(`../../examples/images/${img}`);

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
    } catch (e) {
        console.log('ERROR:', e);
    }
};

evaluate();
