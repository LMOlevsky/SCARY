var svg = d3.select("svg");
var path = d3.geoPath();

//POSSIBILITIES: ["Murder","Arson","Violent crime","Motor vehicle theft","Property crime","Aggravated assault","Robbery","Burglary","Larceny theft","Rape"]

var types=["Murder"]
function update(){
    checkbox=document.getElementById("showProp")
    if(checkbox.checked==true){
    //if(document.getElementById("showProp").checked){
	types.push("PropertyCrime")
	alert("hi")
    }
}

//var types=["Arson","Rape"]
//var coords=[[100,100],[200,200]];

/*
var circles=svg.selectAll("circle").data(coords).enter();
circles.append("circle")
circles
    .attr("cx", function(d){ return d[0];})
    .attr("cy", function(d){return d[1];})
    .attr("r", function(d){return 100;})
*/

var color = function(tag){
    if (tag == "murder"){
	return "rgba(255,0,0,";
    }
    if (tag == "arson"){
	return "rgba(0,255,0,";
    }
    if (tag == "rape"){
	return "rgba(0,0,255,";
    }
    if (tag == "moto_theft"){
	return "rgba(255,255,0,";
    }
    if (tag == "prop"){
	return "rgba(255,0,255,";
    }
};


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

var numC = function(tag) {
    var states = [];
    var data = document.getElementById(tag).innerHTML;
    data = data.replace(/[[\]]/g,'')
    //data=data.match(/\S+/g)
    data=data.split(",")
    for (var i = 0; i < 50; i++) {
	states.push(data[i])
    }
    return states;
}
//create the state list
//alphas('murder');

var m=numC('arson2');
console.log(m)


//==================================================
//Creating the states
var back = svg.append("g"); // appended first
var front = svg.append("g");

var needs_work = function(tag) {

    var states=alphas(tag);

    d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
	if (error) throw error;

	//create states and apply states attrs
	//svg.append("g")
	back
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
		return color(tag) + states[i] +")" ;
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
		return "red";
	    } else {
		return color(tag) + states[i] +")";
	    }
	});

};

needs_work("moto_theft");

/*
if (!String.prototype.isInList) {
   String.prototype.isInList = function() {
      let value = this.valueOf();
      for (let i = 0, l = arguments.length; i < l; i += 1) {
         if (arguments[i] === value) return true;
      }
      return false;
   }
}
*/

//var coords=[[100,500,100,200],[200,500,150,200]]

/*
var stateCoor=[]
for(i=0;i<50;i++){
    stateCoor.push([100+i*25,500])
}
*/
var stateCoor=[[530,400],[70,350],[600,300],[410,320],[590,450],[700,270],[410,500],[640,450],[520,240],[540,490],[500,180], [530,340],[400,260],[170,400],[270,320],[640,290],[660,210],[230,120],[780,190],[60,150],[760,320],[260,220],[790,350],[430,385],[610,370],[560,150],[80,530],[850,130],[380,110],[700,450],[900,100],[890,190]]
//var stateCoor=[[100,500],[200,500]]
//var coords=[[100,500,100,"Murder"],[111,500,200,"arson"],[200,500,150,"Murder"],[211,500,200,"Arson"]]

numSelected=types.length
var coords=[]

for(j=0;j<numSelected;j++){
    for(i=0;i<32;i++){
	temp=[]
	temp.push(stateCoor[i][0]+j*11)
	temp.push(stateCoor[i][1])
	text=""
	divide=1
	if(types[j]=="Murder"){
	    text="murder2"
	    text2="Murder"
	    divide=2
	}
	else if(types[j]=="Arson"){
	    text="arson2"
	    text2="Arson"
	}
	else if(types[j]=="Rape"){
	    text="rape2"
	    text2="Rape"
	    divide=3
	}
	else if(types[j]=="MotorVehicleTheft"){
	    text="moto_theft2"
	    text2="Motor Vehicle Theft"
	    divide=10
	}
	else if(types[j]=="PropertyCrime"){
	    text="prop2"
	    text2="Property Crime"
	    divide=100
	}
	else if(types[j]=="ViolentCrime"){
	    text="violent2"
	    text2="Violent Crime"
	    divide=10
	}
	else if(types[j]=="AggravatedAssault"){
	    text="assault2"
	    text2="Aggravated Assault"
	    divide=10
	}
	else if(types[j]=="Burglary"){
	    text="burglary2"
	    text2="Burglary"
	    divide=20
	}
	else if(types[j]=="Larceny"){
	    text="larceny2"
	    text2="Larceny Theft"
	    divide=10
	}
	m=numC(text)
	//temp.push(m[i])
	if(m[i]==-1){
	    temp.push(1)
	}
	else{
	    temp.push(m[i]/divide)
	}
	//console.log(m[i])
	temp.push(text2)
	coords.push(temp)
    }
}

//IDEA: when user selects say 2 types of crimes, we need to append [xcor,ycor,heightOfBar,typeOfCrimeSelected] to "coords list"
//for each state, check how many lists in "coords" already have those x and y cors and then generate updated xcor (+i*11) for this current bar

/*
function howManyTimes(state){
    xCor=coords[state][0]
    yCor=coords[state][1]
    count=0
    for(i=0;i<coords.length;i++){
	if(coords[i][0]==xCor && coords[i][1]==yCor){
	    count+=1
	}
    }
    return count
}
//e.g. howManyTimes(0) is for Arkansas
*/


//var circles=svg.append("g").selectAll("circle").data(coords).enter()
var circles=front.selectAll("circle").data(coords).enter()
circles.append("circle").attr("cx",function(d){return d[0];})
    .attr("cy",function(d){return d[1];})
    .attr("r",function(d){return 5;})
    .style("fill",function(d){return "blue";});

function getCentroid(selection) {
    // get the DOM element from a D3 selection
    // you could also use "this" inside .each()
    var element = selection.node(),
        // use the native SVG interface to get the bounding box
        bbox = element.getBBox();
    // return the center of the bounding box
    return [bbox.x + bbox.width/2, bbox.y + bbox.height/2];
}

//console.log(getCentroid(svg.selectAll("path")));
//console.log(svg.selectAll("path"));

var chart = d3.select(".chart").attr("width",960).attr("height",600);
var bar = chart.selectAll("rect");
var barUpdate = bar.data(coords);

var tip = d3.tip()
  .attr('class', 'd3-tip')
    .html(function(d) {
	if(d[3]=="Property Crime"){
	    text=(parseInt(d[2])*100)+""
	}
	else if(d[3]=="Arson"){
	    text=d[2]
	}
	else if(d[3]=="Rape"){
	    text=(parseInt(d[2])*3)+""
	}
	else if(d[3]=="Murder"){
	    text=(parseInt(d[2])*2)+""
	}
	else if(d[3]=="Burglary"){
	    text=(parseInt(d[2])*20)+""
	}
	else{
	    text=(parseInt(d[2])*10)+""
	}
    return "<strong>"+d[3]+": </strong> <span style='color:red'>" + text + "</span>";
  })

svg.call(tip);

/*
var times=coords[0].length-2
for(i=0;i<times;i++){
    var barEnter = barUpdate.enter().append("rect");
    barEnter.text(function(d) { return d; });
	
IGNORE---
barEnter.style("height", function(d) {return d[2] + "px"; })
    .style("top",function(d){return 600-d[1]+"px";})
    .style("left",function(d){return d[0]+"px";});
----

    barEnter.attr("height", function(d) {return d[i+2]; })
	.attr("width", function(d){return 10;})
	.attr("y",function(d){return d[1]-d[i+2];})
	.attr("x",function(d){return d[0]+i*11;})
	.attr("class", "bar")
    //.on('mouseover', tip.show)
	.on('mouseover', tip.show)
	.on('mouseout', tip.hide);
}
*/

var barEnter = barUpdate.enter().append("rect");
barEnter.text(function(d) { return d; });
barEnter.attr("height", function(d) {return d[2]; })
	.attr("width", function(d){return 10;})
	.attr("y",function(d){return d[1]-d[2];})
	.attr("x",function(d){return d[0];})
	.attr("class", "bar")
    //.on('mouseover', tip.show)
	.on('mouseover', tip.show)
	.on('mouseout', tip.hide);

//needs_work("murder");
