import Dexie from "dexie";

export async function saveInIndexedDB(number, pkmnData) {
    const db = await getIndexedDB();
    db.pokemon.put({
        number: number,
        data: pkmnData
    });
    return db.pokemon.get(number);
}

export async function getPokemonData(number) {
    const db = await getIndexedDB();
    return await db.pokemon.get(number);
}

export async function getIndexedDB() {
    var db = new Dexie('PokemonDatabase');
    db.version(1).stores({
        pokemon: "number, data"
    });
    return db;
}