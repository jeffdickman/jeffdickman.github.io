require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/personal-blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Models
const Post = mongoose.model('Post', {
    title: String,
    excerpt: String,
    content: String,
    readTime: Number,
    image: String,
    date: { type: Date, default: Date.now },
    author: String
});

const User = mongoose.model('User', {
    username: String,
    password: String
});

// Authentication middleware
const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

// Routes
app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        
        if (!user) {
            throw new Error('Unable to login');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Unable to login');
        }

        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
        res.send({ user, token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.post('/api/posts', auth, async (req, res) => {
    try {
        const post = new Post({
            ...req.body,
            author: req.user.username
        });
        await post.save();
        res.status(201).send(post);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
