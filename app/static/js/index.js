// var data =  [{"country":"Canada","cases":7},
// {"country":"China","cases":7},{"country":"France","cases":5}]
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
      .selectAll("text")
      // .attr("font-family", "Didot")

svgContainer.append("g")
      .attr("class", "yaxis")
      .call(yAxis)
      .selectAll("text")
      // .attr("font-family", "Didot")

//displaying date
var daysElapsed = document.getElementById("dateSlider").value;

var displayDate = function(daysElapsed) {
  console.log(daysElapsed);

  var month = '';
  var day;
  if (daysElapsed <= 10){
    month = "January";
    day = 21 + daysElapsed;
  } else if (daysElapsed <= 39) {
    month = "February";
    day = daysElapsed - 10;
  } else if (daysElapsed <= 70) {
    month = "March";
    day = daysElapsed - 39;
  } else if (daysElapsed <= 100) {
    month = "April";
    day = daysElapsed - 70;
  } else {
    month = "May";
    day = daysElapsed - 100;
  }
  document.getElementById("date").innerHTML = month + day.toString() + ", 2020";
};

var dateBtn = getElementById("dateBtn");
//dateBtn.addEventListener("click", displayDate);
dateBtn.addEventListener("click", document.getElementById("date").innerHTML = "hi");
