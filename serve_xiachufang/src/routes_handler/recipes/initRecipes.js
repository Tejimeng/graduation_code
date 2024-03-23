const Chance = require('chance');
const chance = new Chance();
const initRecipes = async (connection, recipesTable) => {
    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS ${recipesTable} (
                id INT AUTO_INCREMENT PRIMARY KEY,
                coverImg VARCHAR(255) NOT NULL,
                recipeTitle VARCHAR(255) NOT NULL,
                recipeStory TEXT,
                recipeMaterials JSON NOT NULL,
                recipeSteps JSON NOT NULL,
                goodCount INT DEFAULT 0,
                collectionCount INT DEFAULT 0 ,
                auditStatus INT DEFAULT 1,
                recommendedStatus INT DEFAULT 1,
                tips TEXT DEFAULT NULL,
                createdAt BIGINT DEFAULT (UNIX_TIMESTAMP() * 1000)
            )
        `);
        // 进行默认值的插入
        const recipesData = [];
        for (let i = 0; i < 30; i++) {
            const coverImg = 'http://localhost:9210/serverImage/2024/03/17/1710671059994.jpg';
            const recipeTitle = chance.sentence({ words: 7 });
            const recipeStory = chance.paragraph({ sentences: 3 });
            const recipeMaterials = [
                { materialName: '面粉', materialDosage: '200g' },
                { materialName: '鸡蛋', materialDosage: '2个' },
                { materialName: '面粉', materialDosage: '200g' },
                { materialName: '鸡蛋', materialDosage: '2个' },
                { materialName: '面粉', materialDosage: '200g' },
                { materialName: '鸡蛋', materialDosage: '2个' }
            ];
            const recipeSteps = [
                {
                    stepImg: 'http://localhost:9210/serverImage/2024/03/17/1710658756265.jpg',
                    stepDesc: '这是步骤的描述'
                },
                {
                    stepImg: 'http://localhost:9210/serverImage/2024/03/17/1710658756265.jpg',
                    stepDesc: '这是步骤的描述'
                },
                {
                    stepImg: 'http://localhost:9210/serverImage/2024/03/17/1710658756265.jpg',
                    stepDesc: '这是步骤的描述'
                },
                {
                    stepImg: 'http://localhost:9210/serverImage/2024/03/17/1710658756265.jpg',
                    stepDesc: '这是步骤的描述'
                },
                {
                    stepImg: 'http://localhost:9210/serverImage/2024/03/17/1710658756265.jpg',
                    stepDesc: '这是步骤的描述'
                }, {
                    stepImg: 'http://localhost:9210/serverImage/2024/03/17/1710658756265.jpg',
                    stepDesc: '这是步骤的描述'
                }
            ];
            const tips = '这道菜谱很好完成，没有提示！';
            recipesData.push([coverImg, recipeTitle, recipeStory, JSON.stringify(recipeMaterials), JSON.stringify(recipeSteps), tips]);
        }

        await connection.query(`
   INSERT INTO ${recipesTable} (coverImg, recipeTitle, recipeStory, recipeMaterials, recipeSteps, tips) VALUES ?
`, [recipesData]);


        console.log('Recipes table created, data inserted');
    } catch (error) {
        console.error('Error creating recipes tables and inserting data:', error);
    }
};

module.exports = { initRecipes };
