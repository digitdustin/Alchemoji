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
  elementGraph.addEdge('fire', ['water', 'steam']);

  elementGraph.addEdge('water', ['earth', 'mud']);
  elementGraph.addEdge('earth', ['water', 'mud']);

  elementGraph.addEdge('water', ['air', 'cloud']);
  elementGraph.addEdge('air', ['water', 'cloud']);

  elementGraph.addEdge('water', ['water', 'sea']);
  
  elementGraph.addEdge('earth', ['fire', 'volcano']);
  elementGraph.addEdge('fire', ['earth', 'volcano']);

  elementGraph.addEdge('cloud', ['air', 'sky']);
  elementGraph.addEdge('air', ['cloud', 'sky']);

  elementGraph.addEdge('water', ['sea', 'ocean']);
  elementGraph.addEdge('sea', ['sea', 'ocean']);
  elementGraph.addEdge('sea', ['water', 'ocean']);

  elementGraph.addEdge('volcano', ['air', 'stone']);
  elementGraph.addEdge('air', ['volcano', 'stone']);

  elementGraph.addEdge('mud', ['fire', 'brick']);
  elementGraph.addEdge('fire', ['mud', 'brick']);
  
  elementGraph.addEdge('brick', ['brick', 'house']);
  
  elementGraph.addEdge('house', ['house', 'village']);

  elementGraph.addEdge('village', ['village', 'city']);

  elementGraph.addEdge('stone', ['water', 'fountain']);
  elementGraph.addEdge('water', ['stone', 'fountain']);

  elementGraph.addEdge('water', ['stone', 'fountain']);
  elementGraph.addEdge('water', ['stone', 'fountain']);

  elementGraph.addEdge('stone', ['ocean', 'sand']);
  elementGraph.addEdge('ocean', ['stone', 'sand']);
  elementGraph.addEdge('stone', ['sea', 'sand']);
  elementGraph.addEdge('sea', ['stone', 'sand']);

  elementGraph.addEdge('sand', ['fire', 'glass']);
  elementGraph.addEdge('fire', ['sand', 'glass']);

  elementGraph.addEdge('stone', ['fire', 'metal']);
  elementGraph.addEdge('fire', ['stone', 'metal']);

  elementGraph.addEdge('metal', ['lightning', 'electricity']);
  elementGraph.addEdge('lightning', ['metal', 'electricity']);

  elementGraph.addEdge('cloud', ['water', 'rain']);
  elementGraph.addEdge('water', ['cloud', 'rain']);

  elementGraph.addEdge('rain', ['sky', 'storm']);
  elementGraph.addEdge('sky', ['rain', 'storm']);

  elementGraph.addEdge('storm', ['fire', 'lightning']);
  elementGraph.addEdge('fire', ['storm', 'lightning']);

  elementGraph.addEdge('ocean', ['electricity', 'life']);
  elementGraph.addEdge('electricity', ['ocean', 'life']);
  elementGraph.addEdge('sea', ['electricity', 'life']);
  elementGraph.addEdge('electricity', ['sea', 'life']);

  elementGraph.addEdge('fire', ['sky', 'sun']);
  elementGraph.addEdge('sky', ['fire', 'sun']);

  export default elementGraph;