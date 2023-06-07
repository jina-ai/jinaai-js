/* eslint-disable max-len */
import { SceneXInput, SceneXOutput } from '../../../src/clients/SceneXClient';

export default (input: SceneXInput): SceneXOutput => {
    return {
        result: input.data.map((e, i) => ({
            id: 'aaaaaaaaaaaaaaaaaaaaaaaaaaa' + i,
            image: e.image,
            features: e.features,
            uid: 'aaaaaaaaaaaaaaaaaaaaaaaaaaa' + i,
            algorithm: e.algorithm || 'Aqua',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ipsum est, et iaculis lacus tincidunt eget. Sed dictum diam ex, eget aliquam urna porta a.',
            userId: 'zoyqq4zkwdZLiBgH0eyhx4fcN9b2',
            createdAt: (new Date()).getTime(),
            i18n: e.languages ?
                e.languages.reduce((acc, l) => ({
                    ...acc,
                    [l]: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ipsum est, et iaculis lacus tincidunt eget. Sed dictum diam ex, eget aliquam urna porta a.'
                }), {}) :
                { 'en': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ipsum est, et iaculis lacus tincidunt eget. Sed dictum diam ex, eget aliquam urna porta a.' }
        }))
    };
};