// var data =  [{"country":"Canada","cases":7,"deaths":10},
// {"country":"China","cases":7,"deaths": 15},{"country":"France","cases":5,"deaths":20}]

//defining the margin amounts of the chart
var margin = {top:50, right:50, bottom:50, left:50};
//the total width of the bar graph
var height = 3*200-100;
//the total height of the bar graph
var width = 800-100;


//sets the number of pixels for the yscale
//adds padding
var yScale = d3.scaleBand()
  .range([0, height])
  .paddingInner(0.08)

//sets the number of pixels for the xscale
var xScale = d3.scaleLinear()
      .range([0,width-50]);

//positions the x axis on the top
var xAxis = d3.axisTop(xScale)
//positions the y axis on the left
var yAxis = d3.axisLeft(yScale);


//makes a chart with width and height adjusted with margins
var svgContainer = d3.select("#chartID").append("svg")
    .attr("width", width+100)
    .attr("height",height+100)
    .append("g").attr("class", "container")
    .attr("transform", "translate("+ 50 +","+ 50 +")");

//for each bar, maps the labels of y scale based on d.cases and d.deaths
yScale.domain(data.map(function(d) { return d.country; }));

max1 = d3.max(data, function(d) { return d.cases; });
max2 = d3.max(data, function(d) { return d.deaths; });
// console.log(max1);
// console.log(max2);
findM = [max1, max2]
//sets the scale of the xscale initially
xScale.domain([0, d3.max(findM)]);
// xScale.domain([0, function(d) { if (d3.max(d.cases) >= d3.max(d.deaths)) { return d3.max(d.cases) + 1 } else { return d3.max(d.deaths) + 1 }}]);
// console.log(xScale)

//draws the actual bars and does the height based off of data values
bars = svgContainer.selectAll(".bar")
    	.data(data)
    	.enter()
      .append("g")

//option1
bars.append("rect")
    	.attr("class", "bar")
    	.attr("y", function(d) { return yScale(d.country); })
    	.attr("height", yScale.bandwidth()/2)
    	.attr("x", function(d) { return 0; })
    	.attr("width", function(d) { return xScale(d.cases); })

//option2
bars.append("rect")
      .attr("class", "bar2")
      .attr("y", function(d) { return yScale(d.country); })
      .attr("width", function(d) { return xScale(d.deaths); })
      .attr("height", yScale.bandwidth()/2)
      .attr("x", function(d) { return 0; })
      .attr("transform", function(d) { return "translate(0, "+ yScale.bandwidth()/2 +")"; });

//make the numbers on the labels, x value and y value of the numerical labels

labeling = svgContainer.selectAll(".text")
      .data(data)
      .enter()

labeling.append("text")
     	.attr("class","label")
     	.attr("y", (function(d) { return yScale(d.country) + yScale.bandwidth() / 4 ; }  ))
     	.attr("x", function(d) { return  xScale(d.cases) + 10; })
      .attr("dx", ".75em")
    	.text(function(d) { return d.cases; });

labeling.append("text")
      .attr("class", "label")
      .attr("x", function(d) { return xScale(d.deaths) + 10; })
      .attr("y", (function(d) { return yScale(d.country) + ((yScale.bandwidth() / 4) * 3) ; } ))
      .attr("dx", ".75em")
      .text(function(d) {return  d.deaths;})

//creates labels for y scale on the side

svgContainer.append("g")
      .attr("class", "xaxis")
      .call(xAxis)
      .selectAll("text")
      // .attr("font-family", "Didot")

svgContainer.append("g")
      .attr("class", "yaxis")
      .call(yAxis)
      .selectAll("text")
      // .attr("font-family", "Didot")

// svgContainer.selectAll(".legend")
//     .data(data)
//     .enter().append("g")
//     .attr("class", "legend")
//     .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
//     .style("opacity","0");
//
// color = d3.scale.ordinal()
//     .range(["#f4a582","#0571b0"]);
//
// legend.append("rect")
//     .attr("x", width - 18)
//     .attr("width", 18)
//     .attr("height", 18)
//     .style("fill", function(d) { return color(d); });
//
// legend.append("text")
//     .attr("x", width - 24)
//     .attr("y", 9)
//     .attr("dy", ".35em")
//     // .style("text-anchor", "end")
//     .text(function(d) {return d.country; });

//displaying date
// var daysElapsed = document.getElementById("dateSlider").value;
//
// var displayDate = function(daysElapsed) {
//   console.log(daysElapsed);
//
//   var month = '';
//   var day;
//   if (daysElapsed <= 10){
//     month = "January";
//     day = 21 + daysElapsed;
//   } else if (daysElapsed <= 39) {
//     month = "February";
//     day = daysElapsed - 10;
//   } else if (daysElapsed <= 70) {
//     month = "March";
//     day = daysElapsed - 39;
//   } else if (daysElapsed <= 100) {
//     month = "April";
//     day = daysElapsed - 70;
//   } else {
//     month = "May";
//     day = daysElapsed - 100;
//   }
//   document.getElementById("date").innerHTML = month + day.toString() + ", 2020";
// };
//
// var dateBtn = document.getElementById("dateBtn");
// //dateBtn.addEventListener("click", displayDate);
// dateBtn.addEventListener("click", document.getElementById("dateSelected").innerHTML = "hi");

/*      .selectAll("text");


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
=======*/
