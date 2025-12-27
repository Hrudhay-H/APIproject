/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'anti-bg': '#FAF3E1',
                'anti-card': '#F5E7C6',
                'anti-accent': '#FF6D1F',
                'anti-dark': '#222222',
                'dark-bg': '#0f0f0f',
                'dark-card': '#1a1a1a',
                'dark-surface': '#252525',
                'dark-text': '#e5e5e5',
                'dark-text-muted': '#a0a0a0',
            },
            borderRadius: {
                'xl-dashboard': '32px',
            },
        },
    },
    plugins: [],
}
