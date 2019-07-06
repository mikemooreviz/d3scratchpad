var city = "New York" // "New York" Austin" "San Francisco"
var width = 800;
var height = 300;
var margin = {top: 20, bottom: 20, left: 20, right: 20};

    // dataset of city temperatures across time
    d3.tsv('data.tsv', (err, data) => {
      // clean the data
      data.forEach(d => {
        d.date = d3.timeParse("%Y%m%d")(d.date);
        d.date = new Date(d.date); // x
        d[city] = ++d[city]; // y
      });
    
      // scales
      var xExtent = d3.extent(data, d => d.date);
      var xScale = d3.scaleTime()
      	.domain(xExtent)
      	.range([margin.left, width - margin.right]);
      //var yExtent = d3.extent(data, d => d[city]);
      var yMax = d3.max(data, d => d[city]);
      var yScale = d3.scaleLinear()
      	.domain([0, yMax])
      	.range([height - margin.bottom, margin.top]);
      var heightScale = d3.scaleLinear()
        .domain([0, yMax])
      	.range([0, height - margin.top - margin.bottom]);
      
      // create the rectangles
      var svg = d3.select('svg');
      
      var rect = svg.selectAll('rect')
      	.data(data)
      	.enter().append('rect')
      	.attr('width', 2)
      	.attr('height', function(d) {
          return heightScale(d[city]);
        })
      	.attr('x', function(d) {return xScale(d.date)})
      	.attr('y', function(d) {return yScale(d[city])})
      	.attr('fill', 'steelblue')
      	.attr('stroke', 'white');
      
      var xAxis = d3.axisBottom()
      	.scale(xScale);
      var yAxis = d3.axisLeft()
      	.scale(yScale);
      
      svg.append('g')
      	.attr('transform', 'translate(' + [0, height - margin.bottom] + ')')
      	.call(xAxis);
      svg.append('g')
      	.attr('transform', 'translate(' + [margin.left, 0] + ')')
      	.call(yAxis);
      
    });