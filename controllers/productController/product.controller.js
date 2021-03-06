const {productServices} = require(`../../services`)
const {hasher} = require(`../../helpers`)
const {errorHandler} = require(`../../errors`)
const {errors: {INVALIDID}} = require(`../../constants`)

module.exports = {

    getProduct: async (req, res) => {
        const allProduct = await productServices.getProduct();
        res
            .json(allProduct)
            .end();
    },

    getoneProduct: async (req, res, next) => {
        const {productId} = req.params;

        const product = await productServices.getOneProduct(productId);

        if (!product) {
            return next(new errorHandler(INVALIDID, 404, 4041));
        }

        res
            .json(product)
            .end()
    },

    createProducts: async (req, res) => {
        const product = req.body;

        product.kupon = await hasher(product.kupon);

        await productServices.AddProduct(product);

        res.end();
    },

    deletProduct: async (req, res, next) => {
        const {productId} = req.params;
        const product = await productServices.getOneProduct(req.params.productId);

        if (!product) {
            return next(new errorHandler(INVALIDID, 404, 4041));
        }

        await productServices.deleteProduct(productId);

        res.end();
    },

    updateProduct: async (req, res) => {
        const {productId} = req.params;
        const product = req.body;

        if (product.kupon) {
            product.kupon = await hasher(product.kupon);
        }
         await productServices.UpdateProduct(productId, req.body);
        res.end();
    }
}
