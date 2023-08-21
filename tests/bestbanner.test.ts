import HTTPClientMock from './mock/HTTPClient.mock';
import JinaAI from '../src/jinaai';

jest.mock('../src/clients/HTTPClient', () => ({
    __esModule: true,
    default: HTTPClientMock,
}));

describe('Jina SDK BestBanner tests', () => {

    const jinaai = new JinaAI({
        secrets: {
            'promptperfect-secret': 'some-fake-secret',
            'scenex-secret': 'some-fake-secret',
            'rationale-secret': 'some-fake-secret',
            'jinachat-secret': 'some-fake-secret',
            'bestbanner-secret': 'some-fake-secret',
        }
    });

    it('BestBanner: Default BestBanner API input', async () => {
        const input = [
            'In todays fast-paced environment, increasing productivity ...',
            'When you have two days to finish a task ...'
        ];
        const r1 = await jinaai.imagine({
            data: input.map(i => ({
                text: i,
                bannerCount: 4
            })),
        });
        expect(r1.results).toBeTruthy();
        expect(r1.results.length).toBe(2);
        expect(r1.results[0].output.length).toBe(4);
        expect(r1.results[1].output.length).toBe(4);
    });

    it('BestBanner: Text as input', async () => {
        const input = 'In todays fast-paced environment, increasing productivity ...';
        const r1 = await jinaai.imagine(input);
        expect(r1.results).toBeTruthy();
        expect(r1.results.length).toBe(1);
        expect(r1.results[0].output.length).toBe(4);
        const r2 = await jinaai.imagine(input, {
            style: 'flat',
        });
        expect(r2.results).toBeTruthy();
        expect(r2.results.length).toBe(1);
        expect(r2.results[0].output.length).toBe(4);
    });

    it('BestBanner: Array of text as input', async () => {
        const input = [
            'In todays fast-paced environment, increasing productivity ...',
            'When you have two days to finish a task ...'
        ];
        const r1 = await jinaai.imagine(input);
        expect(r1.results).toBeTruthy();
        expect(r1.results.length).toBe(2);
        expect(r1.results[0].output.length).toBe(4);
        expect(r1.results[1].output.length).toBe(4);
        const r2 = await jinaai.imagine(input, {
            style: 'minimalist',
        });
        expect(r2.results).toBeTruthy();
        expect(r2.results.length).toBe(2);
        expect(r2.results[0].output.length).toBe(4);
        expect(r2.results[1].output.length).toBe(4);
    });

    it('BestBanner: Raw output', async () => {
        const input = [
            'In todays fast-paced environment, increasing productivity ...',
            'When you have two days to finish a task ...'
        ];
        const r1 = await jinaai.imagine(input, { raw: true });
        expect(r1.raw!.result).toBeTruthy();
        expect(r1.raw!.result.length).toBe(2);
        expect(r1.raw!.result[0].text).toBe(input[0]);
        expect(r1.raw!.result[1].text).toBe(input[1]);
        expect(r1.raw!.result[0].banners.length).toBe(4);
        expect(r1.raw!.result[1].banners.length).toBe(4);
        const r2 = await jinaai.imagine(input, {
            style: 'photographic',
            raw: true
        });
        expect(r2.raw!.result).toBeTruthy();
        expect(r2.raw!.result.length).toBe(2);
        expect(r2.raw!.result[0].text).toBe(input[0]);
        expect(r2.raw!.result[1].text).toBe(input[1]);
        expect(r2.raw!.result[0].banners.length).toBe(4);
        expect(r2.raw!.result[1].banners.length).toBe(4);
    });

});
