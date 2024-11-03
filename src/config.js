import * as url from 'url';


const config = {
    PORT: 8080,
    DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/uploads` },
    //MONGODB_URI: 'mongodb://localhost:27017/coder70275',
    MONGODB_URI: 'mongodb+srv://Logan:CoCGzdsBrHBX2yt8@cluster0.wjfki.mongodb.net/Logan',
    PRODUCTS_COLLECTION: 'products',
    CARTS_COLLECTION: 'carts',
    ITEMS_PER_PAGE: 3
};


export default config;