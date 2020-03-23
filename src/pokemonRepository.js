export async function saveInIndexedDB(number, pkmnData) {
    const db = await getIndexedDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('pokemon', 'readwrite');
        const store = tx.objectStore('pokemon');

        store.put({
            number: number,
            data: pkmnData
        });

        let result = store.get(number);
        result.onsuccess = () => {
            db.close();
            resolve(result.result);
        };
        result.onerror = (event) => {
            db.close();
            reject(event.target.error)
        }
    });
}

export async function getPokemonData(number) {
    const db = await getIndexedDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('pokemon', 'readwrite');
        const store = tx.objectStore('pokemon');

        const result = store.get(number);

        result.onsuccess = () => {
            db.close();
            resolve(result.result);
        };
        result.onerror = (event) => {
            db.close();
            reject(event.target.error)
        }
    });
}

export function getIndexedDB() {
    const db = new Promise((resolve, reject) => {
        const indexedDBRequest = window.indexedDB.open('PokemonDatabase', 1);
        indexedDBRequest.onupgradeneeded = (event) => {
            let db = indexedDBRequest.result;
            db.createObjectStore('pokemon', {keyPath: 'number'});
        };
        indexedDBRequest.onsuccess = () => resolve(indexedDBRequest.result);
        indexedDBRequest.onerror = (event) => reject(event.target.error);
    });
    db.onerror = (event) => {
        console.log('Error in IndexedDB Handling: ' + event.target.errorCode);
    };
    return db;
}