import { createCipheriv, pbkdf2Sync, randomBytes } from 'node:crypto';

// Must match the parameters the client uses to decrypt (see
// PasswordGate.astro) — key length, hash, and cipher are hardcoded on both
// sides since Web Crypto's AES-GCM only supports 256-bit keys anyway;
// iterations is threaded through as a prop so it only needs to change here.
export const PBKDF2_ITERATIONS = 100_000;
const KEY_LENGTH = 32;

export interface LockedPayload {
  salt: string;
  iv: string;
  ciphertext: string;
}

/**
 * Encrypts `html` with a key derived from `password` (AES-256-GCM, salted
 * PBKDF2). Everything returned is safe to ship in the built page — without
 * the password, the ciphertext doesn't reveal the content.
 */
export function encryptHtml(html: string, password: string): LockedPayload {
  const salt = randomBytes(16);
  const iv = randomBytes(12);
  const key = pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, KEY_LENGTH, 'sha256');

  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(html, 'utf8'), cipher.final()]);
  // Web Crypto's AES-GCM expects the auth tag appended to the ciphertext.
  const ciphertext = Buffer.concat([encrypted, cipher.getAuthTag()]);

  return {
    salt: salt.toString('base64'),
    iv: iv.toString('base64'),
    ciphertext: ciphertext.toString('base64'),
  };
}
