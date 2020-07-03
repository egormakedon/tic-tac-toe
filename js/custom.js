"use strict"

const HTML_TABLE_SIZE_ID = "tableSizeId";
const HTML_APPLY_TABLE_SIZE_BUTTON_ID = "applyTableSizeButtonId";
const HTML_TABLE_ID = "tableId";
const HTML_ROW_ID_PREFIX = "row";
const HTML_CELL_ID_PREFIX = "cell";
const HTML_CROSS_NOTIFICATION_ID = "crossNotificationId";
const HTML_ZERO_NOTIFICATION_ID = "zeroNotificationId";
const HTML_RESET_BUTTON_ID = "resetButtonId";

const HTML_CROSS_VALUE = "X";
const HTML_ZERO_VALUE = "0";

const CROSS_VALUE = 1;
const ZERO_VALUE = 0;
const EMPTY_VALUE = -1;

var n;
var gameTable;
var clickValue;

function updateCell(cellId) {
	let result = false;

	if (cellId !== undefined
			&& cellId !== null
			&& typeof cellId === "string"
			&& cellId.startsWith(HTML_CELL_ID_PREFIX)) {
		let i = parseInt(cellId[HTML_CELL_ID_PREFIX.length]);
		let j = parseInt(cellId[HTML_CELL_ID_PREFIX.length + 1]);

		if (gameTable[i][j] === EMPTY_VALUE) {
			gameTable[i][j] = clickValue;
			result = true;

			if (clickValue === CROSS_VALUE) {
				$("#" + cellId).html(HTML_CROSS_VALUE);
				clickValue = ZERO_VALUE;
			} else {
				$("#" + cellId).html(HTML_ZERO_VALUE);
				clickValue = CROSS_VALUE;
			}
		}
	}

	return result;
}

function checkGameStatus(cellId) {
	let cellI = cellId[HTML_CELL_ID_PREFIX.length];
	let cellJ = cellId[HTML_CELL_ID_PREFIX.length + 1];
	let cellValue = gameTable[cellI][cellJ];

	let count = 0;

	for (let i = 0; i < N; i++) {
		if (gameTable[i][cellJ] === cellValue) {
			++count;
		}
	}

	if (count !== N) {
		count = 0;

		for (let j = 0; j < N; j++) {
			if (gameTable[cellI][j] === cellValue) {
				++count;
			}
		}		
	}

	if (count !== N && cellI === cellJ) {
		count = 0;

		for (let i = 0; i < N; i++) {
			if (gameTable[i][i] === cellValue) {
				++count;
			}
		}
	}

	if (count !== N && cellI + cellJ === N - 1) {
		count = 0;

		for (let i = 0; i < N; i++) {
			for (let j = 0; j < N; j++) {
				if (i + j === N - 1 && gameTable[i][i] === cellValue) {
					++count;
				}
			}
		}
	}
}

function appendRow(i) {
	let tr = $("<tr/>");
	tr.attr("id", HTML_ROW_ID_PREFIX + i);

	$("#" + HTML_TABLE_ID + " tbody").append(tr);
}

function appendColumn(i, j) {
	let td = $("<td/>");
	td.attr("id", HTML_CELL_ID_PREFIX + i + j);
	td.html("test");

	$("#" + HTML_ROW_ID_PREFIX + i).append(td);
}

function initTable() {
	$("#" + HTML_TABLE_ID + " tbody").empty();
	gameTable = [];

	for (let i = 0; i < n; i++) {
		appendRow(i);
		gameTable.push([]);

		for (let j = 0; j < n; j++) {
			appendColumn(i, j);
			gameTable[i].push(EMPTY_VALUE);
		}
	}
}

function initClickValue() {
	clickValue = CROSS_VALUE;
}

function initNotifications() {
	$("#" + HTML_CROSS_NOTIFICATION_ID).hide();
	$("#" + HTML_ZERO_NOTIFICATION_ID).hide();
}

function init() {
	initTable();
	initClickValue();
	initNotifications();
}

function applyTableSizeButtonClickListener() {
	let tableSize = $("#" + HTML_TABLE_SIZE_ID).val();

	if (!(tableSize < 3 || Math.round(tableSize) === n)) {
		n = Math.round(tableSize);
		init();
	}

	$("#" + HTML_TABLE_SIZE_ID).val(n);
}

function tableClickListener(event) {
	let cellId = event.target.id;
	let isCellUpdated = updateCell(cellId);

	if (isCellUpdated) {
		checkGameStatus(cellId);
	}
}

function resetButtonClickListener() {
	init();
}

$("#" + HTML_APPLY_TABLE_SIZE_BUTTON_ID).on("click", applyTableSizeButtonClickListener);
$("#" + HTML_TABLE_ID).on("click", tableClickListener);
$("#" + HTML_RESET_BUTTON_ID).on("click", resetButtonClickListener);

$(document).ready(function() {
	n = 3;
	init();
});