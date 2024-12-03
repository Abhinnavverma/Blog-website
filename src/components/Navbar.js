import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav
        style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            backgroundColor: '#1e1e1e',
            color: '#fff',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            fontFamily: "'Poppins', sans-serif",
        }}
    >
        <h1
            style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                transition: 'color 0.3s ease',
            }}
        >
            BlogSite
        </h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
            <Link
                to="/"
                style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: '500',
                    fontSize: '1rem',
                    transition: 'color 0.3s ease',
                }}
                className="nav-link"
            >
                Home
            </Link>
            <Link
                to="/login"
                style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: '500',
                    fontSize: '1rem',
                    transition: 'color 0.3s ease',
                }}
                className="nav-link"
            >
                Admin
            </Link>
        </div>
    </nav>
);

export default Navbar;
