export default {
    version: 2,
    builds: [
      { src: 'api/**/*.js', use: '@vercel/node' }
    ],
    routes: [
      { src: '/api/(.*)', dest: '/api/$1.js' }
    ]
  };