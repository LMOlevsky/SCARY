var svg = d3.select("svg");
var path = d3.geoPath();



//==================================================
//Configuring transparencies

//scales the values from the db evenly from 0.05 to 0.9
var alpha_range = d3.scaleLinear()
    .domain([0, 0.0003])
    .range([0.05, 0.9]);

var perc_range = d3.scaleLinear()
    .domain([0.05, 0.9])
    .range([0, 0.0003]);

//grabs appropriate list from html depending on tag and alters state, which affects
var alphas = function(tag) {
    var states = [];
    var data = document.getElementById(tag).innerHTML;
    var stats = JSON.parse("["+data+"]")[0];
    console.log(stats[0]);
    for (var i = 0; i < 50; i++) {
	states.push(alpha_range(stats[i]));
    }
    return states;
}
//create the state list
//alphas('murder');




//==================================================
//Creating the states

var needs_work = function(tag) {

    var states=alphas(tag);

    d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
	if (error) throw error;

	//create states and apply states attrs
	svg.append("g")
	    .attr("class", "states")
	    .selectAll("path")
	//binded data has data for each state; each index corresponds to a state
	    .data(topojson.feature(us, us.objects.states).features)
	    .enter().append("path")
	    .attr("d", path);

	//set their colors when the mouse hovers over
	//the state's color is set using their index
	d3.selectAll("path")
	    .style("fill", function(d, i) {
		return "rgba(255,0,0,"+ states[i] +")" ;
	    })
	    .on('mouseover', function(d, i) {
		hovering(i, states);
	    })
	    .on('mouseout', function() {
		hovering(-1, states);
	    });

	//apply state borders attributes
	svg.append("path")
	    .attr("class", "state-borders")
	    .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));


    });
};


//==================================================
//Hovering business

//function for hovering to set exactly that state a certain color
var hovering = function(state, states) {
    d3.selectAll("path")
	.style("fill", function(d, i) {
	    if (i == state) {
		//the percentage is in states[i]; undo the scale with perc_range
		console.log(perc_range(states[i]));
		//create bars (maybe consider them rising just wherever your mouse is; would be easier
		//if it's negative; it means theres nothing there
		return "blue";
	    } else {
		return "rgba(255,0,0,"+ states[i] +")";
	    }
	});

};



needs_work("murder");
