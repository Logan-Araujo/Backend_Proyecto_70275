import cartModel from './models/cart.model.js';
import config from '../config.js'

class CartController {
    constructor() {}

    get = async () => {
        try {
            //return await cartModel.find().lean();
            return await cartModel.find().populate({ path: 'products._id', model: cartModel, select: 'name, price' }).lean();
        } catch (err) {
            return err.message;
        }
    }

    getPaginated = async (pg) => {
        try {
            return await cartModel.paginate({}, { limit: config.ITEMS_PER_PAGE, page: pg, lean: true});
        } catch (err) {
            return err.message;
        }
    }

    add = async (data) => {
        try {
            return await cartModel.create(data);
        } catch (err) {
            return err.message;
        }
    }

    update = async (filter, updated, options) => {
        try {
            return await cartModel.findOneAndUpdate(filter, updated, options);
        } catch (err) {
            return err.message;
        }
    }

    delete = async (filter, options) => {
        try {
            return await cartModel.findOneAndDelete(filter, options);
        } catch (err) {
            return err.message;
        }
    }
}


export default CartController;