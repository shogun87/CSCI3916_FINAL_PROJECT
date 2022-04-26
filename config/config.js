const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: process.env['MONGODB_URI'] ||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' +
    (process.env.MONGO_PORT || '27017') +
    '/mernproject',
  stripe_connect_test_client_id: 'ca_LYGLZem0jOfKkB2UMihS5HJMskH1QdmB',
  stripe_test_secret_key: 'sk_test_51Kr9j9AHVBLINywwynHk18NHEK1930Nca0UnRfc6vF3npNZ5elz1GSzi1YiCgZcDQ2kxx6ofhMxuIgX9ZPJjjqBM00KZ1HiSc3',
  stripe_test_api_key: 'pk_test_51Kr9j9AHVBLINywwBDD3rfvKyf1OecFk9NDnT8iv9lAn11Ry0LJA9daj1SsSc3gJVCqLxCkvK0x0PmYoU6U4EM1S0031W51cOB'
}

export default config
