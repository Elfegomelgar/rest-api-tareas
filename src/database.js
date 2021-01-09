import mongoose, { mongo } from 'mongoose';
import config from './config';

(async () => {
    try {
        const db = await mongoose.connect( config.mongodbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log("Conexion a base de datos: ",db.connection.name);
    } catch (error) {
        console.error(error);
    }
})();

