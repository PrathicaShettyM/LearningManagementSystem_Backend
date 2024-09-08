import mongoose from 'mongoose';

// if any field is missing, just return empty object, dont cause the server to breakdown
mongoose.set('strictQuery', false);

const connectToDB = async () => {
    try{
        const { connection } = await mongoose.connect(
            process.env.MONGO_URI || `mongodb://127.0.0.1:27017/lms`
        );
        if(connection){
            console.log(`Connection to MongoDB: ${connection.host}`)
        }
    } catch(e){
        console.log(e);
        process.exit(1);
    }
}

export default connectToDB;