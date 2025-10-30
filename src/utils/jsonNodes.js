let idCounter = 1;


export const jsonNodes = (data) => {
  const nodes = [];
  const edges = [];
  const levelWidth = {}; 

  const getX = (depth) => {
    if (!levelWidth[depth]) levelWidth[depth] = 0;
    const x = levelWidth[depth];
    levelWidth[depth] += 200; 
    return x;
  };

  const createNode = (label, type, path, depth) => ({
    id: (idCounter++).toString(),
    data: { label, type, path },
    position: { x: getX(depth), y: depth * 120 }, 
  });

  const traverse = (obj, parentId = null, path = "$", depth = 0) => {
    let node;

    if (Array.isArray(obj)) {
      node = createNode("Array", "array", path, depth);
      nodes.push(node);
      if (parentId) edges.push({ id: `${parentId}-${node.id}`, source: parentId, target: node.id });

      obj.forEach((item, i) => traverse(item, node.id, `${path}[${i}]`, depth + 1));
    } else if (typeof obj === "object" && obj !== null) {
      node = createNode("Object", "object", path, depth);
      nodes.push(node);
      if (parentId) edges.push({ id: `${parentId}-${node.id}`, source: parentId, target: node.id });

      for (const key in obj) {
        traverse(obj[key], node.id, `${path}.${key}`, depth + 1);
      }
    } else {
      node = createNode(`${obj}`, "value", path, depth);
      nodes.push(node);
      if (parentId) edges.push({ id: `${parentId}-${node.id}`, source: parentId, target: node.id });
    }
  };

  traverse(data);
  return { nodes, edges };
};
