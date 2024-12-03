import React, { useState } from 'react';
import axios from 'axios';

const Admin = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState([]); // Array to hold blog content
    const [currentText, setCurrentText] = useState('');

    // Add text to the blog content
    const handleAddText = () => {
        if (currentText.trim() !== '') {
            setContent([...content, { type: 'text', data: currentText }]);
            setCurrentText(''); // Clear the text input
        }
    };

    // Add image to the blog content
    const handleAddImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setContent([...content, { type: 'image', data: reader.result }]); // Add image as base64
            };
            reader.readAsDataURL(file);
        }
    };

    // Submit the blog
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/posts', { title, author, content });
            alert('Blog added successfully!');
            setTitle('');
            setAuthor('');
            setContent([]);
        } catch (error) {
            console.error('Error adding blog:', error.message);
        }
    };

    return (
        <div style={{
            fontFamily: "'Poppins', sans-serif",
            color: '#fff',
            backgroundColor: '#121212',
            minHeight: '100vh',
            paddingBottom: '3rem',
            paddingTop: '2rem',
        }}>
            <header style={{ padding: '2rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Admin Dashboard</h1>
                <p style={{ fontSize: '1rem', color: '#aaa' }}>Manage your blog posts here</p>
            </header>

            <section style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                maxWidth: '900px',
                margin: '0 auto',
            }}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{
                        padding: '1rem',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '1.1rem',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#2A2A2A',
                        color: '#fff',
                    }}
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    style={{
                        padding: '1rem',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '1.1rem',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#2A2A2A',
                        color: '#fff',
                    }}
                />
                <textarea
                    placeholder="Write your text here..."
                    value={currentText}
                    onChange={(e) => setCurrentText(e.target.value)}
                    style={{
                        padding: '1rem',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '1.1rem',
                        minHeight: '120px',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#2A2A2A',
                        color: '#fff',
                    }}
                />
                <button type="button" onClick={handleAddText} style={{
                    padding: '0.75rem',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    transition: 'background-color 0.3s',
                    marginTop: '1rem',
                }}>
                    Add Text
                </button>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleAddImage}
                    style={{
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '1.1rem',
                        backgroundColor: '#2A2A2A',
                        color: '#fff',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                        marginTop: '1rem',
                    }}
                />
                <button type="submit" onClick={handleSubmit} style={{
                    padding: '0.75rem',
                    backgroundColor: '#28A745',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    marginTop: '1rem',
                }}>
                    Publish Blog
                </button>
            </section>

            <div style={{ marginTop: '2rem' }}>
                <h2 style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontSize: '2rem',
                    marginBottom: '1.5rem',
                }}>Blog Preview</h2>
                <div style={{
                    padding: '1.5rem',
                    backgroundColor: '#2A2A2A',
                    borderRadius: '8px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                    marginTop: '2rem',
                    color: '#fff',
                }}>
                    <h3 style={{ fontSize: '1.8rem', color: '#fff' }}>{title}</h3>
                    <p style={{ fontSize: '1.1rem', color: '#aaa' }}><strong>By:</strong> {author}</p>
                    {content.map((item, index) =>
                        item.type === 'text' ? (
                            <p key={index} style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{item.data}</p>
                        ) : (
                            <img
                                key={index}
                                src={item.data}
                                alt={`Blog Content ${index + 1}`}
                                style={{ width: '100%', marginBottom: '1rem', borderRadius: '8px' }}
                            />
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;
