function Engine() {

  var _width = $(window).width();
  var _height = $(window).height();
  var _nodeRadius = 15;
  var _linkDistance = 100;
  var _graphCharge = -2000;
  var _nodes = [];
  var _links = [];
  var _onRightClick = function() {};
  var _nodeCurrentlySelected = false;
  
  /**
   * Fires up the D3 graph. Hold on to your butts.
   */
  var initializeD3 = function() {
    // Setup a list of 20 colors to be used in the graph
    var color = d3.scale.category20();
    // Initialize the force directed graph
    var force = d3.layout.force()
  	  .charge(_graphCharge)
  	  .linkDistance(_linkDistance)
  	  .size([_width, _height])
  	  .nodes(_nodes)
  	  .links(_links)
  	  .start();
  	// Setup the SVG node
  	var svg = d3.select('body').append('svg')
  	  .attr('width', _width)
  	  .attr('height', _height)
  	  .append('g')
        .call(d3.behavior.zoom().scaleExtent([1, 8]).on('zoom', onZoom))
        .append('g');
  	// Register on zoom callback
  	function onZoom() {
      if(!_nodeCurrentlySelected) {
  	    svg.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')');
      }
  	}
    // Setup arrow defnitions (which are referenced by the links via marker-end attributes)
    svg.append('defs')
      .selectAll('marker')
      .data(['arrow'])
      .enter()
      .append('marker')
      .attr('id', function(d) {
        return d;
      })
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', '36')
      .attr('refY','0')
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5');
    // Make an invisible rectangle overlay to capture mouse events (for zooming and panning)
    svg.append('rect')
      .attr('class', 'overlay')
      .attr('width', _width)
      .attr('height', _height);
    // Setup links between nodes
  	var link = svg.selectAll('.link')
  	  .data(_links)
  	  .enter()
  	  .append('line')
  	  .attr('class', 'link')
      .attr('marker-end', function(d) { 
        return 'url(#arrow)';
      })
  	  .style('stroke-width', function(d) { 
  		  return Math.sqrt(d.value); 
  	  });
    // Setup nodes
  	var node = svg.selectAll('.node')
  	  .data(_nodes)
  	  .enter()
      .append('circle')
  	  .attr('class', 'node')
  	  .attr('r', _nodeRadius)
  	  .style('fill', function(d) { 
  		  return color(d.group);
  	  })
  	  .on('contextmenu', function(d) {
        _onRightClick(d);
        d3.event.preventDefault();
  	  })
  	  .on('mousedown', function() {
        _nodeCurrentlySelected = true;
  	  })
  	  .on('mouseup', function() {
        _nodeCurrentlySelected = false;
  	  })
  	  .call(force.drag);
  	// Add an 'on hover' title to each node
  	node.append('title')
  	  .text(function(d) { 
  		  return d.name;
  	  });
  	// Add a label to each node
  	var label = svg.selectAll('.label')
  	  .data(_nodes)
  	  .enter()
  	  .append('text')
  	  .attr('class', 'label')
  	  .text( function (d) { 
        return d.name;
      });
	
  	// Setup placement of each element in the graph (links, nodes, and labels)
  	force.on('tick', function() {
  	  // Setup link placement
  	  link.attr('x1', function(d) { 
  		  return d.source.x;
  		}).attr('y1', function(d) { 
	      return d.source.y;
	    }).attr('x2', function(d) { 
	      return d.target.x;
	    }).attr('y2', function(d) {
	      return d.target.y;
	    });
      // Setup node placement
  	  node.attr('cx', function(d) { 
  		  return d.x; 
  		}).attr('cy', function(d) { 
        return d.y;
      });
  	  // Setup label placement
  	  label.attr('x', function(d) {
        return d.x + _nodeRadius + 4; 
      }).attr('y', function(d) { 
        return d.y + 4;
      });
  	});
  };
  
  this.useNodes = function(nodes) {
    _nodes = nodes;
    return this;
  };
  
  this.useLinks = function(links) {
    _links = links;
    return this;
  };

  this.onRightClick = function(onRightClick) {
    _onRightClick = onRightClick;
    return this;
  };
  
  this.start = function() {
    if(!_.isEmpty(_nodes)) {
      console.log('Starting engine...');
      initializeD3();
    }
    else {
      console.error('Make sure to set nodes via useNodes() before calling start!');
    }
    return this;
  };
  
}