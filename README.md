# JinaAI JavaScript SDK

The JinaAI JavaScript SDK serves as an efficient conduit for incorporating Jina AI's suite of products — [SceneXplain](https://scenex.jina.ai/), [PromptPerfect](https://promptperfect.jina.ai/), [Rationale](https://rationale.jina.ai/), [BestBanner](https://bestbanner.jina.ai/), and [JinaChat](https://chat.jina.ai/) — into your JavaScript applications. It provides a potent interface to Jina AI's APIs, letting you craft and optimize prompts with ease, making it an indispensable tool for streamlined application development.

## Installing

### Package manager

Using npm:

```bash
$ npm install jinaai
```

Using Yarn:

```bash
$ yarn add jinaai
```

You can import the library using the `import` or `require` approach:

```javascript
import JinaAI from 'jinaai';
```

```javascript
const JinaAI = require('jinaai');
```

## API secrets

To generate an API secret, you need to authenticate on each respective platform's API tab:

- [SceneXplain API](https://scenex.jina.ai/api)
- [PromptPerfect API](https://promptperfect.jina.ai/api)
- [Rationale API](https://rationale.jina.ai/api)
- [JinaChat API](https://chat.jina.ai/api)
- [BestBanner API](https://bestbanner.jina.ai/api)

> **Note:** Each secret is product-specific and cannot be interchanged. If you're planning to use multiple products, you'll need to generate a separate secret for each.

## Example usage

Import the SDK and instantiate a new client with your authentication secret:

```typescript
import JinaAI from 'jinaai';

const jinaai = new JinaAI({ secrets: {
    'promptperfect-secret': 'XXXXXX',
    'scenex-secret': 'XXXXXX',
    'rationale-secret': 'XXXXXX',
    'jinachat-secret': 'XXXXXX',
    'bestbanner-secret': 'XXXXXX',
}});
```

Describe images:

```typescript
const descriptions = await jinaai.describe(
    'https://picsum.photos/200'
);
```

Evaluate situations:

```typescript
const decisions = await jinaai.decide(
    'Going to Paris this summer', 
    { analysis: 'proscons' }
);
```

Optimize prompts:

```typescript
const prompts = await jinaai.optimize(
    'Write an Hello World function in Typescript'
);
```

Generate complex answer:

```typescript
const output = await jinaai.generate(
    'Give me a recipe for a pizza with pineapple'
);
```

Create images from text:

```typescript
const output = await jinaai.imagine(
    'A controversial fusion of sweet pineapple and savory pizza.'
);
```

Use APIs together:

```typescript
const situations = [
    'factory-1.png',
    'factory-2.png',
    'factory-3.png',
    'factory-4.png',
].map(i => toBase64(i));

const descriptions = await jinaai.describe(situations);

const prompt1 = [
    'Do any of those situations present a danger?',
    'Reply with [YES] or [NO] and explain why',
    ...descriptions.results.map(desc => 'SITUATION: ' + desc.output),
];

const analysis = await jinaai.generate(
    prompt1.join('\n')
);

const prompt2 = [
    'What should be done first to make those situations safer?',
    'I only want the most urgent situation',
    ...descriptions.results.map(desc => 'SITUATION: ' + desc.output),
];

const recommendation = await jinaai.generate(propmt2.join('\n'));

const swot = await jinaai.decide(
    recommendation.output,
    { analysis: 'swot' }
);

const banners = await jinaai.imagine(
    descriptions!.results.map(d => d.output)
);
```


## Raw Output

You can retrieve the raw output of each APIs by passing `raw: true` in the options:

```typescript
const descriptions = await jinaai.describe(
    'https://picsum.photos/200',
    { raw: true }
);

console.log(descriptions.raw)
```

## API Documentation

- JinaAi.describe

```typescript
JinaAI.describe(
    input: string | string[],
    options?: SceneXOptions
): Promise<SceneXOutput>
```

```typescript
type SceneXOptions = {
    algorithm?: 'Aqua' | 'Bolt' | 'Comet' | 'Dune' | 'Ember' | 'Flash' | 'Glide' | 'Hearth',
    features?: Array<'high_quality' | 'question_answer' | 'tts' | 'opt-out'>,
    languages?: Array<Languages>,
    question?: string,
    style?: 'default' | 'concise' | 'prompt',
    output_length?: number | null
};
```

```typescript
type SceneXOutput = {
    results: Array<{
        output: string,
        i18n?: {
            [key: string]: string | SceneXStoryOutput
        },
        tts?: {
            [key: string]: string
        },
        ssml?: {
            [key: string]: string
        }
    }>
};
```

```typescript
// used when algorithm is set to 'Hearth' 
type SceneXStoryOutput = Array<{
    isNarrator: boolean,
    message: string,
    name: string
}>; 
```

- JinaAi.optimize

```typescript
JinaAI.optimize(
    input: string | string[],
    options?: PromptPerfectOptions
): Promise<PromptPerfectOutput> 
```

```typescript
type PromptPerfectOptions = {
    targetModel?: 'chatgpt' | 'gpt-4' | 'stablelm-tuned-alpha-7b' |
    'claude' | 'cogenerate' | 'text-davinci-003' | 'dalle' | 'sd' |
    'midjourney' | 'kandinsky' | 'lexica',
    features?: Array<
        'preview' | 'no_spam' | 'shorten' | 'bypass_ethics' |
        'same_language' | 'always_en' | 'high_quality' |
        'redo_original_image' | 'variable_subs' | 'template_run'
    >,
    iterations?: number,
    previewSettings?: {
        'temperature': number,
        'topP': number,
        'topK': number,
        'frequencyPenalty': number,
        'presencePenalty': number
    },
    previewVariables?: {
        [key: string]: string
    }
    timeout?: number,
    target_language?: Languages
};
```

```typescript
type PromptPerfectOutput = {
    results: Array<{
        output: string,
    }>
};
```

- JinaAI.decide

```typescript
JinaAi.decide(
    input: string | string[],
    options?: RationaleOptions
): Promise<RationaleOutput>
```

```typescript
type RationaleOptions = {
    analysis?: 'proscons' | 'swot' | 'multichoice' | 'outcomes',
    style?: 'concise' | 'professional' | 'humor' | 'sarcastic' | 'childish' | 'genZ',
    profileId?: string
};
```

```typescript
export type RationaleOutput = {
    results: Array<{
        proscons?: RationaleProsConsOutput,
        swot?: RationaleSWOTOutput,
        multichoice?: RationaleMultichoiceOutput,
        outcomes?: RationaleOutcomesOutput
    }>
};
```

```typescript
type RationaleProsConsOutput = {
    pros: {
        [key: string]: string
    },
    cons: {
        [key: string]: string
    },
    bestChoice: string,
    conclusion: string,
    confidenceScore: number
};
```

```typescript
type RationaleSWOTOutput = {
    strengths: {
        [key: string]: string
    },
    weaknesses: {
        [key: string]: string
    },
    opportunities: {
        [key: string]: string
    },
    threats: {
        [key: string]: string
    },
    bestChoice: string,
    conclusion: string,
    confidenceScore: number
};
```

```typescript
type RationaleMultichoiceOutput = {
    [key: string]: string
};
```

```typescript
type RationaleOutcomesOutput = Array<{
    children: RationaleOutcomesOutput,
    labal: string,
    sentiment: string
}>;
```

- JinaAI.generate

```typescript
JinaAi.generate(
    input: string | string[],
    options?: JinaChatOptions
): Promise<JinaChatOutput>
```

```typescript
type JinaChatOptions = {
    role?: 'user' | 'assistant'
    name?: string,
    chatId?: string,
    stream?: boolean,
    temperature?: number,
    top_p?: number,
    stop?: string | Array<string>,
    max_tokens?: number,
    presence_penalty?: number,
    frequency_penalty?: number,
    logit_bias?: { [key: string]: number },
    image?: string
};
```

```typescript
type JinaChatOutput = {
    output: string,
    chatId: string
};
```

- JinaAi.imagine

```typescript
JinaAI.imagine(
    input: string | string[],
    options?: BestBannerOptions
): Promise<BestBannerOutput>
```

```typescript
type BestBannerOptions = {
    style?: 'default' | 'photographic' | 'minimalist' | 'flat',
};
```

```typescript
type BestBannerOutput = {
    results: Array<{
        output: Array<string>,
    }>
};
```

- JinaAi.utils

```typescript
JinaAI.utils.imageToBase64(filePath: string): string
```

```typescript
JinaAI.utils.isUrl(str: string): boolean
```

```typescript
JinaAI.utils.isBase64(str: string): boolean
```
