var svg = d3.select("svg");
var path = d3.geoPath();

var states=[];
for (var i = 0; i < 50; i++) {
    states.push((Math.floor((Math.random()*100)))*0.01);
}
console.log(states);

    
d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
    if (error) throw error;

    //apply states attributes
    svg.append("g")
	.attr("class", "states")
	.selectAll("path")
	.data(topojson.feature(us, us.objects.states).features)
	.enter().append("path")
	.attr("d", path);

    console.log("HEY");
    d3.selectAll("path")
	.style("fill", function(d, i) {
//	    console.log((Math.floor((Math.random()*100)))*0.01);
	    return "rgba(255,0,0,"+ states[i] +")" ;
	})
	.on('mouseover', function(d, i) {
	    hovering(i);
	})
/*	.on('mouseout', function() {
	    console.log("You good?");
	    hovering(-1);
	});*/

    //apply state borders attributes
    svg.append("path")
	.attr("class", "state-borders")
	.attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));


});

var hovering = function(state) {
    d3.selectAll("path")
	.style("fill", function(d, i) {
	    if (i == state) {
		console.log("once");
		return "blue";
	    } else {
		return "rgba(255,0,0,"+ states[i] +")";
	    }
	});

};
