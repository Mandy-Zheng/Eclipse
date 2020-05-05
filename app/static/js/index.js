var count=0
//data
var data =  [{"country":"Canada","cases":16},
{"country":"China","cases":39},{"country":"France","cases":90},]
,{"country":"United Kingdom","cases":93},{"country":"United States","case":1000}]
//defining the margin amounts of the chart
var margin = {top:10, right:10, bottom:10, left:10};
//the total width of the bar graph
var width = 960 - margin.left - margin.right;
//the total height of the bar graph
var height = 500 - margin.top - margin.bottom;


//sets the number of pixels for the xscale
//adds padding
var yScale = d3.scaleBand()
  .range([0, width-20])
  .paddingInner(0.05)

//sets the number of pixels for the yscale
var xScale = d3.scaleLinear()
      .range([height, 0]);

//positions the x axis on the bottom
var xAxis = d3.axisRight(xScale)
//positions the y axis on the left
var yAxis = d3.axisTop(yScale);


//makes a chart with width and height adjusted with margins
var svgContainer = d3.select("#chartID").append("svg")
    .attr("width", width+margin.left + margin.right)
    .attr("height",height+margin.top + margin.bottom)
    .append("g").attr("class", "container")
    .attr("transform", "translate("+ margin.left +","+ margin.top +")");

//for each bar, maps the labels of x scale based on d.country
xScale.domain(data.map(function(d) { return d.country; }));

//sets the scale of the yscale initially
yScale.domain([0, d3.max(data, function(d) { return d.cases+1; })]);

//draws the actual bars and does the height based off of data values
svgContainer.selectAll(".bar")
    	.data(data)
    	.enter()
    	.append("rect")
    	.attr("class", "bar")
    	.attr("x", function(d) { return xScale(d.country); })
    	.attr("width", xScale.bandwidth())
    	.attr("y", function(d) { return yScale(d.cases); })
    	.attr("height", function(d) { return height - yScale(d.cases); });

//make the numbers on the labels, x value and y value of the numerical labels
svgContainer.selectAll(".text")
      .data(data)
      .enter()
    	.append("text")
     	.attr("class","label")
     	.attr("x", (function(d) { return xScale(d.country) + xScale.bandwidth() / 2 ; }  ))
     	.attr("y", function(d) { return yScale(d.cases) - 30; })
      .attr("dy", ".75em")
    	.text(function(d) { return d.cases; });
//creates labels for y scale on the side
svgContainer.append("g")
      .attr("class", "yaxis")
      .attr("transform", "translate(960,0)")
      .call(yAxis)
      .selectAll("text");

//makes the x axis country labels
svgContainer.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height) + ")")
      .call(xAxis)
      .selectAll("text");

//function to render the hidden chart and buttons
var show = function(){
  var chart = document.getElementById("chartID");
  chart.style.display="inline";
  var transition = document.getElementById("transition");
  transition.style.display="inline";
  var continuous = document.getElementById("continue");
  continuous.style.display="inline";
  var date = document.getElementById("date");
  date.style.display="inline";
  var pause = document.getElementById("stop");
  pause.style.display="inline";
}

//function for transitioning to next day
var next = function(){
  //go to next index in country data
  count = (count+1) % 78;
  //manually change data
  data[0].cases=canada[count];
  data[1].cases=china[count];
  data[2].cases=france[count];
  data[3].cases=germany[count];
  data[4].cases=iran[count];
  data[5].cases=italy[count];
  data[6].cases=korea[count];
  data[7].cases=spain[count];
  data[8].cases=uk[count];
  data[9].cases=us[count];
  //displaying date by using index
  var date = document.getElementById("date");
  var dateOfMonth;
  if (count < 29) {
    dateOfMonth = count + 1;
    date.innerHTML = "Date: February " + dateOfMonth.toString() + ", 2020";
  } else if (count < 60) {
    dateOfMonth = count - 28;
    date.innerHTML = "Date: March " + dateOfMonth.toString() + ", 2020";
  } else {
    dateOfMonth = count - 59;
    date.innerHTML = "Date: April " + dateOfMonth.toString() + ", 2020";
  }

  //for each bar, maps the labels of x scale based on d.country
  xScale.domain(data.map(function(d) { return d.country; }));

  //scale goes from 0 to the largest case + offset
  yScale.domain([0, d3.max(data, function(d) { return d.cases + (d.cases % 20000); })]);

  // resetting y scale line on the side
  yAxis = d3.axisLeft(yScale);
  svgContainer.select(".yaxis")
           .transition().duration(1000)
           .call(yAxis)
           .selectAll("text");

  //resets the lengths of each bar based on new data
  svgContainer.selectAll("rect")
        .transition()
        .duration(1000)
        .attr("y", function(d) { return yScale(d.cases); })
        .attr("height", function(d) { return height - yScale(d.cases); });

  //resets the number labels and transitioning the previous numbers to the new data numbers
  svgContainer.selectAll(".label")
        .transition()
        .duration(1000)
        .tween( 'text', function(d) {
          var currentValue = this.textContent || "0";
          var interpolator = d3.interpolateRound( currentValue, d.cases);
          return function( t ) {
            this.textContent = interpolator( t );
          };})
        .attr("y", function(d) { return yScale(d.cases) - 30; })
        //.attr("x", (function(d) { return xScale(d.country) + xScale.bandwidth() / 2 ; }  ));
}

//booleans for automatic transition not firing twice and ending automatic transition
var start = false;
var end;

//starts the automatic transitioning
var run = function(){
  if(!start){
    start = true;
    end = setInterval(next, 1500);
  }
}

//stops the automatic transitioning
var stop = function(){
  start=false;
  clearInterval(end);
}

//made eventListener for the render button
var render = document.getElementById("render");
render.addEventListener('click',show)

//made eventlistener for the transition button
var transition = document.getElementById("transition");
transition.addEventListener('click',next)
