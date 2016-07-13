jQuery = $ = require('jquery');

require('bootstrap');
var noise = require('./js/perlin.js').noise;

var d3 = require('d3');

var parent = $('#three').parent(),
    width = parent.width(),
    height = parent.height(),
    n = 30,
    r = width / n / 2,
    dx = r * 2 * Math.sin(Math.PI / 3),
    dy = r * 1.5;
noise.seed(Math.random());
var svg = d3.select("#three").append("svg")
    .attr("width", width)
    .attr("height", height);
var data = [];
for (var y = -r, odd = false; y < height + 2 * r; y += dy, odd = !odd) {
    for (var x = odd ? -dx / 2 : 0; x < width + dx; x += dx) {
        data.push([x, y]);
    }
}
var hexes = svg.selectAll("g")
    .data(data)
    .enter().append("g")
    .attr("transform", function(d) {
        return "translate(" + d + ")";
    })
    .append("path")
    .attr("stroke", "#95a5a6")
    .attr("stroke-width", 0.5)
    .attr("fill", "none")
    .attr("d", "M" + hexagon(r).join("l") + "Z");
d3.timer(function(t) {
    hexes.attr("transform", function(d, i) {
        return "scale(" + (1 + 1 * noise.simplex3(d[0] / 100, d[1] / 100, t / 7000)) + ")";
    });
});
function hexagon(radius) {
    var x0 = 0, y0 = 0;
    return d3.range(0, 2 * Math.PI, Math.PI / 3).map(function(angle) {
        var x1 = Math.sin(angle) * radius,
            y1 = -Math.cos(angle) * radius,
            dx = x1 - x0,
            dy = y1 - y0;
        x0 = x1;
        y0 = y1;
        return [dx, dy];
    });
}
