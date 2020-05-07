var data =  [{"country":"Canada","cases":7},
{"country":"China","cases":7},{"country":"France","cases":5}]
//defining the margin amounts of the chart
var margin = {top:50, right:50, bottom:50, left:50};
//the total width of the bar graph
var height = data.length*200-100;
//the total height of the bar graph
var width = 800-100;


//sets the number of pixels for the xscale
//adds padding
var yScale = d3.scaleBand()
  .range([0, height])
  .paddingInner(0.05)

//sets the number of pixels for the yscale
var xScale = d3.scaleLinear()
      .range([0,width-50]);

//positions the x axis on the bottom
var xAxis = d3.axisTop(xScale)
//positions the y axis on the left
var yAxis = d3.axisLeft(yScale);


//makes a chart with width and height adjusted with margins
var svgContainer = d3.select("#chartID").append("svg")
    .attr("width", width+100)
    .attr("height",height+100)
    .append("g").attr("class", "container")
    .attr("transform", "translate("+ 50 +","+ 50 +")");

//for each bar, maps the labels of x scale based on d.country
yScale.domain(data.map(function(d) { return d.country; }));

//sets the scale of the yscale initially
xScale.domain([0, d3.max(data, function(d) { return d.cases+1; })]);

//draws the actual bars and does the height based off of data values
svgContainer.selectAll(".bar")
    	.data(data)
    	.enter()
    	.append("rect")
    	.attr("class", "bar")
    	.attr("y", function(d) { return yScale(d.country); })
    	.attr("height", yScale.bandwidth())
    	.attr("x", function(d) { return 0; })
    	.attr("width", function(d) { return xScale(d.cases); });

//make the numbers on the labels, x value and y value of the numerical labels
svgContainer.selectAll(".text")
      .data(data)
      .enter()
    	.append("text")
     	.attr("class","label")
     	.attr("y", (function(d) { return yScale(d.country) + yScale.bandwidth() / 2 ; }  ))
     	.attr("x", function(d) { return  xScale(d.cases) + 10; })
      .attr("dx", ".75em")
    	.text(function(d) { return d.cases; });
//creates labels for y scale on the side

svgContainer.append("g")
      .attr("class", "xaxis")
      .call(xAxis)
      .selectAll("text");


svgContainer.append("g")
      .attr("class", "yaxis")
      .call(yAxis)
      .selectAll("text");


//pie chart code

var pwidth = 250
var pheight = 250
var margin= 40

var radius = Math.min(width, height) / 2 - margin
var svg = d3.select("#pieID")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


// set the color scale
var color = d3.scaleOrdinal()
  .domain([0, d3.max(data, function(d) { return d.cases+1; })])
  .range(d3.schemeDark2);

var pie = d3.pie()
      .value(function(d) {return d.value; })
      .sort(function(a, b) { console.log(a) ; return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
var data_ready = pie(d3.entries(data))

    // map to data
var u = svg.selectAll("path")
      .data(data_ready)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    u
      .enter()
      .append('path')
      .merge(u)
      .transition()
      .duration(1000)
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
      )
      .attr('fill', function(d){ return(color(d.cases)) })
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 1)

// A function that create / update the plot for a given variable:
