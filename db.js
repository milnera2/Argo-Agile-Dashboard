import { connect } from 'mongoose'


// Build Connection URI
import {DB_USER, DB_PASS} from './Configs/configs.js'

const CONN_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@ase220.fuj5ad5.mongodb.net/Argo?appName=ASE220`;

// Init the driver

// Creates connection to MongoDB
async function createConnection () {
    try {
        console.log("Connecting to DB")
        await connect(CONN_URI);

        console.log("Connected to DB");
    } catch (err) {
        console.log("Error in DB connect")
        console.error(err);
    }
}
export default createConnection;