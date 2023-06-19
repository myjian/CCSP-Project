import {initializeApp} from 'firebase/app';
import {get as dbGet, getDatabase, ref as dbRef} from 'firebase/database';
import {getDownloadURL, getStorage, ref as storageRef} from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB_kDnbXJomR4pWpL0FicpzHybEfUm2x7A',
  authDomain: 'baddriver-9a703.firebaseapp.com',
  databaseURL: 'https://baddriver-9a703-default-rtdb.asia-southeast1.firebasedatabase.app/',
  projectId: 'baddriver-9a703',
  storageBucket: 'baddriver-9a703.appspot.com',
  messagingSenderId: '1004453674567',
  appId: '1:1004453674567:web:1af8041ddb5a2e7f19bb62',
  measurementId: 'G-KZW2CDXFWJ',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);

export function query(path: string) {
  const ref = dbRef(database, path);
  return dbGet(ref);
}

export function getDownloadUrl(path: string) {
  const ref = storageRef(storage, path);
  return getDownloadURL(ref);
}
