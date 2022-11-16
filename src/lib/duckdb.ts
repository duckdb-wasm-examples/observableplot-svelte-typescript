// Based off this example for using DuckDB-Wasm with SvelteKit:
// https://github.com/duckdb-wasm-examples/sveltekit-typescript

// I think this code needs to be kept apart from the App.svelte to function?
// Either way, it's neater to keep the worker and logger imports separate from everything else

import * as duckdb from '@duckdb/duckdb-wasm';

import duckdb_wasm from '/node_modules/@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url';
import duckdb_worker from '/node_modules/@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?worker';

import type {
    AsyncDuckDB
} from '@duckdb/duckdb-wasm'


let db : AsyncDuckDB | null = null;


const initDB = async () => {
    if (db) {
        return db; // Return existing database, if any
    }
    
    // Instantiate worker 
    const logger = new duckdb.ConsoleLogger();
    const worker = new duckdb_worker();

    // and asynchronous database
    db = new duckdb.AsyncDuckDB(logger, worker);
    await db.instantiate(duckdb_wasm)
    return db;
};


export { initDB }; // so we can import this elsewhere