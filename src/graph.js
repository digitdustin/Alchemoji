class Graph {
    constructor() {
      this.adjacencyList = {};
    }
    addVertex(vertex) {
      if (!this.adjacencyList[vertex]) {
        this.adjacencyList[vertex] = [];
      }
    }
    addEdge(to, from) {
      if (!this.adjacencyList[to]) {
        this.addVertex(to);
      }
      if (!this.adjacencyList[from]) {
        this.addVertex(from);
      }
      this.adjacencyList[to].push(from);
      this.adjacencyList[from].push(to);
    }
    removeEdge(to, from) {
      this.adjacencyList[to] = this.adjacencyList[to].filter(vertex => vertex !== from);
      this.adjacencyList[from] = this.adjacencyList[from].filter(vertex => vertex !== to);
    }
    removeVertex(vertex) {
      while (this.adjacencyList[vertex]) {
        const adjacentVertex = this.adjacencyList[vertex].pop();
        this.removeEdge(vertex, adjacentVertex);
      }
      delete this.adjacencyList[vertex];
    }  
  }

  var elementGraph = new Graph();
  elementGraph.addEdge('water', ['fire', 'steam']);
  elementGraph.addEdge('water', ['earth', 'mud']);
  elementGraph.addEdge('water', ['air', 'wind']);

  export default elementGraph;