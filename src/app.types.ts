export type AppEnv = 'local' | 'development' | 'production';

export type AppConfigVariables = {
  MONGODB_CONNECTION_STRING: string;
  STRIPE_API_KEY: string;
  JWT_SECRET_KEY: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  CLOUDINARY_CLOUD_NAME: string;
};

export type AppConfigByAppEnv = {
  [key in AppEnv]: AppConfigVariables;
};
