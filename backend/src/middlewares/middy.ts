import middy from '@middy/core';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
import httpSecurityHeaders from '@middy/http-security-headers';
import cors from '@middy/http-cors';
import auth from './checkAuth';
import connectToDB from './connectDB';
import checkAdmin from './checkAdmin';

export const commonMiddleware = (handler) =>
  middy(handler).use([
    httpErrorHandler(),
    httpEventNormalizer(),
    httpSecurityHeaders(),
    cors(),
    connectToDB(),
  ]);

export const authMiddleware = (handler) =>
  middy(handler).use([
    httpErrorHandler(),
    httpEventNormalizer(),
    httpSecurityHeaders(),
    cors(),
    connectToDB(),
    auth(),
  ]);

export const adminMiddleware = (handler) =>
  middy(handler).use([
    httpErrorHandler(),
    httpEventNormalizer(),
    httpSecurityHeaders(),
    cors(),
    connectToDB(),
    auth(),
    checkAdmin(),
  ]);
