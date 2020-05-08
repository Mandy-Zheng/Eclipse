var data =  [{"country":"Canada", "cases":7, "deaths":10, "recoveries":9},
{"country":"China","cases":7,"deaths": 15},{"country":"France","cases":5,"deaths":20}]

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
initialPie(data);
