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
    const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
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


function getData(id)
{
  return new Promise(
    function(resolve, reject) {
      const audio = getObjectStore(STORE_NAME);
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


async function saveData(id, data)
{
  const local = await getData(id);
  if(local) return;

  return new Promise(
    function(resolve, reject) {
      const audio = getObjectStore(STORE_NAME);
      
      const payload = { id, data };

      const req = audio.add(payload);
      req.onsuccess = event => {
        resolve(true);     
      }
      req.onerror = event => {
        reject(false);
      }
    }
  );
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

export default { getData, saveData };
