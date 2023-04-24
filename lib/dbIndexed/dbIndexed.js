import net from '../net/net';
import { textToFilename } from '../text/text';

const CACHE_NAME = 'trinity-audio';

const DB_NAME = 'DBTrinity';
const DB_VERSION = 1;
const STORE_NAME = 'audio';

let db;

const openReq = indexedDB.open(DB_NAME, DB_VERSION);

openReq.onupgradeneeded = event => {
  console.log('onupgradeneeded');
  db = openReq.result;

  if (!db.objectStoreNames.contains(STORE_NAME)) {
    const store = db.createObjectStore(STORE_NAME, { keyPath: 'text' });
    store.createIndex("sound", "sound", { unique: false });
    console.log('audio store created');
  }
}

openReq.onsuccess = event => {
  console.log('DB opened');
  db = openReq.result;

 
  db.onversionchange = event => {
    db.close();
    console.log("Database is outdated, please reload the page.")
  };
}

openReq.onerror = event => {
  console.log('DB open error');
}


export function getData(id)
{
  return new Promise(
    function(resolve, reject) {
      const audio = getObjectStore('audio');
      const req = audio.get(id);

      req.onsuccess = event => {
        resolve(event.target.result)
      }

      req.onerror = event => {
        reject(false);
      }
    }
  );
}


export function saveAudio(text, sound)
{
  const audio = getObjectStore('audio');
  const local = false;
  if(local) {
    return local;
  }
  const payload = { text, sound };
  const req = audio.add(payload);

  req.onsuccess = event => {
    console.log('audio added');
  }
  req.onerror = event => {
    console.log('audio not added');
  }
}


function getObjectStore(name)
{
  const transaction = db.transaction(name, 'readwrite');
  return transaction.objectStore(name);
}


function deleteDB()
{
  const req = indexedDB.deleteDatabase(DB_NAME);

  req.onsuccess = event => {
    console.log(`${DB_NAME} database deleted`);
    return true;
  }


  req.onerror = event => {
    console.log(`${DB_NAME} database delete error`);
    return false;
  }
}

/*
async function openCache()
{
  try { 
    cache = await caches.open(CACHE_NAME);
    console.log('cache open');
  } catch(e) {
    console.error(e);
  }
}


export async function addToCache(text)
{
  try {
    const cache = await caches.open(CACHE_NAME);
    const filename = textToFilename(text); 
    const url = `http://localhost:8080/static/audio/${filename}`;
    await cache.add(url);
    console.log('add success');
  } catch(e) {
    console.error(e);
  }
}

export async function getFromCache(text)
{
  try {
    const cache = await caches.open(CACHE_NAME);
    const filename = textToFilename(text); 
    const url = `http://localhost:8080/static/audio/${filename}`;
    return await cache.match(url);
  } catch(e) {
    console.error(e);
  }
}
*/

