/* eslint-disable max-len */
import JinaAIExtended from './src/JinaAiExtended';

const jinaai = new JinaAIExtended({
    secrets: {
        'promptperfect-secret': process.env.PROMPTPERFECT_SECRET || '',
        'scenex-secret': process.env.SCENEX_SECRET || '',
        'rationale-secret': process.env.RATIONALE_SECRET || '',
        'jinachat-secret': process.env.JINACHAT_SECRET || '',
        'bestbanner-secret': process.env.BESTBANNER_SECRET || '',
        'openai-secret': process.env.OPENAI_API_KEY || '',
    }
});

const test = async () => {
    try {
        console.log("JINACHAT: ", await jinaai.generate('What is the meaning of life?'))
        console.log("OPENAI: ", await jinaai.generate2('What is the meaning of life?'))
    } catch (e: any) {
        console.log('ERROR:', e);
    }
};

test();
