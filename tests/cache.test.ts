import HTTPClientMock from './mock/HTTPClient.mock';
import JinaAI from '../src/jinaai';

jest.mock('../src/clients/HTTPClient', () => ({
    __esModule: true,
    default: HTTPClientMock,
}));

describe('Jina SDK cache tests', () => {

    const input = 'https://picsum.photos/200';
    const sleep = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds));

    it('Cache Off', async () => {
        const jinaai = new JinaAI({
            tokens: {
                'promptperfect-token': 'some-fake-token',
                'scenex-token': 'some-fake-token',
                'rationale-token': 'some-fake-token',
                'jinachat-token': 'some-fake-token',
            },
            useCache: false
        });
        const r1 = await jinaai.describe(input, { raw: true });
        await sleep(1);
        const r2 = await jinaai.describe(input, { raw: true });
        expect(r1.raw!.result[0].createdAt == r2.raw?.result[0].createdAt).toBeFalsy();
    });

    it('Cache On', async () => {
        const jinaai = new JinaAI({
            tokens: {
                'promptperfect-token': 'some-fake-token',
                'scenex-token': 'some-fake-token',
                'rationale-token': 'some-fake-token',
                'jinachat-token': 'some-fake-token',
            },
            useCache: true
        });
        const r1 = await jinaai.describe(input, { raw: true });
        await sleep(1);
        const r2 = await jinaai.describe(input, { raw: true });
        expect(r1.raw!.result[0].createdAt == r2.raw?.result[0].createdAt).toBeTruthy();
    });

});
