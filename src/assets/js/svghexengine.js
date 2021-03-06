/*
 *   _____      _     _ 
 *  / ____|    (_)   | |
 * | |  __ _ __ _  __| |
 * | | |_ | '__| |/ _` |
 * | |__| | |  | | (_| |
 *  \_____|_|  |_|\__,_|
 */
                      

function Grid(gridWidth,gridHeight,tileSize,regioncount) { 
    /**
     * There are 6 neighbors for every Tile, the direction input is below:
     *      __
     *   __/  \__
     *  /  \_3/  \
     *  \_2/  \4_/
     *  / 1\__/5 \
     *  \__/0 \__/
     *     \__/
     */
    this.nDelta = {
        even: [ [1,  0], [ 0, -1], [-1, -1],
                [-1,  0], [-1, 1], [ 0, 1] ],
        odd: [ [1,  0], [1, -1], [ 0, -1],
               [-1,  0], [ 0, 1], [1, 1] ]
    }
    this.gridWidth          = gridWidth;
    this.gridHeight         = gridHeight;
    this.Tilesize           = tileSize;
    this.TileWidth          = this.Tilesize * 2;
    this.TileHeight         = Math.sqrt(3)/2 * this.TileWidth; 
    console.log("this.TileWidth " + this.TileWidth  );
    console.log("this.TileHeight " + this.TileHeight);
    this.verticalSpacing    = this.TileHeight;
    this.horizontalSpacing  = 3/4 * this.TileWidth;
    this.maxRows            = Math.floor((this.gridHeight / this.verticalSpacing)) - 1;
    this.maxColumns         = Math.floor((this.gridWidth / this.horizontalSpacing)) - 1;
    console.log("this.maxRows " + this.maxRows );
    console.log("this.maxColumns " + this.maxColumns);
    this.TileSet            = new Array(this.maxRows);
    this.regionSet          = new Array();
    var row, column;
    for (row = 0; row < this.maxRows; row++) {
    	console.log(this.maxColumns);
        this.TileSet[row] = new Array(this.maxColumns);
        for (column = 0; column < this.maxColumns; column++) {
            this.TileSet[row][column] = new Tile(this.Tilesize, row, column);
        }
    }
}
Grid.prototype = { 
	/*  generate
     *  Description: Creates a linked list to objects, by running a  short loop to map out and tile hexagons, 
     * 			assigning them each a column number and a row number. These will be the X/Y values I will use
     *  		later to uniquely find each tile. 
     */ 
    generate: function () {
        console.log("Grid.generate");
		for(var Tileid = 0; Tileid<=((this.maxRows)*(this.maxColumns));Tileid++){
            var row = Tileid%this.maxRows;
            var column = Tileid%this.maxColumns;
            this.TileSet[row][column].setid(Tileid);
            this.TileSet[row][column].draw();
        }
    },
    /*  getNeighbor
     *  Description: Selects a neighbor from a Tile based on input direction
     *      @param Tile Tile - a Tile which to select neighbor from based on direction
     *      @param direction int - a number 0-5 selects which side to return Tile from
     *      @return Tile - returns the Tile selected
     */ 
    getNeighbor: function(Tile,direction) {
        var parity = Tile.getColumn() & 1 ? 'odd' : 'even'; //checks if row is even or odd, assigns
        var delta  = this.nDelta[parity][direction]; // returns a array, with 0 being row delta, and 1 column delta
        var newRow = Tile.getRow() + delta[0];
        var newCol = Tile.getColumn() + delta[1];
        if(newRow < 0){
            newRow = this.maxRows -1;
        } 
        if (newCol < 0){
            newCol = this.maxColumns -1;
        } 
        if (newRow >= this.maxRows ){
            newRow = 1;
        }
        if ( newCol >= this.maxColumns){
            newCol = 1;
        } 
            return this.TileSet[newRow][ newCol];
    },
    /*  checkOccupied
     *  Description: Selects a neighbor from a Tile based on input direction
     *      @param row int - a number which will be the row the tile is in
     *      @param col int - a number which will be the column the tile is in
     *      @return boolean - returns if the tile is occupied.
     */ 
    checkOccupied: function (row,col) {
        return this.TileSet[row][col].getOccupied();
    },
    /*  setTileColor
     *  Description: sets the tile's color to the supplied param
     * 		@param color string - a hex color
     *      @param row int - a number which will be the row the tile is in
     *      @param col int - a number which will be the column the tile is in
     *      @return boolean - returns false if there was a problem.
     */ 
     setTileColor: function (row,col,color) {
     	this.TileSet[row][col].setFillStyle(color);
     	this.TileSet[row][col].draw();
     },
    /*  disable
     *  Description: disables a tile, meaning it will not even show up.
     *      @param row int - a number which will be the row the tile is in
     *      @param col int - a number which will be the column the tile is in
     */ 
     disable: function(row,col) {
		this.TileSet[row][col].clear();
     },
     getTile: function(row,col) {
     	return this.TileSet[row][col];
     },
     addText: function(x,y,text) {
     			//setting up left lettering
     			var xmlns = 'http://www.w3.org/2000/svg';
		var newText = document.createElementNS(xmlns,"text");
			newText.setAttributeNS(null,"x",x);     
			newText.setAttributeNS(null,"y",y); 
			newText.setAttributeNS(null,"font-size","8");

		var textNode = document.createTextNode(text);
		newText.appendChild(textNode);
		var svgspace = document.getElementById('hextimeline');
		svgspace.appendChild(newText);
     }
}

/*
 *   _______ _ _      
 *  |__   __(_) |     
 *     | |   _| | ___ 
 *     | |  | | |/ _ \
 *     | |  | | |  __/
 *     |_|  |_|_|\___|
 */
 function Tile(Tilesize, row, column) {
    this.row            = row;
    this.column         = column;
    this.size           = Tilesize; //size corner to corner
    this.id             = 0;
    this.x              = this.size * 3/2 * (1 + column);
    this.y              = this.size * Math.sqrt(3) * (1 + row + 0.5 * (column&1));
    this.display        = false;
    this.occupied       = false;
    this.data           = {};
    this.nSides         = 6; // ma sides
    this.centerX        = 0;
    this.centerY        = 0;
    this.lineWidth      = 1;
    this.tag            = '';
    this.strokeStyle    = '#323232';
    this.fillStyle      = '#EEEEEE'; //383A3D
    this.region;
    this.polygon;
}

Tile.prototype = {
	/*  initialize
     *  Description: this is the initialization constructor of a tile, for using the ID param
     *      @param id int - the unique id of the tile
     */ 
    initialize: function(id) {
        this.id         = id;
    },
    /*  initialize
     *  Description: this is the initialization constructor of a tile, for using the ID param 
     * 		as well as intializing it at a set location.
     *      @param id int - the unique id of the tile
     *      @param centerX int - the unique id of the tile
     *      @param centerY int - the center coordinate of the Y axis. 
     */ 
    initialize: function(id,centerX,centerY)  {
        this.id         = id;
        this.x          = centerX;
        this.y          = centerY;
    },
    /*  draw
     *  Description: this will draw the current tile and mark as occupied,
     *		 reset it if it is already occupied.
     */ 
    draw: function() {
        if(this.display === true) {
            //clear Tile, then redraw
            //console.log("Tile.draw: clear Tile, then redraw" );
            this.clear();
            this.draw();
        } else {

            var xmlns = 'http://www.w3.org/2000/svg';
            var svgspace = document.getElementById('hextimeline');
            var polygon = document.createElementNS(xmlns,'polygon');

            	// Settting Attributes of SVG polygon element
                polygon.setAttributeNS(null, 'id', 'polygon'+this.id);
                polygon.setAttributeNS(null, 'row', this.row);
                polygon.setAttributeNS(null, 'column', this.column);
                polygon.setAttributeNS(null, 'stroke-width', this.lineWidth );
                polygon.setAttributeNS(null, 'fill',this.fillStyle);
                polygon.setAttributeNS(null, 'stroke',this.strokeStyle);
                polygon.setAttributeNS(null, 'opacity', 1); 
            
            var pointString = '';
            //draws the element based on how many sides
            for( var i = 0; i <= this.nSides; i++) {
                var angle = 2 * Math.PI / this.nSides * i;
                //Corner x and y, draws each side/cornerpoint
                var cornX = this.x + this.size * Math.cos(angle);
                var cornY = this.y + this.size * Math.sin(angle);
                if( i == 0) {
                    pointString = " " + cornX + "," + cornY;
                } else {
                    pointString += " " + cornX + "," + cornY;
                }
            }
            polygon.setAttributeNS(null, 'points', pointString);
             
            var gTile = document.createElementNS(xmlns,'g');
                gTile.setAttributeNS(null, 'id','Tile' + this.id);
                gTile.appendChild(polygon);
                this.polygon = gTile;
            svgspace.appendChild(gTile);
            this.display = true;
        }
    }, 
    /*  clear
     *  Description: this will clear it if it is already being displayed, otherwise it is left alone. this is used by draw
     *		 
     */ 
    clear: function() {
        if(this.display === true) {
            var svgspace = document.getElementById("gamesvg");
            this.polygon.parentNode.removeChild(this.polygon);
            this.display = false;
        }
    },
    /*  reset
     *  Description: resets the tile's attributes back to default, this is used by draw
     *		 
     */
    reset: function () {
        this.strokeStyle = '#323232';
        this.fillStyle = '#eeeeee';
        this.lineWidth = 1;
        this.occupied = false;
        this.Tile = false;
        this.clear();
        this.draw();
    }, 
    /*
     *	occupy
     *  Description: Sets a tile to being occupied
     *      @param tile Tile - Incoming tile to set occupy to TRUE.
     */
    occupy: function (tile) {
        this.setOccupied(true);
        this.tile = tile;
    },
    /*
     *	toString
     *  Description: returns the row and column of the tile
     *      @return String - the row and column seperated by a comma
     */
    toString: function() {
        return this.row + ', ' + this.column;
    }
}


/* 
 *      ## Sets
 */
Tile.prototype.setid            = function(newid)     { this.id     = newid;};
Tile.prototype.setX             = function(newX)     { this.x     = newX;};
Tile.prototype.setY             = function(newY)     { this.y     = newY;};
Tile.prototype.setFillStyle     = function(newFill)  { this.fillStyle   = newFill;};
Tile.prototype.setStrokeStyle   = function(newStroke){ this.strokeStyle = newStroke;};
Tile.prototype.setLineWidth     = function(newWidth) { this.lineWidth   = newWidth;};
Tile.prototype.setOccupied      = function(newOccupied) {this.occupied = newOccupied; };
Tile.prototype.setDisplay       = function(newDisplay) { this.display = newDisplay; };

/* 
 *      ## Gets
 */
Tile.prototype.getid            = function() { return this.id;};
Tile.prototype.getX             = function() { return this.x;};
Tile.prototype.getY             = function() { return this.y;};
Tile.prototype.getColumn        = function() { return this.column;};
Tile.prototype.getRow           = function() { return this.row;};
Tile.prototype.getfillStyle     = function() { return this.fillStyle;};
Tile.prototype.getstrokeStyle   = function() { return this.strokeStyle;};
Tile.prototype.getlineWidth     = function() { return this.lineWidth;};
Tile.prototype.getOccupied      = function() { return this.occupied; };
