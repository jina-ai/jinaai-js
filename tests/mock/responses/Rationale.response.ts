/* eslint-disable max-len */
import {
    RationaleRawInput,
    RationaleRawOutput,
    RationaleProsConsOutput,
    RationaleSWOTOutput,
    RationaleMultichoiceOutput,
    RationaleOutcomesOutput
} from '../../../src/clients/RationaleClient';

const ProsConsOutput: RationaleProsConsOutput = {
    pros: {
        'Lorem': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ipsum est, et iaculis lacus tincidunt eget. Sed dictum diam ex, eget aliquam urna porta a.'
    },
    cons: {
        'Ipsum': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ipsum est, et iaculis lacus tincidunt eget. Sed dictum diam ex, eget aliquam urna porta a.'
    },
    bestChoice: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ipsum est, et iaculis lacus tincidunt eget. Sed dictum diam ex, eget aliquam urna porta a.',
    conclusion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ipsum est, et iaculis lacus tincidunt eget. Sed dictum diam ex, eget aliquam urna porta a.',
    confidenceScore: 1
};

const SWOTOutput: RationaleSWOTOutput = {
    strengths: {
        'Lorem': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ipsum est, et iaculis lacus tincidunt eget. Sed dictum diam ex, eget aliquam urna porta a.'
    },
    weaknesses: {
        'Ipsum': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ipsum est, et iaculis lacus tincidunt eget. Sed dictum diam ex, eget aliquam urna porta a.'
    },
    opportunities: {
        'Dolor': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ipsum est, et iaculis lacus tincidunt eget. Sed dictum diam ex, eget aliquam urna porta a.'
    },
    threats: {
        'Sit': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ipsum est, et iaculis lacus tincidunt eget. Sed dictum diam ex, eget aliquam urna porta a.'
    },
    bestChoice: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ipsum est, et iaculis lacus tincidunt eget. Sed dictum diam ex, eget aliquam urna porta a.',
    conclusion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ipsum est, et iaculis lacus tincidunt eget. Sed dictum diam ex, eget aliquam urna porta a.',
    confidenceScore: 1
};

const MultichoiceOutput: RationaleMultichoiceOutput = {
    'Lorem': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ipsum est, et iaculis lacus tincidunt eget. Sed dictum diam ex, eget aliquam urna porta a.',
    'Ipsum': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ipsum est, et iaculis lacus tincidunt eget. Sed dictum diam ex, eget aliquam urna porta a.',
    'Dolor': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ipsum est, et iaculis lacus tincidunt eget. Sed dictum diam ex, eget aliquam urna porta a.'
};

const OutcomesOutput: RationaleOutcomesOutput = [{
    children: [],
    labal: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ipsum est, et iaculis lacus tincidunt eget. Sed dictum diam ex, eget aliquam urna porta a.',
    sentiment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ipsum est, et iaculis lacus tincidunt eget. Sed dictum diam ex, eget aliquam urna porta a.'
}];

export default (input: RationaleRawInput): RationaleRawOutput => {
    return {
        result: {
            result: input.data.map((e, i) => ({
                decision: e.decision,
                decisionUserQuery: e.decision,
                writingStyle: e.style || 'concise',
                hasUserProfile: false,
                analysis: e.analysis || 'proscons',
                sourceLang: 'en',
                keyResults: e.analysis ? ((x: string) => {
                    switch (x) {
                        case 'swot': return SWOTOutput;
                        case 'multichoice': return MultichoiceOutput;
                        case 'outcomes': return OutcomesOutput;
                        case 'proscons': return ProsConsOutput;
                        default: return ProsConsOutput;
                    }
                })(e.analysis) : ProsConsOutput,
                keyResultsConclusion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ipsum est, et iaculis lacus tincidunt eget. Sed dictum diam ex, eget aliquam urna porta a.',
                keyResultsBestChoice: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ipsum est, et iaculis lacus tincidunt eget. Sed dictum diam ex, eget aliquam urna porta a.',
                confidence: 1,
                createdAt: (new Date()).getTime(),
                profileId: null,
                isQuality: false,
                nonGibberish: false,
                id: 'aaaaaaaaaaaaaaaaaaaaaaaaaaa' + i
            }))
        }
    };
};