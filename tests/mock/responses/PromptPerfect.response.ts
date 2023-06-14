/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import { PromptPerfectRawInput, PromptPerfectRawOutput } from '../../../src/clients/PromptPerfectClient';

export default (input: PromptPerfectRawInput): PromptPerfectRawOutput => {
    return {
        result: input.data.map((e, i) => ({
            prompt: e.prompt || e.imagePrompt || '',
            imagePrompt: e.imagePrompt || null,
            targetModel: e.targetModel,
            features: e.features,
            iterations: e.iterations || 1,
            previewSettings: e.previewSettings || {},
            previewVariables: e.previewVariables || {},
            timeout: e.timeout || 20000,
            targetLanguage: e.target_language,
            promptOptimized: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ipsum est, et iaculis lacus tincidunt eget. Sed dictum diam ex, eget aliquam urna porta a.',
            credits: 1,
            language: e.target_language || 'en',
            intermediateResults: [{
                promptOptimized: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ipsum est, et iaculis lacus tincidunt eget. Sed dictum diam ex, eget aliquam urna porta a.',
                explain: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ipsum est, et iaculis lacus tincidunt eget. Sed dictum diam ex, eget aliquam urna porta a.',
            }],
            explain: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ipsum est, et iaculis lacus tincidunt eget. Sed dictum diam ex, eget aliquam urna porta a.',
            createdAt: (new Date()).getTime(),
            userId: 'zoyqq4zkwdZLiBgH0eyhx4fcN9b2',
            id: 'aaaaaaaaaaaaaaaaaaaaaaaaaaa' + i
        }))
    };
};
