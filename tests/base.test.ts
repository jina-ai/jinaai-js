import JinaClientMock from './mock/JinaClient.mock';
import jinaai from '../src/jinaai';

jest.mock('../src/clients/JinaClient', () => ({
    __esModule: true,
    default: JinaClientMock,
}));

describe('Jina SDK base tests', () => {

    it('Auth Error: no token', async () => {
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
        jinaai.configure({
            'promptperfect-token': 'some-fake-token',
            'scenex-token': 'some-fake-token',
            'rationale-token': 'some-fake-token'
        });
        const r = await jinaai.describe('https://picsum.photos/200');
        expect(r.result).toBeTruthy();
    });

});
