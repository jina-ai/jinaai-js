/* eslint-disable max-len */
import { SceneXRawInput, SceneXRawOutput } from '../../../src/clients/SceneXClient';

const desc = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ipsum est, et iaculis lacus tincidunt eget. Sed dictum diam ex, eget aliquam urna porta a.';

export default (input: SceneXRawInput): SceneXRawOutput => {
    return {
        result: input.data.map((e, i) => ({
            id: 'aaaaaaaaaaaaaaaaaaaaaaaaaaa' + i,
            image: e.image,
            features: e.features,
            uid: 'aaaaaaaaaaaaaaaaaaaaaaaaaaa' + i,
            algorithm: e.algorithm || 'Aqua',
            text: desc,
            userId: 'zoyqq4zkwdZLiBgH0eyhx4fcN9b2',
            createdAt: (new Date()).getTime(),
            optOut: e.features.includes('opt-out') == true ? true : false,
            i18n: e.languages
                ?
                e.languages.reduce((acc, l) => ({
                    ...acc,
                    [l]: (
                        e.algorithm != 'Hearth'
                            ? desc.substring(0, e.output_length ? e.output_length : desc.length)
                            : [
                                {
                                    isNarrator: true,
                                    message: desc.substring(0, e.output_length ? e.output_length : desc.length),
                                    name: 'Narrator'
                                },
                                {
                                    isNarrator: false,
                                    message: desc.substring(0, e.output_length ? e.output_length : desc.length),
                                    name: 'BobbyBoy'
                                },
                            ]
                    )
                }), {})
                :
                {
                    'en': (
                        e.algorithm != 'Hearth'
                            ? desc.substring(0, e.output_length ? e.output_length : desc.length)
                            : [
                                {
                                    isNarrator: true,
                                    message: desc.substring(0, e.output_length ? e.output_length : desc.length),
                                    name: 'Narrator'
                                },
                                {
                                    isNarrator: false,
                                    message: desc.substring(0, e.output_length ? e.output_length : desc.length),
                                    name: 'BobbyBoy'
                                },
                            ]
                    )
                },
            answer: e.features.includes('question_answer') == true ? desc : undefined,
            tts: e.algorithm != 'Hearth' ? undefined : (
                e.languages
                ?
                e.languages.reduce((acc, l) => ({
                    ...acc,
                    [l]: `https://someurl/to/the/${l}/tts/file`
                }), {})
                :
                {
                    'en': 'https://someurl/to/the/en/tts/file'
                }
            ),
            dialog: e.algorithm != 'Hearth' ? null : ({
                names: ['Narrator', 'BobbyBoy'],
                ssml: (
                    e.languages
                    ?
                    e.languages.reduce((acc, l) => ({
                        ...acc,
                        [l]: `https://someurl/to/the/${l}/ssml/file`
                    }), {})
                    :
                    {
                        'en': 'https://someurl/to/the/en/ssml/file'
                    }
                )
            })
        }))
    };
};