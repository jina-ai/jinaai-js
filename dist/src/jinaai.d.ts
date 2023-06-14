import { PromptPerfectRawInput, PromptPerfectOptions, PromptPerfectOutput } from './clients/PromptPerfectClient';
import { SceneXRawInput, SceneXOptions, SceneXOutput } from './clients/SceneXClient';
import { RationaleRawInput, RationaleOptions, RationaleOutput } from './clients/RationaleClient';
import { ChatCatRawInput, ChatCatOptions, ChatCatOutput } from './clients/ChatCatClient';
type JinaAIParams = {
    tokens?: Record<'scenex-token' | 'promptperfect-token' | 'rationale-token' | 'chatcat-token', string>;
    useCache?: boolean;
};
declare class JinaAI {
    private PPClient;
    private SXClient;
    private RAClient;
    private CCClient;
    constructor(params?: JinaAIParams);
    decide(input: RationaleRawInput | Array<string> | string, options?: RationaleOptions): Promise<RationaleOutput>;
    optimize(input: PromptPerfectRawInput | Array<string> | string, options?: PromptPerfectOptions): Promise<PromptPerfectOutput>;
    describe(input: SceneXRawInput | Array<string> | string, options?: SceneXOptions): Promise<SceneXOutput>;
    generate(input: ChatCatRawInput | Array<string> | string, options?: ChatCatOptions): Promise<ChatCatOutput>;
    generate_image(): void;
    utils: {
        isUrl: typeof import("./utils").isUrl;
        isBase64: typeof import("./utils").isBase64;
        imageToBase64: typeof import("./utils").imageToBase64;
    };
}
export default JinaAI;
