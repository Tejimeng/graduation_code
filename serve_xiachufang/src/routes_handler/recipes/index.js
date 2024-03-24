const { initRecipes, insertRecipesDefaultValue } = require('../../config/initTable/initRecipes');
const { RecipesTable, UserInfoTable } = require('../../constant/database.js');
const {
    addValidate,
    updateValidate,
    goodCountValidate,
    collectionCountValidate,
    auditStatusValidate,
    recommendedStatusValidate,
    deleteValidate
} = require('../../config/validateSchema/recipeSchema');
const checkAndInitTable = async (ctx) => {
    try {
        // 检查表是否存在
        const [existingTables] = await ctx.db_connection.query('SHOW TABLES LIKE ?', [RecipesTable]);

        if (existingTables.length === 0) {
            // 如果表不存在，则进行初始化表的操作
            await initRecipes(ctx.db_connection, RecipesTable);
        } else {
            // 表存在但没有数据的情况
            const [rowCount] = await ctx.db_connection.query(`SELECT COUNT(*) as count FROM ${RecipesTable}`);
            const dataCount = rowCount[0].count;

            if (dataCount === 0) {
                // 如果表存在但没有数据，则进行初始化表的操作
                await insertRecipesDefaultValue(ctx.db_connection, RecipesTable);
            }
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
        // 将 JSON 数据字段转换成数组 貌似不需要,有待商榷
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
// 移动端 获取推荐食谱 审核通过
const getAppRecommendedRecipes = async (ctx) => {
    // 此处只返回审核通过的 推荐后续再写
    // 返回食谱封面、标题、所属用户头像、用户名，默认一次返回6个
    try {
        // 在查询之前进行表存在性检查
        await checkAndInitTable(ctx);
        const queryData = ctx.request.query;
        let page = parseInt(queryData.page, 10);
        let pageSize = parseInt(queryData.pageSize, 10);
        // 计算偏移量
        const offset = (page - 1) * pageSize;

        // 执行查询操作，返回食谱封面、标题、所属用户头像、用户名，根据分页和每页数量返回对应数据
        const [recommendedRecipes] = await ctx.db_connection.query(
            `SELECT r.id, r.coverImg, r.recipeTitle, u.avatar AS founderAvatar, u.username AS founderUsername
             FROM ${RecipesTable} r
             JOIN ${UserInfoTable} u ON r.founder = u.id
             WHERE r.recommendedStatus = 1 AND r.auditStatus = 1
             LIMIT ${pageSize} OFFSET ${offset}`
        );

        // 查询总数，用于判断是否还有更多数据
        const totalCountQuery = await ctx.db_connection.query(
            `SELECT COUNT(*) AS total FROM ${RecipesTable} WHERE AND auditStatus = 1`
        );
        const totalCount = totalCountQuery[0][0].total;
        const hasMore = totalCount > (page * pageSize);

        ctx.status = 200;
        ctx.body = {
            code: 200,
            status: 'success',
            data: recommendedRecipes,
            hasMore: hasMore,
            message: '获取推荐食谱成功'
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
// 后管 分页/分段获取食谱
const getRecipesByPage = async (ctx) => {
    try {
        await checkAndInitTable(ctx);
        const queryData = ctx.request.query;
        let page = parseInt(queryData.page, 10);
        let pageSize = parseInt(queryData.pageSize, 10);
        // page = page && page > 0 ? page : 1;
        // pageSize = pageSize && pageSize > 0 ? pageSize : 10;
        const offset = (page - 1) * pageSize;
        // 查询数据库获取食谱数据和总数
        const [result] = await ctx.db_connection.query(
            `SELECT SQL_CALC_FOUND_ROWS * FROM ${RecipesTable} LIMIT ?, ?; SELECT FOUND_ROWS() as total;`,
            [offset, pageSize]
        );
        const recipes = result[0];
        const total = result[1][0].total;
        const hasMore = total > offset + recipes.length;

        ctx.status = 200;
        ctx.body = {
            code: 200,
            status: 'success',
            data: recipes,
            hasMore: hasMore,
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

        // 校验数据
        const validationResult = addValidate(recipeData);
        if (validationResult.error) {
            ctx.status = 400;
            ctx.body = {
                code: 400,
                status: 'error',
                message: '新增食谱数据校验失败',
                errors: validationResult.error
            };
            return;
        }

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
            statusMessage: error.message,
            message: '服务器出问题了，请稍后再试'
        };
    }
};

// 删除一个食谱
const deleteRecipe = async (ctx) => {
    try {
        // 获取请求体数据
        const recipeId = ctx.request.body.recipeId;

        // 校验数据
        const validationResult = deleteValidate({ id: recipeId });
        if (validationResult.error) {
            ctx.status = 400;
            ctx.body = {
                code: 400,
                status: 'error',
                message: '删除食谱数据校验失败',
                errors: validationResult.error
            };
            return;
        }

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
        const { recipeId, updatedData } = ctx.request.body;

        // 校验数据
        const validationData = {
            id: recipeId,
            ...updatedData
        };
        const validationResult = updateValidate(validationData);
        if (validationResult.error) {
            ctx.status = 400;
            ctx.body = {
                code: 400,
                status: 'error',
                message: '更新食谱数据校验失败',
                errors: validationResult.error
            };
            return;
        }

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

// 修改goodCount点赞量
const updateGoodCount = async (ctx) => {
    try {
        // 获取请求体数据
        const { recipeId, goodCount } = ctx.request.body;

        // 校验数据
        const validationData = {
            id: recipeId,
            goodCount
        };
        const validationResult = goodCountValidate(validationData);
        if (validationResult.error) {
            ctx.status = 400;
            ctx.body = {
                code: 400,
                status: 'error',
                message: '更新点赞量数据校验失败',
                errors: validationResult.error
            };
            return;
        }

        // 在数据库中更新指定ID的点赞量
        const result = await ctx.db_connection.query(`UPDATE ${RecipesTable} SET goodCount = ? WHERE id = ?`, [
            goodCount,
            recipeId
        ]);

        ctx.status = 200;
        ctx.body = {
            code: 200,
            status: 'success',
            data: result,
            message: '点赞量更新成功'
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

// 修改collectionCount收藏量
const updateCollectionCount = async (ctx) => {
    try {
        // 获取请求体数据
        const { recipeId, collectionCount } = ctx.request.body;

        // 校验数据
        const validationData = {
            id: recipeId,
            collectionCount
        };
        const validationResult = collectionCountValidate(validationData);
        if (validationResult.error) {
            ctx.status = 400;
            ctx.body = {
                code: 400,
                status: 'error',
                message: '更新收藏量数据校验失败',
                errors: validationResult.error
            };
            return;
        }

        // 在数据库中更新指定ID的收藏量
        const result = await ctx.db_connection.query(`UPDATE ${RecipesTable} SET collectionCount = ? WHERE id = ?`, [
            collectionCount,
            recipeId
        ]);

        ctx.status = 200;
        ctx.body = {
            code: 200,
            status: 'success',
            data: result,
            message: '收藏量更新成功'
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

// 修改auditStatus审核状态
const updateAuditStatus = async (ctx) => {
    try {
        // 获取请求体数据
        const { recipeId, auditStatus } = ctx.request.body;

        // 校验数据
        const validationData = {
            id: recipeId,
            auditStatus
        };
        const validationResult = auditStatusValidate(validationData);
        if (validationResult.error) {
            ctx.status = 400;
            ctx.body = {
                code: 400,
                status: 'error',
                message: '更新审核状态数据校验失败',
                errors: validationResult.error
            };
            return;
        }

        // 在数据库中更新指定ID的审核状态
        const result = await ctx.db_connection.query(`UPDATE ${RecipesTable} SET auditStatus = ? WHERE id = ?`, [
            auditStatus,
            recipeId
        ]);

        ctx.status = 200;
        ctx.body = {
            code: 200,
            status: 'success',
            data: result,
            message: '审核状态更新成功'
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

// 修改recommendedStatus推荐状态
const updateRecommendedStatus = async (ctx) => {
    try {
        // 获取请求体数据
        const { recipeId, recommendedStatus } = ctx.request.body;

        // 校验数据
        const validationData = {
            id: recipeId,
            recommendedStatus
        };
        const validationResult = recommendedStatusValidate(validationData);
        if (validationResult.error) {
            ctx.status = 400;
            ctx.body = {
                code: 400,
                status: 'error',
                message: '更新推荐状态数据校验失败',
                errors: validationResult.error
            };
            return;
        }

        // 在数据库中更新指定ID的推荐状态
        const result = await ctx.db_connection.query(`UPDATE ${RecipesTable} SET recommendedStatus = ? WHERE id = ?`, [
            recommendedStatus,
            recipeId
        ]);

        ctx.status = 200;
        ctx.body = {
            code: 200,
            status: 'success',
            data: result,
            message: '推荐状态更新成功'
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

// 根据食谱的title进行搜索 后管-全部 app-审核通过 可优化结合
// 待完成
module.exports = {
    getAllRecipes,
    getRecipesByPage,
    getAppRecommendedRecipes,
    addRecipe,
    deleteRecipe,
    updateRecipe,
    updateGoodCount, // 修改goodCount点赞量
    updateCollectionCount, // 修改collectionCount收藏量
    updateAuditStatus, // 修改auditStatus审核状态
    updateRecommendedStatus // 修改recommendedStatus推荐状态
};
