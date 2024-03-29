import { BestBannerOutput } from '../../src/clients/BestBannerClient';
import { JinaChatOutput } from '../../src/clients/JinaChatClient';
import { RationaleOutput } from '../../src/clients/RationaleClient';
import { SceneXOutput } from '../../src/clients/SceneXClient';
import JinaAI from '../../src/jinaai';
import { imageToBase64 } from '../utils';

// THIS TEST USES REAL CREDITS

describe('Jina SDK factory example tests', () => {

    const jinaai = new JinaAI({
        secrets: {
            'promptperfect-secret': process.env.PROMPTPERFECT_SECRET || '',
            'scenex-secret': process.env.SCENEX_SECRET || '',
            'rationale-secret': process.env.RATIONALE_SECRET || '',
            'jinachat-secret': process.env.JINACHAT_SECRET || '',
            'bestbanner-secret': process.env.BESTBANNER_SECRET || '',
        }
    });

    const situations = ['factory-2.png', 'factory-3.png', 'factory-4.png',]
        .map(i => imageToBase64(`./examples/images/${i}`));

    let descriptions: SceneXOutput | null = null;
    let analysis: JinaChatOutput | null = null;
    let recommendation: JinaChatOutput | null = null;
    let swot: RationaleOutput | null = null;
    let banners: BestBannerOutput | null = null;
    
    it('SceneX: get a description of each situations', async () => {
        descriptions = await jinaai.describe(situations);
        expect(descriptions.results).toBeTruthy();
        expect(descriptions.results.length).toBe(3);
        descriptions.results.forEach((desc, i) => {
            expect(desc.output.length > 0).toBeTruthy();
            console.log('DESCRIPTION ' + (i + 1) + ':\n', desc.output, '\n');
        });
    });

    it('JinaChat: get an analysis based on those descriptions', async () => {
        expect(descriptions).toBeTruthy();
        analysis = await jinaai.generate([
            'Does any of those situations present a danger?',
            'Reply with [SITUATION_NUMBER] [YES] or [NO] and explain why',
            ...descriptions!.results.map((desc, i) => 'SITUATION ' + (i + 1) + ':\n' + desc.output),
        ].join('\n'));
        console.log('ANALYSIS: \n', analysis.output);
        expect(analysis.output).toBeTruthy();
        expect(analysis.output.length > 0).toBeTruthy();
        expect(analysis.chatId).toBeTruthy();
    });

    it('JinaChat: get a recommendation on the most urgent action to take', async () => {
        expect(descriptions).toBeTruthy();
        recommendation = await jinaai.generate([
            'According to those situations, what should be done first to make everything safer?',
            'I only want the most urgent situation',
            ...descriptions!.results.map((desc, i) => 'SITUATION ' + (i + 1) + ':\n' + desc.output),
        ].join('\n'));
        console.log('RECOMMENDATION: \n', recommendation.output);
        expect(recommendation.output).toBeTruthy();
        expect(recommendation.output.length > 0).toBeTruthy();
        expect(recommendation.chatId).toBeTruthy();
    });

    it('Rationale: get a swot analysis of the recommendation', async () => {
        expect(recommendation).toBeTruthy();
        swot = await jinaai.decide(
            recommendation!.output,
            { analysis: 'swot' }
        );
        console.log('SWOT: \n', swot.results[0].swot);
        expect(swot.results).toBeTruthy();
        expect(swot.results.length).toBe(1);
        expect(swot.results[0].swot).toBeTruthy();
    });

    it('BestBanner: get a banner for the report', async () => {
        expect(descriptions).toBeTruthy();
        banners = await jinaai.imagine(descriptions!.results[0].output);
        console.log('BANNERS: \n', banners.results);
        expect(banners.results).toBeTruthy();
        expect(banners.results.length).toBe(1);
        expect(banners.results[0].output.length).toBe(4);
    });

});

