/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-len */
const JinaAI = require('jinaai');

const jinaai = new JinaAI({
    secrets: {
        'promptperfect-secret': process.env.PROMPTPERFECT_SECRET || '',
        'scenex-secret': process.env.SCENEX_SECRET || '',
        'rationale-secret': process.env.RATIONALE_SECRET || '',
        'jinachat-secret': process.env.JINACHAT_SECRET || '',
    }
});

const positiveMovieTweets = [
    'Just watched the new movie! The plot was incredible, and the visual effects were mind-blowing. Definitely a must-see! #movie #amazing',
    "I can't stop thinking about the movie. The acting was superb, and the twist at the end caught me off guard. Highly recommended! #movie #thriller",
    'The cinematography in the movie was stunning. Every scene was like a work of art. #movie #cinema',
    'The new movie is a rollercoaster of emotions. I laughed, I cried, and I was on the edge of my seat throughout the entire film. #movie #emotional',
    "Just came back from watching the movie, and I'm still speechless. It's a masterpiece! #movie #masterpiece",
    "If you're looking for a good movie to watch, I highly recommend this one. It has a compelling story and brilliant performances. #movie #recommendation",
    'The movie exceeded my expectations. The pacing was perfect, and the characters were so well-developed. #movie #surprise',
    "I'm still trying to process what I just witnessed in the movie. It's unlike anything I've ever seen before. #movie #unique",
    "Can't get enough of the movie's soundtrack. It perfectly complements the visuals and adds so much depth to the film. #movie #soundtrack",
    "Just watched the movie with my friends, and we had a blast. It's entertaining from start to finish. #movie #fun"
];

const negativeMovieTweets = [
    'I just watched the new movie, and it was a complete disappointment. The plot was confusing, and the acting was terrible. #movie #disappointed',
    'Save your money and skip this movie. It was boring and predictable. #movie #boring',
    "I don't understand the hype around this movie. It was overrated and not worth the ticket price. #movie #overrated",
    'I had high expectations for this movie, but it fell flat. The storyline was weak, and the characters were poorly developed. #movie #letdown',
    'I regret watching this movie. It was a waste of time. #movie #wasteoftime',
    "I can't believe I paid to see this movie. It was absolutely awful. #movie #awful",
    'The movie was a disaster. The dialogue was cringe-worthy, and the special effects were laughable. #movie #disaster',
    'I was bored throughout the entire movie. It lacked any excitement or originality. #movie #uninteresting',
    'I was really looking forward to this movie, but it was a major letdown. The pacing was off, and the ending was unsatisfying. #movie #majorletdown',
    "I don't recommend this movie at all. It was a total mess and didn't make any sense. #movie #notrecommended"
];

const evaluate = async (tweets) => {
    try {
        // 1. get the general feeling according to the tweets
        const prompt = [
            'According to those tweets, is the general feeling positive or negative?',
            'Reply by [POSITIVE] or [NEGATIVE]',
            ...tweets.map(t => 'TWEET:\n' + t),
        ].join('\n');
        const feeling = await jinaai.generate(prompt);
        console.log('GENERAL FEELING: ', feeling.output);
    } catch (e) {
        console.log('ERROR:', e);
    }
};

evaluate(positiveMovieTweets);
evaluate(negativeMovieTweets);
