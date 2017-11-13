/* Node class
 */

function Node(value){
    // simulates physics
    this.pos = createVector(random(width), random(height));
    this.vel = createVector();
    //add color
    this.col = color(0);
    //variables
    this.value = value; // name of actor or movie
    this.edges = [] // neighbors of the current nodes
    this.parent = null; // parent node
    this.visited = false;
}
/*
 * this function add the neighbor nodes to the array
 */
Node.prototype.addEdge = function(neighbor){
    this.edges.push(neighbor);
    neighbor.edges.push(this);
}
Node.prototype.isConnected = function(neighbor) {
  var index = this.edges.indexOf(neighbor);
  if (index >= 0) {
    return true;
  } else {
    return false;
  }
}
Node.prototype.show = function(){
    textAlign(CENTER);
    var w = textWidth(this.value);
    stroke(255);
    fill(this.col);
    ellipse(this.pos.x, this.pos.y, w, w);
    fill(255);
    noStroke();
    text(this.value, this.pos.x, this.pos.y);
}
Node.prototype.setColor = function(val1, val2, val3) {
  this.col = color(val1,val2 , val3);
}
Node.prototype.hightlight = function(){
    this.col = color(0,150,0);
}

Node.prototype.showEdges = function(){
    noFill();
    stroke(255);
        for (var i = 0; i < this.edges.length; i++){
          line(this.pos.x, this.pos.y, this.edges[i].pos.x, this.edges[i].pos.y);
        }

}
