import JinaAI from '../src/jinaai';

// test append / prepend
// test imagetobase64
// test cache
// test new api style
// test errors / empty strings

const run = async () => {

    const jinaai = new JinaAI({
        tokens: {
            'promptperfect-token': process.env.PROMPTPERFECT_TOKEN || '',
            'scenex-token': process.env.SCENEX_TOKEN || '',
            'rationale-token': process.env.RATIONALE_TOKEN || '',
        },
        useCache: true
    });

    const input = [
        'factory-1.png',
        'factory-2.png',
        'factory-3.png',
        'factory-4.png',
    ].map(i => jinaai.imageToBase64(`examples/images/${i}`));

    const descriptions = await jinaai.describe(input);

    console.log('DESCRIPTIONS', JSON.stringify(descriptions, null, 4));

    const decisions = await jinaai.decide(
        descriptions,
        { analysis: 'swot', prepend: 'Should I work there: ' }
    );

    console.log('DECISIONS', JSON.stringify(decisions, null, 4));

};

run();