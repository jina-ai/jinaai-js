/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-len */
const JinaAI = require('jinaai');

const jinaai = new JinaAI({
    secrets: {
        'scenex-secret': process.env.SCENEX_SECRET || '',
    }
});

const run = async () => {
    try {
        const desc = await jinaai.describe('https://picsum.photos/200', { callback_url: 'http://3.145.60.233:3000/webhook' });
        console.log('DESC: ', desc);
    } catch (e) {
        console.log('ERROR:', e);
    }
};

run();
