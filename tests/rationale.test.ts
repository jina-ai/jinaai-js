import JinaClientMock from './mock/JinaClient.mock';
import jinaai from '../src/jinaai';
import {
    RationaleMultichoiceOutput,
    RationaleProsConsOutput,
    RationaleSWOTOutput
} from '../src/clients/RationaleClient';

jest.mock('../src/clients/JinaClient', () => ({
    __esModule: true,
    default: JinaClientMock,
}));

describe('Jina SDK Rationale tests', () => {

    beforeAll(() => {
        jinaai.configure({
            'promptperfect-token': 'some-fake-token',
            'scenex-token': 'some-fake-token',
            'rationale-token': 'some-fake-token'
        });
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
        expect(r1.result).toBeTruthy();
        expect(r1.result.result).toBeTruthy();
        expect(r1.result.result.length).toBe(1);
        expect(r1.result.result[0].decision).toBe(input[0]);
        expect(r1.result.result[0].writingStyle).toBe('concise');
        expect(r1.result.result[0].analysis).toBe('swot');
        const r1KeyResults = r1.result.result[0].keyResults as RationaleSWOTOutput;
        expect(r1KeyResults.strengths).toBeTruthy();
        expect(r1KeyResults.weaknesses).toBeTruthy();
        expect(r1KeyResults.opportunities).toBeTruthy();
        expect(r1KeyResults.threats).toBeTruthy();
    });

    it('Rationale: Text as input', async () => {
        const input = 'Going to Paris this summer';
        const r1 = await jinaai.decide(input);
        expect(r1.result).toBeTruthy();
        expect(r1.result.result).toBeTruthy();
        expect(r1.result.result.length).toBe(1);
        expect(r1.result.result[0].decision).toBe(input);
        expect(r1.result.result[0].writingStyle).toBe('concise');
        expect(r1.result.result[0].analysis).toBe('proscons');
        const r1KeyResults = r1.result.result[0].keyResults as RationaleProsConsOutput;
        expect(r1KeyResults.pros).toBeTruthy();
        expect(r1KeyResults.cons).toBeTruthy();
        const r2 = await jinaai.decide(input, {
            analysis: 'multichoice',
            style: 'genZ'
        });
        expect(r2.result).toBeTruthy();
        expect(r2.result.result).toBeTruthy();
        expect(r2.result.result.length).toBe(1);
        expect(r2.result.result[0].decision).toBe(input);
        expect(r2.result.result[0].writingStyle).toBe('genZ');
        expect(r2.result.result[0].analysis).toBe('multichoice');
        const r2KeyResults = r2.result.result[0].keyResults as RationaleMultichoiceOutput;
        expect(Object.keys(r2KeyResults).length).toBe(3);
    });

    it('Rationale: Array of text as input', async () => {
        const input = ['Going to Paris this summer', 'Going to Beijing this winter'];
        const r1 = await jinaai.decide(input);
        expect(r1.result).toBeTruthy();
        expect(r1.result.result).toBeTruthy();
        expect(r1.result.result.length).toBe(2);
        expect(r1.result.result[0].decision).toBe(input[0]);
        expect(r1.result.result[1].decision).toBe(input[1]);
        expect(r1.result.result[0].writingStyle).toBe('concise');
        expect(r1.result.result[1].writingStyle).toBe('concise');
        expect(r1.result.result[0].analysis).toBe('proscons');
        expect(r1.result.result[1].analysis).toBe('proscons');
        const r1KeyResults1 = r1.result.result[0].keyResults as RationaleProsConsOutput;
        expect(r1KeyResults1.pros).toBeTruthy();
        expect(r1KeyResults1.cons).toBeTruthy();
        const r1KeyResults2 = r1.result.result[1].keyResults as RationaleProsConsOutput;
        expect(r1KeyResults2.pros).toBeTruthy();
        expect(r1KeyResults2.cons).toBeTruthy();
        const r2 = await jinaai.decide(input, {
            analysis: 'multichoice',
            style: 'genZ'
        });
        expect(r2.result).toBeTruthy();
        expect(r2.result.result).toBeTruthy();
        expect(r2.result.result.length).toBe(2);
        expect(r2.result.result[0].decision).toBe(input[0]);
        expect(r2.result.result[1].decision).toBe(input[1]);
        expect(r2.result.result[0].writingStyle).toBe('genZ');
        expect(r2.result.result[1].writingStyle).toBe('genZ');
        expect(r2.result.result[0].analysis).toBe('multichoice');
        expect(r2.result.result[1].analysis).toBe('multichoice');
        const r2KeyResults1 = r2.result.result[0].keyResults as RationaleMultichoiceOutput;
        expect(Object.keys(r2KeyResults1).length).toBe(3);
        const r2KeyResults2 = r2.result.result[1].keyResults as RationaleMultichoiceOutput;
        expect(Object.keys(r2KeyResults2).length).toBe(3);
    });

    it('Rationale: SceneX output as input', async () => {
        const input = await jinaai.describe('https://picsum.photos/200', { languages: ['fr'] });
        const r1 = await jinaai.decide(input);
        expect(r1.result).toBeTruthy();
        expect(r1.result.result).toBeTruthy();
        expect(r1.result.result.length).toBe(1);
        expect(r1.result.result[0].decision).toBe(input.result[0].text);
        expect(r1.result.result[0].writingStyle).toBe('concise');
        expect(r1.result.result[0].analysis).toBe('proscons');
        const r1KeyResults = r1.result.result[0].keyResults as RationaleProsConsOutput;
        expect(r1KeyResults.pros).toBeTruthy();
        expect(r1KeyResults.cons).toBeTruthy();
    });

    it('Rationale: PromptPerfect output as input', async () => {
        const input = await jinaai.optimize('Give me an Hello World function in Typescript', { target_language: 'fr' });
        const r1 = await jinaai.decide(input);
        expect(r1.result).toBeTruthy();
        expect(r1.result.result).toBeTruthy();
        expect(r1.result.result.length).toBe(1);
        expect(r1.result.result[0].decision).toBe(input.result[0].promptOptimized);
        expect(r1.result.result[0].writingStyle).toBe('concise');
        expect(r1.result.result[0].analysis).toBe('proscons');
        const r1KeyResults = r1.result.result[0].keyResults as RationaleProsConsOutput;
        expect(r1KeyResults.pros).toBeTruthy();
        expect(r1KeyResults.cons).toBeTruthy();
    });

});
