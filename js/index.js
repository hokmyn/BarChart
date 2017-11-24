const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';

const draw = () => 
  barData => {    
    let myData = barData.data,
        minDate = new Date(myData[0][0]),
        maxDate = new Date(myData[274][0]),
        margin = {top: 10, left: 100, bottom: 30},
        svg = d3.select('#chart').append('svg')
                .attr('width','980')
                .attr('height', '620')
                .style("padding", "10px")
                .append('g')
                .attr("transform", "translate(" + margin.left + "," + margin.top +  ")"),
        width = 800,
        height = 550,
        barWidth = width / myData.length,
        years = d3.scaleTime()
          .range([0, width])
          .domain([minDate, maxDate]),
        gdp = d3.scaleLinear()
          .range([height, 0])
          .domain([0, d3.max(myData, function(d) {
            return d[1];
          })]),
        tooltip = d3.select('#chart')
                    .append('div')
                      .classed('tooltip', true)
                      .style('opacity', 0);
    
        svg.selectAll('rect')
          .data(myData)
          .enter()
          .append('rect')
            .attr("width", barWidth)
            .attr("height", function(d) { return height - gdp(d[1]); })
            .attr("x", function(d, i) { return i * barWidth; })
            .attr("y", function(d) { return gdp(d[1]); })
            .attr("class", "barUnit")
            .on('mouseover', function(d, i) {
              tooltip.transition()
                .duration(300)
                .style('opacity', 0.6);
              tooltip.html(`$${d[1]} <br> ${d[0]}`)
                .style('left', (d3.event.pageX + 30) + 'px')
                .style('top', (d3.event.pageY - 30) + 'px');
            })
            .on('mouseout', function(d) {
              tooltip.transition()
                .duration(300)
                .style('opacity', 0);
            });
    
            xAxis = d3.axisBottom(years);
            yAxis = d3.axisLeft(gdp);
          
            svg.append('g')
            .attr('class', 'x-axis')
            .attr('transform', function() {
              return 'translate(' + 0 + ',' + height + ')' 
            })
            .call(xAxis);
    
            svg.append('g')
                .attr('class', 'y-axis')
                .call(yAxis);
    
            //X Axis Title
            svg.append("text")
              .attr('x',width/2)
              .attr('y',height + margin.top + margin.bottom)
              .style('text-anchor','middle')
              .text("Years");
            //Y axis title
            svg.append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 0 - margin.left / 1.5)
              .attr("x",0 - (height / 2))
              .attr("dy", "1em")
              .style("text-anchor", "middle")
              .text("Gross Domestic Product (billions)");
  }

d3.json(url, draw());
