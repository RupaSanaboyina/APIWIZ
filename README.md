# JSON Tree Visualizer

A small React app to visualize JSON as a hierarchical tree. Built as a frontend assignment — paste JSON, generate a visual tree, search by path, copy node paths, and download the tree as an image.

## Features
- Visualize nested JSON as a node tree
- Hierarchical layout with straight connector lines (no curves)
- Search for nodes by JSON path (e.g. `$.users[0].name`)
- Click a node to copy its path
- Download the tree area as a PNG
- Light / Dark theme

## Tech
- React 18
- React Flow (for graph rendering)
- html2canvas (optional at runtime for download)
- CSS (simple responsive layout)

## Quick setup (Mac)
- Open Terminal and go to the project folder:
   cd ~/Desktop/Apiwiz/apiwiz-assignment

- Install dependencies:
   npm install

- Start dev server:
   npm run dev

- Build for production:
   npm run build

- Preview production build:
   npm run preview

Notes:
- If `html2canvas` isn't installed and download fails, run:
  npm i html2canvas

## Important implementation note
- Connectors are rendered as straight lines while keeping the hierarchical layout. See `src/components/Tree.jsx` where edges are set to `type: "straight"`.

## Usage
- Paste or edit JSON in the left panel.
- Click "Generate Tree".
- Use the search input on the right to find a node by path.
- Click a node to copy its path (toast message shown).
- Click "Download Image" to save the tree view as PNG.

## Troubleshooting
- Invalid JSON => an error message shown under the search controls.
- Tree not visible => ensure JSON was generated and `nodes`/`edges` exist.
