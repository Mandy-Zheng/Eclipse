
//empty vars used for nested function in initialBar1 and initialBar2
var updateBar1;
var updateBar2;

//empty var for chart type
var chartType="";

//function for counting digits in a number
function digits_count(n) {
  var count = 0;
  if (n >= 1) ++count;

  while (n / 10 >= 1) {
    n /= 10;
    ++count;
  }

  return count;
};

//function for creating and updating a single-bar bar graph
var initialBar1 = function(data, l){
  //margins
  var margin = {top:50, right:50, bottom:50, left:50};
  //the total width of the bar graph
  var height = data.length*100;
  //the total height of the bar graph
  var width = 1200;

  //sets the number of pixels for the y scale
  //adds padding
  var yScale = d3.scaleBand()
      .range([0, height])
      .paddingInner(0.08)

  //sets the number of pixels for the x scale
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

  //maps the countries to the domain of the y scale
  yScale.domain(data.map(function(d) { return d.country; }));
  yAxis = d3.axisLeft(yScale);

  //sets domain of x scale according to the maximum data value + an offset calculated with the number of digits in the maximum
  xScale.domain([0, d3.max(data, function(d) { return parseInt(d.option1) + Math.pow(10, digits_count(parseInt(d.option1)) - 1); })]);
  xAxis = d3.axisTop(xScale);

  //selects the bars and enters the data values
  var bars = svgContainer.selectAll(".bar")
      .data(data)
      .enter()
      .append("g")

  //draws the bars
  bars.append("rect")
      .attr("class", "bar")
      .attr("y", function(d) { return yScale(d.country); })
      .attr("height", yScale.bandwidth())
      .attr("x", function(d) { return 0; })
      .attr("width", function(d) { return xScale(d.option1); });

  //selects the labels and enters the data values
  var labeling = svgContainer.selectAll(".text")
      .data(data)
      .enter()

  //creates the labels for the bars
  labeling.append("text")
      .attr("class","label")
      .attr("y", (function(d) { return yScale(d.country) + 5 + yScale.bandwidth()/2; }  ))
      .attr("x", function(d) { return  xScale(d.option1) + 12; })
      .attr("dx", ".75em")
      .text(function(d) { return d.option1; });

  //creates labels for x scale on the top
  svgContainer.append("g")
      .attr("class", "xaxis")
      .call(xAxis)
      .selectAll("text")

  //creates title for x axis
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

  //creates title for y axis
  svgContainer.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 100)
      .attr("x", 0 - height/2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Country/State");

  //creates the legend and enters the data values
  var legend = d3.select("#chartID").select("svg").selectAll(".legend")
      .data(data)
      .enter().append("g")
      .attr("class", "legend")

  //creates the circle for the legend
  legend.append("circle")
      .attr("class", "option1")
      .attr("cx", width + 160)
      .attr("cy", 70)
      .attr("r", 10)
      .style("fill", "#E5C3D1");

  //creates the labeling for the legend
  legend.append("text")
      .attr("x", width + 60)
      .attr("y", 75)
      .text(""+ l[0] +"");


  //function to update the single-bar bar graph
  updateBar1 = function(updatedData){
    // console.log("updating");
    // console.log(updatedData);

    //resets the y scale domain
    yScale.domain(updatedData.map(function(d) { return d.country; }));
    yAxis = d3.axisLeft(yScale);

    //resets the x scale domain with the new maximum data value + the offset calculated with the number of digits in the maximum
    xScale.domain([0, d3.max(updatedData, function(d) { return parseInt(d.option1) + Math.pow(10, digits_count(parseInt(d.option1)) - 1); })]);
    xAxis = d3.axisTop(xScale);

    //resets the labels for the x scale
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
    testing = -1;

    //resets the bar number labels and transitions the previous numbers to the new data numbers
    var testing2 = -1;
    var testing3 = -1;
    svgContainer.selectAll(".label")
        .transition()
        .duration(1000)
        .tween( 'text', function() {
          testing2++;
          var currentValue = this.textContent || "0";
          var interpolator = d3.interpolateRound( currentValue, updatedData[testing2].option1);
          return function( t ) {
            this.textContent = interpolator( t );
          };})
        .attr("x", function() { testing3++; return xScale(updatedData[testing3].option1) + 12; })
    testing2 = -1;
    testing3 = -1;
  }

}

//function for creating and updating a double-bar bar graph
var initialBar2 = function(data, l){
  //margins
  var margin = {top:50, right:50, bottom:50, left:50};
  //the total width of the bar graph
  var height = data.length*100;
  //the total height of the bar graph
  var width = 1200;


  //sets the number of pixels for the y scale
  //adds padding
  var yScale = d3.scaleBand()
      .range([0, height])
      .paddingInner(0.08)

  //sets the number of pixels for the x scale
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

  //finding the new maximum data value
  max1 = d3.max(data, function(d) { return parseInt(d.option1); });
  max2 = d3.max(data, function(d) { return parseInt(d.option2); });
  findM = [max1, max2]

  //sets domain of x scale according to the maximum data value + an offset calculated with the number of digits in the maximum
  xScale.domain([0, parseInt(d3.max(findM)) + Math.pow(10, digits_count(parseInt(d3.max(findM))) - 1) ]);
  xAxis = d3.axisTop(xScale);

  //maps the countries to the domain of the y scale
  yScale.domain(data.map(function(d) { return d.country; }));
  yAxis = d3.axisLeft(yScale);

  //selects the bars and enters the data values
  bars = svgContainer.selectAll(".bar")
      .data(data)
      .enter()
      .append("g");

  //draws the bars for option1 data
  bars.append("rect")
      .attr("class", "bar")
      .attr("y", function(d) { return yScale(d.country); })
      .attr("height", yScale.bandwidth()/2)
      .attr("x", function(d) { return 0; })
      .attr("width", function(d) { return xScale(d.option1); })

  //draws the bars for option2 data
  bars.append("rect")
      .attr("class", "bar2")
      .attr("y", function(d) { return yScale(d.country); })
      .attr("width", function(d) { return xScale(d.option2); })
      .attr("height", yScale.bandwidth()/2)
      .attr("x", function(d) { return 0; })
      .attr("transform", function(d) { return "translate(0, "+ yScale.bandwidth()/2 +")"; });

  //selects the labels and enters the data values
  labeling = svgContainer.selectAll(".text")
      .data(data)
      .enter()

  //creates the labels for the option1 bars
  labeling.append("text")
      .attr("class","label")
      .attr("class", "first")
      .attr("y", (function(d) { return yScale(d.country) + 5 + yScale.bandwidth() / 4 ; }  ))
      .attr("x", function(d) { return  xScale(d.option1) + 12; })
      .attr("dx", ".75em")
      .text(function(d) { return d.option1; });

  //creates the labels for the option2 bars
  labeling.append("text")
      .attr("class", "label")
      .attr("class", "second")
      .attr("y", (function(d) { return yScale(d.country) + 5 + ((yScale.bandwidth() / 4) * 3) ; } ))
      .attr("x", function(d) { return xScale(d.option2) + 12; })
      .attr("dx", ".75em")
      .text(function(d) {return  d.option2;})

  //creates labels for x scale on the top
  svgContainer.append("g")
      .attr("class", "xaxis")
      .call(xAxis)
      .selectAll("text")

  //creates title for x axis
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

  //creates title for y axis
  svgContainer.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 100)
      .attr("x", 0 - height/2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Country/State");

  //creates the legend and enters the data values
  legend = d3.select("#chartID").select("svg").selectAll(".legend")
      .data(data)
      .enter().append("g")
      .attr("class", "legend")

  //creates circle for option1 in the legend
  legend.append("circle")
      .attr("class", "option1")
      .attr("cx", width+160)
      .attr("cy", 70)
      .attr("r", 10)
      .style("fill", "#E5C3D1");

  //creates the labeling for option1 in the legend
  legend.append("text")
      .attr("x", width + 60)
      .attr("y", 75)
      .text("" + l[0] + "");

  //creates circle for option2 in the legend
  legend.append("circle")
      .attr("class", "option2")
      .attr("cx", width+160)
      .attr("cy", 100)
      .attr("r", 10)
      .style("fill", "#CAA8F5");

  //creates the labeling for option2 in the legend
  legend.append("text")
      .attr("x", width + 60)
      .attr("y", 105)
      .text("" + l[1] + "");

  //function to update the double-bar bar graph
  updateBar2 = function(updatedData){
    // console.log("here2");
    // console.log(updatedData);

    //resets the y scale domain
    yScale.domain(updatedData.map(function(d) { return d.country; }));
    yAxis = d3.axisLeft(yScale);

    //finding the new maximum data value
    max1 = d3.max(updatedData, function(d) { return parseInt(d.option1); });
    max2 = d3.max(updatedData, function(d) { return parseInt(d.option2); });
    findM = [max1, max2]

    //resets the x scale domain with the new maximum data value + the offset calculated with the number of digits in the maximum
    xScale.domain([0, parseInt(d3.max(findM)) + Math.pow(10, digits_count(parseInt(d3.max(findM))) - 1) ]);
    xAxis = d3.axisTop(xScale);

    //resets the labels for the x scale
    svgContainer.select(".xaxis")
           .transition().duration(1000)
           .call(xAxis)
           .selectAll("text");

    //resets the lengths of each bar for option1 based on new data
    var testing = -1;
    svgContainer.selectAll(".bar")
          .transition()
          .duration(1000)
          .attr("width", function() { testing++; return xScale(updatedData[testing].option1); });
          // .attr("y", function(d) { return yScale(d.cases); })

    //resets the lengths of each bar for option2 based on new data
    testing = -1;
    svgContainer.selectAll(".bar2")
          .transition()
          .duration(1000)
          .attr("width", function() { testing++; return xScale(updatedData[testing].option2); });
          // .attr("y", function(d) { return yScale(d.cases); })

    //resets the bar number labels for option1 and transitions the previous numbers to the new data numbers
    testing = -1;
    var testing2 = -1;
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
        .attr("x", function() { testing2++; return xScale(updatedData[testing2].option1) + 12; })
        //.attr("x", (function(d) { return xScale(d.country) + xScale.bandwidth() / 2 ; }  ));

    //resets the bar number labels for option2 and transitions the previous numbers to the new data numbers
    var label1 = -1;
    var label2 = -1;
    svgContainer.selectAll(".second")
        .transition()
        .duration(1000)
        .tween( 'text', function() {
          label1++;
          var currentValue = this.textContent || "0";
          var interpolator = d3.interpolateRound( currentValue, updatedData[label1].option2);
          return function( t ) {
            this.textContent = interpolator( t );
          };})
        .attr("x", function() { label2++; return xScale(updatedData[label2].option2) + 12; })
  }

}
var updatePie;

var initialPie =function(dada){
  for (var i = 0; i < dada.length; i++) {
var width = 450
    height = 450
    margin = 40

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

var local=d3.local();
// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#pieID")
  .append("div")
    .attr("id","location"+i)
    var element = document.createElement("h2");
        element.appendChild(document.createTextNode(dada[i].location));
        document.getElementById('location'+i).appendChild(element);

var svg = svg.append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("id","pie"+i)
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
// create 2 data_set
var arc = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)

// set the color scale
var color = d3.scaleOrdinal()
  .domain(["recovered","deaths","cases","empty"])
  .range(["#E7298A","#2E294E","#59C9A5","#D3D3D3"]);

// A function that create / updatePie the plot for a given variable:
updatePie =function(data,num) {
  if(data.cases+data.recovered+data.deaths ==0){
    data.empty=1;
  }
  var pie = d3.pie()
     .value(function(d) {
       return d.value;
     })
     .sort(function(a, b) {
       return d3.ascending(a.key, b.key);
     }) // This make sure that group order remains the same in the pie chart
   var data_ready = pie( d3.entries(data));
   var svg = d3.select("g#pie"+num);
   var u = svg.selectAll("path")
     .data(data_ready);

   // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
   u
     .enter()
     .append('path')
     .attr("class","path"+num)
     .each(function(d) {
       local.set(this, d);
     })
     .merge(u)
     .transition()
     .duration(1000)
     .attrTween('d', function(d) {
       var i = d3.interpolate(local.get(this), d);
       local.set(this, i(0));
       return function(t) {
         return arc(i(t));
       };
     })
     .attr('fill', function(d) {
       return (color(d.data.key))
     })
     .attr("stroke", "white")
     .style("stroke-width", "2px")
     .style("opacity", 1)

   // remove the group that is not present anymore
   u
     .exit()
     .remove()

 }

  updatePie(dada[i],i);
}
// Initialize the plot with the first dataset
}

var updateChart = function() {
    //getting new dataset based on slider value
    var data = getData(slider.value);
    var subData=[];

    //checking chart type and cleaning up the dataset for passing to updateBar and updatePie functions
    if (chartType=="pie"){
      for (var i = 0; i < data.length; i++) {
          updatePie(data[i],i);
      }
    }else if(chartType=="bar2dr"){
      for (var i = 0; i < data.length; i++) {
       var dict={}
       dict.country=data[i].location;
       dict.option1=data[i].deaths;
       dict.option2=data[i].recovered;
       subData.push(dict);
      }
      updateBar2(subData);
    }else if(chartType=="bar2rn"){
      for (var i = 0; i < data.length; i++) {
        var dict={}
        dict.country=data[i].location;
        dict.option1=data[i].recovered;
        dict.option2=data[i].cases;
        subData.push(dict);
      }
      updateBar2(subData);
    }else if(chartType=="bar2dn"){
      for (var i = 0; i < data.length; i++) {
        var dict={}
        dict.country=data[i].location;
        dict.option1=data[i].deaths;
        dict.option2=data[i].cases;
        subData.push(dict);
      }
      updateBar2(subData);
    }else if (chartType=="bar1d") {
      for (var i = 0; i < data.length; i++) {
       chartType="bar1n";
       var dict={}
       dict.country=data[i].location;
       dict.option1=data[i].deaths;
       subData.push(dict);
      }
      updateBar1(subData);
    }else if (chartType=="bar1n") {
      for (var i = 0; i < data.length; i++) {
       chartType="bar1n";
       var dict={}
       dict.country=data[i].location;
       dict.option1=data[i].cases;
       subData.push(dict);
      }
      updateBar1(subData);
    }else if (chartType=="bar1r") {
      for (var i = 0; i < data.length; i++) {
       chartType="bar1n";
       var dict={}
       dict.country=data[i].location;
       dict.option1=data[i].recovered;
       subData.push(dict);
      }
      updateBar1(subData);
    }
}



var clearChart = function(){
  d3.selectAll("svg").remove();
}

var newGraph = function(){
  //getting new dataset based on slider value
  var data =  getData(slider.value);
  num = 0;
  // console.log("here");
  // console.log(data);
  //checking for which options are checked
  var d = document.getElementById("d").checked;
  var r = document.getElementById("r").checked;
  var n =document.getElementById("n").checked;
  var subData=[]
  var options=[]
  clearChart();
  chartType="";

  //cleaning up the dataset for passing to initialBar1 and initialBar2 and initialPie functions
  if(r && d && n ){
    chartType="pie";
    initialPie(data);
  }else if( d && r){
    //setting chart type
    chartType="bar2dr";
    for (var i = 0; i < data.length; i++) {
     var dict={}
     dict.country=data[i].location;
     dict.option1=data[i].deaths;
     dict.option2=data[i].recovered;
     subData.push(dict);
     //setting label options
     options = ["Deaths", "Recoveries"];
    }
    initialBar2(subData, options);
  }else if( r && n){
    //setting chart type
    chartType="bar2rn";
    for (var i = 0; i < data.length; i++) {
     var dict={}
     dict.country=data[i].location;
     dict.option1=data[i].cases;
     dict.option2=data[i].recovered;
     subData.push(dict);
     //setting label options
     options = ["Recoveries", "New Cases"];
    }
    initialBar2(subData, options);
  }else if( d && n){
    //setting chart type
    chartType="bar2dn";
    for (var i = 0; i < data.length; i++) {
     var dict={}
     dict.country=data[i].location;
     dict.option1=data[i].deaths;
     dict.option2=data[i].cases;
     subData.push(dict);
     //setting label options
     options = ["Deaths", "New Cases"];
    }
    initialBar2(subData, options);
  }else if( r || d || n){
    if(r){
      //setting chart type
      chartType="bar1r";
      for (var i = 0; i < data.length; i++) {
       var dict={}
       dict.country=data[i].location;
       dict.option1=data[i].recovered;
       subData.push(dict);
       //setting label options
       options = ["Recoveries"];
      }
    }else if(d){
      //setting chart type
      chartType="bar1d";
      for (var i = 0; i < data.length; i++) {
       var dict={}
       dict.country=data[i].location;
       dict.option1=data[i].deaths;
       subData.push(dict);
       //setting label options
       options = ["Deaths"];
      }
    }else{
      //setting chart type
      chartType="bar1n";
      for (var i = 0; i < data.length; i++) {
       var dict={}
       dict.country=data[i].location;
       dict.option1=data[i].cases;
       subData.push(dict);
       //setting label options
       options = ["New Cases"]
      }
    }
    //calling function to make single-bar bar graph
    initialBar1(subData, options);
  }

  //displays transition and stop buttons only when options are chosen
  var transition = document.getElementById('update');
  var pause = document.getElementById('stop');
  if(r || d || n) {
    transition.style.display = "inline";
    pause.style.display = "inline";
  }else {
    transition.style.display = "none";
    pause.style.display = "none";
  }
}

var next = function(){
  var slider = document.getElementById('dateSlider');
  var data =  getData(slider.value);
  var subData=[];
  if (chartType=="pie"){
    for (var i = 0; i < data.length; i++) {
        updatePie(data[i],i);
    }
  }else if(chartType=="bar2dr"){
    for (var i = 0; i < data.length; i++) {
     var dict={}
     dict.country=data[i].location;
     dict.option1=data[i].deaths;
     dict.option2=data[i].recovered;
     subData.push(dict);
    }
    updateBar2(subData);
  }else if(chartType=="bar2rn"){
    for (var i = 0; i < data.length; i++) {
      var dict={}
      dict.country=data[i].location;
      dict.option1=data[i].recovered;
      dict.option2=data[i].cases;
      subData.push(dict);
    }
    updateBar2(subData);
  }else if(chartType=="bar2dn"){
    var dict={}
    dict.country=data[i].location;
    dict.option1=data[i].deaths;
    dict.option2=data[i].cases;
    subData.push(dict);
  }else if (chartType=="bar1d") {
    for (var i = 0; i < data.length; i++) {
     chartType="bar1n";
     var dict={}
     dict.country=data[i].location;
     dict.option1=data[i].deaths;
     subData.push(dict);
    }
    updateBar1(subData);
  }else if (chartType=="bar1n") {
    for (var i = 0; i < data.length; i++) {
     chartType="bar1n";
     var dict={}
     dict.country=data[i].location;
     dict.option1=data[i].cases;
     subData.push(dict);
    }
    updateBar1(subData);
  }else if (chartType=="bar1r") {
    for (var i = 0; i < data.length; i++) {
     chartType="bar1n";
     var dict={}
     dict.country=data[i].location;
     dict.option1=data[i].recovered;
     subData.push(dict);
    }
    updateBar1(subData);
  }
  if(slider.value==97){
    slider.value=1;
  }else{
      slider.value = parseInt(slider.value)+1;
  }
}

var start = false;
var end;

//starts the automatic transitioning
var run = function(){
  if(!start){
    var slide = document.getElementById('dateSlider');
    slide.style.display="none";
    start = true;
    end = setInterval(next, 1500);
  }
}

//stops the automatic transitioning
var stop = function(){
  var slide = document.getElementById('dateSlider');
  slide.style.display="inline";
  start=false;
  clearInterval(end);
}

var slider = document.getElementById('dateSlider');

slider.value = 1;
