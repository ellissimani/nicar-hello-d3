# Hello, D3!

## What is D3?

**D3** stands for **D**ata-**D**riven **D**ocuments. It's a Javascript library used to manipulate the DOM ([which we learned about earlier](https://github.com/anniedaniel/nicar18-javascript/blob/master/hello-javascript/hello-javascript.md)). From the website:
> D3.js is a JavaScript library for manipulating documents based on data. D3 helps you bring data to life using HTML, SVG, and CSS
>D3 allows you to bind arbitrary data to a Document Object Model (DOM), and then apply data-driven transformations to the document. For example, you can use D3 to generate an HTML table from an array of numbers. Or, use the same data to create an interactive SVG bar chart with smooth transitions and interaction.

TL;DR – D3.js uses data to make things on the web, specifically using HTML, CSS, SVG and Javascript to make that happen.

**IMPORTANT: D3 is NOT a chart library**
- It _can_ be used as a data and visualization library
- It _can_ help you make charts, but its main goal is to utilize web technologies that already exist (HTML, CSS, SVG) in order to process and bind data to documents

Read the docs and more [here](https://d3js.org/)!

**Side note: What is SVG?** SVG stands for Scalable Vector Graphics. SVG defines vector-based graphics for the web using point coordinates in XML code. SVG is what D3 uses to create and manipulate unique shapes and graphics on the web. Read more about SVG [here](https://www.w3schools.com/graphics/svg_intro.asp).

#### Before we get started: The set up

First, take a look at the `start-files` folder. The file structure will be similar to the file structure used in the intro to js class, but instead of just having a `script.js` class, we have a `js` folder. If you open up that folder, you'll see a `main.js` file, which is where we'll write all of our code, and a `d3.v5.min.js` file which is a minimized version of the D3.js library.

If you look at the `index.html` file in your text editor, you'll see that we're referencing the `d3.v5.min.js` file just above the `main.js` just before the end of the HTML `</body>`. This is so we can use the D3 methods in our own code!

## Let's write some code!

Hop into the `main.js` file in your text editor. Before we get going, let's take a look at everything D3 gives us by logging the `d3` object.

	console.log(d3)

If you go to the console in your browser, like we did in the last class, you can see see the `d3` object. If you open it up and take a look, you can see all the different methods available with d3. We're only going to look at a select few today, but you explore all of the available methods in the [API documentation](https://github.com/d3/d3/blob/master/API.md).

### THE BASICS

#### Selections

**Selections** are how D3 interacts with the DOM.

Take a look inside the `index.html` file and you'll find a group of divs with the class `.selections`. Let's use D3 to manipulate these divs. You should also open up your `index.html` file in your web browser so you can see what it looks like right now.

In the last class, we looked at how you can interact with DOM elements using javascript. If we wanted to select the second `.selections` div, with the ID `#p1`, we would write something like this:

	// USING JAVASCRIPT
	document.getElementById("p1");

D3 has its own shorthand for selecting DOM elements – they're called **selections**!

Navigate to your `js/` directory and open up the `main.js` file in your text editor. Add this line to select the `#p1` div using D3 selections.

	d3.select("#p1");

While we're at it, let's assign this to a variable so we can reference it later on (remember variables from last class?). Now, let's use D3 selections to change a CSS attribute.

	var p1 = d3.select("#p1");
	p1.style("font-size","22px");

All of these D3 methods are chainable. So, if we wanted to change more than one style:

	var p1 = d3.select("#p1");
	p1.style("font-size","22px").style("padding","20px");

D3 selections also work for selecting more than one object at a time. You can do this with the `.selectAll()` method. Let's add another selection to our code, and alter the styles of all the `.selections` divs:

	var allP = d3.selectAll(".selections");
	allP.style("color","white").style("background","navy");

Styles aren't the only things we can change. We can also change the attributes associated with DOM elements. Let's drop the `.selections` class from `p1` and give it a different class – `.blue-selection`. If you look at your CSS file, you'll see a class already established in there with a few different style attributes already defined. **Make sure you add this attr change at the end of the chain we already started. If you put it _after_ our allP selections, the changes will not apply.**

	p1.style("font-size","22px").style("padding","20px").attr("class","blue-selection");

If you refresh the page, you'll see the styles change. You can also inspect your div to see the class change.

**At their core, selections are arrays of DOM elements.**

You can also append new elements to your selections. Let's add a `<p>` to each of our `.selections` divs using the `append` method.

	allP.append("p")
		.attr("class","inner-paragraph")
		.text("Our new paragraph");

Here's what this code is doing:
1. Selects all the `.selection` divs.
2. Appends a `<p>` DOM element to each `.selection` div.
3. For each of these new `<p>` elements, we're giving it the class `.inner-paragraph` and making the text inside the `<p>` say "Our new paragraph".

If you refresh your page, you'll see a new paragraph, using the styles already set for `.inner-paragraph` in our css file.

**Bringing in the data**

Now that we know how to append DOM elements and make changes to said DOM elements on our page, let's take a look at how the data part of D3 works. But first we need some data. Let's write out a basic array of values to work with.

	var dataset = [5, 10, 15, 20];

This array gives us four pieces of data that we will use to make a bar chart. To pull this off, we'll need to connect each number to a bar, which will then be used as a width. Using D3, we can do this with the data() operator.

	var bars = d3.select("#chart").selectAll(".bar");
	bars.data(dataset);
	
Like jQuery, D3 uses method chaining, which allows us to simplify that code to one line:
	
	var bars = d3.selectAll(".bar").data(dataset);

Now, let's apply the data values from our array to the CSS properties of our DOM elements so that we can manipulate the width of the bars. 

	bars.style("width", function(d){
	  return d * 10 + "px"; 
	});
	
Here we use the style() operator from above to manipulate the elements’ width, but replacing the static value with a function. Passed as an argument, the function returns the value of the linked datum that we joined and uses it as the CSS width in the style() operator.

**Using enter and update**

Th enter and update selections are useful in instances where we are attempting to join a set of data to a group of DOM elements that aren't equal in length, or if we want to add or remove values on the fly.

For the purpose of this course, we will be using enter and update to join data to DOM elements and then deal with changes to our data set dynamically . 

Let's start out by making a new array of values:

	var dataset2 = [5, 10, 15, 20, 25, 30];

Now, if we want to mimic what we did before and join the data to our DOM elements, you will notice that we have an issue: there are more values in the array (6) than bar elements (4). This is where we'll want to use the enter selection to store the surplus data that aren't paired to existing DOM elements. 

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

**Reading in tabular data**

Since we've got a grip on joining simple arrays to DOM elements in order to make a quick chart on the fly, let's take things a step further and load in an external CSV to the page to use for our bar chart. 

We can accomplish this goal using `d3.csv` to convert our csv into an array of objects that we can then use to join to our DOM elements. Let's take it for a spin:

	 d3.csv("lakers_players.csv").then(function(dataFile) {
	   console.log(dataFile);
	 });
	 
If you take a look in your inspector, you'll see that D3 has not only loaded in our CSV data, but it's also taken the headers of the original CSV and used them as property names for the data objects. Some of our properties, however, do not contain numerical data. Let's fix that:

	d3.csv("./data/lakers_players.csv").then(function(data) {
	  data.forEach(function(d) {
	    d["pct"] = +d["pct"];
	    d["total_pts"] = +d["total_pts"];
	  });
	  console.log(data);
	});
	
Next, we'll join the data to the 	`chart-2` div:

	d3.csv("./data/lakers_players.csv").then(function(data) {
	  data.forEach(function(d) {
	    d["pct"] = +d["pct"];
	    d["total_pts"] = +d["total_pts"];
	  });
	  console.log(data);
	  var allBars3 = d3.select("#chart-2")
	    .selectAll(".bar2").data(data);
	  });
	});
	
Next, we'll append a container to each of the bars, and within this container we'll append our bars. In order for our bars to be styled correctly, we'll use the `pct` field from our CSV as the width (though we'll multiply the value by 1000 in order to have a bit more dramatic effect).

	d3.csv("./data/lakers_players.csv").then(function(data) {
	  data.forEach(function(d) {
	    d["pct"] = +d["pct"];
	    d["total_pts"] = +d["total_pts"];
	  });
	  console.log(data);
	  var allBars3 = d3.select("#chart-2")
	    .selectAll(".bar2").data(data);
	
	  function update() {
	    var g = allBars3.enter().append("div").attr("class", "container");
	      g.append("div").attr("class", "bar2")
	      .style("width", function(d){
	        return d.pct * 1000 + "px";
	      })
	  };
	  
	  update();
	});
	
Finally, to spice our chart up a bit, we'll append two text elements to our container div, one of which will be the player's name, the other which will be the total amount of points scored. If you're curious how we styled the values to align well within the bars, take a peak at the styles.css file. 

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