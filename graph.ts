// 基于邻接矩阵实现图
class GraphMatrix {
  vertices: number[];
  adjacencyMatrix: number[][];

  constructor(vertices: number[], edges: number[][]) {
    this.vertices = [];
    this.adjacencyMatrix = [];
    for (const val of vertices) {
      this.addVertex(val);
    }
    for (const edge of edges) {
      this.addEdge(edge);
    }
  }

  size() {
    return this.vertices.length;
  }

  addVertex(vertex: number) {
    const n = this.size();
    this.vertices.push(vertex);
    const newRow: number[] = [];
    for (let i = 0; i < n; i++) {
      newRow.push(0);
    }
    this.adjacencyMatrix.push(newRow);
    for (const row of this.adjacencyMatrix) {
      row.push(0);
    }
  }

  removeVertex(vertex: number) {
    const index = this.vertices.indexOf(vertex);
    if (index === -1) {
      throw new Error("Vertex not found");
    }
    this.vertices.splice(index, 1);
    this.adjacencyMatrix.splice(index, 1);
    for (const row of this.adjacencyMatrix) {
      row.splice(index, 1);
    }
  }

  addEdge([i, j]: number[]) {
    // 索引越界与相等处理
    if (i < 0 || i >= this.size() || j < 0 || j >= this.size() || i === j) {
      throw new Error("Invalid edge");
    }
    this.adjacencyMatrix[i][j] = 1;
    this.adjacencyMatrix[j][i] = 1;
  }

  removeEdge([i, j]: number[] ) {
    if (i < 0 || i >= this.size() || j < 0 || j >= this.size() || i === j) {
      throw new Error("Invalid edge");
    }
    this.adjacencyMatrix[i][j] = 0;
    this.adjacencyMatrix[j][i] = 0;
  }

  print() {
    console.log('顶点列表： ', this.vertices);
    console.log('邻接矩阵： ', this.adjacencyMatrix);
  }
}

// const graph = new GraphMatrix([9,5,2,7,8], [[0, 1], [0, 2], [1, 2], [1, 3], [2, 3], [3, 4]]);
// graph.print();

// graph.removeVertex(5);
// graph.print();

// graph.removeEdge([0, 1]);
// graph.print();


// 基于邻接表(哈希表)实现图
class GraphList {
  // 键值对，key为顶点，value为邻接顶点列表
  adjacencyList: Map<number, Set<number>>;

  constructor(edges: number[][]) {
    this.adjacencyList = new Map()
    for (const edge of edges) {
      this.addVertex(edge[0]);
      this.addVertex(edge[1]);
      this.addEdge(edge);
    }
  }

  addVertex(vertex: number) {
    if (this.adjacencyList.has(vertex)) {
      return
    }
    this.adjacencyList.set(vertex, new Set());
  }

  removeVertex(vertex: number) {
    if (!this.adjacencyList.has(vertex)) {
      throw new Error("Vertex not found");
    }
    this.adjacencyList.delete(vertex);
    for (const list of this.adjacencyList.values()) {
        list.delete(vertex);
    }
  } 

  size() {
    return this.adjacencyList.size;
  }

  addEdge(edge: number[]) {
    const [i, j] = edge;
    if (!this.adjacencyList.has(i) || !this.adjacencyList.has(j) || i === j) {
      throw new Error("Invalid edge");
    }
    this.adjacencyList.get(i)?.add(j);
    this.adjacencyList.get(j)?.add(i);
  }

  removeEdge(edge: number[]) {
    const [i, j] = edge;
    if (!this.adjacencyList.has(i) || !this.adjacencyList.has(j) || i === j) {
      throw new Error("Invalid edge");
    }
    const iList = this.adjacencyList.get(i);
    const jList = this.adjacencyList.get(j);
    if (iList && jList) {
      iList.delete(j);
      jList.delete(i);
    }
  }

  print() {
    console.log('邻接表： ', this.adjacencyList);
  }
}

const graphList = new GraphList([[9,5],[5,2],[5, 4],[2,7],[2,8],[7,8]]);
graphList.print();

function graph_BFS(graph: GraphList, startVet: number) {
    const res:number[] = [];
    const visited:Set<number> = new Set();
    const queue:number[] = [startVet];
    while (queue.length) {
        const vertex = queue.shift();
        if(!vertex) continue;
        res.push(vertex);
        visited.add(vertex);
        for (const neighbor of graph.adjacencyList.get(vertex) ?? []) {
            if(visited.has(neighbor)) {
              continue;
            }
            queue.push(neighbor);
            visited.add(neighbor);
        }
    }
    return res;
}


// console.log('BFS graphList: ', graph_BFS(graphList, 2));
function recursive_dfs(graph: GraphList, vertex: number, visited: Set<number>, res: number[]) {
  res.push(vertex);
  visited.add(vertex);
  for (const neighbor of graph.adjacencyList.get(vertex) ?? []) {
    if(visited.has(neighbor)) {
      continue;
    }
    recursive_dfs(graph, neighbor, visited, res);
  }
}
function recursive_graph_DFS(graph: GraphList, startVet: number) {
  const res:number[] = [];
  const visited:Set<number> = new Set();
  recursive_dfs(graph, startVet, visited, res);
  return res;
}

// console.log('DFS graphList: ', recursive_graph_DFS(graphList, 8));

function iterative_graph_DFS(graph: GraphList, startVet: number) {
  const res: number[] = [];
  const visited: Set<number> = new Set();
  const stack: number[] = [startVet];
  
  while (stack.length > 0) {
    const vertex = stack.pop();
    if (!vertex) continue;
    
    if (visited.has(vertex)) {
      continue;
    }
    
    res.push(vertex);
    visited.add(vertex);
    
    // 将邻居节点逆序压入栈中，以保持与递归版本相同的访问顺序
    const neighbors = Array.from(graph.adjacencyList.get(vertex) ?? []);
    for (let i = neighbors.length - 1; i >= 0; i--) {
      if (!visited.has(neighbors[i])) {
        stack.push(neighbors[i]);
      }
    }
  }
  
  return res;
}

// 测试代码
console.log('Recursive DFS graphList: ', recursive_graph_DFS(graphList, 8));
console.log('Iterative DFS graphList: ', iterative_graph_DFS(graphList, 8));
