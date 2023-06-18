const STORAGE_KEY = 'data_decryption_key';

export function loadDecryptKey() {
  return localStorage.getItem(STORAGE_KEY);
}

export function saveDecryptKey(value: string) {
  localStorage.setItem(STORAGE_KEY, value);
}
