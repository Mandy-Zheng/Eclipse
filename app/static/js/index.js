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

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#pieID")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id","svg"+i)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
console.log(svg);
// create 2 data_set


// set the color scale
var color = d3.scaleOrdinal()
  .domain(["recoveries","deaths","cases"])
  .range(d3.schemeDark2);

// A function that create / updatePie the plot for a given variable:
updatePie =function(data,num) {
  console.log("whaaaaaaaaaaaaat");
  console.log(svg);
  var svg=d3.select("#svg"+num).select("g");
  // Compute the position of each group on the pie:
  var pie = d3.pie()
    .value(function(d) {return d.value; })
    .sort(function(a, b) { return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
  var data_ready = pie(d3.entries(data))
  console.log("3333");
  console.log(svg);
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
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 1)

  // remove the group that is not present anymore
  u
    .exit()
    .remove()

}
  updatePie(dada[i],i);
// Initialize the plot with the first dataset
}
}
initialPie(data1);
