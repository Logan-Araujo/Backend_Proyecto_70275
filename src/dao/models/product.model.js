import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import config from '../../config.js';

mongoose.pluralize(null);

const collection = config.PRODUCTS_COLLECTION;

const schema = new mongoose.Schema({
    title: { type: String, required: true },
    size: { type: String, enum: ['small', 'medium', 'large'], default: 'medium' },
    description: { type: String, required: true },
    price: { type: Number, required: true }
});

schema.plugin(mongoosePaginate);

const model = mongoose.model(collection, schema);

export default model;