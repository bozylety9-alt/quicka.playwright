declare const process: {
  env: {
    NODE_ENV?: string;
    BASE_URL?: string;
    TEST_USER_EMAIL?: string;
    TEST_USER_PASSWORD?: string;
    [key: string]: string | undefined;
  };
  platform: string;
  version: string;
};