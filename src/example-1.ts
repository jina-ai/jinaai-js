/* eslint-disable max-len */
import jinaai from './jinaai';

const images = [
    'https://picsum.photos/200',
];

(async () => {

    jinaai.configure({
        'promptperfect-token': process.env.PROMPTPERFECT_TOKEN || '',
        'scenex-token': process.env.SCENEX_TOKEN || '',
        'rationale-token': process.env.RATIONALE_TOKEN || ''
    });

    const captions = (await jinaai.describe({
        data: images.map(v => ({ image: v })),
    })).result;

    console.log('CAPTIONS', JSON.stringify(captions, null, 4));

    const optimisedCaptions = (await jinaai.optimize({
        data: captions.map(v => ({
            prompt: v.text,
            targetModel: 'chatgpt',
            features: ['shorten'],
            iterations: 3
        })),
    })).result;

    console.log('OPTIMISED', JSON.stringify(optimisedCaptions, null, 4));

    const proscons = (await jinaai.decide({
        data: optimisedCaptions.map(v => ({
            decision: (v.promptOptimized).substring(0, 300),
            analysis: 'proscons',
        })),
    })).result;

    console.log('PROSCONS', JSON.stringify(proscons, null, 4));

})();

/*

CAPTIONS [
    {
        "id": "F13ZU1OjD51PgQB190VP",
        "image": "https://storage.googleapis.com/causal-diffusion.appspot.com/imagePrompts%2F20b7ca19-17fe-4597-81ef-a8da4c758a76%2Foriginal.png",
        "uid": "kpOfs45ZcNcgRaGe2KDkK0v7qpV2",
        "features": [],
        "algorithm": "Dune",
        "text": "A neat and organized workspace is depicted in the photograph. The main focus of the image is a simplistic desk made of wood, positioned front and center. Placed at the center of the desk lies a modern laptop, sleek and stylish alongside a picture of a horse. The desk is surrounded by an unoccupied wooden chair, ready to seat its occupant. The background is out of focus, blurred enough to direct attention to the desk and chair.",
        "userId": "kpOfs45ZcNcgRaGe2KDkK0v7qpV2",
        "createdAt": 1685615888922,
        "i18n": {
            "en": "A neat and organized workspace is depicted in the photograph. The main focus of the image is a simplistic desk made of wood, positioned front and center. Placed at the center of the desk lies a modern laptop, sleek and stylish alongside a picture of a horse. The desk is surrounded by an unoccupied wooden chair, ready to seat its occupant. The background is out of focus, blurred enough to direct attention to the desk and chair."
        }
    }
]

OPTIMISED [
    {
        "prompt": "A neat and organized workspace is depicted in the photograph. The main focus of the image is a simplistic desk made of wood, positioned front and center. Placed at the center of the desk lies a modern laptop, sleek and stylish alongside a picture of a horse. The desk is surrounded by an unoccupied wooden chair, ready to seat its occupant. The background is out of focus, blurred enough to direct attention to the desk and chair.",
        "imagePrompt": null,
        "targetModel": "chatgpt",
        "features": [
            "shorten"
        ],
        "iterations": 3,
        "uiLanguage": null,
        "previewSettings": {},
        "timeout": 20000,
        "previewVariables": {},
        "targetLanguage": null,
        "promptOptimized": "Describe the textures, colors, and design elements of a wooden desk, modern laptop, and horse picture in a workspace. Mention organizational features of the desk and how they contribute to the overall aesthetic. Discuss the horse picture's contribution to the mood and visual appeal of the workspace, including specific elements that enhance its effectiveness. Comment on the blurred background's role in directing attention towards the foreground and use sensory language to creatively depict the environment.",
        "credits": 1,
        "language": "en",
        "intermediateResults": [
            {
                "promptOptimized": "Describe the wooden desk and modern laptop in the depicted workspace, along with the placement of a horse picture on the desk. Emphasize aesthetic and organizational qualities and use descriptive details. Also mention the blurred background's role in directing attention.",
                "explain": ""
            },
            {
                "promptOptimized": "Describe the wooden desk, modern laptop, and horse picture in the workspace. Use descriptive language to highlight their textures, colors, and design elements. Discuss any notable organizational features of the desk and how the horse picture contributes to the overall aesthetic. Consider how the blurred background directs attention towards the foreground and contributes to the scene's mood and visual appeal. Be creative and detailed in your response.",
                "explain": ""
            },
            {
                "promptOptimized": "Describe the textures, colors, and design elements of a wooden desk, modern laptop, and horse picture in a workspace. Mention organizational features of the desk and how they contribute to the overall aesthetic. Discuss the horse picture's contribution to the mood and visual appeal of the workspace, including specific elements that enhance its effectiveness. Comment on the blurred background's role in directing attention towards the foreground and use sensory language to creatively depict the environment.",
                "explain": ""
            }
        ],
        "explain": "",
        "createdAt": 1685615909470,
        "userId": "zoyqq4zkwdZLiBgH0eyhx4fcN9b2",
        "id": "QlN7dkfUxPMob5UFbDbE"
    }
]

PROSCONS {
    "result": [
        {
            "decision": "I will describe the textures, colors, and design elements of a wooden desk, modern laptop, and horse picture in a workspace. I will mention the organizational features of the desk and how they contribute to the overall aesthetic. I will discuss the horse picture's contribution to the mood and vibe of the workspace.",
            "decisionUserQuery": "Describe the textures, colors, and design elements of a wooden desk, modern laptop, and horse picture in a workspace. Mention organizational features of the desk and how they contribute to the overall aesthetic. Discuss the horse picture's contribution to the mood and v",
            "writingStyle": null,
            "hasUserProfile": false,
            "analysis": "proscons",
            "sourceLang": "en",
            "keyResults": {
                "pros": {
                    "Descriptive": "Describing the textures, colors, and design elements of the wooden desk, modern laptop, and horse picture in your workspace could provide a vivid and detailed picture for your audience, allowing them to visualize the environment.",
                    "Organizational features": "Mentioning the organizational features of the desk could highlight the practicality and functionality of the workspace, making it an attractive and efficient place to work.",
                    "Mood and vibe": "Discussing the horse picture's contribution to the mood and vibe of the workspace could provide insight into the personal style and taste of the individual using it."
                },
                "cons": {
                    "Personal preference": "The description of the textures, colors, and design elements of the workspace is subjective and could differ from person to person, potentially limiting the relatability of the content.",
                    "Narrow focus": "Focusing solely on the workspace could limit the overall appeal and scope of the content, potentially deterring viewers who are not interested in such a specific topic.",
                    "Overly subjective": "The description of the workspace could come across as overly subjective and self-promoting, reducing the credibility and authenticity of the content."
                },
                "bestChoice": "Incorporate the description of the workspace into a broader narrative",
                "conclusion": "While describing the workspace could add value to the content, it is important to incorporate it into a broader narrative to maintain the interest and engagement of a wider audience. Balancing the subjective with the objective in the description could also help increase the relatability, credibility, and authenticity of the content.",
                "confidenceScore": 0.7
            },
            "keyResultsConclusion": "While describing the workspace could add value to the content, it is important to incorporate it into a broader narrative to maintain the interest and engagement of a wider audience. Balancing the subjective with the objective in the description could also help increase the relatability, credibility, and authenticity of the content.",
            "keyResultsBestChoice": "Incorporate the description of the workspace into a broader narrative",
            "pros": {
                "Descriptive": "Describing the textures, colors, and design elements of the wooden desk, modern laptop, and horse picture in your workspace could provide a vivid and detailed picture for your audience, allowing them to visualize the environment.",
                "Organizational features": "Mentioning the organizational features of the desk could highlight the practicality and functionality of the workspace, making it an attractive and efficient place to work.",
                "Mood and vibe": "Discussing the horse picture's contribution to the mood and vibe of the workspace could provide insight into the personal style and taste of the individual using it."
            },
            "cons": {
                "Personal preference": "The description of the textures, colors, and design elements of the workspace is subjective and could differ from person to person, potentially limiting the relatability of the content.",
                "Narrow focus": "Focusing solely on the workspace could limit the overall appeal and scope of the content, potentially deterring viewers who are not interested in such a specific topic.",
                "Overly subjective": "The description of the workspace could come across as overly subjective and self-promoting, reducing the credibility and authenticity of the content."
            },
            "confidenceScore": 0.7,
            "confidence": 0,
            "createdAt": 1685615920581,
            "profileId": null,
            "isQuality": false,
            "nonGibberish": false,
            "id": "qTPKYnrdj6r5BkuOo82L"
        }
    ]
}

*/
