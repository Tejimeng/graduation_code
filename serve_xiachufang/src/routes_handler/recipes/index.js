const { initRecipes } = require('./initRecipes');
const { RecipesTable } = require('../../constant/database.js');

const checkAndInitTable = async (ctx) => {
    try {
        // 检查表是否存在
        const [existingTables] = await ctx.db_connection.query('SHOW TABLES LIKE ?', [
            RecipesTable
        ]);

        if (existingTables.length === 0) {
            // 如果表不存在，则进行初始化表的操作
            await initRecipes(ctx.db_connection, RecipesTable);
        }
    } catch (error) {
        console.error('Error checking table existence:', error);
    }
};


//同时在返回时对json进行数组的转化然后进行返回


// 获取所有食谱的信息
const getAllRecipes = async (ctx) => {
    console.log(1111);
    try {
        // 在查询之前进行表存在性检查
        await checkAndInitTable(ctx);

        // 执行查询操作
        const [recipes] = await ctx.db_connection.query(`SELECT * FROM ${RecipesTable}`);
        // 将 JSON 数据字段转换成数组 貌似不需要
        // const recipesArray = recipes.map(recipe => {
        //     return {
        //         ...recipe,
        //         // 将 JSON 字段转换成数组
        //         recipeMaterials: JSON.parse(recipe.recipeMaterials),
        //         recipeSteps: JSON.parse(recipe.recipeSteps)
        //     };
        // });
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
const getRecipesByPage = async (ctx) => {
    try {
        // 在查询之前进行表存在性检查
        await checkAndInitTable(ctx);
        // 从 ctx 对象中获取 page 和 pageSize 参数，如果不存在则使用默认值
        const queryData = ctx.request.query;
        let page = parseInt(queryData.page, 10);
        let pageSize = parseInt(queryData.pageSize, 10);

        // 确保 page 不小于 1，并转换为整数，若小于1则使用默认值1
        page = page && page > 0 ? page : 1;

        // 确保 pageSize 不小于 1，并转换为整数，若小于1则使用默认值10
        pageSize = pageSize && pageSize > 0 ? pageSize : 10;

        // 计算偏移量
        const offset = (page - 1) * pageSize;
        // 检测是否超出数据的总长度，返回数据已经全部加载完毕或者没有数据了



        const [recipes] = await ctx.db_connection.query(
            `SELECT * FROM ${RecipesTable} LIMIT ?, ?`,
            [offset, pageSize]
        );
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
const addRecipe = async (ctx) => {
    try {
        // 获取请求体数据
        const recipeData = ctx.request.body;

        // 在数据库中插入新的食谱信息
        const result = await ctx.db_connection.query(
            `INSERT INTO ${RecipesTable} SET ?`,
            recipeData
        );

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
const deleteRecipe = async (ctx) => {
    try {
        // 获取请求体数据
        const recipeId = ctx.request.body.recipeId;

        // 在数据库中删除指定ID的食谱信息
        const result = await ctx.db_connection.query(`DELETE FROM ${RecipesTable} WHERE id = ?`, [
            recipeId
        ]);

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
const updateRecipe = async (ctx) => {
    try {
        // 获取请求体数据
        const recipeId = ctx.request.body.recipeId;
        const updatedData = ctx.request.body.updatedData;

        // 在数据库中更新指定ID的食谱信息
        const result = await ctx.db_connection.query(`UPDATE ${RecipesTable} SET ? WHERE id = ?`, [
            updatedData,
            recipeId
        ]);

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
