// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    SECRET_KEY: string;
  }
}