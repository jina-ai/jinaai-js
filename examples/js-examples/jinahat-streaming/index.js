const JinaAI = require('jinaai')

const jinaai = new JinaAI({
    secrets: {
        'jinachat-secret': process.env.JINACHAT_SECRET || '',
    }
});

const run = async () => {
    const stream = await jinaai.generate('What could I do with this?', { image: 'https://picsum.photos/200', stream: true });
    console.log('STREAM: ', stream);
    const decoder = new TextDecoder();
    let loopCounter = 0;
    while (true) {
        const { done, value } = await stream.read();
        if (done) break;
        console.log('CHUNK: ', decoder.decode(value));
        loopCounter++;
    }
}

run()

