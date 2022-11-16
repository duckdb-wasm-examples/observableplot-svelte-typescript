# DuckDB-Wasm + Observable Plot + Svelte & TypeScript

![Screenshot of output](screenshot_cropped.PNG)

Using DuckDB-Wasm to query a parquet file and plotting the results using [Observable Plot](https://observablehq.com/@observablehq/plot).

Svelte is used, although this example should generalize well to other frameworks using Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).


## Sources

1. Most of the DuckDB interface code is based off the [sveltekit-typescript example](https://github.com/duckdb-wasm-examples/sveltekit-typescript)
2. The parquet file comes from Voltron Data's nyc-taxi-tiny dataset, which they host freely. They have an awesome tutorial on how to access the entire dataset as part of the [vignette](https://arrow.apache.org/docs/r/articles/dataset.html) for the [{arrow}](https://arrow.apache.org/docs/r/index.html) R package.
3. The scaffolding for this repository is provided by Vite's svelte-ts [template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-svelte-ts). A new project with this template can be created using `npm create vite@latest myapp -- --template svelte-ts`.