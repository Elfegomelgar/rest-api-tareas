import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import TasksRoutes from "./routes/tasks.routes";

const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//middlewares

app.use(cors());
//app.use(cors({
//    origin: 'http://localhost:3000'
//}));
app.use(morgan('dev'));
app.use(express.json({type: "application/json"}));
app.use(express.urlencoded({extended: false}));

//Routes
app.get('/', (req,res) => {
    res.json({message: "Bienvenido a la aplicacion"});
})

app.use('/api/tasks',TasksRoutes);

export default app;