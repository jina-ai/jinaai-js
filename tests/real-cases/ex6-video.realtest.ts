import JinaAI from '../../src/jinaai';

// THIS TEST USES REAL CREDITS

describe('Jina SDK story example tests', () => {

    const jinaai = new JinaAI({
        secrets: {
            'scenex-secret': process.env.SCENEX_SECRET || '',
        }
    });
    
    it('SceneX: generate story from fridge image', async () => {
        const descriptions = await jinaai.describe(
            'https://guillaume-public.s3.us-east-2.amazonaws.com/videos/superman.mp4',
            {
                algorithm: 'Inception',
                languages: ['en'],
                reportProgress: (videoIndex, progress) => {
                    console.log(`video #${videoIndex}: ${progress}`);
                }
            }
        );
        expect(descriptions.results[0].output.length > 0).toBeTruthy();
        expect(descriptions.results[0].i18n.en).toBeTruthy();
        expect(descriptions.results[0].i18n.en.summary).toBeTruthy();
        expect(descriptions.results[0].i18n.en.events.length > 0).toBeTruthy();
        console.log('SUMMARY: ', descriptions.results[0].i18n.en.summary);
        console.log('EVENTS: ', descriptions.results[0].i18n.en.events);
    }, 30 * 60 * 1000); // 30 min timeout

});

