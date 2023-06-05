/* eslint-disable max-len */
import JinaClient from './JinaClient';

export interface PromptPerfectInput {
    data: {
        prompt: string,
        targetModel: string,
        features: string[],
        [key: string]: any;
    }[]
}

export interface PromptPerfectOutput {
    result: {
        promptOptimized: string,
        [key: string]: any;
    }[]
}

export default class PromptPerfectClient extends JinaClient {
    constructor(headers?: Record<string, string>) {
        const baseURL = 'https://us-central1-prompt-ops.cloudfunctions.net';
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };
        const mergedHeaders = { ...defaultHeaders, ...headers };
        super(baseURL, mergedHeaders);
    }

    public async optimize(data: PromptPerfectInput) {
        return await this.post<PromptPerfectOutput>('/optimizeBatch', data);
    }
}

/*
{
    data: [
        {
            prompt: 'write a python code to convert base ten to hex',
            targetModel: 'chatgpt'
        }
    ]
}
*/

/*
{
    "result": [
        {
                "prompt": "write a python code to convert base ten to hex",
                "imagePrompt": null,
                "targetModel": "chatgpt",
                "features": [],
                "iterations": 1,
                "uiLanguage": null,
                "previewSettings": {},
                "timeout": 20000,
                "previewVariables": {},
                "targetLanguage": null,
                "promptOptimized": "Your task is to write a Python program that will convert a number in base ten to its equivalent in hexadecimal notation. Your program should be able to accept a decimal number as input, convert it to hexadecimal notation, and output the result in a format that can be easily read and understood by the user.\n\nTo accomplish this task, you will need to use the built-in functions in Python's standard library that handle decimal-to-hexadecimal conversion. Your program should also include error handling to ensure that the input is valid and that the output is correct.\n\nPlease provide clear and concise code that accomplishes the task, including comments to explain the steps taken and the reasoning behind the code. Additionally, please provide a brief explanation of how your code works and how it accomplishes the conversion from base ten to hexadecimal notation.",
                "credits": 1,
                "language": "en",
                "intermediateResults": [
                    {
                        "promptOptimized": "Your task is to write a Python program that will convert a number in base ten to its equivalent in hexadecimal notation. Your program should be able to accept a decimal number as input, convert it to hexadecimal notation, and output the result in a format that can be easily read and understood by the user.\n\nTo accomplish this task, you will need to use the built-in functions in Python's standard library that handle decimal-to-hexadecimal conversion. Your program should also include error handling to ensure that the input is valid and that the output is correct.\n\nPlease provide clear and concise code that accomplishes the task, including comments to explain the steps taken and the reasoning behind the code. Additionally, please provide a brief explanation of how your code works and how it accomplishes the conversion from base ten to hexadecimal notation.",
                        "explain": "The optimized prompt provides specific instructions on what the user is expected to do, and it provides details on the format that the output should take. The prompt also specifies that the program should have error handling and clear explanations to ensure that the program can be understood and executed by the end-user. The optimized prompt also encourages the user to provide a brief explanation of how the code works, which can help the end-user understand how to modify or improve the code."
                    }
                ],
                "explain": "The optimized prompt provides specific instructions on what the user is expected to do, and it provides details on the format that the output should take. The prompt also specifies that the program should have error handling and clear explanations to ensure that the program can be understood and executed by the end-user. The optimized prompt also encourages the user to provide a brief explanation of how the code works, which can help the end-user understand how to modify or improve the code.",
                "createdAt": 1685537244338,
                "userId": "zoyqq4zkwdZLiBgH0eyhx4fcN9b2",
                "id": "rlcu2cKNUSoecwaKRvZP"
        }
    ]
}
*/