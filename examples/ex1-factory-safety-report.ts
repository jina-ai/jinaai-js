/* eslint-disable max-len */
import JinaAI from '../src/jinaai';

const jinaai = new JinaAI({
    tokens: {
        'promptperfect-token': process.env.PROMPTPERFECT_TOKEN || '',
        'scenex-token': process.env.SCENEX_TOKEN || '',
        'rationale-token': process.env.RATIONALE_TOKEN || '',
        'chatcat-token': process.env.CHATCAT_TOKEN || '',
    },
    useCache: true
});

const toB64 = (img: string) => jinaai.utils.imageToBase64(`examples/images/${img}`);

const situations = [
    'factory-1.png',
    'factory-2.png',
    'factory-3.png',
    'factory-4.png',
].map(i => toB64(i));

const evaluate = async () => {
    // 1. get a description of each situations
    const descriptions = await jinaai.describe(situations);
    descriptions.result.forEach((desc, i) => console.log('DESCRIPTION ' + (i + 1) + ':\n', desc.text, '\n'));
    // 2. get an analysis based on the descriptions
    const analysis = await jinaai.generate([
        'Does any of those situations present a danger?',
        'Reply with [SITUATION_NUMBER] [YES] or [NO] and explain why',
        ...descriptions.result.map((desc, i) => 'SITUATION ' + (i + 1) + ':\n' + desc.text),
    ].join('\n'));
    console.log('ANALYSIS: \n', analysis.responseContent);
    // 3. get a recommendation on the most urgent action to take
    const recommendation = await jinaai.generate([
        'According to those situations, what should be done first to make everything safer?',
        'I only want the most urgent situation',
        ...descriptions.result.map((desc, i) => 'SITUATION ' + (i + 1) + ':\n' + desc.text),
    ].join('\n'));
    console.log('RECOMMENDATION: \n', recommendation.responseContent);
    // 4. get a swot analysis of the recommendation
    const swot = await jinaai.decide(
        recommendation.responseContent,
        { analysis: 'swot' }
    );
    console.log('SWOT: \n', swot.result.result[0].keyResults);
};

evaluate();

/*
DESCRIPTION 1: 
A bustling factory floor is depicted in this image, with numerous tools and machines being operated by skilled workers. The factory workers are primarily young men dressed in dark, semi-casual attire. Many of them are busy performing tasks on the machinery, while others are standing nearby observing and assisting.
One worker, who is distinguished by his glasses, is depicted in impressive detail in a close up shot. However, most of the other workers are too far away or blurred to see in much detail. Despite this, the overall activity of the factory is captured well, with a sense of energy and motion pervading the image.
It's worth noting that there are several conflicting captions that mention different numbers of men, or working on different types of machines. However, in general, the scene is consistent with a bustling factory floor with many workers operating various machines and tools. There is no indication of any injuries or accidents, with everyone seeming to be focused on their work. 

DESCRIPTION 2: 
The scene takes place in a busy factory where a group of men and women works tirelessly on machines. In the center of the image, two women concentrate on a large machine, while to the left, a worker is performing his job. In the background, a conveyor belt carries a large number of brake discs. A man is handling a stack of brake discs on the right side of the image.
Most of the workers are wearing protective gloves and masks, indicating a hazardous work environment. In the upper left, a small black dog with a black collar can be seen resting on the edge of a machine.
The image captures the essence of the monotony and hard work required in industrial plants. Despite the challenges posed by their jobs, the workers are committed to their task, determined to produce products of the highest quality. 

DESCRIPTION 3: 
The chaotic scene depicted in this image portrays a street altercation between multiple individuals. Figures are seen grappling with each other, with some violence and aggression, in both the foreground and background of the composition. The focal point of the image is a physical altercation between two men taking place in a parking lot in the center of the composition, with one man appearing to kick or strike the other.
Additionally, a man is shown riding a skateboard down a street in the top left corner of the image, while a woman stands next to a car in the bottom right corner of the image. A man who appears to be kicking a ball is also depicted in the lower left corner of the image. A green trash can with a lid and a pink post box are shown on the side of the street in the background of the image. Finally, a woman is seen standing on a sidewalk toward the back of the image, possibly observing the altercation.
Overall, the image's content depicts a disturbing and chaotic scene of violence and aggression in an outdoor urban setting. 

DESCRIPTION 4: 
A chaotic scene unfolds in a kitchen, where a fire blazes unchecked atop a gas stove. The camera captures a close-up shot that conveys the intense heat emanating from the flames. Smoke and ash billow forth, framing the frantic efforts of an unidentified individual, who attempts to douse the flames with an improvised method.
Behind the stovetop, a clock with clear numerals ticks ominously, as if counting down the moments until the fire devours the surroundings. The rest of the kitchen appears cluttered and disorganized, with stacks of papers and unsorted dishes resolving into anarchic chaos.
In the foreground of the image, a black and white photograph of an elegant fedora hat stands in stark contrast to the fiery backdrop. The muted tones of the photograph echo the darkness of the scene's corners, which reveal glimpses of other obscured objects, such as a chair huddled in a corner or a building that stands out against the night sky.
Rounding out the scene's eclectic array of elements, a cat perches on a bathroom counter near the kitchen, its fur bathed in a soft glow from an unseen light source. Meanwhile, in the kitchen's center, a man clutches a piece of paper, his face obscured in shadow as he struggles to make sense of the chaos that surrounds him. 

ANALYSIS: 
SITUATION 1: NO. There are no indications of danger in the described scene. The factory workers appear to be focused, productive and safe.
SITUATION 2: YES. The described scene indicates potential hazards due to the protective equipment worn, the presence of a large machine and conveyor belt, and a potentially dangerous work environment.  
SITUATION 3: YES. The described scene clearly depicts a chaotic and violent altercation between multiple individuals, indicating potential danger.  
SITUATION 4: YES. The described kitchen scene with an uncontrolled fire and clutter indicates an immediately dangerous situation.

RECOMMENDATION: 
The most urgent situation requiring immediate action is Situation 4, where the fire must be extinguished as quickly as possible to avoid further damage or harm. Turn off the gas to extinguish the fire on the stove.

SWOT: 
strengths: {
    'Quick and Effective': 'Turning off the gas is a quick and effective way to extinguish a fire on the stove, preventing further damage or harm.',
    Safety: 'Turning off the gas can prevent harmful gas leaks and explosions, ensuring the safety of both your home and those around you.',
    'Minimal Cost': 'Turning off the gas does not require any additional cost, making it an affordable solution to fire emergencies.'
},
weaknesses: {
    'Potential Damage': 'Depending on the intensity of the fire, turning off the gas may not be enough to extinguish it completely, leading to further damage.',
    'Smoke Inhalation': 'Extinguishing a fire with gas turned off can still produce smoke that can be harmful for an individual, such as inhalation of smoke.',
    'Risk of Injury': 'Attempting to turn off the gas in the midst of a fire can be risky and lead to burns or injuries.'
},
opportunities: {
    Preparedness: 'This decision can be an opportunity to educate yourself and others on fire safety and prevention measures, including the proper use and handling of gas stoves.',
    'Emergency Response Planning': 'Turning off the gas during a fire can be an opportunity to review and improve your emergency response plan, including evacuation procedures.',
    'Install Smoke Detectors': 'This can be an opportunity to install and maintain smoke detectors, increasing the chances of early detection and prevention of fires.'
},
threats: {
    'Severity of the Fire': 'In case the fire is intense and cannot be handled through turning off the gas, the situation could escalate and create more damage.',
    'Gas Leaks': 'If gas leaks caused the fire, turning off the gas without proper care can perpetuate the issue, leading to possible explosions or harmful environmental consequences.',
    'Equipment Failure': 'In some cases, gas valves may fail, and switching it off can prove to be impossible in those circumstances.'
},
conclusion: 'While turning off the gas is a quick and effective solution for minor fires, it is important to recognize that it may not be enough for severe fires. Therefore, it is best to turn off the gas and call local emergency response teams, ensuring the safety of yourself and those around you. In addition, taking the opportunity to educate yourself and others about fire safety and prevention measures can help prevent fire emergencies from happening in the first place.',
*/
