import { default as createHash } from 'create-hash';

export function sha256(buffer: Buffer): Buffer {
  return createHash('sha256')
    .update(buffer)
    .digest();
}