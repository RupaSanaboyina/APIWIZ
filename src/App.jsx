import React, { useState } from "react";
import JsonInput from "./components/JsonInput";
import Tree from "./components/Tree";
import SearchBar from "./components/SearchBar";
import Toggle from "./components/Toggle";
import { jsonNodes } from "./utils/jsonNodes";


function App() {
  const [jsonData, setJsonData] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [highlightNode, setHighlightNode] = useState(null);
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState("light");
  const [clearTrigger, setClearTrigger] = useState(0);

  const handleGenerateTree = (jsonText) => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonData(parsed);
      const { nodes, edges } = jsonNodes(parsed);
      setNodes(nodes);
      setEdges(edges);
      setMessage("");
    } catch (err) {
      setMessage("❌ Invalid JSON.");
    }
  };

  const handleSearch = (path) => {
    if (!nodes.length) return setMessage("No tree generated yet!");

    const foundNode = nodes.find((n) => n.data.path === path);
    if (foundNode) {
      setHighlightNode(foundNode.id);
      setMessage("✅ Match found!");
    } else {
      setHighlightNode(null);
      setMessage("❌ No match found!");
    }
  };

  const handleClearReset = () => {
    setJsonData(null);
    setNodes([]);
    setEdges([]);
    setHighlightNode(null);
    setMessage("");
    setClearTrigger((c) => c + 1);
  };

  const handleNodeCopy = (path) => {
    if (path) {
      setMessage(`Copied: ${path}`);
      setTimeout(() => setMessage(""), 2200);
    } else {
      setMessage("No path to copy");
      setTimeout(() => setMessage(""), 1200);
    }
  };

  const handleDownloadImage = async () => {
    try {
      const html2canvas = (await import("html2canvas")).default;
      const el = document.querySelector(".tree-wrapper");
      if (!el) return setMessage("No tree to download");
      const canvas = await html2canvas(el, { backgroundColor: null, useCORS: true, scale: 2 });
      const link = document.createElement("a");
      link.download = "json-tree.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      setMessage("✅ Image downloaded");
      setTimeout(() => setMessage(""), 1800);
    } catch (err) {
      setMessage("❌ Failed to download image. Install html2canvas: npm i html2canvas");
      setTimeout(() => setMessage(""), 2800);
    }
  };

  return (
    <div className={`app ${theme}`}>
      <div className="card">
        <header className="card-header">
          <h1>JSON Tree Visualizer</h1>
          <Toggle theme={theme} setTheme={setTheme} />
        </header>

        <div className="card-body">
          <section className="left-panel">
            <JsonInput onGenerate={handleGenerateTree} clearTrigger={clearTrigger} />
            <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
              <button className="generate-btn" onClick={handleClearReset}>
                Reset
              </button>
            </div>
          </section>

          <section className="right-panel">
            <div className="search-row">
              <SearchBar onSearch={handleSearch} />
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={handleDownloadImage}>Download Image</button>
              </div>
              {message && <div className="message">{message}</div>}
            </div>

            <div className="tree-wrapper">
              <Tree
                nodes={nodes}
                edges={edges}
                highlightNode={highlightNode}
                onNodeCopy={handleNodeCopy}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
