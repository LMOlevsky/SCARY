var svg = d3.select("svg");
var path = d3.geoPath();

d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
    if (error) throw error;

    //apply states attributes
    svg.append("g")
	.attr("class", "states")
	.selectAll("path")
	.data(topojson.feature(us, us.objects.states).features)
	.enter().append("path")
	.attr("d", path)
	;

    console.log("HEY");
    d3.selectAll("path")
	.style("fill", function(d, i) {
	    console.log(i);
	    return "red";
	});
/*    console.log( states );
    d3.selectAll("states")
	.style("fill", function(d, i) {
	    console.log(i);
	    return "red";
	});*/

    //apply state borders attributes
    svg.append("path")
	.attr("class", "state-borders")
	.attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));


});
