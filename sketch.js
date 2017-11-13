// var data;
// function preload(){
//     data = loadJSON('bacon.json');
// }

var graph;  // the graph object that contains all the movies and actors
var drop; // the dropdown menu
function setup(){
    createCanvas(1400, 1000);
    graph = new Graph();
    drop = createSelect();
    drop.changed(bfs); // when the dropdown menu is changed, call the breadth
    // first search
    var movies = data.movies; // get the data from json file
    for(var i = 0; i < movies.length; i++){ // for each movie
          var movie = movies[i].title;
          var cast = movies[i].cast;
          var movieNode = new Node(movie);
          graph.addNode(movieNode); // add all the movies in the graph

          for(var j =0 ; j < cast.length; j++) {
             var actor = cast[j];

             //var actorNode = graph.getNode(actor);
             var actorNode = graph.getNode(actor);
             if(actorNode == undefined){  // if the actor node is not in the graph
                actorNode = new Node(actor); // then create it
                drop.option(actor); // if a new actor, also add it in the dropdown
             }

             graph.addNode(actorNode); // add the node
             movieNode.addEdge(actorNode); // for the movie, add the actor as an edge
          }
    }
}
function draw(){
  background(51);
  graph.show();
}



/* This function traverses through the graph using breadth first search
 * and return the sequence of actors
 */
function bfs(){
  graph.reset();  // reset the graph before each search
  var start = graph.setStart(drop.value()); // get the actor from the dropdown
 //var start = graph.setStart("Kevin Bacon"); // for debug
 var end = graph.setEnd("Kevin Bacon");
 //console.log(graph);

 var queue = [];  // acts as a queue
 //var start
 start.visited = true;
 queue.push(start);
 while(queue.length  >0){ // first in first out order
   var current = queue.shift(); // get the top one of the queue, "pop" it off the queue
     //console.log(current.value);
   if (current == end){  // if found, break form the loop
     //console.log("Found " + current.value);
     break;
   }
   var edges = current.edges; // psuh all of the edges on the queue
   for(var i =0; i < edges.length; i++){
       var neighbor = edges[i];
           if (!neighbor.visited){ // check if the node is visited
                 neighbor.visited = true;
                 neighbor.parent = current;
                 queue.push(neighbor);
           }
   }
 }

 var path = [];
 path.push(end);
 var next = end.parent;
 while(next != null) {
     path.push(next);
     next = next.parent; // push all the nodes in the path from end to start
 }
 var txt = '';
 for (var i = path.length - 1; i >=0; i--){ // output the result
     var n = path[i];
     if (n.value != undefined) {
          txt += n.value ;
     if (i !=0){
       txt += ' --> ';
     }}
 }
 console.log(txt);
    createP(txt);
}

var data = {
    "movies": [{
            "title": "Diner",
            "cast": [
                "Steve Guttenberg",
                "Daniel Stern",
                "Mickey Rourke",
                "Kevin Bacon",
                "Tim Daly",
                "Ellen Barkin",
                "Paul Reiser",
                "Kathryn Dowling",
                "Michael Tucker",
                "Jessica James",
                "Colette Blonigan",
                "Kelle Kipp",
                "Clement Fowler",
                "Claudia Cron"
            ]
        },
        {
            "title": "Footloose",
            "cast": [
                "Kevin Bacon",
                "Lori Singer",
                "Dianne Wiest",
                "John Lithgow",
                "Sarah Jessica Parker",
                "Chris Penn",
                "Frances Lee McCain",
                "Jim Youngs",
                "John Laughlin",
                "Lynne Marta",
                "Douglas Dirkson"
            ]
        },
        {
            "title": "Flatliners",
            "cast": [
                "Kiefer Sutherland",
                "Julia Roberts",
                "Kevin Bacon",
                "William Baldwin",
                "Oliver Platt",
                "Kimberly Scott",
                "Joshua Rudoy",
                "Benjamin Mouton",
                "Hope Davis",
                "Patricia Belcher",
                "Beth Grant"
            ]
        },
        {
            "title": "Eat Pray Love",
            "cast": [
                "Julia Roberts",
                "Javier Bardem",
                "Billy Crudup",
                "Richard Jenkins",
                "Viola Davis",
                "James Franco",
                "Sophie Thompson",
                "Mike O 'Malley",
                "Christine Hakim",
                "Arlene Tur",
                "Hadi Subiyanto",
                "Gita Reddy",
                "Tuva Novotny",
                "Luca Argentero",
                "Rushita Singh"
            ]
        },
        {
            "title": "Spotlight",
            "cast": [
                "Mark Ruffalo",
                "Michael Keaton",
                "Rachel McAdams",
                "Liev Schreiber",
                "John Slattery",
                "Brian d'Arcy James",
                "Stanley Tucci",
                "Gene Amoroso",
                "Jamey Sheridan",
                "Billy Crudup",
                "Maureen Keiller",
                "Richard Jenkins",
                "Paul Guilfoyle",
                "Len Cariou",
                "Neal Huff",
                "Michael Cyril Creighton",
                "Laurie Heineman",
                "Tim Progosh"
            ]
        }
    ]
};
