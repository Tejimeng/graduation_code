const joi = require('joi');

const verificationCodeSchema = {
    account: joi.string().required()
};
const passwordSchema = {
    account: joi.string().required(),
    password: joi.string().required()
};
// 新增
const addSchema = {
    account: joi.string().required()
};

// 更新
const updateSchema = {
    id: joi.number().integer().required(),
    password: joi.string().required()
};

// 删除
const deleteSchema = {
    id: joi.number().integer().required()
};

// 统一错误格式
const validateUser = (data, schema) => {
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
        return validateUser(data, schema);
    };
};

const addValidate = createValidator(addSchema);
const updateValidate = createValidator(updateSchema);
const deleteValidate = createValidator(deleteSchema);
const verificationCodeValidate = createValidator(verificationCodeSchema);
const passwordValidate = createValidator(passwordSchema);

module.exports = {
    addValidate,
    updateValidate,
    deleteValidate,
    verificationCodeValidate,
    passwordValidate
};
