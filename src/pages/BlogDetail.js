import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
                setBlog(response.data);
            } catch (error) {
                console.error('Error fetching blog:', error.message);
            }
        };
        fetchBlog();
    }, [id]);

    if (!blog) return <p style={{ color: '#fff', textAlign: 'center', padding: '2rem' }}>Loading...</p>;

    return (
        <div style={{
            padding: '2rem',
            maxWidth: '900px',
            margin: '2rem auto',
            backgroundColor: '#121212',
            color: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            fontFamily: "'Poppins', sans-serif"
        }}>
            <h1 style={{ color: '#fff', marginBottom: '1rem', fontSize: '2.5rem' }}>{blog.title}</h1>
            <div style={{ color: '#aaa', marginBottom: '2rem', fontSize: '1rem', lineHeight: '1.6' }}>
                {blog.content.map((item, index) => {
                    if (item.type === 'text') {
                        return <p key={index} style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{item.data}</p>;
                    } else if (item.type === 'image') {
                        return (
                            // eslint-disable-next-line
                            <img
                                key={index}
                                src={item.data}
                                alt="Blog Image"
                                style={{
                                    width: '100%',
                                    borderRadius: '8px',
                                    marginBottom: '2rem',
                                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
                                }}
                            />
                        );
                    }
                    return null;
                })}
            </div>
            <p style={{
                textAlign: 'right',
                color: '#aaa',
                fontStyle: 'italic',
                fontSize: '1rem'
            }}>
                By {blog.author}
            </p>
        </div>
    );
};

export default BlogDetail;
