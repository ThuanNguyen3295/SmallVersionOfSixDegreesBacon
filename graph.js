/* Graph class that contains all the nodes
 *
 */
function Graph(){
  this.nodes = []
  this.graph = {};
  this.end = null;
  this.start = null;
}
Graph.prototype.addNode = function(n){ // add new node
    //add the node in the array
    this.nodes.push(n);
    var title = n.value;
    // add the node in a "hash table"
    this.graph[title] = n;
}
// reset the parent and visited condition before each search
Graph.prototype.reset = function(){
   for(var i = 0; i < this.nodes.length; i++){
        this.nodes[i].visited = false;
        this.nodes[i].parent = false;
   }
}

// return the node with given actor name
Graph.prototype.getNode = function(actor){
    var n = this.graph[actor];
    return n;
}
// setter for start node
Graph.prototype.setStart= function(actor){
  this.start= this.graph[actor]; // assuming the actor exists
  // may cause errors if null or undefined;
  return this.start;
}
//setter for end node
Graph.prototype.setEnd = function(actor){
    this.end = this.graph[actor];
    return this.end;
}
// Draw everything
Graph.prototype.show = function() {
  for (var i = 0; i < this.nodes.length; i++) {
    this.nodes[i].showEdges();
  }
  for (var i = 0; i < this.nodes.length; i++) {
    this.nodes[i].show();
    this.nodes[i].hightlight();
  }
}
