/* Node class
 */

function Node(value){
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
