/* eslint-disable max-len */
import JinaClient from './JinaClient';

export interface RationaleInput {
    data: {
        decision: string,
        analysis: string,
        [key: string]: any;
    }[]
}

export interface RationaleOutput {
    result: {
        result: {
            pros: string,
            cons: string,
            keyResultsBestChoice: string,
            keyResultsConclusion: string,
            [key: string]: any;
        }[]
    }
}

export default class RationaleClient extends JinaClient {
    constructor(headers?: Record<string, string>) {
        const baseURL = 'https://us-central1-rationale-ai.cloudfunctions.net';
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };
        const mergedHeaders = { ...defaultHeaders, ...headers };
        super(baseURL, mergedHeaders);
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