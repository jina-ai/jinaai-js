import { BestBannerOutput } from '../../src/clients/BestBannerClient';
import { JinaChatOutput } from '../../src/clients/JinaChatClient';
import { PromptPerfectOutput } from '../../src/clients/PromptPerfectClient';
import { RationaleOutput } from '../../src/clients/RationaleClient';
import { SceneXOutput } from '../../src/clients/SceneXClient';
import JinaAI from '../../src/jinaai';

// THIS TEST USES REAL CREDITS

describe('Jina SDK fridge example tests', () => {

    const jinaai = new JinaAI({
        secrets: {
            'promptperfect-secret': process.env.PROMPTPERFECT_SECRET || '',
            'scenex-secret': process.env.SCENEX_SECRET || '',
            'rationale-secret': process.env.RATIONALE_SECRET || '',
            'jinachat-secret': process.env.JINACHAT_SECRET || '',
            'bestbanner-secret': process.env.BESTBANNER_SECRET || '',
        }
    });

    const fridge = ['fridge-1.png']
        .map(i => jinaai.utils.imageToBase64(`./examples/images/${i}`));

    let descriptions: SceneXOutput | null = null;
    let prompt: PromptPerfectOutput | null = null;
    let recipe: JinaChatOutput | null = null;
    let swot: RationaleOutput | null = null;
    let banners: BestBannerOutput | null = null;
    
    it('SceneX: get a description of the fridge content', async () => {
        descriptions = await jinaai.describe(
            fridge,
            { question: 'What ingredients are in the fridge?', languages: ['en'] }
        );
        console.log('DESCRIPTION:\n', descriptions.results[0].output, '\n');
        expect(descriptions.results).toBeTruthy();
        expect(descriptions.results.length).toBe(1);
        expect(descriptions.results[0].output.length > 0).toBeTruthy();
    });

    it('PromptPerfect: get an optmised prompt', async () => {
        expect(descriptions).toBeTruthy();
        prompt = await jinaai.optimize([
            'Give me one recipe based on this list for ingredients',
            ...descriptions!.results.map(desc => 'INGREDIENTS:\n' + desc.output),
        ].join('\n'));
        console.log('PROMPT:\n', prompt.results[0].output, '\n');
        expect(prompt.results).toBeTruthy();
        expect(prompt.results.length).toBe(1);
        expect(prompt.results[0].output.length > 0).toBeTruthy();
    });

    it('JinaChat: get a recipe based on the descriptions', async () => {
        expect(prompt).toBeTruthy();
        recipe = await jinaai.generate(prompt!.results[0].output);
        console.log('RECIPE: \n', recipe.output);
        expect(recipe.output).toBeTruthy();
        expect(recipe.output.length > 0).toBeTruthy();
        expect(recipe.chatId).toBeTruthy();
    });

    it('Rationale: get a swot analysis of the recipe', async () => {
        expect(recipe).toBeTruthy();
        swot = await jinaai.decide(
            recipe!.output,
            { analysis: 'swot' }
        );
        console.log('SWOT: \n', swot.results[0].swot);
        expect(swot.results).toBeTruthy();
        expect(swot.results.length).toBe(1);
        expect(swot.results[0].swot).toBeTruthy();
    });

    it('BestBanner: get a banner for the recipe', async () => {
        expect(recipe).toBeTruthy();
        banners = await jinaai.imagine(recipe!.output);
        console.log('BANNERS: \n', banners.results);
        expect(banners.results).toBeTruthy();
        expect(banners.results.length).toBe(1);
        expect(banners.results[0].output.length).toBe(4);
    });

});

