const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs-extra');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());

// Increase the body-parser limit for JSON content if necessary
app.use(bodyParser.json({ limit: '10mb' })); // Adjust this limit to suit your needs
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Serve uploaded images statically
app.use('/uploads', express.static('uploads'));

// Path to JSON file for storing blogs
const BLOGS_FILE = './blogs.json';

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Directory for uploaded files
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique file name
    },
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // Set the limit for file size, 10MB

// Helper functions to read/write blogs
const readBlogs = async () => {
    try {
        const data = await fs.readFile(BLOGS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        // If file doesn't exist, return empty array
        return [];
    }
};

const writeBlogs = async (blogs) => {
    await fs.writeFile(BLOGS_FILE, JSON.stringify(blogs, null, 2));
};

// Routes
app.get('/api/posts', async (req, res) => {
    const blogs = await readBlogs();
    res.json(blogs);
});

app.post('/api/posts', upload.array('images', 5), async (req, res) => {
    const { title, content, author } = req.body;
    const images = req.files ? req.files.map((file) => `/uploads/${file.filename}`) : [];

    if (!title || !content || !author) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const blogs = await readBlogs();
    const newBlog = {
        id: blogs.length + 1,
        title,
        content,
        author,
        images, // Add uploaded image URLs
    };

    blogs.push(newBlog);
    await writeBlogs(blogs);
    res.status(201).json(newBlog);
});

app.get('/api/posts/:id', async (req, res) => {
    const blogs = await readBlogs();
    const blog = blogs.find((b) => b.id === parseInt(req.params.id, 10));
    if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
