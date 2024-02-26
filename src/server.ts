import express from 'express';
import router from './routes/routes';
import MongoDB from './config/database/mongodb.config';
class Server {
    private port: number;
    private app: express.Application;

    constructor(port: number) {
        this.port = port;
        this.app = express(); // Aquí debes importar el módulo 'express' si no lo has hecho aún
        this.configureSecurity();
        this.configureRoutes();
        this.configureDatabase();
    }

    
    private configureRoutes() {
        this.app.use('/api',router);
    }

    // Método para configurar middlewares
    private configureMiddlewares() {
        // Configura tus middlewares aquí
    }

    // Método para configurar la base de datos
    private async configureDatabase() {
        const database = new MongoDB();
        await database.connect('localhost', 27017, 'stg_database');
        // Configura tu base de datos aquí
    }

    // Método para configurar la seguridad
    private configureSecurity() {
        this.app.use(express.json(), express.urlencoded({ extended: true }));
        // Configura la seguridad aquí
    }


    public start() {
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        });
    }
}

export default Server;
