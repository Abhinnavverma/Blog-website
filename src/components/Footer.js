import React from 'react';

const Footer = () => (
    <footer
        style={{
            backgroundColor: '#1e1e1e',
            color: '#aaa',
            textAlign: 'center',
            padding: '1rem 0',
            fontSize: '0.9rem',
            position: 'fixed',
            bottom: '0',
            width: '100%',
            fontFamily: "'Poppins', sans-serif",
            transition: 'background-color 0.3s ease, color 0.3s ease', // Footer transitions
        }}
    >
        BlogSite © 2024. All Rights Reserved.
    </footer>
);

export default Footer;
