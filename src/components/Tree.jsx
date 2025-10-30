import React, { useMemo, useRef, useState, useEffect } from "react";
import ReactFlow, { MiniMap, Controls, Background } from "react-flow-renderer";
import "react-flow-renderer/dist/style.css";
import "react-flow-renderer/dist/theme-default.css";

function Tree({ nodes, edges, highlightNode, onNodeCopy }) {
  const containerRef = useRef(null);
  const [rfInstance, setRfInstance] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, node: null });

  const styledNodes = useMemo(
    () =>
      nodes.map((node) => ({
        ...node,
        data: { ...node.data, label: node.data?.label ?? node.data?.path ?? "" },
        style: {
          border: node.id === highlightNode ? "3px solid #ef4444" : "1px solid rgba(0,0,0,0.12)",
          padding: 8,
          borderRadius: 8,
          background:
            node.data?.type === "object"
              ? "#a5b4fc"
              : node.data?.type === "array"
              ? "#6ee7b7"
              : "#fcd34d",
          color: "#071127",
          textAlign: "center",
          minWidth: 120,
        },
      })),
    [nodes, highlightNode]
  );

  
  const styledEdges = useMemo(
    () =>
      edges.map((e) => ({
        ...e,
        type: "straight",
        style: { stroke: "rgba(15, 23, 42, 0.25)" },
      })),
    [edges]
  );

  // Pan/center to highlighted node when it changes
  useEffect(() => {
    if (!highlightNode || !rfInstance) return;
    const node = nodes.find((n) => n.id === highlightNode);
    if (!node) return;
    try {
      // try setCenter (v9/api may differ) then fallback to panTo
      if (typeof rfInstance.setCenter === "function") {
        // setCenter(x, y, zoom) - try with node coords
        rfInstance.setCenter(node.position.x, node.position.y, 1.2);
      } else if (typeof rfInstance.panTo === "function") {
        rfInstance.panTo({ x: node.position.x, y: node.position.y });
      }
    } catch (err) {
      try {
        rfInstance.panTo && rfInstance.panTo({ x: node.position.x, y: node.position.y });
      } catch (e) {
        // ignore
      }
    }
  }, [highlightNode, rfInstance, nodes]);

  const handleNodeClick = (event, node) => {
    const path = node.data?.path ?? "";
    if (navigator.clipboard && path) {
      navigator.clipboard.writeText(path).catch(() => {});
    }
    if (typeof onNodeCopy === "function") onNodeCopy(path);
  };

  const handleNodeMouseEnter = (event, node) => {
    const rect = containerRef.current?.getBoundingClientRect();
    const x = rect ? event.clientX - rect.left + 12 : event.clientX;
    const y = rect ? event.clientY - rect.top + 12 : event.clientY;
    setTooltip({ visible: true, x, y, node });
  };

  const handleNodeMouseLeave = () => {
    setTooltip({ visible: false, x: 0, y: 0, node: null });
  };

  return (
    <div className="tree-container" ref={containerRef} style={{ position: "relative" }}>
      <ReactFlow
        nodes={styledNodes}
        edges={styledEdges}
        fitView
        onInit={(instance) => setRfInstance(instance)}
        onNodeClick={handleNodeClick}
        onNodeMouseEnter={handleNodeMouseEnter}
        onNodeMouseLeave={handleNodeMouseLeave}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>

      {/* tooltip */}
      {tooltip.visible && tooltip.node && (
        <div
          className="node-tooltip"
          style={{
            position: "absolute",
            left: tooltip.x,
            top: tooltip.y,
            zIndex: 50,
            pointerEvents: "none",
          }}
        >
          <div className="node-tooltip-inner">
            <div className="tt-label">{tooltip.node.data?.path}</div>
            <div className="tt-value">{tooltip.node.data?.label}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tree;
