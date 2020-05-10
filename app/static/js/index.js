// var data =  [{"country":"Canada","cases":7,"deaths":10},
// {"country":"China","cases":7,"deaths": 15},{"country":"France","cases":5,"deaths":20}]

var num = 0;
var canadaN = [5, 10, 15, 20, 25, 30, 35, 40]
var canadaD = [1, 2, 3, 4, 5, 6, 7, 8];
var canadaR = [10, 20, 30, 40, 50, 60, 70, 80];
var updateBar1;


var initialBar1 = function(data, l){
  // console.log(data);
  var margin = {top:50, right:50, bottom:50, left:50};
  //the total width of the bar graph
  var height = data.length*200-100;
  //the total height of the bar graph
  var width = 1200-100;


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
      .attr("width", width+200)
      .attr("height",height+100)
      .append("g").attr("class", "container")
      .attr("transform", "translate("+ 100 +","+ 50 +")");

  yScale.domain(data.map(function(d) { return d.country; }));
  yAxis = d3.axisLeft(yScale);

  xScale.domain([0, d3.max(data, function(d) { return d.option1+ 20; })]);
  xAxis = d3.axisTop(xScale);

  //draws the actual bars and does the height based off of data values
  var bars = svgContainer.selectAll(".bar")
      .data(data)
      .enter()
      .append("g")

  bars.append("rect")
      .attr("class", "bar")
      .attr("y", function(d) { return yScale(d.country); })
      .attr("height", yScale.bandwidth())
      .attr("x", function(d) { return 0; })
      .attr("width", function(d) { return xScale(d.option1); });

  //make the numbers on the labels, x value and y value of the numerical labels
  var labeling = svgContainer.selectAll(".text")
      .data(data)
      .enter()

  labeling.append("text")
      .attr("class","label")
      .attr("y", (function(d) { return yScale(d.country) + yScale.bandwidth()/2; }  ))
      .attr("x", function(d) { return  xScale(d.option1) + 10; })
      .attr("dx", ".75em")
      .text(function(d) { return d.option1; });


  //creates labels for x scale on the side
  svgContainer.append("g")
      .attr("class", "xaxis")
      .call(xAxis)
      .selectAll("text")
      // .attr("font-family", "Didot")

  //title for x axis
  svgContainer.append("text")
      .attr("x", width/2)
      .attr("y", -35)
      .style("text-anchor", "middle")
      .text("Value");

  //creates labels for y scale on the side
  svgContainer.append("g")
      .attr("class", "yaxis")
      .call(yAxis)
      .selectAll("text")
      // .attr("font-family", "Didot")

  //title for y axis
  svgContainer.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 100)
      .attr("x", 0 - height/2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Country/State");

  var legend = d3.select("#chartID").select("svg").selectAll(".legend")
      .data(data)
      .enter().append("g")
      .attr("class", "legend")
      // .attr("transform", "translate(0,0)");

  legend.append("circle")
      .attr("class", "option1")
      .attr("cx", width + 160)
      .attr("cy", 70)
      .attr("r", 10)
      .style("fill", "#E5C3D1");

  legend.append("text")
      .attr("x", width + 60)
      .attr("y", 75)
      .text(""+ l[0] +"");


  updateBar1 = function(updatedData){
    // console.log("here");
    // console.log(updatedData);

    yScale.domain(updatedData.map(function(d) { return d.country; }));
    yAxis = d3.axisLeft(yScale);

    xScale.domain([0, d3.max(updatedData, function(d) { return d.option1+ 20; })]);
    xAxis = d3.axisTop(xScale);

    svgContainer.select(".xaxis")
           .transition().duration(1000)
           .call(xAxis)
           .selectAll("text");

    //resets the lengths of each bar based on new data
    var testing = -1;
    svgContainer.selectAll(".bar")
          .transition()
          .duration(1000)
          .attr("width", function() { testing++; return xScale(updatedData[testing].option1); });
          // .attr("y", function(d) { return yScale(d.cases); })

    testing = -1;
    var testing2 = -1;
  //resets the number labels and transitioning the previous numbers to the new data numbers
    svgContainer.selectAll(".label")
        .transition()
        .duration(1000)
        .tween( 'text', function() {
          testing++;
          var currentValue = this.textContent || "0";
          var interpolator = d3.interpolateRound( currentValue, updatedData[testing].option1);
          return function( t ) {
            this.textContent = interpolator( t );
          };})
        .attr("x", function() { testing2++; return xScale(updatedData[testing2].option1) + 10; })
        //.attr("x", (function(d) { return xScale(d.country) + xScale.bandwidth() / 2 ; }  ));
  }

}
//for each bar, maps the labels of y scale based on d.cases and d.deaths

var initialBar2 = function(data, l){
  var margin = {top:50, right:50, bottom:50, left:50};
  //the total width of the bar graph
  var height = data.length*200-100;
  //the total height of the bar graph
  var width = 1200-100;


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
      .attr("width", width+200)
      .attr("height",height+100)
      .append("g").attr("class", "container")
      .attr("transform", "translate("+ 100 +","+ 50 +")");
  // height = 3*200-100;
  max1 = d3.max(data, function(d) { return d.option1; });
  max2 = d3.max(data, function(d) { return d.option2; });
  // console.log(max1);
  // console.log(max2);
  findM = [max1, max2]
  //sets the scale of the xscale initially
  xScale.domain([0, d3.max(findM) + 20]);
  xAxis = d3.axisTop(xScale);

  yScale.domain(data.map(function(d) { return d.country; }));
  yAxis = d3.axisLeft(yScale);

  bars = svgContainer.selectAll(".bar")
      .data(data)
      .enter()
      .append("g");

  //option1
  bars.append("rect")
      .attr("class", "bar")
      .attr("y", function(d) { return yScale(d.country); })
      .attr("height", yScale.bandwidth()/2)
      .attr("x", function(d) { return 0; })
      .attr("width", function(d) { return xScale(d.option1); })

  // option2
  bars.append("rect")
      .attr("class", "bar2")
      .attr("y", function(d) { return yScale(d.country); })
      .attr("width", function(d) { return xScale(d.option2); })
      .attr("height", yScale.bandwidth()/2)
      .attr("x", function(d) { return 0; })
      .attr("transform", function(d) { return "translate(0, "+ yScale.bandwidth()/2 +")"; });

  labeling = svgContainer.selectAll(".text")
      .data(data)
      .enter()

  //option1
  labeling.append("text")
      .attr("class","label")
      .attr("class", "first")
      .attr("y", (function(d) { return yScale(d.country) + yScale.bandwidth() / 4 ; }  ))
      .attr("x", function(d) { return  xScale(d.option1) + 10; })
      .attr("dx", ".75em")
      .text(function(d) { return d.option1; });

  //option2
  labeling.append("text")
      .attr("class", "label")
      .attr("class", "second")
      .attr("y", (function(d) { return yScale(d.country) + ((yScale.bandwidth() / 4) * 3) ; } ))
      .attr("x", function(d) { return xScale(d.option2) + 10; })
      .attr("dx", ".75em")
      .text(function(d) {return  d.option2;})

  //creates labels for x scale on the top
  svgContainer.append("g")
      .attr("class", "xaxis")
      .call(xAxis)
      .selectAll("text")
      // .attr("font-family", "Didot")

  //title for x axis
  svgContainer.append("text")
      .attr("x", width/2)
      .attr("y", -35)
      .style("text-anchor", "middle")
      .text("Value");

  //creates labels for y scale on the left
  svgContainer.append("g")
      .attr("class", "yaxis")
      .call(yAxis)
      .selectAll("text")
      // .attr("font-family", "Didot")

  //title for y axis
  svgContainer.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 100)
      .attr("x", 0 - height/2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Country/State");

  legend = d3.select("#chartID").select("svg").selectAll(".legend")
      .data(data)
      .enter().append("g")
      .attr("class", "legend")
      // .attr("transform", "translate(0,0)");

  legend.append("circle")
      .attr("class", "option1")
      .attr("cx", width+160)
      .attr("cy", 70)
      .attr("r", 10)
      .style("fill", "#E5C3D1");

  legend.append("text")
      .attr("x", width + 60)
      .attr("y", 75)
      .text("" + l[0] + "");

  legend.append("circle")
      .attr("class", "option2")
      .attr("cx", width+160)
      .attr("cy", 100)
      .attr("r", 10)
      .style("fill", "#CAA8F5");

  legend.append("text")
      .attr("x", width + 60)
      .attr("y", 105)
      .text("" + l[1] + "");

  updateBar2 = function(updatedData){
    // console.log("here2");
    // console.log(updatedData);

    yScale.domain(updatedData.map(function(d) { return d.country; }));
    yAxis = d3.axisLeft(yScale);

    max1 = d3.max(updatedData, function(d) { return d.option1; });
    max2 = d3.max(updatedData, function(d) { return d.option2; });
    // console.log(max1);
    // console.log(max2);
    findM = [max1, max2]

    xScale.domain([0, d3.max(findM) + 20]);
    xAxis = d3.axisTop(xScale);

    svgContainer.select(".xaxis")
           .transition().duration(1000)
           .call(xAxis)
           .selectAll("text");

    //resets the lengths of each bar based on new data
    var testing = -1;
    // console.log(updatedData[testing].option1);
    // console.log(updatedData[testing].option2);

    svgContainer.selectAll(".bar")
          .transition()
          .duration(1000)
          .attr("width", function() { testing++; return xScale(updatedData[testing].option1); });
          // .attr("y", function(d) { return yScale(d.cases); })

    testing = -1;
    svgContainer.selectAll(".bar2")
          .transition()
          .duration(1000)
          .attr("width", function() { testing++; return xScale(updatedData[testing].option2); });
          // .attr("y", function(d) { return yScale(d.cases); })

    testing = -1;
    var testing2 = -1;
  //resets the number labels and transitioning the previous numbers to the new data numbers
    svgContainer.selectAll(".first")
        .transition()
        .duration(1000)
        .tween( 'text', function() {
          testing++;
          var currentValue = this.textContent || "0";
          var interpolator = d3.interpolateRound( currentValue, updatedData[testing].option1);
          return function( t ) {
            this.textContent = interpolator( t );
          };})
        .attr("x", function() { testing2++; return xScale(updatedData[testing2].option1) + 10; })
        //.attr("x", (function(d) { return xScale(d.country) + xScale.bandwidth() / 2 ; }  ));

    var label1 = -1;
    var label2 = -1;

    svgContainer.selectAll(".second")
        .transition()
        .duration(1000)
        .tween( 'text', function() {
          label1++;
          // console.log(testing);
          // console.log(updatedData[0].option2);
          var currentValue = this.textContent || "0";
          var interpolator = d3.interpolateRound( currentValue, updatedData[label1].option2);
          return function( t ) {
            this.textContent = interpolator( t );
          };})
        .attr("x", function() { label2++; return xScale(updatedData[label2].option2) + 10; })
  }

}

var initialPie = function(data){
  for (var i = 0; i < data.length; i++) {
  // set the dimensions and margins of the graph
  var width = 450
      height = 450
      margin = 50

  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  var radius = Math.min(width, height) / 2 - margin

  // append the svg object to the div called 'my_dataviz'
  var svg = d3.select("#pieID")
    .append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // set the color scale
  var color = d3.scaleOrdinal()
    .domain(data[i])
    .range(d3.schemeDark2);

  // A function that create / update the plot for a given variable:
  //

    // Compute the position of each group on the pie:
    var pie = d3.pie()
      .value(function(d) {return d.value; })
      .sort(function(a, b) { console.log(a) ; return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
    var data_ready = pie(d3.entries(data[i]))

    var label = d3.arc()
              .outerRadius(radius+60)
              .innerRadius(radius);

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
      .attr('fill', function(d){return(color(d.data.key)) })
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 1)

    svg.selectAll(".text")
      .data(data_ready)
      .enter()
        .append("text")                                     //add a label to each slice
        .attr("transform", function(d) {                //set the label's origin to the center of the arc
              //we have to make sure to set these before calling arc.centroid
          return "translate(" +label.centroid(d)+ ")";        //this gives us a pair of coordinates like [50, 50]
        })
        .attr("text-anchor", "middle")                          //center the text on it's origin
        .text(function(d) {
          if(!Number.isNaN(d.value)){
    			  return d.data.key;
          }
        })

    // remove the group that is not present anymore
    u
      .exit()
      .remove()
    }
  }
var clearChart = function(){
  d3.selectAll("svg").remove();
}

var newGraph = function(){
  // num = 0;
  var data =  [{"location":"Canada", "cases":canadaN[num], "deaths":canadaD[num], "recovered":canadaR[num]},
{"location":"China","cases":7,"deaths": 15, "recovered": 25},{"location":"France","cases":5,"deaths":20, "recovered": 8}]
// console.log(data);
  var d = document.getElementById("d").checked;
  var r = document.getElementById("r").checked;
  var n =document.getElementById("n").checked;
  var subData=[]
  var options=[]
  clearChart();
  if(r && d && n ){
    initialPie(data);
  }else if( d && r){
    for (var i = 0; i < data.length; i++) {
     var dict={}
     dict.country=data[i].location;
     dict.option1=data[i].deaths;
     dict.option2=data[i].recovered;
     subData.push(dict);
     options = ["Deaths", "Recoveries"];
    }
    initialBar2(subData, options);
  }else if( r && n){
    for (var i = 0; i < data.length; i++) {
     var dict={}
     dict.country=data[i].location;
     dict.option1=data[i].recovered;
     dict.option2=data[i].cases;
     subData.push(dict);
     options = ["Recoveries", "New Cases"];
    }
    initialBar2(subData, options);
  }else if( d && n){
    for (var i = 0; i < data.length; i++) {
     var dict={}
     dict.country=data[i].location;
     dict.option1=data[i].deaths;
     dict.option2=data[i].cases;
     subData.push(dict);
     options = ["Deaths", "New Cases"];
    }
    initialBar2(subData, options);
  }else if( r || d || n){
    if(r){
      for (var i = 0; i < data.length; i++) {
       var dict={}
       dict.country=data[i].location;
       dict.option1=data[i].recovered;
       subData.push(dict);
       options = ["Recoveries"];
      }
    }else if(d){
      for (var i = 0; i < data.length; i++) {
       var dict={}
       dict.country=data[i].location;
       dict.option1=data[i].deaths;
       subData.push(dict);
       options = ["Deaths"];
      }
    }else{
      for (var i = 0; i < data.length; i++) {
       var dict={}
       dict.country=data[i].location;
       dict.option1=data[i].cases;
       subData.push(dict);
       options = ["New Cases"]
      }
    }
    // console.log(subData);
    initialBar1(subData, options);
  }
  var transition = document.getElementById('update');
  if(r || d || n) {
    transition.style.display = "inline";
  }else {
    transition.style.display = "none";
  }
}

function updateBar(){
  num++;
  // console.log(num);
  var data = [{"location":"Canada", "cases":canadaN[num], "deaths":canadaD[num], "recovered":canadaR[num]},
  {"location":"China","cases":7,"deaths": 15, "recovered": 25},{"location":"France","cases":5,"deaths":20, "recovered": 8}]
  // console.log(data);
  var d = document.getElementById("d").checked;
  var r = document.getElementById("r").checked;
  var n =document.getElementById("n").checked;
  var subData=[]
  if( d && r){
    for (var i = 0; i < data.length; i++) {
     var dict={}
     dict.country=data[i].location;
     dict.option1=data[i].deaths;
     dict.option2=data[i].recovered;
     subData.push(dict)
    }
    updateBar2(subData);
  }else if( r && n){
    for (var i = 0; i < data.length; i++) {
     var dict={}
     dict.country=data[i].location;
     dict.option1=data[i].recovered;
     dict.option2=data[i].cases;
     subData.push(dict);
    }
    updateBar2(subData);
  }else if( d && n){
    for (var i = 0; i < data.length; i++) {
     var dict={}
     dict.country=data[i].location;
     dict.option1=data[i].deaths;
     dict.option2=data[i].cases;
     subData.push(dict);
    }
    updateBar2(subData);
  }else if( r || d || n){
    if(r){
      for (var i = 0; i < data.length; i++) {
       var dict={}
       dict.country=data[i].location;
       dict.option1=data[i].recovered;
       subData.push(dict);
      }
    }else if(d){
      for (var i = 0; i < data.length; i++) {
       var dict={}
       dict.country=data[i].location;
       dict.option1=data[i].deaths;
       subData.push(dict);
      }
    }else{
      for (var i = 0; i < data.length; i++) {
       var dict={}
       dict.country=data[i].location;
       dict.option1=data[i].cases;
       subData.push(dict);
      }
    }
    // console.log(subData);
    updateBar1(subData);
  }
  // console.log(subData);

}

// initialBar2(data);

//displaying date
var daysElapsed = document.getElementById("dateSlider").value;

var displayDate = function(daysElapsed) {
  console.log(daysElapsed);
}



//displaying date          <button type="button" class="btn btn-warning" id="dateBtn">Tester Button</button>
// var daysElapsed = document.getElementById("dateSlider").value;

// var displayDate = function(daysElapsed) {
//   console.log(daysElapsed);

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
//   }getData(1);
// var dateBtn = document.getElementById("dateBtn");
// dateBtn.addEventListener("click", displayDate);
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
