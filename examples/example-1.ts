import JinaAI from '../src/jinaai';

const run = async () => {

    const jinaai = new JinaAI({
        tokens: {
            'promptperfect-token': process.env.PROMPTPERFECT_TOKEN || '',
            'scenex-token': process.env.SCENEX_TOKEN || '',
            'rationale-token': process.env.RATIONALE_TOKEN || '',
            'chatcat-token': process.env.CHATCAT_TOKEN || '',
        },
        useCache: true
    });

    // const input = [
    //     'factory-1.png',
    //     'factory-2.png',
    //     'factory-3.png',
    //     'factory-4.png',
    // ].map(i => jinaai.utils.imageToBase64(`examples/images/${i}`));

    // const descriptions = await jinaai.describe(input);

    // console.log('DESCRIPTIONS', JSON.stringify(descriptions, null, 4));

    // const decisions = await jinaai.decide(
    //     descriptions,
    //     { analysis: 'swot', prepend: 'Should I work there: ' }
    // );

    // console.log('DECISIONS', JSON.stringify(decisions, null, 4));

    const output = await jinaai.generate([
        'write a hellow world function in js',
        'make it take a optional param NAME and replace world by NAME if set'
    ]);
    console.log(JSON.stringify(output, null, 4));

};

run();