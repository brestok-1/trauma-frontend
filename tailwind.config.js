/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        pale_orange: 'rgba(239,111,40,0.2)',
        pastel_blue: 'rgba(1, 85, 166, 0.2)',
        dark_gray: 'rgba(217, 217, 217, 1)',
        border_color: 'rgba(233, 233, 233, 1)',
        light_gray: 'rgba(249, 249, 249, 1)',
        header_color: 'rgba(136, 136, 136, 1)',
      },
      backgroundImage: {
        'text-gradient':
          'linear-gradient(90deg, #02284D 0%, #DB6E31 40%, #0155A6 80%)',
      },
    },
  },
  plugins: [],
};
