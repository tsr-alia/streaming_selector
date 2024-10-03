module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',  // Adjust based on where your components live
  ],
  theme: {
    extend: {
      screens: {
        smobile: '350px',
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      colors: {
        'black': '#0B0B0B',
        'red': '#E74C3C',
        'white': '#E9E9E9',
        'support': '#34495E'
      },
      fontFamily: {
        'montserrat': ['montserrat', 'sans-serif'],
        'loveloline': ['lovelo-line', 'serif'],
      },
    },
  },
  plugins: [],
}

