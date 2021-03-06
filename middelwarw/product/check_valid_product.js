const Joi = require(`joi`);
const {productsValidators: {newProductValidator}} = require(`../../validators/`)
const ErrorHandler = require(`../../errors/errorHandler`)
module.exports = async (req, res, next) => {
    try {
        const product = req.body;

        const {error} = Joi.validate(product, newProductValidator);

        if (error) {
            return next(new ErrorHandler(error.details[0].message, 400))
        }

        next();
    } catch (e) {
        console.log(e);
    }
}
