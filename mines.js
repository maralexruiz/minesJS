var COLS = 10;
var ROWS = 10;
var matrix;
var TOTAL_MINES = 10;

window.onload = function() {

	main(COLS, ROWS, TOTAL_MINES);

};

var checkVictory = function() {
		var cells = getElementsByClassName(document.body,'cell'), void_cells;
		if (cells.length == TOTAL_MINES) {
			for(i=0; i<cells.length; i++){
				cells[i].removeEventListener('click', checkCell);
			}
			void_cells = getElementsByClassName(document.body,'void');
			for(i=0; i<void_cells.length; i++){
				void_cells[i].removeEventListener('click', checkCell);
			}
			alert("You win!!");
		}
};



var valExist = function(val, arr) {
	var exist = false;
	for (var i = 0; i < arr.length; i++ ){
		if (arr[i] === val) {
			exist = true;
			break;
		}
	}
	return exist;
};

var checkCellAround = function(cell_id) {
	numMines =  getMinesNum(cell_id);
	if ( numMines === 0 && document.getElementById(cell_id).className === "cell" ){
		document.getElementById(cell_id).className = "void";
		showAround(cell_id);
	} else {
		var mine = document.getElementById(cell_id);
		mine.className = "void";
		mine.innerHTML= numMines === 0 ? "" : numMines;
	}
};

var showAround = function(cell_id) {
	var new_id,
		numMines = 0,
		x = parseInt(cell_id[0]),
		y = parseInt(cell_id[2]);
	/* Fist Row */
	if ((x-1 >= 0 && y-1 >= 0 )) {
		new_id = (x-1) + "," + (y-1);
		checkCellAround(new_id);
	}
	if (x-1 >= 0) {
		new_id = (x-1) + "," + (y);
		checkCellAround(new_id);
	}
	if (x-1 >= 0 && y+1 < COLS) {
		new_id = (x-1) + "," + (y+1);
		checkCellAround(new_id);
	}
	/*Second Row*/
	if (y-1 >= 0) {
		new_id = (x) + "," + (y-1);
		checkCellAround(new_id);
	}

	if (y+1 < COLS) {
		new_id = (x) + "," + (y + 1);
		checkCellAround(new_id);
	}
	/*Thrid Row*/
	if (x+1 < ROWS && y-1 >= 0) {
		new_id = (x+1) + "," + (y-1);
		checkCellAround(new_id);
	}
	if (x+1 < ROWS) {
		new_id = (x+1) + "," + (y);
		checkCellAround(new_id);
	}
	if (x+1 < ROWS && y+1 < COLS) {
		new_id = (x+1) + "," + (y+1);
		checkCellAround(new_id);
	}
};


var getMinesNum = function(cell_id) {
	var around_mines = 0,
		x = parseInt(cell_id[0]),
		y = parseInt(cell_id[2]);
	/* Fist Row */
	if (x-1 >= 0 && y-1 >= 0) {
		if (matrix[x-1][y-1] === 1) {
			around_mines++;
		}
	}
	if (x-1 >= 0) {
		if (matrix[x-1][y] === 1) {
			around_mines++;
		}
	}
	if (x-1 >= 0 && y+1 < COLS) {
		if (matrix[x-1][y+1] === 1) {
			around_mines++;
		}
	}
	/*Second Row*/
	if (y-1 >= 0) {
		if (matrix[x][y-1] === 1) {
			around_mines++;
		}
	}
	if (matrix[x][y] === 1) {
		around_mines++;
	}
	if (y+1 < COLS) {
		if (matrix[x][y+1] === 1) {
			around_mines++;
		}
	}
	/*Thrid Row*/
	if (x+1 < ROWS && y-1 >= 0) {
		if (matrix[x+1][y-1] === 1) {
			around_mines++;
		}
	}
	if (x+1 < ROWS) {
		if (matrix[x+1][y] === 1) {
			around_mines++;
		}
	}
	if (x+1 < ROWS && y+1 < COLS) {
		if (matrix[x+1][y+1] === 1) {
			around_mines++;
		}
	}

	return around_mines;
};

var checkCell = function() {
	var x = this.id[0],
		y = this.id[2];
	if (matrix[x][y] === 1) {
		var cells = getElementsByClassName(document.body,'cell'),
		    elem;
		document.getElementById(this.id).className = "mine";

		/* Removing events (end the games after lose)*/
		for(i=0; i<cells.length; i++){
			cells[i].removeEventListener('click', checkCell);
		}
		/* Show mines*/
		for (i = 0; i < ROWS; i++) {
			for (j = 0; j < COLS; j++) {
				elem = document.getElementById(i + "," + j);
				if(matrix[i][j] === 1 && elem.className !== "void") {
					elem.className = "mine";
				}
			}
		}


		alert("YOU LOSE!");
	} else {
		document.getElementById(this.id).className = "void";
		var numMines = getMinesNum(this.id);
		if (numMines !== 0) {
			document.getElementById(this.id).innerHTML= numMines;
		} else {
			showAround(this.id);
		}
	}
	checkVictory();
};

/*Works on IE8 */
var getElementsByClassName = function(node, classname) {
	var a = [];
	var re = new RegExp('(^| )'+classname+'( |$)');
	var els = node.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++)
		if(re.test(els[i].className))a.push(els[i]);
	return a;
};

var main = function(COLS, ROWS, TOTAL_MINES){
	// Make sure mines are less mines than celds.
	if ( TOTAL_MINES > (COLS * ROWS) ){
		return;
	}

	var mines =[],
		j = 0,
		i = 0;

	mines[0] = Math.floor((Math.random() * 100) + 1);

	for (i = 1; i < TOTAL_MINES; i++){
		var rndm, new_mine = true;
		while(new_mine){
			rndm = Math.floor((Math.random() * 100) + 1);
			new_mine = valExist(rndm, mines);
		}
		mines[i] = rndm;
	}

	var _matrix = [];
	var row, col;
	var id_cell = 0;
	/* Create the _matrix */
	for (i = 0; i < ROWS; i++) {
		col = [];
		for (j = 0; j < COLS; j++) {
			col[j] = valExist(id_cell, mines) ? 1 : 0;
			id_cell++;
		}
		console.log(col.toString());
		_matrix[i] = col;
	}
	matrix = _matrix;

	var board = document.getElementById("board");
	var boxes = "<table>";
	/* Draw the Board*/
	for (i = 0; i < ROWS; i++) {
		boxes += "<tr>";
		for (j = 0; j < COLS; j++) {
			boxes += "<td class='cell' id='" + i +"," + j + "'></td>";
			id_cell++;
		}
		boxes += "</tr>";
	}
	boxes += "</table>";
	board.innerHTML = boxes;


	var cells = getElementsByClassName(document.body,'cell');

	for(i=0; i<cells.length; i++){
		cells[i].addEventListener('click', checkCell);
	}

};