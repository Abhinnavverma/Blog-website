const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs-extra');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());


app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


app.use('/uploads', express.static('uploads'));


const BLOGS_FILE = './blogs.json';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); 
    },
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); 


const readBlogs = async () => {
    try {
        const data = await fs.readFile(BLOGS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
       
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
        images, 
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


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
