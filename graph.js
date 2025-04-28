"use strict";
// 基于邻接矩阵实现图
class GraphMatrix {
    constructor(vertices, edges) {
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
    addVertex(vertex) {
        const n = this.size();
        this.vertices.push(vertex);
        const newRow = [];
        for (let i = 0; i < n; i++) {
            newRow.push(0);
        }
        this.adjacencyMatrix.push(newRow);
        for (const row of this.adjacencyMatrix) {
            row.push(0);
        }
    }
    removeVertex(vertex) {
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
    addEdge([i, j]) {
        // 索引越界与相等处理
        if (i < 0 || i >= this.size() || j < 0 || j >= this.size() || i === j) {
            throw new Error("Invalid edge");
        }
        this.adjacencyMatrix[i][j] = 1;
        this.adjacencyMatrix[j][i] = 1;
    }
    removeEdge([i, j]) {
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
    constructor(edges) {
        this.adjacencyList = new Map();
        for (const edge of edges) {
            this.addVertex(edge[0]);
            this.addVertex(edge[1]);
            this.addEdge(edge);
        }
    }
    addVertex(vertex) {
        if (this.adjacencyList.has(vertex)) {
            return;
        }
        this.adjacencyList.set(vertex, new Set());
    }
    removeVertex(vertex) {
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
    addEdge(edge) {
        var _a, _b;
        const [i, j] = edge;
        if (!this.adjacencyList.has(i) || !this.adjacencyList.has(j) || i === j) {
            throw new Error("Invalid edge");
        }
        (_a = this.adjacencyList.get(i)) === null || _a === void 0 ? void 0 : _a.add(j);
        (_b = this.adjacencyList.get(j)) === null || _b === void 0 ? void 0 : _b.add(i);
    }
    removeEdge(edge) {
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
const graphList = new GraphList([[9, 5], [5, 2], [5, 4], [2, 7], [2, 8], [7, 8]]);
graphList.print();
function graph_BFS(graph, startVet) {
    var _a;
    const res = [];
    const visited = new Set();
    const queue = [startVet];
    while (queue.length) {
        const vertex = queue.shift();
        if (!vertex)
            continue;
        res.push(vertex);
        visited.add(vertex);
        for (const neighbor of (_a = graph.adjacencyList.get(vertex)) !== null && _a !== void 0 ? _a : []) {
            if (visited.has(neighbor)) {
                continue;
            }
            queue.push(neighbor);
            visited.add(neighbor);
        }
    }
    return res;
}
// console.log('BFS graphList: ', graph_BFS(graphList, 2));
function recursive_dfs(graph, vertex, visited, res) {
    var _a;
    res.push(vertex);
    visited.add(vertex);
    for (const neighbor of (_a = graph.adjacencyList.get(vertex)) !== null && _a !== void 0 ? _a : []) {
        if (visited.has(neighbor)) {
            continue;
        }
        recursive_dfs(graph, neighbor, visited, res);
    }
}
function recursive_graph_DFS(graph, startVet) {
    const res = [];
    const visited = new Set();
    recursive_dfs(graph, startVet, visited, res);
    return res;
}
// console.log('DFS graphList: ', recursive_graph_DFS(graphList, 8));
function iterative_graph_DFS(graph, startVet) {
    var _a;
    const res = [];
    const visited = new Set();
    const stack = [startVet];
    while (stack.length > 0) {
        const vertex = stack.pop();
        if (!vertex)
            continue;
        if (visited.has(vertex)) {
            continue;
        }
        res.push(vertex);
        visited.add(vertex);
        // 将邻居节点逆序压入栈中，以保持与递归版本相同的访问顺序
        const neighbors = Array.from((_a = graph.adjacencyList.get(vertex)) !== null && _a !== void 0 ? _a : []);
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
