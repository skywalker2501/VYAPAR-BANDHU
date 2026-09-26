/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm earthy palette
        cream: { 50: '#FFFDF7', 100: '#FDF8F0', 200: '#F9EDDA', 300: '#F2DEC0' },
        terra: { 400: '#D97B4A', 500: '#C65D2C', 600: '#A84B22', 700: '#8A3C1B' },
        marigold: { 400: '#F5A623', 500: '#E89B1C', 600: '#CC8515' },
        forest: { 400: '#4CAF7D', 500: '#2E7D52', 600: '#1E6B3F' },
        charcoal: { 300: '#6B7280', 400: '#4B5563', 500: '#374151', 600: '#2D3239', 700: '#1F2937' },
        warmgray: { 100: '#F5F0E8', 200: '#EDE5D8', 300: '#DDD4C4' },
      },
      fontFamily: {
        heading: ['"Baloo 2"', 'system-ui', 'sans-serif'],
        body: ['Inter', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.5rem',
      },
      boxShadow: {
        'warm-sm': '0 1px 3px rgba(198, 93, 44, 0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'warm': '0 4px 14px rgba(198, 93, 44, 0.08), 0 2px 6px rgba(0,0,0,0.04)',
        'warm-lg': '0 10px 30px rgba(198, 93, 44, 0.10), 0 4px 12px rgba(0,0,0,0.05)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.4s ease-out both',
        'scale-in': 'scale-in 0.3s ease-out both',
      },
    },
  },
  plugins: [],
}
