const Chance = require('chance');
const chance = new Chance();

const insertRandomComments = async (connection, recipeId, recipesCommentTable) => {
    const comments = [];
    const currentTime = Date.now();
    const oneMonthAgo = currentTime - (30 * 24 * 60 * 60 * 1000);

    for (let i = 0; i < 12; i++) {
        const randomUserId = chance.integer({ min: 1, max: 6 }); // 模拟随机用户ID
        const randomComment = chance.sentence(); // 模拟随机评论内容
        const randomTimeWithinMonth = Math.floor(Math.random() * (currentTime - oneMonthAgo) + oneMonthAgo); // 生成一个一个月内的随机时间戳

        comments.push([recipeId, randomTimeWithinMonth, randomUserId, randomComment]);
    }

    await connection.query(`
        INSERT INTO ${recipesCommentTable} (id, commentTime, commentAuthor, commentDesc)
        VALUES ?
    `, [comments]);
};

const initRecipesComment = async (connection, recipesTable, recipesCommentTable) => {
    try {
        await connection.query(`
           CREATE TABLE IF NOT EXISTS ${recipesCommentTable} (
                id INT AUTO_INCREMENT PRIMARY KEY,
                recipeId INT NOT NULL,
                commentTime VARCHAR(255) NOT NULL,
                commentAuthor INT NOT NULL,
                commentDesc TEXT NOT NULL,
                FOREIGN KEY (recipeId) REFERENCES ${recipesTable}(id)
)
        `);
        const [insertedRecipes] = await connection.query(`SELECT id FROM ${recipesTable}`);
        console.log(insertedRecipes);

        for (const { id } of insertedRecipes) {
            await insertRandomComments(connection, id, recipesCommentTable);
        }

        console.log('RecipesComment table created, and comments added successfully');
    } catch (error) {
        console.error('Error creating RecipesComment tables and inserting data:', error);
    }
};

module.exports = { initRecipes: initRecipesComment };
