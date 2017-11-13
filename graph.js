/* Graph class that contains all the nodes
 *
 */
function Graph(){
  this.nodes = []
  this.graph = {};
  this.end = null;
  this.start = null;

  this.springLength = 64; // distance between nodes
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
        this.nodes[i].setColor(0,0,0);
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
    this.end.setColor(250,0,0);
    //this.end.pos.set(width/2, width/2);
    return this.end;
}
// Draw everything
Graph.prototype.show = function() {
  for (var i = 0; i < this.nodes.length; i++) {
    this.nodes[i].showEdges();
  }
  for (var i = 0; i < this.nodes.length; i++) {
    this.nodes[i].show();
    //this.nodes[i].hightlight();
  }
}

Graph.prototype.simulate = function(){
        this.nodes[0].pos.set(width/2, height/2); //set the first node in the center
        for (var i = 1; i < this.nodes.length; i++) {
    var node1 = this.nodes[i];
    for (var j = 0; j < this.nodes.length; j++) {
      // Nodes don't interact with themselves!
      if (i == j) continue;
      var node2 = this.nodes[j];

      // A vector that points between the nodes
      var force = p5.Vector.sub(node1.pos, node2.pos);
      var dist = force.mag();

      // What is spring force?
      var spring = 0;
      var k = 0.06;
      // If they are connected calculate
      if (node1.isConnected(node2) || node2.isConnected(node1)) {
        spring = k * (this.springLength - dist);
      }
      // All nodes need their own space even if not connected
      var separate = 1 / (dist * k);
      // Apply the force!
      force.setMag(spring + separate - 0.01)
      console.log(force);
      node1.vel.add(force);
      // Slow down velocity so that it dampens over time
      node1.vel.mult(0.99);
    }
  }
        // Add velocity to position of all nodes
        for (var i = 0; i < this.nodes.length; i++) {
            var node = this.nodes[i];
            node.pos.add(node.vel);
        }

}
