const PBKDF2_SALT = new Uint8Array([
  10, 201, 96, 161, 138, 91, 180, 43, 20, 117, 207, 165, 119, 225, 122, 95,
]);

const AES_GCM_IV = new Uint8Array([
  157, 26, 175, 111, 7, 77, 100, 244, 36, 215, 195, 2, 15, 43, 206, 33,
]);

/** Given some password, derive an AES-GCM key using PBKDF2. */
async function getKey(password: string) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    {name: 'PBKDF2'},
    false,
    ['deriveBits', 'deriveKey']
  );
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: PBKDF2_SALT,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    {name: 'AES-GCM', length: 256},
    true,
    ['encrypt', 'decrypt']
  );
}

/*
  Derive a key from a password supplied by the user, and use the key
  to decrypt the ciphertext.
  */
export async function decrypt(input: ArrayBuffer, password: string): Promise<Blob> {
  const key = await getKey(password);
  const decrypted = await crypto.subtle.decrypt({name: 'AES-GCM', iv: AES_GCM_IV}, key, input);
  return new Blob([decrypted]);
}