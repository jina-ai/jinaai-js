import HTTPClientMock from './mock/HTTPClient.mock';
import JinaAI from '../src/jinaai';

jest.mock('../src/clients/HTTPClient', () => ({
    __esModule: true,
    default: HTTPClientMock,
}));

describe('Jina SDK utility tests', () => {

    const jinaai = new JinaAI();

    const imageFile = 'examples/images/factory-1.png';
    const imageUrl = 'https://picsum.photos/200';
    const imageB64 = jinaai.utils.imageToBase64(imageFile);

    it('Utility isUrl', async () => {
        expect(jinaai.utils.isUrl(imageFile)).toBeFalsy();
        expect(jinaai.utils.isUrl(imageUrl)).toBeTruthy();
        expect(jinaai.utils.isUrl(imageB64)).toBeFalsy();
    });

    it('Utility isBase64', async () => {
        expect(jinaai.utils.isBase64(imageFile)).toBeFalsy();
        expect(jinaai.utils.isBase64(imageUrl)).toBeFalsy();
        expect(jinaai.utils.isBase64(imageB64)).toBeTruthy();
    });

    it('Utility imageToBase64', async () => {
        expect(jinaai.utils.isBase64(imageB64)).toBeTruthy();
    });

});
