import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === 'admin@blog.com' && password === 'abcd') {
            navigate('/admin');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div style={{
            padding: '2rem',
            maxWidth: '400px',
            margin: '2rem auto',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
            <h1 style={{
                textAlign: 'center',
                marginBottom: '1.5rem',
                color: '#333'
            }}>Login</h1>
            <form onSubmit={handleLogin} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required
                    style={{
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '1rem'
                    }} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required
                    style={{
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '1rem'
                    }} />
                <button type="submit" style={{
                    padding: '0.75rem',
                    border: 'none',
                    borderRadius: '4px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}>Login</button>
            </form>
        </div>
    );
};

export default Login;
