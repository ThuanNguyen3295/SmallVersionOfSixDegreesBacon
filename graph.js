function Graph(){
  this.nodes = []
  this.graph = {};
  this.end = null;
  this.start = null;
}
Graph.prototype.addNode = function(n){
    //add the node in the array
    this.nodes.push(n);
    var title = n.value;
    // add the node in a "hash table"
    this.graph[title] = n;
}

Graph.prototype.getNode = function(actor){
    var n = this.graph[actor];
    return n;
}
Graph.prototype.setStart= function(actor){
  this.start= this.graph[actor]; // assuming the actor exists
  // may cause errors if null or undefined;
  return this.start;
}
Graph.prototype.setEnd = function(actor){
    this.end = this.graph[actor];
    return this.end;
}
