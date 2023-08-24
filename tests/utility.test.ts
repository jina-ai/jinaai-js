import { HTTPClient } from './mock/HTTPClient.mock';
import JinaAI from '../src/jinaai';

jest.mock('../src/clients/HTTPClient', () => ({
    __esModule: true,
    HTTPClient: HTTPClient,
}));

describe('Jina SDK utility tests', () => {

    const jinaai = new JinaAI();

    const imageFile = 'examples/images/factory-1.png';
    const imageUrl = 'https://picsum.photos/200';

    it('Utility isUrl', async () => {
        expect(jinaai.utils.isUrl(imageFile)).toBeFalsy();
        expect(jinaai.utils.isUrl(imageUrl)).toBeTruthy();
    });

    it('Utility isBase64', async () => {
        expect(jinaai.utils.isBase64(imageFile)).toBeFalsy();
        expect(jinaai.utils.isBase64(imageUrl)).toBeFalsy();
    });

});
