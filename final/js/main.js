// make sure we've loaded d3 properly, explore functions
console.log(d3);

//////////////////
/// SELECTIONS ///
//////////////////

/* you can select things individually */

var p1 = d3.select("#p1");
p1.style("font-size","22px").style("padding","20px").attr("class","blue-selection");

/* select all of the divs with class "selections" and change the font color*/
var allP = d3.selectAll(".selections");
allP.style("color","white").style("background","navy");

p1.style("font-size","22px").style("padding","20px").attr("class","blue-selection");

/* add an inner paragraph with append */
allP.append("p")
		.attr("class","inner-paragraph")
		.text("Our new paragraph");

// Let's select the first child of #chart
var firstBar = d3.select("#chart").select(".bar");

// Let's take it one step further and select all the .bar children of #chart
var allBars = d3.select("#chart").selectAll(".bar");

// Now, let's manipulate the CSS properties of our DOM elements
allBars.style("width", "100px");

///////////////////
/// DATA  JOINS ///
///////////////////

// We'll start with some simple data in the form of an array of values
var dataset = [5, 10, 15, 20];

// Now, let's do our first join! First: select all bars within the bar chart, then join them
var bars = d3.select("#chart").selectAll(".bar");
bars.data(dataset);

// Or, do both in one line of code
// var bars = d3.selectAll(".bar").data(dataset);

// Now, let's apply the data values from datset to the CSS properties of our DOM elements
bars.style("width", function(d){
  return d * 10 + "px"; // multiplying the data value by 10 for more dramatic effect
});

// * Using the enter selection * //
var dataset2 = [5, 10, 15, 20, 25, 30];

var allBars2 = d3.select("#chart")
  .selectAll(".bar").data(dataset2);

function update() {
  // Enter selection: Create new DOM elements for added
  // data items, resize and position them.
  allBars2.enter()
    .append("div").attr("class", "bar")
    .style("width", function(d){
      return d * 10 + "px";
    })
};
update();

///////////////////////////////
/// READING IN TABULAR DATA ///
///////////////////////////////

//Use d3.csv to read in our data file
// d3.csv("lakers_players.csv").then(function(dataFile) {
//   console.log(dataFile);
// });

// Let's alter the function above so that we get numerical values
d3.csv("./data/lakers_players.csv").then(function(data) {
  data.forEach(function(d) {
    d["pct"] = +d["pct"];
    d["total_pts"] = +d["total_pts"];
  });
  console.log(data);
  var allBars3 = d3.select("#chart-2")
    .selectAll(".bar2").data(data);

  function update() {
    // we'll append a container to each of the bars and set it equal to a variable
    var g = allBars3.enter().append("div").attr("class", "container");
      // Now we can append children to the parent element (g)
      g.append("p").attr("class", "text")
      .html(function(d){
        return d.player_name;
      })
      g.append("div").attr("class", "bar2")
      .style("width", function(d){
        return d.pct * 1000 + "px";
      })
      g.append("p").attr("class", "text")
      .html(function(d){
        return d.total_pts + " points"
      })
  };
  update();

});

////////////////////////////////
/// *Extra* Charts with SVG  ///
////////////////////////////////

var svgWidth = 500;
var svgHeight = 500;

/* our first SVG! */
var svg = d3.select('#svg').append('svg')
		.attr('width',svgWidth)
    .attr('height', svgHeight)

d3.json('./data/lakers_players.json').then(function(playerData) {
  console.log(playerData);
  var pointsScale = d3.scaleLinear()
  	.domain([
  		0, d3.max(playerData, function(d){ return d.total_pts })
  	]) // set the domain from zero (lowest possible rank) to the highest rank
    .range([0, svgWidth]); // this is the _range_ we want to align our data to.

  var rankScale = d3.scaleBand()
  	.domain(playerData.map(function(d){ return d.rank; }))
  	.paddingInner(0.1)
    .paddingOuter(0.5)
  	.range([0, svgHeight], .1);

  var bars = svg.selectAll('.points-bar')
  	.data(playerData).enter()
  	.append('rect').attr('class','points-bar')
  	.attr('x','0') // our X coordinate for each bar is 0, so the top left of our rectangle stays all the way to the left
  	.attr('y', function(d){
  		return rankScale(d.rank) // pass in each player's rank to the rankScale to get its y position
  	})
  	.attr('height', rankScale.bandwidth()) // scaleBand comes with a nice bandWith() method for creating bars
  	.attr('width', function(d){
  		return pointsScale(d.total_pts) // pass in each player's points to the pointScale to see how wide the bar should be
  	});
});
