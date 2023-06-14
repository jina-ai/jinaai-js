/* eslint-disable max-len */
import JinaAI from '../src/jinaai';

const jinaai = new JinaAI({
    tokens: {
        'promptperfect-token': process.env.PROMPTPERFECT_TOKEN || '',
        'scenex-token': process.env.SCENEX_TOKEN || '',
        'rationale-token': process.env.RATIONALE_TOKEN || '',
        'chatcat-token': process.env.CHATCAT_TOKEN || '',
    }
});

const toBase64 = (img: string) => jinaai.utils.imageToBase64(`examples/images/${img}`);

const fridge = toBase64('fridge-1.png');

const generate = async () => {
    // 1. get a description of the fridge content
    const descriptions = await jinaai.describe(
        fridge,
        { question: 'What ingredients are in the fridge?', languages: ['en'] }
    );
    console.log('DESCRIPTION:\n', descriptions.results[0].output, '\n');
    // 2. get an optmised prompt
    const prompt = await jinaai.optimize([
        'Give me one recipe based on this list for ingredients',
        ...descriptions.results.map(desc => 'INGREDIENTS:\n' + desc.output),
    ].join('\n'));
    console.log('PROMPT:\n', prompt.results[0].output, '\n');
    // 3. get a recipe based on the descriptions
    const recipe = await jinaai.generate(prompt.results[0].output);
    console.log('RECIPE: \n', recipe.output);
    // 4. get a swot analysis of the recipe
    const swot = await jinaai.decide(
        recipe.output,
        { analysis: 'swot' }
    );
    console.log('SWOT: \n', swot.results[0].swot);
};

generate();

/*
DESCRIPTION:
The scene depicts a well-stocked and brightly lit kitchen. The focal point of the image is a stainless steel refrigerator in the center, filled abundantly with fresh produce and dairy products. A wooden cutting board with an avocado that is halved and green, filling the lower right corner of the frame, is visible in foreground.
On the top shelf of the fridge, from left to right, there is a plastic container holding green lettuce leaves, a large red bell pepper, and two medium-sized cucumbers. On the second shelf, a bundle of pale orange carrots can be seen in a green basket, while on the third shelf there is a cardboard box filled with oranges. The fourth shelf holds a watermelon and a ripe pineapple, with their characteristic colors popping against the black background. To the left of the refrigerator, a wooden bowl contains a mixture of oranges and limes, while a jar of ketchup and a jar of yogurt are to the right.
In the background, a white plate with six carrot slices arranged in a circular pattern rests on the countertop, with the top half of the plate partially occluded by a woven yellow basket filled with more carrots. Against the pale pink wall behind the counter, a narrow cylindrical glass jar with thick rims, filled with an orangey liquid, sits. Its label is out of sight, so it is unclear what it contains. 

PROMPT:
Based on the provided list of ingredients, please provide a recipe for a healthy salad that incorporates the fresh produce and dairy products featured in the image. Your recipe should include the green lettuce leaves, red bell pepper, cucumbers, and avocado from the top shelf of the fridge, as well as the pale orange carrots from the green basket on the second shelf.
Your recipe should be clear and concise, providing specific measurements and instructions for each ingredient. Please also suggest a dressing or seasoning that complements the flavors of the salad. Additionally, feel free to suggest any optional ingredients or substitutions that would enhance the dish.
Please note that your recipe should be healthy and well-balanced, incorporating a variety of fresh vegetables and dairy products. 

RECIPE: 
Here is a simple but healthy recipe for a salad with the provided ingredients:
Ingredients:
- 2 cups green lettuce leaves
- 1 red bell pepper, diced
- 3 cucumbers, sliced
- 2 ripe avocados, diced
- 4 carrots, peeled and sliced
- 1/2 cup crumbled feta cheese (optional)
Dressing:
- 3 tbsp olive oil 
- 2 tbsp lemon juice
- Salt and pepper to taste
Instructions:
1. In a large bowl, toss the green lettuce leaves, diced red bell pepper, sliced cucumbers, diced avocados, and sliced carrots.
2. Add crumbled feta cheese (if using).
3. Whisk together the olive oil, lemon juice, salt and pepper in a small bowl and drizzle over the salad.
4. Toss to coat.
5. Enjoy!
Optional: You can add grilled chicken or salmon for extra protein. For a vegan option, substitute the feta cheese for tofu or nutritional yeast.

SWOT: 
strengths: {
    Healthy: 'Assembling a salad with the given ingredients is a healthy food choice that provides essential nutrients to the body.',
    Versatile: 'Salads are very versatile and can be customized to individual tastes and preferences.',
    'Easy to Make': 'The salad with the given ingredients is easy to make and can be prepared quickly.',
    'Olive Oil Benefits': 'Using olive oil as a salad dressing has multiple health benefits, including reducing the risk of cardiovascular disease.'
},
weaknesses: {
    'Bland Taste': 'The salad with the given ingredients may have a bland taste and lack flavor without the addition of other seasonings or spices.',
    'Portion Control': 'Overconsumption of the salad with the given ingredients, especially when dressed with olive oil, can result in excessive calorie intake and weight gain.',
    'Limited Ingredients': 'Using only the given ingredients may limit the nutritional variety and diversity of the salad.'
},
opportunities: {
    'Experiment with Other Ingredients': 'This decision can be an opportunity to experiment with different ingredients and create new and exciting salad combinations.',
    'Healthier Salad Dressing Options': 'This decision can be an opportunity to explore healthier salad dressing options, such as vinaigrettes made with lemon juice or low-fat yogurt.',
    Customization: 'This decision can be an opportunity to allow individuals to customize their salad to their taste preference by offering various salad dressing options.'
},
threats: {
    'Food Waste': 'If the assembled salad is not consumed, it can lead to food waste and negatively impact the environment.',
    'Adverse reactions': 'Individuals with allergies or sensitivities to the given ingredients or olive oil can experience adverse reactions.',
    'Quality of the Ingredients': 'The quality of the ingredients used can affect the taste and nutritional value of the salad.'
},
conclusion: 'Assembling a salad with the given ingredients provides a healthy and versatile food choice but has the potential to be bland and lack nutrition diversity. Experimenting with new and healthier salad dressing options like a low-fat yogurt-based vinaigrette or other seasonings and spices can enhance the flavor and nutritional value of the salad. It is important to also consider portion control and the quality of the ingredients used to prepare the salad.',
*/
