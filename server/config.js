module.exports = {
  secret: 'Ci23fWtahDYE3dfirAHrJhzrUEoslIxqwcDN9VNhRJCWf8Tyc1F1mqYrjGYF',
  MONGOOSE_URI: process.env.MONGO_URI || 'mongodb://localhost/auth',
  HTTP_PORT: process.env.PORT || 3000,
  HTTPS_PORT: process.env.PORT || 3443,
};
