import { HTTPClient } from './mock/HTTPClient.mock';
import JinaAI from '../src/jinaai';

jest.mock('../src/clients/HTTPClient', () => ({
    __esModule: true,
    HTTPClient: HTTPClient,
}));

describe('Jina SDK baseUrls tests', () => {

    it('Default urls', async () => {
        const jinaai = new JinaAI();
        expect(jinaai.PPClient.baseURL == 'https://api.promptperfect.jina.ai').toBeTruthy();
        expect(jinaai.SXClient.baseURL == 'https://api.scenex.jina.ai/v1').toBeTruthy();
        expect(jinaai.RAClient.baseURL == 'https://us-central1-rationale-ai.cloudfunctions.net').toBeTruthy();
        expect(jinaai.CCClient.baseURL == 'https://api.chat.jina.ai/v1/chat').toBeTruthy();
        expect(jinaai.BBClient.baseURL == 'https://api.bestbanner.jina.ai/v1').toBeTruthy();
    });

    it('Custom urls', async () => {
        const jinaai = new JinaAI({
            baseUrls: {
                promptperfect: 'https://promptperfect-customurl.jina.ai',
                scenex: 'https://scenex-customurl.jina.ai',
                rationale: 'https://rationale-customurl.jina.ai',
                jinachat: 'https://jinachat-customurl.jina.ai',
                bestbanner: 'https://bestbanner-customurl.jina.ai',
            }
        });
        expect(jinaai.PPClient.baseURL == 'https://promptperfect-customurl.jina.ai').toBeTruthy();
        expect(jinaai.SXClient.baseURL == 'https://scenex-customurl.jina.ai').toBeTruthy();
        expect(jinaai.RAClient.baseURL == 'https://rationale-customurl.jina.ai').toBeTruthy();
        expect(jinaai.CCClient.baseURL == 'https://jinachat-customurl.jina.ai').toBeTruthy();
        expect(jinaai.BBClient.baseURL == 'https://bestbanner-customurl.jina.ai').toBeTruthy();
    });

});
