import { Request } from 'express';

export declare type RequestType = Request & { csrfToken: Function }