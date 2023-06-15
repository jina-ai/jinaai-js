import HTTPClientMock from './mock/HTTPClient.mock';
import JinaAI from '../src/jinaai';
import {
    RationaleMultichoiceOutput,
    RationaleProsConsOutput,
} from '../src/clients/RationaleClient';

jest.mock('../src/clients/HTTPClient', () => ({
    __esModule: true,
    default: HTTPClientMock,
}));

describe('Jina SDK Rationale tests', () => {

    const jinaai = new JinaAI({
        tokens: {
            'promptperfect-token': 'some-fake-token',
            'scenex-token': 'some-fake-token',
            'rationale-token': 'some-fake-token',
            'chatcat-token': 'some-fake-token',
        }
    });

    it('Rationale: Default Rationale API input', async () => {
        const input = ['Going to Paris this summer'];
        const r1 = await jinaai.decide({
            data: input.map(i => ({
                decision: i,
                analysis: 'swot',
                style: 'concise'
            })),
        });
        expect(r1.results).toBeTruthy();
        expect(r1.results.length).toBe(1);
        expect(r1.results[0].proscons).toBeFalsy();
        expect(r1.results[0].swot).toBeTruthy();
        expect(r1.results[0].multichoice).toBeFalsy();
        expect(r1.results[0].outcomes).toBeFalsy();
        const r1KeyResults = r1.results[0].swot!;
        expect(r1KeyResults.strengths).toBeTruthy();
        expect(r1KeyResults.weaknesses).toBeTruthy();
        expect(r1KeyResults.opportunities).toBeTruthy();
        expect(r1KeyResults.threats).toBeTruthy();
    });

    it('Rationale: Text as input', async () => {
        const input = 'Going to Paris this summer';
        const r1 = await jinaai.decide(input);
        expect(r1.results).toBeTruthy();
        expect(r1.results.length).toBe(1);
        expect(r1.results[0].proscons).toBeTruthy();
        expect(r1.results[0].swot).toBeFalsy();
        expect(r1.results[0].multichoice).toBeFalsy();
        expect(r1.results[0].outcomes).toBeFalsy();
        const r1KeyResults = r1.results[0].proscons!;
        expect(r1KeyResults.pros).toBeTruthy();
        expect(r1KeyResults.cons).toBeTruthy();
        const r2 = await jinaai.decide(input, {
            analysis: 'multichoice',
            style: 'genZ'
        });
        expect(r2.results).toBeTruthy();
        expect(r2.results.length).toBe(1);
        expect(r2.results[0].proscons).toBeFalsy();
        expect(r2.results[0].swot).toBeFalsy();
        expect(r2.results[0].multichoice).toBeTruthy();
        expect(r2.results[0].outcomes).toBeFalsy();
        const r2KeyResults = r2.results[0].multichoice!;
        expect(Object.keys(r2KeyResults).length).toBe(3);
    });

    it('Rationale: Array of text as input', async () => {
        const input = ['Going to Paris this summer', 'Going to Beijing this winter'];
        const r1 = await jinaai.decide(input);
        expect(r1.results).toBeTruthy();
        expect(r1.results.length).toBe(2);
        expect(r1.results[0].proscons).toBeTruthy();
        expect(r1.results[0].swot).toBeFalsy();
        expect(r1.results[0].multichoice).toBeFalsy();
        expect(r1.results[0].outcomes).toBeFalsy();
        expect(r1.results[1].proscons).toBeTruthy();
        expect(r1.results[1].swot).toBeFalsy();
        expect(r1.results[1].multichoice).toBeFalsy();
        expect(r1.results[1].outcomes).toBeFalsy();
        const r1KeyResults1 = r1.results[0].proscons!;
        expect(r1KeyResults1.pros).toBeTruthy();
        expect(r1KeyResults1.cons).toBeTruthy();
        const r1KeyResults2 = r1.results[1].proscons!;
        expect(r1KeyResults2.pros).toBeTruthy();
        expect(r1KeyResults2.cons).toBeTruthy();
        const r2 = await jinaai.decide(input, {
            analysis: 'multichoice',
            style: 'genZ'
        });
        expect(r2.results).toBeTruthy();
        expect(r2.results.length).toBe(2);
        expect(r2.results[0].proscons).toBeFalsy();
        expect(r2.results[0].swot).toBeFalsy();
        expect(r2.results[0].multichoice).toBeTruthy();
        expect(r2.results[0].outcomes).toBeFalsy();
        expect(r2.results[1].proscons).toBeFalsy();
        expect(r2.results[1].swot).toBeFalsy();
        expect(r2.results[1].multichoice).toBeTruthy();
        expect(r2.results[1].outcomes).toBeFalsy();
        const r2KeyResults1 = r2.results[0].multichoice!;
        expect(Object.keys(r2KeyResults1).length).toBe(3);
        const r2KeyResults2 = r2.results[1].multichoice!;
        expect(Object.keys(r2KeyResults2).length).toBe(3);
    });

    it('Rationale: Raw output', async () => {
        const input = ['Going to Paris this summer', 'Going to Beijing this winter'];
        const r1 = await jinaai.decide(input, { raw: true });
        expect(r1.raw!.result).toBeTruthy();
        expect(r1.raw!.result.result).toBeTruthy();
        expect(r1.raw!.result.result.length).toBe(2);
        expect(r1.raw!.result.result[0].decision).toBe(input[0]);
        expect(r1.raw!.result.result[1].decision).toBe(input[1]);
        expect(r1.raw!.result.result[0].writingStyle).toBe('concise');
        expect(r1.raw!.result.result[1].writingStyle).toBe('concise');
        expect(r1.raw!.result.result[0].analysis).toBe('proscons');
        expect(r1.raw!.result.result[1].analysis).toBe('proscons');
        const r1KeyResults1 = r1.raw!.result.result[0].keyResults as RationaleProsConsOutput;
        expect(r1KeyResults1.pros).toBeTruthy();
        expect(r1KeyResults1.cons).toBeTruthy();
        const r1KeyResults2 = r1.raw!.result.result[1].keyResults as RationaleProsConsOutput;
        expect(r1KeyResults2.pros).toBeTruthy();
        expect(r1KeyResults2.cons).toBeTruthy();
        const r2 = await jinaai.decide(input, {
            analysis: 'multichoice',
            style: 'genZ',
            raw: true
        });
        expect(r2.raw!.result).toBeTruthy();
        expect(r2.raw!.result.result).toBeTruthy();
        expect(r2.raw!.result.result.length).toBe(2);
        expect(r2.raw!.result.result[0].decision).toBe(input[0]);
        expect(r2.raw!.result.result[1].decision).toBe(input[1]);
        expect(r2.raw!.result.result[0].writingStyle).toBe('genZ');
        expect(r2.raw!.result.result[1].writingStyle).toBe('genZ');
        expect(r2.raw!.result.result[0].analysis).toBe('multichoice');
        expect(r2.raw!.result.result[1].analysis).toBe('multichoice');
        const r2KeyResults1 = r2.raw!.result.result[0].keyResults as RationaleMultichoiceOutput;
        expect(Object.keys(r2KeyResults1).length).toBe(3);
        const r2KeyResults2 = r2.raw!.result.result[1].keyResults as RationaleMultichoiceOutput;
        expect(Object.keys(r2KeyResults2).length).toBe(3);
    });

});
