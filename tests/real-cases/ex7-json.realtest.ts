import JinaAI from '../../src/jinaai';

// THIS TEST USES REAL CREDITS

describe('Jina SDK json example tests', () => {

    const jinaai = new JinaAI({
        secrets: {
            'scenex-secret': process.env.SCENEX_SECRET || '',
        }
    });
    
    it('SceneX: json output', async () => {
        const descriptions = await jinaai.describe(
            'https://picsum.photos/200',
            {
                algorithm: 'Jelly',
                languages: ['en'],
                json_schema: {
                    type: 'object',
                    properties: {
                        headcount:{
                            type: 'number',
                            description: 'How many people in this image'
                        },
                        location:{
                            type: 'string',
                            description: 'Short description of the location'
                        }
                    }
                }
            }
        );
        expect(descriptions.results[0].output.length > 0).toBeTruthy();
        expect(descriptions.results[0].i18n.en).toBeTruthy();
        expect(JSON.parse(descriptions.results[0].i18n.en)).toBeTruthy();
        console.log('JSON: ', JSON.parse(descriptions.results[0].i18n.en));
    }, 30 * 60 * 1000); // 30 min timeout

});

