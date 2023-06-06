const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

const depPath = createGlobPatternsForDependencies(__dirname);
console.log(depPath);


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...depPath,
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: 'rgba(0, 0, 0, 1)',
          DEFAULT: 'rgb(27, 133, 173)',
          light: '#fff'
        },
        secondary: {
          DEFAULT: 'rgb(227, 176, 60)',
          dark: 'rgba(0, 0, 0, 0.4)',
          light: '#fff'
        }
      }
    },
  },
  plugins: [],
};
