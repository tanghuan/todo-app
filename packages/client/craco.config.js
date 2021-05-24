module.exports = {
  devServer: {
    proxy: {
      '/graphql': {
        target: 'http://localhost:4000',
      },
      '/api/auth': {
        target: 'http://localhost:4000',
        pathRewrite: { '^/api': '' },
      },
    },
  },
};
