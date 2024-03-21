const { initRecipes } = require('./initRecipes');
const { RecipesTable, RecipesCommentTable } = require('../../constant/database.js');

const checkAndInitTable = async (ctx) => {
    try {
        // 检查表是否存在
        const [existingTables] = await ctx.db_connection.query('SHOW TABLES LIKE ?', [RecipesTable]);

        if (existingTables.length === 0) {
            // 如果表不存在，则进行初始化表的操作
            await initRecipes(ctx, RecipesTable, RecipesCommentTable);
        }
    } catch (error) {
        console.error('Error checking table existence:', error);
    }
};
// 获取所有食谱的信息
const getAllRecipes = async (ctx) => {
    try {
        // 在查询之前进行表存在性检查
        await checkAndInitTable(ctx);

        // 执行查询操作
        const [recipes] = await ctx.db_connection.query(`SELECT * FROM ${RecipesTable}`);
        ctx.status = 200;
        ctx.body = {
            code: 200,
            status: 'success',
            data: recipes,
            message: '获取所有食谱成功'
        };
    } catch (error) {
        ctx.status = error.status || 500;
        ctx.body = {
            code: error.status || 500,
            status: 'error',
            statusMessage: error.message
        };
    }
};
// 分页/分段获取食谱
const getRecipesByPage = async (ctx, page, pageSize) => {
    try {
        // 在查询之前进行表存在性检查
        await checkAndInitTable(ctx);

        const offset = (page - 1) * pageSize;
        const [recipes] = await ctx.db_connection.query(`SELECT * FROM ${RecipesTable} LIMIT ?, ?`, [offset, pageSize]);
        ctx.status = 200;
        ctx.body = {
            code: 200,
            status: 'success',
            data: recipes,
            message: '获取食谱成功'
        };
    } catch (error) {
        ctx.status = error.status || 500;
        ctx.body = {
            code: error.status || 500,
            status: 'error',
            statusMessage: error.message
        };
    }
};

// 增加一个食谱
const addRecipe = async (ctx, recipeData) => {
    try {
        // 在数据库中插入新的食谱信息
        const result = await ctx.db_connection.query(`INSERT INTO ${RecipesTable} SET ?`, recipeData);

        ctx.status = 200;
        ctx.body = {
            code: 200,
            status: 'success',
            data: result,
            message: '食谱添加成功'
        };
    } catch (error) {
        ctx.status = error.status || 500;
        ctx.body = {
            code: error.status || 500,
            status: 'error',
            statusMessage: error.message
        };
    }
};
// 删除一个食谱
const deleteRecipe = async (ctx, recipeId) => {
    try {
        // 在数据库中删除指定ID的食谱信息
        const result = await ctx.db_connection.query(`DELETE FROM ${RecipesTable} WHERE id = ?`, [recipeId]);

        ctx.status = 200;
        ctx.body = {
            code: 200,
            status: 'success',
            data: result,
            message: '食谱删除成功'
        };
    } catch (error) {
        ctx.status = error.status || 500;
        ctx.body = {
            code: error.status || 500,
            status: 'error',
            statusMessage: error.message
        };
    }
};
// 修改一个食谱
const updateRecipe = async (ctx, recipeId, updatedData) => {
    try {
        // 在数据库中更新指定ID的食谱信息
        const result = await ctx.db_connection.query(`UPDATE ${RecipesTable} SET ? WHERE id = ?`, [updatedData, recipeId]);

        ctx.status = 200;
        ctx.body = {
            code: 200,
            status: 'success',
            data: result,
            message: '食谱更新成功'
        };
    } catch (error) {
        ctx.status = error.status || 500;
        ctx.body = {
            code: error.status || 500,
            status: 'error',
            statusMessage: error.message
        };
    }
};
module.exports = {
    getAllRecipes,
    getRecipesByPage,
    addRecipe,
    deleteRecipe,
    updateRecipe
};