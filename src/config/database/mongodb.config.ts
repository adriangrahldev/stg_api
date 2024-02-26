import mongoose from 'mongoose';

class MongoDB {
    private static instance: MongoDB;
    private connection!: mongoose.Connection;

     constructor() {}

    public static getInstance(): MongoDB {
        if (!MongoDB.instance) {
            MongoDB.instance = new MongoDB();
        }
        return MongoDB.instance;
    }

    public async connect(host: string, port: number, dbName: string): Promise<void> {
        const uri = `mongodb://${host}:${port}/${dbName}`;
        try {
            await mongoose.connect(uri, {});
            this.connection = mongoose.connection;
            console.log('Database connected');
        } catch (error) {
            console.error('Error connecting to database: ', error);
            process.exit(1);
        }
    }

    public getConnection(): mongoose.Connection {
        return this.connection;
    }
}

export default MongoDB;