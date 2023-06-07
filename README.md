# JinaAI

The JinaAI JavaScript SDK is a powerful tool that seamlessly integrates the capabilities of JinaAI's products, including SceneXplain, PromptPerfect, and Rationale, into JavaScript applications. This SDK acts as a robust wrapper around JinaAI's APIs, empowering users to create and optimize prompts effectively.

## Installing
---

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

### Cloning the repo

```bash
$ git clone https://github.com/jina-ai/jinaai-npm.git
```

```html
<script src="./jinaai/dist/jinaai.js"></script>
```

## API Tokens
---

Authenticate on each platforms and go on the API tab to generate an API token:
- https://scenex.jina.ai
- https://promptperfect.jina.ai
- https://rationale.jina.ai

## Example Usage
---

Import the SDK and authenticate:
```typescript
import jinaai from 'jinaai';

jinaai.configure({
    'promptperfect-token': 'XXXXXX',
    'scenex-token': 'XXXXXX',
    'rationale-token': 'XXXXXX',
});
```

Generate textual descriptions:
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
const optimizedPrompts = await jinaai.optimize(
    'Write an Hello World function in Typescript'
);
```

Chain APIs together
```typescript
const input = [
    'factory1.png',
    'factory2.png', 
    'factory3.png'
]

const decisions = await jinaai.decide(
    await jinaai.optimize(
        await jinaai.describe(
            input.map(i => toBase64(i)),
            { question: 'Is this situation safe?' }
        )
    ), 
    { analysis: 'swot' }
);
```

## API Documentation
---

- Configure

```typescript
configure: (
    params: Record<
        "scenex-token" | "promptperfect-token" | "rationale-token", 
        string
    >
) => void
```

- Describe

Options are discarded if the input is a SceneXInput object.
```typescript
describe: (
    input: string | string[] | SceneXInput,
    options?: SceneXOptions
) => Promise<SceneXOutput>
```

```typescript
type SceneXInput = {
    data: Array<{
        image: string,
        algorithm?: 'Aqua' | 'Bolt' | 'Comet' | 'Dune' | 'Ember' | 'Flash',
        features: Array<'high_quality' | 'question_answer'>,
        languages?: Array<Languages>,
        question?: string,
        style?: 'default' | 'concise' | 'prompt',
    }>
};
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
    result: Array<{
        id: string,
        image: string,
        features: Array<'high_quality' | 'question_answer'>,
        uid: string,
        algorithm: 'Aqua' | 'Bolt' | 'Comet' | 'Dune' | 'Ember' | 'Flash',
        text: string,
        userId: string,
        createdAt: number,
        i18n: {
            [key: string]: string
        }
    }>
};
```

- Optimize

Options are discarded if the input is a PromptPerfectInput object.
```typescript
optimize: (
    input: string | string[] | PromptPerfectInput | SceneXOutput,
    options?: PromptPerfectOptions
) => Promise<PromptPerfectOutput> 
```

```typescript
type PromptPerfectInput = {
    data: Array<{
        prompt?: string,
        imagePrompt?: string,
        targetModel: 'chatgpt' | 'gpt-4' | 'stablelm-tuned-alpha-7b' | 
        'claude' | 'cogenerate' | 'text-davinci-003' | 'dalle' | 'sd' | 
        'midjourney' | 'kandinsky' | 'lexica',
        features: Array<
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
        target_language?: Languages,
    }>
};
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
    target_language?: Languages,
};
```

```typescript
type PromptPerfectOutput {
    result: Array<{
        prompt: string,
        imagePrompt: string | null,
        targetModel: 'chatgpt' | 'gpt-4' | 'stablelm-tuned-alpha-7b' | 
        'claude' | 'cogenerate' | 'text-davinci-003' | 'dalle' | 'sd' | 
        'midjourney' | 'kandinsky' | 'lexica',
        features: Array<
            'preview' | 'no_spam' | 'shorten' | 'bypass_ethics' | 
            'same_language' | 'always_en' | 'high_quality' | 
            'redo_original_image' | 'variable_subs' | 'template_run'
        >,
        iterations: number,
        previewSettings: {
            'temperature'?: number,
            'topP'?: number,
            'topK'?: number,
            'frequencyPenalty'?: number,
            'presencePenalty'?: number
        },
        previewVariables: {
            [key: string]: string
        }
        timeout: number,
        targetLanguage?: Languages | null,
        promptOptimized: string,
        credits: number,
        language: Languages,
        intermediateResults: Array<{
            promptOptimized: string,
            explain: string,
        }>,
        explain: string,
        createdAt: number,
        userId: string,
        id: string
    }>
}
```

- Decide

Options are discarded if the input is a RationaleInput object.
```typescript
decide: (
    input: string | string[] | RationaleInput | SceneXOutput | PromptPerfectOutput,
    options?: RationaleOptions
) => Promise<RationaleOutput>
```

```typescript
type RationaleInput = {
    data: Array<{
        decision: string,
        analysis?: 'proscons' | 'swot' | 'multichoice' | 'outcomes',
        style?: 'concise' | 'professional' | 'humor' | 'sarcastic' | 'childish' | 'genZ',
        profileId?: string,
    }>
};
```

```typescript
type RationaleOptions = {
    analysis?: 'proscons' | 'swot' | 'multichoice' | 'outcomes',
    style?: 'concise' | 'professional' | 'humor' | 'sarcastic' | 'childish' | 'genZ',
    profileId?: string,
};
```

```typescript
type RationaleOutput = {
    result: {
        result: Array<{
            decision: string,
            decisionUserQuery: string,
            writingStyle: 'concise' | 'professional' | 'humor' | 'sarcastic' | 'childish' | 'genZ',
            hasUserProfile: Boolean,
            analysis: 'proscons' | 'swot' | 'multichoice' | 'outcomes',
            sourceLang: Languages,
            keyResults: RationaleProsConsOutput | RationaleSWOTOutput | 
            RationaleMultichoiceOutput | RationaleOutcomesOutput,
            keyResultsConclusion: string,
            keyResultsBestChoice: string,
            confidence: number,
            createdAt: number,
            profileId: string | null,
            isQuality: Boolean,
            nonGibberish: Boolean,
            id: string
        }>
    }
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


