import express from 'express';
import router from './routes/routes.js';
import { testConnection } from './database/db.js';

const app = express();

app.use(express.json()); // Untuk parsing JSON
app.use(express.urlencoded({ extended: true })); // Untuk parsing form-data

// Gunakan rute
app.use('/api', router);

const port = process.env.APP_PORT || 3000;

app.listen(port, async () => {
    await testConnection(); 
    console.log(`Server berjalan di http://localhost:${port}`);
});
