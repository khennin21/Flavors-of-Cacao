const data = [
  { name: 'A. Morin', score: 23 },
  { name: 'Arete', score: 22 },
  { name: 'Bonnat', score: 27 },
  { name: 'Domori', score: 22 },
  { name: 'Fresco', score: 26 },
  { name: 'Guittard', score: 22 },
  { name: 'Pralus', score: 25 },
  { name: 'Soma', score: 47 },
  { name: 'Valrhona', score: 21 },
  { name: 'Zotter', score: 17 },
];

const width = 900;
const height = 450;
const margin = { top: 50, bottom: 50, left: 50, right: 50 };

const svg = d3.select('#d3-container')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

const x = d3.scaleBand()
  .domain(data.map(d => d.name))
  .range([margin.left, width - margin.right])
  .padding(0.1);

const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.score)])
  .range([height - margin.bottom, margin.top]);

svg.append("g")
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", d => x(d.name))
  .attr("y", d => y(d.score))
  .attr("width", x.bandwidth())
  .attr("height", d => y(0) - y(d.score))
  .attr("fill", "peru")
  .on("mouseover", function(d) {
    const xPos = parseFloat(d3.select(this).attr("x")) + x.bandwidth() / 2;
    const yPos = parseFloat(d3.select(this).attr("y")) - 5; 
    svg.append("text")
      .attr("class", "hover-text")
      .attr("x", xPos)
      .attr("y", yPos)
      .attr("text-anchor", "middle")
      .attr("font-family", "Arial")
      .attr("font-size", "40px")
      .attr("fill", "black")
      .text(d.score);
  })
  .on("mouseout", function() {
    svg.select(".hover-text").remove();
  });

function yAxis(g) {
  g.attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .attr("font-size", '20px');
}

function xAxis(g) {
  g.attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .attr("font-size", '20px');
}

svg.append("g").call(xAxis);
svg.append("g").call(yAxis);