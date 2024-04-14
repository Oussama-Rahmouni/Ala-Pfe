import mongoose from 'mongoose';

const connect = async () => {
    const retryInterval = 5000; 
    const connectWithRetry = async () => {
        try {
            await mongoose.connect(process.env.MONGO_URL);
            console.log("Connected to database !!!");
        } catch (error) {
            console.log("Database connection failed. Retrying in 5 seconds...", error);
            setTimeout(connectWithRetry, retryInterval);
        }
    };

    connectWithRetry();
};

export default connect;
