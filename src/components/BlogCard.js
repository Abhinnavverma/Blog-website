import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Blogcard.css';

const BlogCard = ({ id, title, author, content = [] }) => {
    // Log the content to verify its structure
    console.log('Content:', content);

    // Find the first image in the content array
    const blogImage = content.find(item => item.type === 'image')?.data;

    return (
        <div 
            style={{
                backgroundColor: '#1e1e1e',
                borderRadius: '10px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
                overflow: 'hidden',
                width: '300px',
                color: '#fff',
                textAlign: 'left',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                
            }}
            className="blog-card"
        >
            {/* Image Section */}
            <div>
                
                <img
                // eslint-disable-next-line
                    src={blogImage || 'https://via.placeholder.com/150x100.png?text=Blog+Photo'}
                    alt="Blog Image"
                    style={{
                        
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                    }}
                />
            </div>

            {/* Card Content */}
            <div style={{ padding: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                    {title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#aaa' }}>
                    By {author}
                </p>
                <Link
                    to={`/blog/${id}`}
                    style={{
                        color: '#4A90E2',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        textDecoration: 'none',
                        display: 'inline-block',
                        marginTop: '0.5rem',
                        transition: 'color 0.3s ease',
                    }}
                    className="read-more"
                >
                    Read More
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;


