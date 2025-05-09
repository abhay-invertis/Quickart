import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';
import userRouter from './route/user.route.js';
import categoryRouter from './route/category.route.js';
import uploadRouter from './route/upload.router.js';
import subCategoryRouter from './route/subCategory.route.js';
import productRouter from './route/product.route.js';
import cartRouter from './route/cart.route.js';
import addressRouter from './route/address.route.js';
import orderRouter from './route/order.route.js';

// Load environment variables from .env
dotenv.config();

const app = express();

// CORS Configuration
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,  // Ensure this matches the frontend URL
}));

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev')); // Logs HTTP requests in a readable format
app.use(helmet({
    crossOriginResourcePolicy: false,  // Allows cross-origin requests (important for API calls)
}));

// API Routes
app.get('/', (req, res) => {
    res.json({
        message: `Server is running on port ${process.env.PORT || 8080}`,
    });
});

app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/file', uploadRouter);
app.use('/api/subcategory', subCategoryRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

// Connect to MongoDB and start the server
connectDB()
    .then(() => {
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit the process if MongoDB connection fails
    });
