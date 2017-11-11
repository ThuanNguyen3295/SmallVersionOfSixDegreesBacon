function Graph(){
  this.nodes = []
  this.graph = {};

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
