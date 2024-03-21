const faker = require('faker');

const insertRandomComments = async (connection, recipeId, recipesCommentTable) => {
    for (let i = 0; i < 12; i++) {
        const randomUserId = faker.datatype.number({ min: 1, max: 6 }); // 模拟随机用户ID
        const randomComment = faker.lorem.sentence(); // 模拟随机评论内容
        const randomCommentTime = faker.date.past().toISOString(); // 模拟随机评论时间

        await connection.query(`
            INSERT INTO ${recipesCommentTable} (id, commentTime, commentAuthor, commentDesc)
            VALUES (?, ?, ?, ?)
        `, [recipeId, randomCommentTime, randomUserId, randomComment]);
    }
};

const initRecipes = async (connection, recipesTable, recipesCommentTable) => {
    try {
        // 创建食谱表
        await connection.query(`
            CREATE TABLE IF NOT EXISTS ${recipesTable} (
                id INT AUTO_INCREMENT PRIMARY KEY,
                coverImg VARCHAR(255) NOT NULL DEFAULT 'http://localhost:9210/serverImage/2024/03/17/1710658756265.jpg',
                recipeTitle VARCHAR(255) NOT NULL DEFAULT '食谱标题test专用',
                recipeStory TEXT,
                recipeMaterials JSON NOT NULL DEFAULT '[{"materialName":"鸡蛋","materialDosage":"6个"},{"materialName":"鸡蛋","materialDosage":"6个"},{"materialName":"鸡蛋","materialDosage":"6个"}]',
                recipeSteps JSON NOT NULL DEFAULT '[{"stepImg":"http://localhost:9210/serverImage/2024/03/17/1710658756265.jpg","stepDesc":"这是步骤的描述"}]',
                goodCount INT DEFAULT 0,
                collectionCount INT DEFAULT 0
            )
        `);

        // 插入默认食谱数据
        for (let i = 0; i < 30; i++) {
            const recipeTitle = faker.lorem.words(7); // 模拟随机食谱标题
            await connection.query(`
                INSERT INTO ${recipesTable} (recipeTitle) VALUES (?)
            `, [recipeTitle]);

            // 获取插入的食谱数据的 id
            const [rows] = await connection.query('SELECT LAST_INSERT_ID() as id');
            const recipeId = rows[0].id;

            // 向食谱评论表插入随机评论数据
            await insertRandomComments(connection, recipeId, recipesCommentTable);
        }

        console.log('Recipes table created, data inserted, and comments added successfully');
    } catch (error) {
        console.error('Error creating recipes tables and inserting data:', error);
    }
};

module.exports = { initRecipes };
