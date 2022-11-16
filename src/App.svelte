<script lang="ts">
  import { initDB } from './lib/duckdb';
  import * as Plot from '@observablehq/plot';
  const parquetUrl = new URL('/part-0.parquet', import.meta.url).href


  console.log('parquetUrl', parquetUrl);
  // Make sure URL is complete (e.g. http://...) and not relative path so we can use
  // the db.registerFileURL method to point the file to DuckDB 


  import type {
    AsyncDuckDBConnection
  } from '@duckdb/duckdb-wasm'


  // Setup and connect to the database
  let conn_prom: Promise<AsyncDuckDBConnection> | null; // Declare globally so promise can be awaited anywhere
  const load_db = async () => {
    if (conn_prom) {
      return conn_prom; // Return existing promise, if any
    }

    // Initialize database
    const db = await initDB();
    await db.registerFileURL('part-0.parquet', parquetUrl); // From: https://voltrondata-labs-datasets.s3.us-east-2.amazonaws.com/nyc-taxi-tiny/year=2009/month=1/part-0.parquet
    
    conn_prom = db.connect(); // Open a connection (promise)
    return conn_prom;
  };


  // SQL to send to DuckDB-Wasm
  const viz_query = `
      SELECT date_trunc('day', pickup_datetime) as pickup_date, AVG(total_amount) as total_amount
      FROM parquet_scan('part-0.parquet') -- Use same filename as passed in registerFileUrl
      GROUP BY pickup_date
    `;


  // Send query and await results from DuckDB 
  const get_query = async (q: string) => {
    const conn = await conn_prom;
    const results = await conn.query(q);
    return results;
  };


  // Where all the stuff happens
  const main = async () => {
    await load_db() // Wait until DuckDB ready

    // Query the taxi parquet file
    const table = await get_query(viz_query);
    const table_arr = table.toArray(); // list of objects, compatible with OJS


    // OJS Plot. Line + dot de variables
    const plot_elem = Plot.plot({
      x: {label: xlabel},
      y: {label: ylabel, grid: true},

      marks: [
        Plot.line(table_arr, {x: 'pickup_date', y: 'total_amount'}),
        Plot.dot(table_arr, {x: 'pickup_date', y: 'total_amount'}),
      ]
    });


    plot_here.append(plot_elem) // Añadir el plot al DOM
    
  }

  
  // Plot aesthetics
  let plot_here : HTMLDivElement; // Must be declared so main() can read it
  const xlabel = 'Fecha recogido';
  const ylabel = 'Precio promedio';


  main(); // Run the code
</script>


<main>

  <h1>DuckDB-Wasm Demo</h1>
  <h2>(+ Observable Plot)</h2>

  <div bind:this={plot_here}></div>

</main>