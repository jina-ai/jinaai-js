/* eslint-disable max-len */
import JinaAI from '../../src/jinaai';

// THIS TEST USES REAL CREDITS

describe('Jina SDK mail example tests', () => {

    const jinaai = new JinaAI({
        secrets: {
            'jinachat-secret': process.env.JINACHAT_SECRET || '',
        }
    });

    it('JinaChat: write an email and get a direct response', async () => {
        const prompt = 'Compose a professional and courteous email to our valued customer, expressing sincere gratitude for their use of our products. Your email should convey appreciation and highlight specific reasons why their choice to utilize our products is valued and important. Please provide a warm and personalized message that makes the customer feel valued and appreciated. Additionally, be sure to include any relevant details or information about upcoming promotions, new products, or customer loyalty programs that may be of interest to the customer. Your email should be well-written, concise, and focused, while still conveying genuine gratitude and fostering a positive relationship with the customer.';
        const email = await jinaai.generate(prompt);
        console.log('EMAIL: ', email.output);
        expect(email.output).toBeTruthy();
        expect(email.output.length > 0).toBeTruthy();
        expect(email.chatId).toBeTruthy();
    });

    it('JinaChat: write an email and get a strean response', async () => {
        const prompt = 'Compose a professional and courteous email to our valued customer, expressing sincere gratitude for their use of our products. Your email should convey appreciation and highlight specific reasons why their choice to utilize our products is valued and important. Please provide a warm and personalized message that makes the customer feel valued and appreciated. Additionally, be sure to include any relevant details or information about upcoming promotions, new products, or customer loyalty programs that may be of interest to the customer. Your email should be well-written, concise, and focused, while still conveying genuine gratitude and fostering a positive relationship with the customer.';
        const stream = await jinaai.generate(prompt, { stream: true });
        console.log('STREAM: ', stream);
        const decoder = new TextDecoder();
        let loopCounter = 0;
        while (true) {
            const { done, value } = await stream.read();
            if (done) break;
            console.log('CHUNK: ', decoder.decode(value));
            loopCounter++;
        }
        expect(loopCounter > 1).toBeTruthy();
    });

});

