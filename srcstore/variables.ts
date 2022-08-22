export var area = document.getElementById("area");
export var svgEl = document.getElementById("svg");
export var zoomIn = document.getElementById("zoom-in");
export var zoomOut = document.getElementById("zoom-out");
export var zoom=1;

export var menu = document.getElementById('menu');
export var dialogue = [];
export var collection = [];
export var mouse = {
    currentInput: null,
    createPath: function(a, b){
     var diff = {
      x: b.x - a.x,
      y: b.y - a.y
    };
    
    var pathStr = 'M' + a.x + ',' + a.y + ' ';
    pathStr += 'C';
    pathStr += a.x + diff.x / 3 * 2 + ',' + a.y + ' ';
    pathStr += a.x + diff.x / 3 + ',' + b.y + ' ';
    pathStr += b.x + ',' + b.y;
    
    return pathStr;
    }
    };
    export var dial = document.getElementById('dial');
    export var inputting = {} as any;

