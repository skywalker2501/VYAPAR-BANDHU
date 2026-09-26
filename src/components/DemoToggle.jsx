import React from 'react';

const DemoToggle = ({ isDemoMode }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            padding: '4px 16px',
            backgroundColor: isDemoMode ? '#EF4444' : '#10B981',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '12px',
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '1px'
        }}>
            <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'white',
                display: 'inline-block',
                animation: isDemoMode ? 'none' : 'pulse 2s infinite'
            }}></span>
            {isDemoMode ? 'OFFLINE FALLBACK : DEMO DATA' : 'LIVE API : SECURE CONNECTION'}
            <style>
                {`
                @keyframes pulse {
                    0% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.5); }
                    100% { opacity: 1; transform: scale(1); }
                }
                `}
            </style>
        </div>
    );
};

export default DemoToggle;
