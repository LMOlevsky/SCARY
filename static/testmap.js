var svg = d3.select("svg");
var path = d3.geoPath();
var coords=[]
var impCoords=[]
var types=[]
var onBar=false;
var again=false;

//POSSIBILITIES: ["Murder","Arson","Violent crime","Motor vehicle theft","Property crime","Aggravated assault","Robbery","Burglary","Larceny theft","Rape"]

// document.getElementById("showMurder").onclick=function(){
//     if(this.checked){
// 	types.push("Murder")
// 	alert("hi")
// 	create_states("murder");
//     }
// }

//var types=["Murder"]
function update(el){
    console.log(el.id);
    var bar_tag = "";
    var state_tag = "";
    if(el.id=="show_murder"){
	bar_tag = "Murder";
	state_tag = "murder"
    }
    else if(el.id=="show_arson"){
	bar_tag = "Arson"
	state_tag = "arson"
    }
    else if(el.id=="show_rape"){
	bar_tag = "Rape"
	state_tag = "rape"
    }
    else if(el.id=="show_moto_theft"){
	bar_tag = "MotorVehicleTheft"
	state_tag = "moto_theft"
    }
    else if(el.id=="show_prop"){
	bar_tag = "PropertyCrime"
	state_tag = "prop"
    }
    
    //checkbox=document.getElementById("showMurder")
    if(el.checked==true){
	coords=[]
	impCoords=[]
	console.log("types length "+types.length)
	//if(document.getElementById("showProp").checked){
	types.push(bar_tag);
	create_states(state_tag);
    }
    else{

	var state_tag = el.id.substring(5, el.id.length);
	console.log(state_tag);
	var garbage = document.getElementById("state_"+state_tag);
	console.log(garbage);
	garbage.innerHTML='';
	garbage.remove();
	//console.log("whatup");

	garbage = document.getElementsByTagName("rect");
	for (i = 0; i < garbage.length; i++) {
//	    garbage[i].innerHTML='';
	    garbage[i].remove();
	    //	    console.log(garbage);
	}
	ind = types.indexOf(bar_tag);
	types.splice(ind, 1);
	//Need to clear bars
	//console.log(types)
    }
}

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

var max = function(arr) {
    var m = arr[0];
    for (i = 0; i < arr.length; i++) {
	if (arr[i] > m) {
	    m = arr[i];
	}
    }
    return m;
}

var min = function(arr) {
    var m = arr[0];
    for (i = 0; i < arr.length; i++) {
	if (arr[i] <= 0) {
	    //don't do anything
	}
	else if (arr[i] < m) {
	    m = arr[i];
	}
    }
    return m;
}

//==================================================
//Configuring transparencies

//scales the values from the db evenly from 0.05 to 0.9
var alpha_range = function(val, max, min) {
    var alpha = d3.scaleLinear()
	.domain([min, max])
	.range([0.05, 0.9]);
    return alpha(val);
}

//grabs appropriate list from html depending on tag and alters state, which affects
var alphas = function(tag) {
    var states = [];
    var data = document.getElementById(tag).innerHTML;
    var stats = JSON.parse("["+data+"]")[0];
    var max_s = max(stats);
    var min_s = min(stats);
    console.log(min_s +" " +  max_s + "WE");
    for (var i = 0; i < 50; i++) {
	states.push(alpha_range(stats[i], max_s, min_s));
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

//var m=numC('arson2');
//console.log(m)


//==================================================
//Creating the states
var back = svg.append("g"); // appended first
var front = svg.append("g");

function getCentroid(selection) {
    // get the DOM element from a D3 selection
    // you could also use "this" inside .each()
    var element = selection.node(),
        // use the native SVG interface to get the bounding box
        bbox = element.getBBox();
    // return the center of the bounding box
    return [bbox.x + bbox.width/2, bbox.y + bbox.height/2];
}


var create_states = function(tag) {

    make_bars(types)
    svg.call(tip);
    var states=alphas(tag);

    d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
	if (error) throw error;

	var g = back;

	g.append("g")
            .attr("class", "states")
	    .attr("id", "state_" + tag)
	    .selectAll("path")
            .data(topojson.feature(us, us.objects.states).features)
	    .enter()
            .append("g")
            .attr("class","state-path")
            .attr("state", function(d) {
		return d.state;
            })
	    .style("fill", function(d, i) {
		return color(tag) + states[i] +")" ;
	    })
	    .on('mouseover', function(d, i) {
		console.log()
		//		console.log("What");
		//		console.log(d);
//		hovering(i, states, tag);
		numTimes=types.length
		console.log(numTimes +" times")
		console.log("le "+coords.length)
		for(j=0;j<numTimes;j++){
		    console.log(i)
		    console.log(i+50*j)
		    console.log("c "+coords[i+50*j])
		    impCoords.push(coords[i+50*j])
		}
		console.log("IMPO" +impCoords)
		barsShow(i,true)
		mouseOnBar(impCoords, 0);
		document.getElementById("boxText").innerHTML=statesList[i].replace(/\'/g, "")  
	    })
	    .on('mouseout', function(d,i) {
		again=true
		barsShow(i,false)
		var states_die = document.getElementsByClassName(statesList[i])
		console.log(states_die.length);
		var length = states_die.length;
		while(states_die[0] != '') {
		    states_die[0].remove();
		    console.log(states_die);
		}
	    });

	
	svg.selectAll('.state-path')
            .append("path")
            .attr("d", path)
            .attr("centroid", function(d, i) {
		var centroid = path.centroid(d);
            });

	g.append("path")
            .data(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
            .attr("id", "state-borders")
            .attr("d", path);

	d3.selectAll("path")

	


    });
    //callback();

};

//==================================================
//Hovering business
/*
//function for hovering to set exactly that state a certain color
var hovering = function(state, states, tag) {

    d3.selectAll("path")
	.style("fill", function(d, i) {
	    if (i == state) {
		//the percentage is in states[i]; undo the scale with perc_range
		//create bars (maybe consider them rising just wherever your mouse is; would be easier
		//if it's negative; it means theres nothing there
		return "black";
	    } else {
		return color(tag) + states[i] +")";
	    }
	});

};
*/
//create_states("murder");
var stateCoors =[[554.9820493311587, 384.6340056909818],
		 [80.82258312576948, 283.40167845343757],
		 [605.5763832710608, 265.66623033740524],
		 [449.1730262150776, 304.19757566749564],
		 [608.5724003479579, 430.5058530941247],
		 [712.6873765706466, 248.7517063896311],
		 [427.38996674052504, 461.72137863589705],
		 [661.2989606456629, 425.24010249738404],
		 [531.5840559002303, 223.46911250901823],
		 [567.4194512748293, 470.7758518227551],
		 [516.5946653249242, 129.6414015896711],
		 [551.7866256428767, 306.6374343984268],
		 [427.3878540702531, 234.86498780130137],
		 [204.82509225786282, 376.1956676070532],
		 [326.45245404671317, 285.1175806413173],
		 [655.1309047705755, 264.6912334156099],
		 [659.2381728731771, 164.2050159543356],
		 [282.51861048889253, 97.84955423272905],
		 [821.0483874311232, 168.85705199139625],
		 [101.04986267322434, 131.70723811769813],
		 [790.1958748968983, 299.4572677108202],
		 [303.1196645277344, 191.96194785876492],
		 [788.6451313495172, 344.85361485855384],
		 [463.4685502305517, 369.98958043796404],
		 [663.1906107071137, 355.3419995607502],
		 [585.573902034637, 163.7758248372078],
		 [100.87677335205404, 514.8161067939221],
		 [859.8485575029607, 133.62590954714943],
		 [422.4987986530495, 102.22408188477799],
		 [724.6900955022221, 421.08405926136544],
		 [904.8901409133521, 91.86682235977892],
		 [890.783475076746, 181.18284880525738],
		 [754.8872268789042, 279.9511484889455],
		 [195.69641319595496, 144.04932750429586],
		 [423.130656806072, 169.3620783670036],
		 [305.79809621840445, 386.95742730333643],
		 [122.30239154218933, 57.68528887763333],
		 [793.3713505198033, 221.84576222657273],
		 [755.7455589627274, 507.77862074199203],
		 [223.2502814234199, 264.31946020337864],
		 [677.655116118911, 315.7724926729923],
		 [878.895001668018, 137.77025897772197],
		 [767.2927002325082, 386.0424383160666],
		 [139.96003190313502, 247.69480087851903],
		 [294.8045564922889, 563.9882785155545],
		 [848.2752124691982, 226.3400237317859],
		 [872.259991483655, 187.21492246865907], 
		 [818.8052621621626, 259.14984417158763],
		 [883.6611759972714, 169.60417446521842],
		 [840.2066179677938, 255.63732126174412],
		 [815.0734400501556, 262.9217279337418]];

var make_bars = function(listTypes) {

    
    numSelected=listTypes.length //how many types of crimes user checked off 
    //var coords=[] //append values to this list based on the types of crime user checks off.  each element in coords is a list of the form [xcor, ycor, height (may be divided so it fits on screen), typeOfCrime (necessary for label)]
    ind=numSelected-1
    //for(j=0;j<numSelected;j++){
    for(j=0;j<numSelected;j++){
	for(i=0;i<50;i++){
	    temp=[];
	    temp.push(stateCoors[i][0]+(j)*11);
	    temp.push(stateCoors[i][1]);
	    text="";
	    divide=1;
	    if(types[j]=="Murder"){
		text="murder2";
		text2="Murder";
		divide=2;
	    }
	    else if(types[j]=="Arson"){
		text="arson2";
		text2="Arson";
	    }
	    else if(types[j]=="Rape"){
		text="rape2";
		text2="Rape";
		divide=3;
	    }
	    else if(types[j]=="MotorVehicleTheft"){
		text="moto_theft2";
		text2="Motor Vehicle Theft";
		divide=10;
	    }
	    else if(types[j]=="PropertyCrime"){
		text="prop2";
		text2="Property Crime";
		divide=100;
	    }
	    else if(types[j]=="ViolentCrime"){
		text="violent2";
		text2="Violent Crime";
		divide=10;
	    }
	    else if(types[j]=="AggravatedAssault"){
		text="assault2";
		text2="Aggravated Assault";
		divide=10;
	    }
	    else if(types[j]=="Burglary"){
		text="burglary2";
		text2="Burglary";
		divide=20;
	    }
	    else if(types[j]=="Larceny"){
		text="larceny2";
		text2="Larceny Theft";
		divide=10;
	    }
	    m=numC(text);
	    //temp.push(m[i])
	    if(m[i]==-1){
		temp.push(-1);
	    }
	    else if(m[i]==0){
		temp.push(0);
	    }
	    else{
		temp.push(m[i]/divide+50);
	    }
	    //console.log(m[i])
	    temp.push(text2);
	    temp.push(i)
	    coords.push(temp);
	}
    }
    console.log("Coords "+coords.length)
}






var statesList=document.getElementById("states").innerHTML
var citiesList=document.getElementById("cities").innerHTML
statesList= statesList.replace(/[[\]]/g,'')
citiesList= citiesList.replace(/[[\]]/g,'')
    //data=data.match(/\S+/g)
statesList=statesList.split(",")
citiesList=citiesList.split(",")
    
//Adds label to bars
//To make sure bars fit on the screen, actual numbers were divided by certain numbers like 10 (e.g. 5000 burglaries -> 500.  In that case, height of bar would be 500.  The "text" of the label needs the actual crime numbers, so we multiply the data (height) back
var tip = d3.tip()
    .attr('class', 'd3-tip')
    .html(function(d) {
	d = impCoords;
	var ttext= '';
	var text;
	for (i = 0; i < d.length; i++) {
	    var ptext = "<br>"+d[i][3]+": </strong> <span style='color:red'>"; 
	    if(parseInt(d[i][2])==0){
		text="N/A"
	    }
	    else if(parseInt(d[i][2])==-1){
		text="N/A"
	    }
	    else{
		text=citiesList[i*50+d[i][4]];
		text=text.substring(2, text.length);
	    }
	    ptext += text + "</span>"
	    ttext += ptext;
	}
	ind=d[0][4]
	stateName=statesList[ind]
	return "<strong>"+stateName.replace(/'/g, "")+ ttext; //d[3] refers to the type of crime (e.g. "Murder") while text refers to the actual number of crimes
  })

//svg.call(tip);

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

//var types=["Murder"]
//var coords=[]
//var coords=[]
var chart = d3.select(".chart").attr("width",960).attr("height",600);
var bar = chart.selectAll("rect");

function mouseOnBar(a,b){
    tip.show(a,b);
    onBar=true;
    console.log("on")
}

function mouseNot(a,b){
    tip.hide(a,b);
    onBar=false;
    console.log("off")
    again=true
}

var barsShow=function(state, bool){
    //var types=["Murder"]
    //var coords=[]
    //var impCoords=[]
    //make_bars(types)

    
    //numTimes=types.length
    //for(i=0;i<numTimes;i++){
	//impCoords.push(coords[state+50*i])
    //}

    
    //console.log(state)
    console.log(impCoords)
    //var chart = d3.select(".chart").attr("width",960).attr("height",600);
    //var bar = chart.selectAll("rect");
    //var barUpdate = bar.data(coords);
    //var chart = d3.select(".chart").attr("width",960).attr("height",600);
    //var bar = chart.selectAll("rect");
    var barUpdate=bar.data(impCoords);
    //svg.call(tip);
    //if(bool==true&&onBar==false&&again==false){
    if(bool==true){
	onBar=true
	var barEnter = barUpdate.enter().append("rect");
	//barEnter.text(function(d) { return d; });
	barEnter.attr("height", function(d) {
	    if(parseInt(d[2])==0||parseInt(d[2])==-1){
		return 0;
	    }
	    else{
		return d[2];
	    }})
	    .attr("width", function(d){return 10;})
	    .attr("y",function(d){return d[1]-d[2];})
	    .attr("x",function(d){return d[0];})
	    .attr("class", "bar")
	    .attr("class",function(d){return statesList[d[4]];})
	    .attr('info', function(d,i){mouseOnBar(d,i)});
	//.on('mouseover', tip.show)
	//.on('mouseout', tip.hide)
	//.on('mouseout', tip.hide);
//	    .on('mouseover', function(d,i){mouseOnBar(d,i)})
//	    .on('mouseout', function(d,i){mouseNot(d,i)});
	console.log(barEnter.size());
    }
    else if(bool==false){
    //else if(bool==false&&onBar==false&&again==true){
impCoords = [];
	//d3.select('.chart')
  //.selectAll('rect')
  //.data(impCoords)
  //.exit()
  //.remove();
    //barUpdate.exit().remove()
    //console.log("del "+barEnter.size());
	//bar= chart.selectAll("rect");
	
    //var clearRects=chart.selectAll("rect");
    //clearRects.remove()
	//console.log("del "+bar.size());
	
	//bar=chart.selectAll("rect");
    }
    //}
}

var barHide=function(){
    //console.log(statesList[state])
    //rectClass="rect."+statesList[state]
    //d3.select("bar").selectAll("*").remove();
    //d3.select("bar").html("");
    //var clearRects=chart.selectAll("rect");
    //clearRects.remove()
    //bar=chart.selectAll("rect");
    //bar.select(statesList[state]).remove();
}


//create_states("murder");
//create_states("moto_theft", make_bars);

//barsShow();
