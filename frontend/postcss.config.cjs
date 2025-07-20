// module.exports = {
//   plugins: {
//     '@tailwindcss/postcss': {},
//      tailwindcss: {},
//     autoprefixer: {},
//   },
// };

module.exports = {
  plugins: [
    require('@tailwindcss/postcss')({
      // optional Tailwind config path if not root
      config: './tailwind.config.js',
    }),
    require('autoprefixer'),
  ],
}

