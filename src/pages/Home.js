import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';

const Home = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('https://abhinav-blog-website.onrender.com/api/posts');
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error.message);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#fff', backgroundColor: '#121212', minHeight: '100vh', paddingBottom: '3rem' }}>
            <header style={{ padding: '2rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>The Rise Blog</h1>
                <p style={{ fontSize: '1rem', color: '#aaa' }}>Your HQ for amazing articles and insights</p>
            </header>

            <section style={{ padding: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem' }}>
                {blogs.map((blog) => (
                    <BlogCard key={blog.id} id={blog.id} title={blog.title} author={blog.author} content={blog.content} />
                ))}
            </section>
        </div>
    );
};

export default Home;
