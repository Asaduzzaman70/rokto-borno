/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      myBg: {
        light: '#c0392b',
        dark: '#C01B2C'
      },
      myBgTheme: {
        light: '#dff9fb',
        dark: '#2c3e50',
        white: '#ffff'
      },
      myText: {
        highLight: '#ecf0f1',
        mediumLight: '#bdc3c7',
        mediumDark: '#34495e',
        highDark: '#2c3e50'
      },
      myBtnColor :{
        green: '#009432',
        yellow: '#F79F1F',
        blue: '#12CBC4',
      }
    },
    fontFamily: {
      myFont: "Source Sans 3"
    }
  },
  plugins: [
    require('daisyui'),
  ],
}