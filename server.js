import app from './app.js';
import {config} from 'dotenv'
import connectToDB from './config/dbConnection.js';
config();

// set the port
const PORT = process.env.PORT || 5000;

// run the server
app.listen(PORT, async () => {
    await connectToDB();
    console.log(`Server is running at http:localhost:${PORT}`);
});

