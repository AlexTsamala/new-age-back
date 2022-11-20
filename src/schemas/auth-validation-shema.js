import Joi from "joi";

const authValidation = async () => {
    
    return Joi.object({
        firstName: Joi.string()
        .required()
        .messages({
            "string.base": "firstName should be a string",
            "any.required": "firstName is required",
          }),
        lastName: Joi.string()
        .required()
        .messages({
            "string.base": "lastName should be a string",
            "any.required": "lastName is required",
        }),
        birthday: Joi.string()
        .required()
        .messages({
            "string.base": "birthday should be a string",
            "any.required": "birthday is required",
        }),
        email: Joi.string()
        .email()
        .required()
        .messages({
            "string.base":"Mail should be string",
            "string.email":"Mail should be email format",
            "any.required":"Mail is required"
        }),

        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required()
        .messages({
            "string.base":"Password should be string",
            "string.pattern":"Password should contain at least 3 characters",
            "string.pattern":"Password should contain English letters and numbers only",
            "any.required":"Password is required"
        }),
  });
};

export default authValidation;
