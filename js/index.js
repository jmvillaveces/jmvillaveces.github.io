d3 = require('d3');
_ = require('underscore');

var viewport = function(){
    var e = window, a = 'inner';
    if ( !( 'innerWidth' in window ) ){
        a = 'client';
        e = document.documentElement || document.body;
    }
    return [  e[ a+'Width' ] , e[ a+'Height' ] ];
};

var dim = viewport(), blockSize = 20, rows = Math.ceil(dim[1]/blockSize), cols = Math.ceil(dim[0]/blockSize), spacing = 3;

var styles = {
    green : { fill: 'green', stroke: 'black', 'stroke-width': 1},
    blue : { fill: 'steelblue', stroke: 'black', 'stroke-width': 1}
};

var data = new Array(rows);
for(var r = 0; r < rows; r++){
    data[r] = new Array(cols);
    for(var c = 0; c < cols; c++){
        data[r][c] = (c%2 === 0) ? 'green' : 'blue';
    }
}

var styleToString = function(obj){
    var str = '';
    _.each(_.keys(obj), function(k){
        str += k+':'+obj[k]+';';
    });
    return str;
};

var draw = function(opt){

    var arr = [];
    
    for(var r = 0; r < opt.elements.length; r++){
        for(var c = 0; c < opt.elements[r].length; c++){
            var el ={x : c * opt.blockSize, y : r * opt.blockSize};
            el.style = opt.style[opt.elements[r][c]];
            arr.push(el);
        }
    }
    
    var svg = d3.select('body').append('svg').attr('width', dim[0]).attr('height', dim[1]);
    var g = svg.append('g');

    
    g.selectAll('.block').data(arr).enter().append('rect')
        .attr('x', function(d){return d.x;})
        .attr('y', function(d){ return d.y;})
        .attr('width', opt.blockSize)
        .attr('height', opt.blockSize)
        .attr('style', function(d){return styleToString(d.style);});

};

draw({
    elements: data,
    spacing: spacing,
    style: styles,
    blockSize: blockSize
});
