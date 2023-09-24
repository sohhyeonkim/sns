// import type { LogLevel } from '@nestjs/common';

export const logLevel: string =
  process.env.NODE_ENV === 'production' ? 'info' : 'debug';
// ? ['log', 'error', 'warn']
// : ['log', 'error', 'warn', 'debug', 'verbose'];
