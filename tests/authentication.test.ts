import { HTTPClient } from './mock/HTTPClient.mock';
import JinaAI from '../src/jinaai';

jest.mock('../src/clients/HTTPClient', () => ({
    __esModule: true,
    HTTPClient: HTTPClient,
}));

describe('Jina SDK authentication tests', () => {

    it('Auth Error: no secret', async () => {
        const jinaai = new JinaAI();
        try {
            await jinaai.describe('https://picsum.photos/200');
            expect(true).toBe(false);
        } catch (error) {
            expect(error).toEqual({
                message: 'No token provided',
                status: 'UNAUTHENTICATED',
            });
        }
    });

    it('Auth Error: no partial secret', async () => {
        const jinaai = new JinaAI({
            secrets: {
                'promptperfect-secret': 'some-fake-secret',
            }
        });
        try {
            await jinaai.describe('https://picsum.photos/200');
            expect(true).toBe(false);
        } catch (error) {
            expect(error).toEqual({
                message: 'No token provided',
                status: 'UNAUTHENTICATED',
            });
        }
    });

    it('Auth Success: secret provided', async () => {
        const jinaai = new JinaAI({
            secrets: {
                'promptperfect-secret': 'some-fake-secret',
                'scenex-secret': 'some-fake-secret',
                'rationale-secret': 'some-fake-secret',
                'jinachat-secret': 'some-fake-secret',
            }
        });
        const r = await jinaai.describe('https://picsum.photos/200');
        expect(r.results[0].output).toBeTruthy();
    });

    it('Auth Success: partial secret provided', async () => {
        const jinaai = new JinaAI({
            secrets: {
                'scenex-secret': 'some-fake-secret',
            }
        });
        const r = await jinaai.describe('https://picsum.photos/200');
        expect(r.results[0].output).toBeTruthy();
    });

});
