/* eslint-disable max-len */
import { Languages } from '../shared-types';
import JinaClient from './JinaClient';

export type SceneXInput = {
    data: Array<{
        image: string,
        algorithm?: 'Aqua' | 'Bolt' | 'Comet' | 'Dune' | 'Ember' | 'Flash',
        features: Array<'high_quality' | 'question_answer'>,
        languages?: Array<Languages>,
        question?: string,
        style?: 'default' | 'concise' | 'prompt',
    }>
};

export type SceneXOptions = {
    algorithm?: 'Aqua' | 'Bolt' | 'Comet' | 'Dune' | 'Ember' | 'Flash',
    features?: Array<'high_quality' | 'question_answer'>,
    languages?: Array<Languages>,
    question?: string,
    style?: 'default' | 'concise' | 'prompt',
};

export type SceneXOutput = {
    result: Array<{
        id: string,
        image: string,
        features: Array<'high_quality' | 'question_answer'>,
        uid: string,
        algorithm: 'Aqua' | 'Bolt' | 'Comet' | 'Dune' | 'Ember' | 'Flash',
        text: string,
        userId: string,
        createdAt: Date,
        i18n: {
            [key: string]: string
        }
    }>
};

export default class SceneXClient extends JinaClient {
    constructor(headers?: Record<string, string>) {
        const baseURL = 'https://us-central1-causal-diffusion.cloudfunctions.net';
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };
        const mergedHeaders = { ...defaultHeaders, ...headers };
        super(baseURL, mergedHeaders);
    }

    public fromArray(input: Array<string>, options?: SceneXOptions): SceneXInput {
        return {
            data: input.map(i => ({
                image: i,
                features: [],
                ...options
            }))
        };
    }

    public fromString(input: string, options?: SceneXOptions): SceneXInput {
        return {
            data: [{
                image: input,
                features: [],
                ...options
            }]
        };
    }

    public isOutput(obj: any): obj is SceneXOutput {
        return typeof obj === 'object' &&
            obj.result &&
            obj.result.every((x: any) => x.image && x.text);
    }

    public async describe(data: SceneXInput) {
        return await this.post<SceneXOutput>('/describe', data);
    }
}

/*
{
    data: [
        { image: 'https://picsum.photos/200', features: [] },
        { image: 'https://cdn.discordapp.com/attachments/1083723388712919182/1089909178266558554/HannaD_A_captivating_digital_artwork_features_a_red-haired_girl_664d73dc-b537-490e-b044-4fbf22733559.png', features: [] },
    ]
}
*/

/*
{
    "result": [
        {
            "id": "hvGRTFsrbbzIJESw9s1w",
            "image": "https://storage.googleapis.com/causal-diffusion.appspot.com/imagePrompts%2F4f478ecc-aef5-43a0-af18-eb828844e99e%2Foriginal.png",
            "features": [],
            "uid": "kpOfs45ZcNcgRaGe2KDkK0v7qpV2",
            "algorithm": "Dune",
            "text": "In a broad open meadow, an array of fieldstones dot the grass, basking in the sunlight that filters through a cloud-filled sky. A massive boulder commands the center of attention from atop an elevated mound, surrounded by blades of waving grass. One rock in particular is perched on the edge of a small puddle, reflecting the puffy clouds overhead. Water inside an aquarium is visible in the background, housing another large rock prominently displayed in the center. The picture suggests the presence of a rock garden, placed in the midst of a sprawling field on a clear day.",
            "userId": "kpOfs45ZcNcgRaGe2KDkK0v7qpV2",
            "createdAt": 1685537480734,
            "i18n": {
                "en": "In a broad open meadow, an array of fieldstones dot the grass, basking in the sunlight that filters through a cloud-filled sky. A massive boulder commands the center of attention from atop an elevated mound, surrounded by blades of waving grass. One rock in particular is perched on the edge of a small puddle, reflecting the puffy clouds overhead. Water inside an aquarium is visible in the background, housing another large rock prominently displayed in the center. The picture suggests the presence of a rock garden, placed in the midst of a sprawling field on a clear day."
            }
        },
        {
            "id": "bbyHkTJIskKaOw5DLBY7",
            "image": "https://storage.googleapis.com/causal-diffusion.appspot.com/imagePrompts%2F840e0bd5-f901-4d20-95dc-bce23c6dba79%2Foriginal.png",
            "features": [],
            "uid": "kpOfs45ZcNcgRaGe2KDkK0v7qpV2",
            "algorithm": "Dune",
            "text": "The image depicts a woman wearing a headdress made of leaves, which cover her head and face, leaving only her striking red hair visible. The woman is the central focus of the image. Meanwhile, in the foreground, a close-up of a cow's face is shown, with particular attention paid to its dark eyes and small ears. Overall, the image seems to suggest an inherent connection between the woman and the natural world around her, as symbolized by the leaves.",
            "userId": "kpOfs45ZcNcgRaGe2KDkK0v7qpV2",
            "createdAt": 1685537489937,
            "i18n": {
                "en": "The image depicts a woman wearing a headdress made of leaves, which cover her head and face, leaving only her striking red hair visible. The woman is the central focus of the image. Meanwhile, in the foreground, a close-up of a cow's face is shown, with particular attention paid to its dark eyes and small ears. Overall, the image seems to suggest an inherent connection between the woman and the natural world around her, as symbolized by the leaves."
            }
        }
    ]
}
*/