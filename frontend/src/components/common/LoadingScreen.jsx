import React from 'react';

export const LoadingScreen = ({ darkMode }) => {
    return (
        <div className={`min-h-screen ${darkMode ? 'bg-dark-bg' : 'bg-anti-bg'} flex items-center justify-center transition-colors duration-300`}>
            <div className="flex flex-col items-center">
                <div className={`w-16 h-16 rounded-full border-4 ${darkMode ? 'border-dark-card border-t-anti-accent' : 'border-anti-card border-t-anti-accent'} animate-spin mb-6`}></div>
                <p className={`${darkMode ? 'text-dark-text' : 'text-anti-dark'} font-medium tracking-widest text-sm uppercase opacity-60 animate-pulse`}>Initializing</p>
            </div>
        </div>
    );
};
