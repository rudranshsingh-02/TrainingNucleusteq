import { getStaticProps } from '../src/pages/posts';

describe('getStaticProps', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([
                    { id: '1', title: 'Post A', content: 'Content A' },
                    { id: '2', title: 'Post B', content: 'Content B' },
                ]),
            })
        ) as jest.Mock;
    });

    it('fetches posts and returns them as props', async () => {
        const result = await getStaticProps({});
        expect(result).toEqual({
            props: {
                posts: [
                    { id: '1', title: 'Post A', content: 'Content A' },
                    { id: '2', title: 'Post B', content: 'Content B' },
                ],
            },
        });
    });
});
