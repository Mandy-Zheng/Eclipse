var data1 = [{"country":"Canada", "cases":7, "deaths":10, "recoveries":9},
  {"country":"China","cases":7,"deaths": 15,"recoveries":0},{"country":"France","cases":5,"deaths":20,"recoveries":4}];
var data2 = [{"country":"Canada", "cases":0, "deaths":1, "recoveries":9},
  {"country":"China","cases":12,"deaths": 18,"recoveries":29},{"country":"France","cases":5,"deaths":0,"recoveries":17}];
var updatePie;
// set the dimensions and margins of the graph
var initialPie =function(dada){
  for (var i = 0; i < dada.length; i++) {
var width = 450
    height = 450
    margin = 40

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

var local=d3.local();
// append the svg object to the div called 'pieID'
var svg = d3.select("#pieID")
  .append("svg")
    .attr("id","pie"+i)
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
  .domain(["recoveries","deaths","cases"])
  .range(d3.schemeDark2);

// A function that create / updatePie the plot for a given variable:
updatePie =function(data,num) {
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

     var div = d3.select("g#pie"+num).append("div")
         .attr("class", "tooltip")
         .style("opacity", 0);

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

   u
     .data(data_ready)
     .enter()
     .append('path')
     .attr("class","path"+num)
     .attr('d', arc)
     .attr('fill', function (d, i) {
          return color(d.data.key);
     })
     .attr('transform', 'translate(0, 0)')
   .on('mouseover', function (d, i) {
          d3.select(this).transition()
               .duration('50')
               .attr('opacity', '.85');
          div.transition()
               .duration(50)
               .style("opacity", 1);
          console.log(div);
          div.html(d.value)
               .style("left", (d3.event.pageX + 10) + "px")
               .style("top", (d3.event.pageY - 15) + "px");
          console.log(d.value);
     })
     .on('mouseout', function (d, i) {
          d3.select(this).transition()
               .duration('50')
               .attr('opacity', '1');
          div.transition()
               .duration('50')
               .style("opacity", 0);
     });

   // remove the group that is not present anymore
   u
     .exit()
     .remove()

 }

  updatePie(dada[i],i);
}
// Initialize the plot with the first dataset
}
initialPie(data1);

// for (var i = 0; i < data1.length; i++) {
//   updatePie(data2[i],i);
// }

/*
//both female and male data
var totals = [{title: "Soft-serve", value: 286, all: 1098},
              {title: "Scooped", value: 472, all: 1098},
              {title: "No Preference", value: 318, all: 1098},
              {title: "Not Sure", value: 22, all: 1098}];
//female
var femaleData = [{title: "Soft-serve", value: 25, all: 100},
                  {title: "Scooped", value: 44, all: 100},
                  {title: "No Preference", value: 28, all: 100},
                  {title: "Not Sure", value: 3, all: 100}];
//male
var maleData = [{title: "Soft-serve", value: 27, all: 100},
                {title: "Scooped", value: 42, all: 100},
                {title: "No Preference", value: 30, all: 100},
                {title: "Not Sure", value: 2, all: 100}];

var width = 360;
var height = 360;
var radius = Math.min(width, height) / 2;
var donutWidth = 75; //This is the size of the hole in the middle

//Only choose one! This one for a d3 color scheme:
var color = d3.scaleOrdinal(d3.schemeCategory20c);

var svg = d3.select('#pieID')
     .append('svg')
     .attr('width', width)
     .attr('height', height)
     .append('g')
     .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');
var arc = d3.arc()
     .innerRadius(radius - donutWidth)
     .outerRadius(radius);
var pie = d3.pie()
     .value(function (d) {
          return d.value;
     })
     .sort(null);
var div = d3.select("#pieID").append("div")
    .attr("class", "tooltip-donut")
    .style("opacity", 0);
var path = svg.selectAll('path')
     .data(pie(totals))
     .enter()
     .append('path')
     .attr('d', arc)
     .attr('fill', function (d, i) {
          return color(d.data.title);
     })
     .attr('transform', 'translate(0, 0)')
     //Our new hover effects
     .on('mouseover', function (d, i) {
          d3.select(this).transition()
               .duration('50')
               .attr('opacity', '.85');
          div.transition()
               .duration(50)
               .style("opacity", 1);
          console.log(d.value);
          var num = (Math.round((d.value / d.data.all) * 100)).toString() + '%';
          div.html(num)
               .style("left", (d3.event.pageX + 10) + "px")
               .style("top", (d3.event.pageY - 15) + "px");
     })
     .on('mouseout', function (d, i) {
          d3.select(this).transition()
               .duration('50')
               .attr('opacity', '1');
          div.transition()
               .duration('50')
               .style("opacity", 0);
     });

     var legendRectSize = 13;
     var legendSpacing = 7;
     var legend = svg.selectAll('.legend') //the legend and placement
     .data(color.domain())
     .enter()
     .append('g')
     .attr('class', 'circle-legend')
     .attr('transform', function (d, i) {
          var height = legendRectSize + legendSpacing;
          var offset = height * color.domain().length / 2;
          var horz = -2 * legendRectSize - 13;
          var vert = i * height - offset;
          return 'translate(' + horz + ',' + vert + ')';
     });
     legend.append('circle') //keys
     .style('fill', color)
     .style('stroke', color)
     .attr('cx', 0)
     .attr('cy', 0)
     .attr('r', '.5rem');
     legend.append('text') //labels
     .attr('x', legendRectSize + legendSpacing)
     .attr('y', legendRectSize - legendSpacing)
     .text(function (d) {
          return d;
     });

function change(data) {
    var pie = d3.pie()
    .value(function (d) {
         return d.value;
    }).sort(null)(data);
    var width = 360;
    var height = 360;
    var radius = Math.min(width, height) / 2;
    var donutWidth = 75;
    path = d3.select("#pieID")
          .selectAll("path")
          .data(pie); // Compute the new angles
    var arc = d3.arc()
          .innerRadius(radius - donutWidth)
          .outerRadius(radius);
    path.transition().duration(500).attr("d", arc); // redrawing the path with a smooth transition
}
*/
