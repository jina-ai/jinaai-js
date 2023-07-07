/* eslint-disable max-len */
import { BestBannerRawInput, BestBannerRawOutput } from '../../../src/clients/BestBannerClient';

export default (input: BestBannerRawInput): BestBannerRawOutput => {
    return {
        result: input.data.map((e, i) => ({
            id: 'aaaaaaaaaaaaaaaaaaaaaaaaaaa' + i,
            userId: 'zoyqq4zkwdZLiBgH0eyhx4fcN9b2',
            text: e.text,
            plainText: null,
            algorithms: new Array(!e.bannerCount || e.bannerCount < 4 ? 4 :e.bannerCount).fill('PICO'),
            resolution: {
                width: 1024,
                height: 1024
            },
            banners: new Array(!e.bannerCount || e.bannerCount < 4 ? 4 :e.bannerCount).fill({
                id: 'aaaaaaaaaaaaaaaaaaaaaaaaaaa' + i,
                url: 'https://picsum.photos/1024'
            }),
            createdAt:{
                nanoseconds: 821654000,
                seconds: 1688627912
            },
            metaData: {}
        }))
    };
};