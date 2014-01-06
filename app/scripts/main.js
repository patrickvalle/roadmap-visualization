
var _modalInitialized = false;

/**
 * Displays the 'more info' Bootstrap dialog
 */
var showMoreInfo = function(data) {
  var title = data.name;
  var content = data.description;
  var $modal = $('#more-info-modal');
  $modal.find('.modal-title').html(title);
  $modal.find('.modal-body .content').html('').html(content);
  if(!_modalInitialized) {
    $modal.modal({'show': true});
  }
  else {
    $modal.modal('show');
  }
};

var graph = {
  "nodes":[
    // Group 1
    {
      "name": "Roadmap data point 1",
      "description": "This is a description of what's going to happen",
      "group": 1
    },
    {"name": "Roadmap data point 2", "group": 1},
    {"name": "Roadmap data point 3", "group": 1},
    {"name": "Roadmap data point 4", "group": 1},
    // Group 2
    {"name": "Roadmap data point 5", "group": 2},
    {"name": "Roadmap data point 6", "group": 2},
    {"name": "Roadmap data point 7", "group": 2},
    {"name": "Roadmap data point 8", "group": 2},
    // Group 3
    {"name": "Roadmap data point 9", "group": 3},
    {"name": "Roadmap data point 10", "group": 3},
    // Group 4
    {"name": "Roadmap data point 11", "group": 4},
    {"name": "Roadmap data point 12", "group": 4},
    // Group 5
    {"name": "Roadmap data point 13", "group": 5}
  ],
  "links":[
    // Group 1
    {"source": 1, "target": 0, "value": 1},
    {"source": 2, "target": 0, "value": 1},
    {"source": 3, "target": 1, "value": 1},
    // Group 2
    {"source": 4, "target": 0, "value": 1},
    {"source": 5, "target": 4, "value": 1},
    {"source": 6, "target": 4, "value": 1},
    {"source": 7, "target": 4, "value": 1},
    // Group 3
    {"source": 9, "target": 3, "value": 1},
    {"source": 8, "target": 3, "value": 1},
    // Group 4
    {"source": 10, "target": 11, "value": 1},
  ]};