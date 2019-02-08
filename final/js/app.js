// make sure we've loaded d3 properly, explore functions
console.log(d3);

//////////////////
/// SELECTIONS ///
//////////////////

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
d3.csv("lakers_players.csv").then(function(data) {
  data.forEach(function(d) {
    d["pct"] = +d["pct"];
    d["total_pts"] = +d["total_pts"];
  });
  console.log(data);
  var allBars3 = d3.select("#chart-2")
    .selectAll(".bar2").data(data);

  allBars3.style("width", function(d){
    return d.pct * 1000 + "px"; // multiplying the data value by 1000 for even more dramatic effect
  });

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
  };
  update();

});

////////////////////////////////
/// *EXTRA* WORKING WITH SVG ///
////////////////////////////////
