/* eslint-disable max-len */
import { BestBannerRawInput, BestBannerRawOutput } from '../../../src/clients/BestBannerClient';

export default (input: BestBannerRawInput): BestBannerRawOutput => {
    return {
        result: input.data.map((e, i) => ({
            id: 'aaaaaaaaaaaaaaaaaaaaaaaaaaa' + i,
            userId: 'zoyqq4zkwdZLiBgH0eyhx4fcN9b2',
            text: e.text,
            plainText: null,
            title: 'Skyrocket Your Productivity: Unlock Success in Fast-Paced Times\n',
            style:null,
            description: "Master the art of time management to thrive in today's rapid world.",
            resolution: {
                width: 1024,
                height: 1024
            },
            banners: new Array(4).fill({
                id: 'aaaaaaaaaaaaaaaaaaaaaaaaaaa' + i,
                url: 'https://picsum.photos/1024'
            }),
            status: 'SUCCESS',
            createdAt:{
                nanoseconds: 821654000,
                seconds: 1688627912
            },
            metaData: {}
        }))
    };
};