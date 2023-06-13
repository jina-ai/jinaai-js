import { PromptPerfectInput, PromptPerfectOptions, PromptPerfectOutput } from './clients/PromptPerfectClient';
import { SceneXInput, SceneXOptions, SceneXOutput } from './clients/SceneXClient';
import { RationaleInput, RationaleOptions } from './clients/RationaleClient';
import { imageToBase64 } from './utils';
type JinaAIParams = {
    tokens: Record<'scenex-token' | 'promptperfect-token' | 'rationale-token', string>;
    useCache?: boolean;
};
declare class JinaAI {
    private PPClient;
    private SXClient;
    private RAClient;
    constructor(params: JinaAIParams);
    decide(input: RationaleInput | SceneXOutput | PromptPerfectOutput | Array<string> | string, options?: RationaleOptions): Promise<import("./clients/RationaleClient").RationaleOutput>;
    optimize(input: PromptPerfectInput | SceneXOutput | Array<string> | string, options?: PromptPerfectOptions): Promise<PromptPerfectOutput>;
    describe(input: SceneXInput | Array<string> | string, options?: SceneXOptions): Promise<SceneXOutput>;
    generate(): void;
    generate_image(): void;
    imageToBase64: typeof imageToBase64;
}
export default JinaAI;
