import { PromptPerfectInput, PromptPerfectOptions } from './clients/PromptPerfectClient';
import { SceneXInput, SceneXOptions } from './clients/SceneXClient';
import { RationaleInput, RationaleOptions } from './clients/RationaleClient';
import { ChatCatInput, ChatCatOptions } from './clients/ChatCatClient';
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
    decide(input: RationaleInput | Array<string> | string, options?: RationaleOptions): Promise<import("./clients/RationaleClient").RationaleOutput>;
    optimize(input: PromptPerfectInput | Array<string> | string, options?: PromptPerfectOptions): Promise<import("./clients/PromptPerfectClient").PromptPerfectOutput>;
    describe(input: SceneXInput | Array<string> | string, options?: SceneXOptions): Promise<import("./clients/SceneXClient").SceneXOutput>;
    generate(input: ChatCatInput | Array<string> | string, options?: ChatCatOptions): Promise<import("./clients/ChatCatClient").ChatCatOutput>;
    generate_image(): void;
    utils: {
        isUrl: typeof import("./utils").isUrl;
        isBase64: typeof import("./utils").isBase64;
        imageToBase64: typeof import("./utils").imageToBase64;
    };
}
export default JinaAI;
