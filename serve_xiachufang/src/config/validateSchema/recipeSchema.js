const joi = require('joi');

// 创建时间是数据库层面自动插入的，不需要验证
// 公共部分
const idSchema = {
    id: joi.number().integer().required()
};
const commonSchema = {
    coverImg: joi.string().uri().required(),
    recipeTitle: joi.string().required(),
    recipeStory: joi.string(),
    recipeMaterials: joi.array().items(
        joi.object({
            materialName: joi.string().required(),
            materialDosage: joi.string().required()
        })
    ).required(),
    recipeSteps: joi.array().items(
        joi.object({
            stepImg: joi.string().uri().required(),
            stepDesc: joi.string().required()
        })
    ).required(),
    tips: joi.string().allow(null)
};

// 新增
const addSchema = {
    ...commonSchema,
    founder: joi.number().integer().required()
};

// 更新
const updateSchema = {
    ...commonSchema,
    idSchema
};

// 单独修改值的Schema
const goodCountSchema = {
    idSchema,
    goodCount: joi.number().integer().required()
};

const collectionCountSchema = {
    idSchema,
    collectionCount: joi.number().integer().required()
};

const auditStatusSchema = {
    idSchema,
    auditStatus: joi.number().integer().required()
};

const recommendedStatusSchema = {
    idSchema,
    recommendedStatus: joi.number().integer().required()
};

// 删除的校验规则
const deleteSchema = {
    idSchema
};

// 统一错误格式
const validateRecipes = (data, schema) => {
    const { error, value } = joi.object(schema).validate(data, { abortEarly: false });
    if (error) {
        return {
            error: {
                code: 200, // 可根据错误类型定义不同的错误码
                message: 'Validation error',
                details: error.details.map(d => ({
                    message: d.message,
                    context: d.context.key  // 指明出错的字段
                }))
            }
        };
    }
    return { value };
};

// 参数校验的封装
const createValidator = (schema) => {
    return (data) => {
        return validateRecipes(data, schema);
    };
};

const addValidate = createValidator(addSchema);
const updateValidate = createValidator(updateSchema);
const goodCountValidate = createValidator(goodCountSchema);
const collectionCountValidate = createValidator(collectionCountSchema);
const auditStatusValidate = createValidator(auditStatusSchema);
const recommendedStatusValidate = createValidator(recommendedStatusSchema);
const deleteValidate = createValidator(deleteSchema);

module.exports = {
    addValidate,
    updateValidate,
    goodCountValidate,
    collectionCountValidate,
    auditStatusValidate,
    recommendedStatusValidate,
    deleteValidate
};