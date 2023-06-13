import HTTPClientMock from './mock/HTTPClient.mock';
import JinaAI from '../src/jinaai';

jest.mock('../src/clients/HTTPClient', () => ({
    __esModule: true,
    default: HTTPClientMock,
}));

describe('Jina SDK authentication tests', () => {

    it('Auth Error: no token', async () => {
        const jinaai = new JinaAI()
        const r = await jinaai.describe('https://picsum.photos/200');
        expect(r.result).toBeFalsy();
        expect(r).toEqual({
            error: {
                message: 'No token provided',
                status: 'UNAUTHENTICATED',
            }
        });
    });

    it('Auth Success: token provided', async () => {
        const jinaai = new JinaAI({
            tokens: {
                'promptperfect-token': 'some-fake-token',
                'scenex-token': 'some-fake-token',
                'rationale-token': 'some-fake-token',
                'chatcat-token': 'some-fake-token',
            }
        })
        const r = await jinaai.describe('https://picsum.photos/200');
        expect(r.result).toBeTruthy();
    });

});
