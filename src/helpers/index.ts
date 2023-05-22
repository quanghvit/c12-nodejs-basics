import * as crypto from 'crypto';

export const genHexId = () => crypto.randomBytes(20).toString('hex');
