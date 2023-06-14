import HTTPClientMock from './mock/HTTPClient.mock';
import JinaAI from '../src/jinaai';

jest.mock('../src/clients/HTTPClient', () => ({
    __esModule: true,
    default: HTTPClientMock,
}));

describe('Jina SDK authentication tests', () => {

    it('Auth Error: no token', async () => {
        const jinaai = new JinaAI()
        try {
            const r = await jinaai.describe('https://picsum.photos/200');
            expect(true).toBe(false);
        } catch (error) {
            expect(error).toEqual({
                message: 'No token provided',
                status: 'UNAUTHENTICATED',
            });
        }
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
        expect(r.results[0].output).toBeTruthy();
    });

});
