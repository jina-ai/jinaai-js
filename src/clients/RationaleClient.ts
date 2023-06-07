/* eslint-disable max-len */
import { Languages } from '../shared-types';
import JinaClient from './JinaClient';
import { PromptPerfectOutput } from './PromptPerfectClient';
import { SceneXOutput } from './SceneXClient';

export type RationaleInput = {
    data: Array<{
        decision: string,
        analysis?: 'proscons' | 'swot' | 'multichoice' | 'outcomes',
        style?: 'concise' | 'professional' | 'humor' | 'sarcastic' | 'childish' | 'genZ',
        profileId?: string,
    }>
};

export type RationaleOptions = {
    analysis?: 'proscons' | 'swot' | 'multichoice' | 'outcomes',
    style?: 'concise' | 'professional' | 'humor' | 'sarcastic' | 'childish' | 'genZ',
    profileId?: string,
};

export type RationaleProsConsOutput = {
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

export type RationaleSWOTOutput = {
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

export type RationaleMultichoiceOutput = {
    [key: string]: string
};

export type RationaleOutcomesOutput = Array<{
    children: RationaleOutcomesOutput,
    labal: string,
    sentiment: string
}>;

export type RationaleOutput = {
    result: {
        result: Array<{
            decision: string,
            decisionUserQuery: string,
            writingStyle: 'concise' | 'professional' | 'humor' | 'sarcastic' | 'childish' | 'genZ',
            hasUserProfile: Boolean,
            analysis: 'proscons' | 'swot' | 'multichoice' | 'outcomes',
            sourceLang: Languages,
            keyResults: RationaleProsConsOutput | RationaleSWOTOutput | RationaleMultichoiceOutput | RationaleOutcomesOutput,
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

export default class RationaleClient extends JinaClient {
    constructor(headers?: Record<string, string>) {
        const baseURL = 'https://us-central1-rationale-ai.cloudfunctions.net';
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };
        const mergedHeaders = { ...defaultHeaders, ...headers };
        super(baseURL, mergedHeaders);
    }

    public fromArray(input: Array<string>, options?: RationaleOptions): RationaleInput {
        return {
            data: input.map(i => ({
                decision: (i).substring(0, 300),
                ...options
            }))
        };
    }

    public fromString(input: string, options?: RationaleOptions): RationaleInput {
        return {
            data: [{
                decision: (input).substring(0, 300),
                ...options
            }]
        };
    }

    public fromSceneX(input: SceneXOutput, options?: RationaleOptions): RationaleInput {
        return {
            data: input.result.map(i => ({
                decision: (i.text).substring(0, 300),
                ...options
            }))
        };
    }

    public fromPromptPerfect(input: PromptPerfectOutput, options?: RationaleOptions): RationaleInput {
        return {
            data: input.result.map(i => ({
                decision: (i.promptOptimized).substring(0, 300),
                ...options
            }))
        };
    }

    public isOutput(obj: any): obj is RationaleOutput {
        return typeof obj === 'object' &&
            obj.result &&
            obj.result.result &&
            obj.result.result.every((x: any) => x.decision && x.keyResultsConclusion);
    }

    public async decide(data: RationaleInput) {
        return await this.post<RationaleOutput>('/analysisApi', data);
    }
}

/*
{
    data: [{
        decision: 'publish salary range of every job position inside the company',
        analysis: 'proscons',
        style: 'concise',
    }]
}
*/

/*
{
    "result": {
        "result": [
            {
                "decision": "I will publish the salary range of every job position inside the company.\n",
                "decisionUserQuery": "publish salary range of every job position inside the company",
                "writingStyle": "concise",
                "hasUserProfile": false,
                "analysis": "proscons",
                "sourceLang": "en",
                "keyResults": {
                    "pros": {
                        "Transparency": "Publishing the salary range of every job position inside the company promotes transparency, which could improve employee satisfaction and trust in the company.",
                        "Equal pay": "By making salary ranges public, employees can determine if they are being paid fairly in comparison to their colleagues with similar positions and qualifications, promoting equal pay and fairness.",
                        "Attract top talent": "Publicly sharing salary ranges could also attract top talent and demonstrate the company's commitment to equitable pay."
                    },
                    "cons": {
                        "Legal implications": "Publishing salary ranges could have legal implications, such as violating confidentiality agreements or exposing the company to potential lawsuits.",
                        "Loss of bargaining power": "By disclosing salary information, the company could lose bargaining power during salary negotiations with new or existing employees.",
                        "Negative impact on morale": "Some employees may perceive salary disclosure as invasive or unfair, leading to a negative impact on overall morale."
                    },
                    "bestChoice": "Consider alternative ways to promote transparency and equal pay",
                    "conclusion": "While promoting transparency and equal pay is important, publishing the salary range of every job position inside the company may not be the best approach, as it could lead to legal implications, loss of bargaining power, and a negative impact on morale. It may be better to consider alternative ways of promoting these values that do not compromise confidentiality or employee morale.",
                    "confidenceScore": 0.7
                },
                "keyResultsConclusion": "While promoting transparency and equal pay is important, publishing the salary range of every job position inside the company may not be the best approach, as it could lead to legal implications, loss of bargaining power, and a negative impact on morale. It may be better to consider alternative ways of promoting these values that do not compromise confidentiality or employee morale.",
                "keyResultsBestChoice": "Consider alternative ways to promote transparency and equal pay",
                "pros": {
                    "Transparency": "Publishing the salary range of every job position inside the company promotes transparency, which could improve employee satisfaction and trust in the company.",
                    "Equal pay": "By making salary ranges public, employees can determine if they are being paid fairly in comparison to their colleagues with similar positions and qualifications, promoting equal pay and fairness.",
                    "Attract top talent": "Publicly sharing salary ranges could also attract top talent and demonstrate the company's commitment to equitable pay."
                },
                "cons": {
                    "Legal implications": "Publishing salary ranges could have legal implications, such as violating confidentiality agreements or exposing the company to potential lawsuits.",
                    "Loss of bargaining power": "By disclosing salary information, the company could lose bargaining power during salary negotiations with new or existing employees.",
                    "Negative impact on morale": "Some employees may perceive salary disclosure as invasive or unfair, leading to a negative impact on overall morale."
                },
                "confidenceScore": 0.7,
                "confidence": 0,
                "createdAt": 1685537104396,
                "profileId": null,
                "isQuality": false,
                "nonGibberish": false,
                "id": "j8QNBwQRiDhWAei0X7VN"
            }
        ]
    }
}
*/

/*
{
    "result": [
        {
            "decision": "I will go for a walk in a volcano",
            "decisionUserQuery": "Going for a walk in a volcano",
            "writingStyle": null,
            "hasUserProfile": false,
            "analysis": "multichoice",
            "sourceLang": "en",
            "keyResults": {
                "Alignment with values": "Going for a walk in a volcano may align with your sense of adventure, but it could contradict your values of safety and responsibility.",
                "Practicality": "Going for a walk in a volcano is not a practical choice, as it could lead to severe injury or death. It is also likely impractical in terms of access and logistics.",
                "Long-term impact": "Going for a walk in a volcano could have long-term negative impacts on your health and well-being as well as the environment.",
                "Risk and ethical implications": "Going for a walk in a volcano could have significant risks and ethical implications. It could put yourself and others in danger, and could harm protected environments and wildlife.",
                "Potential consequences of not choosing it": "Not going for a walk in a volcano does not have any significant consequences, as there are plenty of other safe and enjoyable activities to pursue."
            },
            "keyResultsConclusion": "Based on the analysis of the option in the context of your backstory and values, not going for a walk in a volcano is the recommended choice. It prioritizes your values of safety and responsibility, while avoiding potential negative consequences for your health, the environment, and local communities. There are many other activities that provide adventure and enjoyment without risking harm.",
            "keyResultsBestChoice": "Not going for a walk in a volcano",
            "confidence": 0.9,
            "createdAt": 1685943538853,
            "profileId": null,
            "isQuality": false,
            "nonGibberish": false,
            "id": "1tuUNiZGLK9DyGMw7A7q"
        }
    ]
}
*/

/*
{
    "result": [
        {
            "decision": "I will go for a walk in a volcano",
            "decisionUserQuery": "Going for a walk in a volcano",
            "writingStyle": null,
            "hasUserProfile": false,
            "analysis": "swot",
            "sourceLang": "en",
            "keyResults": {
                "strengths": {
                    "Adventure": "Going for a walk in a volcano can provide an exciting and adventurous experience.",
                    "Unique Experience": "Going for a walk in a volcano is not a common activity and can provide a unique experience."
                },
                "weaknesses": {
                    "Risk of Injury or Death": "Walking in a volcano can be extremely dangerous and unpredictable, with the potential for injury or even death.",
                    "Environmental Impact": "Walking in a volcano can cause damage to the environment and ecosystem.",
                    "Legal Consequences": "Walking in a restricted area or without permission can result in legal consequences and fines."
                },
                "opportunities": {
                    "Learning Opportunity": "Walking in a volcano can provide the opportunity to learn about geology and the natural world.",
                    "Research": "Walking in a volcano can provide valuable research opportunities for scientists and researchers.",
                    "Travel Experience": "Walking in a volcano can be a unique travel experience and a chance to explore a new place."
                },
                "threats": {
                    "Public Safety": "Walking in a volcano can pose a threat to public safety and may require emergency services or rescue if something goes wrong.",
                    "Negative Publicity": "Walking in a volcano can attract negative attention and criticism due to the potential risk and environmental impact.",
                    "Financial Burden": "The cost of emergency services, rescue, and potential legal fees can be a significant financial burden."
                },
                "bestChoice": "Consider alternative, safer activities with similar benefits",
                "conclusion": "Walking in a volcano presents significant risks and potential negative consequences for both the individual and the environment. Considering alternative, safer activities with similar benefits would be the best choice in this decision.",
                "confidence": 0.8
            },
            "keyResultsConclusion": "Walking in a volcano presents significant risks and potential negative consequences for both the individual and the environment. Considering alternative, safer activities with similar benefits would be the best choice in this decision.",
            "keyResultsBestChoice": "Consider alternative, safer activities with similar benefits",
            "strengths": {
                "Adventure": "Going for a walk in a volcano can provide an exciting and adventurous experience.",
                "Unique Experience": "Going for a walk in a volcano is not a common activity and can provide a unique experience."
            },
            "weaknesses": {
                "Risk of Injury or Death": "Walking in a volcano can be extremely dangerous and unpredictable, with the potential for injury or even death.",
                "Environmental Impact": "Walking in a volcano can cause damage to the environment and ecosystem.",
                "Legal Consequences": "Walking in a restricted area or without permission can result in legal consequences and fines."
            },
            "opportunities": {
                "Learning Opportunity": "Walking in a volcano can provide the opportunity to learn about geology and the natural world.",
                "Research": "Walking in a volcano can provide valuable research opportunities for scientists and researchers.",
                "Travel Experience": "Walking in a volcano can be a unique travel experience and a chance to explore a new place."
            },
            "threats": {
                "Public Safety": "Walking in a volcano can pose a threat to public safety and may require emergency services or rescue if something goes wrong.",
                "Negative Publicity": "Walking in a volcano can attract negative attention and criticism due to the potential risk and environmental impact.",
                "Financial Burden": "The cost of emergency services, rescue, and potential legal fees can be a significant financial burden."
            },
            "confidence": 0.8,
            "createdAt": 1685943552616,
            "profileId": null,
            "isQuality": false,
            "nonGibberish": false,
            "id": "t5RgNI0YnVsE6TpGKNo6"
        }
    ]
}
*/

/*
{
    "result": [
        {
            "decision": "I went for a walk in a volcano.\n",
            "decisionUserQuery": "Going for a walk in a volcano",
            "writingStyle": null,
            "hasUserProfile": false,
            "analysis": "outcomes",
            "sourceLang": "en",
            "keyResults": [
                {
                    "children": [
                        {
                            "children": [
                                {
                                    "children": [],
                                    "label": "Your content goes viral and gains attention from all over the world",
                                    "sentiment": "P"
                                },
                                {
                                    "children": [],
                                    "label": "You become a respected adventure blogger",
                                    "sentiment": "P"
                                },
                                {
                                    "children": [],
                                    "label": "The experience leads to new travel opportunities and partnerships",
                                    "sentiment": "P"
                                }
                            ],
                            "label": "You capture stunning photos and videos of the experience",
                            "sentiment": "P"
                        },
                        {
                            "children": [
                                {
                                    "children": [],
                                    "label": "Your life is in danger and you experience fear and panic",
                                    "sentiment": "N"
                                },
                                {
                                    "children": [],
                                    "label": "You suffer from physical and emotional trauma",
                                    "sentiment": "N"
                                },
                                {
                                    "children": [],
                                    "label": "Your loved ones are frightened and worried",
                                    "sentiment": "N"
                                }
                            ],
                            "label": "The volcano erupts while you are inside",
                            "sentiment": "N"
                        },
                        {
                            "children": [
                                {
                                    "children": [],
                                    "label": "You are unable to complete the walk and feel disappointment",
                                    "sentiment": "N"
                                },
                                {
                                    "children": [],
                                    "label": "You must cancel any planned content and partnerships",
                                    "sentiment": "N"
                                },
                                {
                                    "children": [],
                                    "label": "Your reputation as an adventure blogger takes a hit",
                                    "sentiment": "N"
                                }
                            ],
                            "label": "The walk is unsuccessful due to unforeseen circumstance",
                            "sentiment": "N"
                        }
                    ],
                    "label": "The walk in the volcano is successful and memorable",
                    "sentiment": "P"
                },
                {
                    "children": [
                        {
                            "children": [
                                {
                                    "children": [],
                                    "label": "Your safety and intentions are questioned",
                                    "sentiment": "N"
                                },
                                {
                                    "children": [],
                                    "label": "You are accused of promoting risky behavior",
                                    "sentiment": "N"
                                },
                                {
                                    "children": [],
                                    "label": "Your reputation and career take a hit",
                                    "sentiment": "N"
                                }
                            ],
                            "label": "You face criticism and backlash from the public and media",
                            "sentiment": "N"
                        },
                        {
                            "children": [
                                {
                                    "children": [],
                                    "label": "You become a role model for adventure and exploration",
                                    "sentiment": "P"
                                },
                                {
                                    "children": [],
                                    "label": "Your content resonates with like-minded individuals and gains a new audience",
                                    "sentiment": "P"
                                },
                                {
                                    "children": [],
                                    "label": "The experience leads to sponsorships and partnerships with travel companies",
                                    "sentiment": "P"
                                }
                            ],
                            "label": "The walk is seen as inspirational and leads to new opportunities",
                            "sentiment": "P"
                        },
                        {
                            "children": [
                                {
                                    "children": [],
                                    "label": "The scientific community takes interest in your experience and insight",
                                    "sentiment": "P"
                                },
                                {
                                    "children": [],
                                    "label": "You become a spokesperson for volcano education and safety",
                                    "sentiment": "P"
                                },
                                {
                                    "children": [],
                                    "label": "Your content becomes informative and educational, with a positive impact on your audience",
                                    "sentiment": "P"
                                }
                            ],
                            "label": "The walk leads to a new discovery and advances in volcanic research",
                            "sentiment": "P"
                        }
                    ],
                    "label": "The walk in the volcano is deemed irresponsible and dangerous",
                    "sentiment": "N"
                },
                {
                    "children": [
                        {
                            "children": [
                                {
                                    "children": [],
                                    "label": "Your audience grows and becomes more diverse",
                                    "sentiment": "P"
                                },
                                {
                                    "children": [],
                                    "label": "Your reputation as a thought leader in adventure grows",
                                    "sentiment": "P"
                                },
                                {
                                    "children": [],
                                    "label": "The experience leads to unexpected career opportunities",
                                    "sentiment": "P"
                                }
                            ],
                            "label": "You are invited to speak at conferences and events about the experience",
                            "sentiment": "P"
                        },
                        {
                            "children": [
                                {
                                    "children": [],
                                    "label": "Your recovery and healing process becomes a topic of discussion among your followers",
                                    "sentiment": "U"
                                },
                                {
                                    "children": [],
                                    "label": "You lose income and opportunities while recovering",
                                    "sentiment": "N"
                                },
                                {
                                    "children": [],
                                    "label": "Your health becomes a priority and you must adjust your content accordingly",
                                    "sentiment": "U"
                                }
                            ],
                            "label": "The walk leads to an unexpected injury or illness",
                            "sentiment": "N"
                        },
                        {
                            "children": [
                                {
                                    "children": [],
                                    "label": "You become more introspective and redefine your priorities",
                                    "sentiment": "U"
                                },
                                {
                                    "children": [],
                                    "label": "Your content takes a new direction that resonates with your audience",
                                    "sentiment": "U"
                                },
                                {
                                    "children": [],
                                    "label": "You experience personal growth and fulfillment",
                                    "sentiment": "P"
                                }
                            ],
                            "label": "The walk becomes a turning point in your life and career",
                            "sentiment": "U"
                        }
                    ],
                    "label": "The walk in the volcano leads to unexpected consequences",
                    "sentiment": "U"
                }
            ],
            "keyResultsConclusion": "",
            "keyResultsBestChoice": "",
            "confidence": 0,
            "createdAt": 1685943573147,
            "profileId": null,
            "isQuality": false,
            "nonGibberish": false,
            "id": "xtGNFKipXtl5nwZG8B7G"
        }
    ]
}
*/