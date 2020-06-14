"use strict"

const HTML_TABLE_ID = "tableId";
const HTML_CELL_ID_PREFIX = "cell";
const HTML_RESET_BUTTON_ID = "resetButtonId";

const HTML_ZERO_VALUE = "0";
const HTML_CROSS_VALUE = "X";

const N = 3;
const M = 3;

const EMPTY_VALUE = -1;
const ZERO_VALUE = 0;
const CROSS_VALUE = 1;

var gameTable;
var clickValue;

function tableClickListener(event) {
	let cellId = event.target.id;
	let isCellUpdated = updateCell(cellId);

	if (isCellUpdated) {
		checkGameStatus(cellId);
	}
}

function resetButtonClickListener() {
	resetGameTable();
	resetClickValue();
}

function updateCell(cellId) {
	let result = false;

	if (cellId !== undefined
			&& cellId !== null
			&& typeof cellId === "string"
			&& cellId.startsWith(HTML_CELL_ID_PREFIX)) {
		let i = cellId[HTML_CELL_ID_PREFIX.length];
		let j = cellId[HTML_CELL_ID_PREFIX.length + 1];

		if (gameTable[i][j] === EMPTY_VALUE) {
			gameTable[i][j] = clickValue;
			clickValue = clickValue === CROSS_VALUE ? ZERO_VALUE : CROSS_VALUE;
			result = true;
		}
	}

	return result;
}

function checkGameStatus(cellId) {
}

function resetGameTable() {
	gameTable = [];

	for (let i = 0; i < N; i++) {
		gameTable.push([]);

		for (let j = 0; j < M; j++) {
			gameTable[i].push(EMPTY_VALUE);
		}
	}
}

function resetClickValue() {
	clickValue = CROSS_VALUE;
}

$("#" + HTML_TABLE_ID).on("click", tableClickListener);
$("#" + HTML_RESET_BUTTON_ID).on("click", resetButtonClickListener);

$(document).ready(function() {
	resetGameTable();
	resetClickValue();
});