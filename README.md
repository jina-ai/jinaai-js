# JinaAI

The JinaAI JavaScript SDK is a powerful tool that seamlessly integrates the capabilities of JinaAI's products, including SceneXplain, PromptPerfect, Rationale and JinaChat into JavaScript applications. This SDK acts as a robust wrapper around JinaAI's APIs, empowering users to create and optimize prompts effectively.

## Installing

### Package Manager

Using npm:
```bash
$ npm install jinaai
```

Using yarn:
```bash
$ yarn add jinaai
```

You can import the library using the import or require approach:

```javascript
import jinaai from 'jinaai';
```

```javascript
const jinaai = require('jinaai');
```

## API Tokens

Authenticate on each platforms and go on the API tab to generate an API token:
- https://scenex.jina.ai
- https://promptperfect.jina.ai
- https://rationale.jina.ai
- https://chat.jina.ai

## Example Usage

Import the SDK and instantiate a new client with your authentication tokens:
```typescript
import jinaai from 'jinaai';

const jinaai = new JinaAI({ tokens: {
    'promptperfect-token': 'XXXXXX',
    'scenex-token': 'XXXXXX',
    'rationale-token': 'XXXXXX',
    'chatcat-token': 'XXXXXX',
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

Use APIs together
```typescript
const input = [
    'factory-1.png',
    'factory-2.png',
    'factory-3.png',
    'factory-4.png',
]

const descriptions = await jinaai.describe(situations);

const prompt1 = [
    'Does any of those situations present a danger?',
    'Reply with [YES] or [NO] and explain why',
    ...descriptions.results.map(desc => 'SITUATION: ' + desc.output),
]

const analysis = await jinaai.generate(prompt1.join('\n'));

const prompt2 = [
    'What should be done first to make those situations safer?',
    'I only want the most urgent situation',
    ...descriptions.results.map(desc => 'SITUATION: ' + desc.output),
]

const recommendation = await jinaai.generate(propmt2.join('\n'));

const swot = await jinaai.decide(
    recommendation.output,
    { analysis: 'swot' }
);
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
    algorithm?: 'Aqua' | 'Bolt' | 'Comet' | 'Dune' | 'Ember' | 'Flash',
    features?: Array<'high_quality' | 'question_answer'>,
    languages?: Array<Languages>,
    question?: string,
    style?: 'default' | 'concise' | 'prompt',
};
```

```typescript
type SceneXOutput = {
    results: Array<{
        output: string,
    }>
};
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
    options?: ChatCatOptions
): Promise<ChatCatOutput>
```

```typescript
type ChatCatOptions = {
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
    logit_bias?: { [key: string]: number }
};
```

```typescript
type ChatCatOutput = {
    output: string,
    chatId: string
};
```
