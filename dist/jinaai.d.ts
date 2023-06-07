import { PromptPerfectInput, PromptPerfectOptions, PromptPerfectOutput } from './clients/PromptPerfectClient';
import { SceneXInput, SceneXOptions, SceneXOutput } from './clients/SceneXClient';
import { RationaleInput, RationaleOptions } from './clients/RationaleClient';
declare const jinaai: {
    decide: (input: RationaleInput | SceneXOutput | PromptPerfectOutput | Array<string> | string, options?: RationaleOptions) => Promise<import("./clients/RationaleClient").RationaleOutput>;
    optimize: (input: PromptPerfectInput | SceneXOutput | Array<string> | string, options?: PromptPerfectOptions) => Promise<PromptPerfectOutput>;
    describe: (input: SceneXInput | Array<string> | string, options?: SceneXOptions) => Promise<SceneXOutput>;
    generate: () => never;
    generate_image: () => never;
    configure: (params: Record<'scenex-token' | 'promptperfect-token' | 'rationale-token', string>) => void;
};
export default jinaai;
