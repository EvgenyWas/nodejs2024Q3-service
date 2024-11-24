declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PWD: string;
      PORT: string;
      CRYPT_SALT: string;
      JWT_SECRET_KEY: string;
      JWT_SECRET_REFRESH_KEY: string;
      TOKEN_EXPIRE_TIME: string;
      TOKEN_REFRESH_EXPIRE_TIME: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_NAME: string;
      DB_URL: string;
    }
  }
}

export {};
