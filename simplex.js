function solveSimplex(matrix) {

	numColumns = matrix[0].length;
	numRows = matrix.length;
	basicVarsNum = numRows - 1;

	//populate basic variable strings
	basicVars = [];
	for (var i = 0; i < numRows - 1; i++) {
		basicVars.push('s' + (i + 1));
	}

	//populate column header strings
	columnHeaderVars = [];
	columnHeaderVars.push('z');
	for (var i = 1; i <= numColumns - 2 - (numRows - 1); i++) {
		columnHeaderVars.push('x' + i);
	}
	columnHeaderVars.push(...basicVars);

	//get pivot column index
	pivotColumnIndex = getPivotColumnIndex(matrix);


	while (pivotColumnIndex != null) {


		//populate ratios column
		ratios = getRatios(matrix, numColumns, pivotColumnIndex)

		//get pivot row index
		pivotRowIndex = getPivotRowIndex(ratios);
		if (pivotRowIndex == null) {
			return {
				error: true,
				message: "Problem is unbounded."
			};
		}

		//replace the 'leaving' basic variable with 'entering' variable
		basicVars[pivotRowIndex] = columnHeaderVars[pivotColumnIndex];

		//update pivot row
		pivotElement = matrix[pivotRowIndex][pivotColumnIndex];
		for (var i = 0; i < numColumns; i++) {
			matrix[pivotRowIndex][i] /= pivotElement;
		}

		//update non-pivot rows
		for (var i = 0; i < numRows; i++) {
			oldrow = matrix[i].slice(); //copy by value for intra-row operations in the for-loop below
			for (var j = 0; j < numColumns; j++) {
				if (i != pivotRowIndex) {
					matrix[i][j] = oldrow[j] - oldrow[pivotColumnIndex] * matrix[pivotRowIndex][j];
				}
			}
		}

		//get pivot column index
		pivotColumnIndex = getPivotColumnIndex(matrix);

	}

	return {
		error: false,
		vars: basicVars
	};
}



function getPivotColumnIndex(matrix) {
	//check z-row for most negative element (and thus find pivot column index)
	numRows = matrix.length;
	zrow = matrix[numRows - 1];
	mostNegativeElement = 0
	pivotColumnIndex = null
	for (var i = 0; i < zrow.length; i++) {
		if (zrow[i] < mostNegativeElement) {
			mostNegativeElement = zrow[i];
			pivotColumnIndex = i;
		}
	}
	return pivotColumnIndex;
}

function getRatios(matrix, numColumns, pivotColumnIndex) {
	//calculate ratios
	ratios = [];
	for (var i = 0; i < matrix.length - 1; i++) { //matrix.length-1 because we don't want ratio for z-row(last row)
		row = matrix[i];
		rowSolution = row[numColumns - 1];
		if (row[pivotColumnIndex] == 0) {
			ratios.push(-1); //prevents division by zero and renders it ignorable
		} else {
			ratios.push(rowSolution / row[pivotColumnIndex])
		}
	}
	return ratios;
}

function getPivotRowIndex(ratios) {
	//check ratios column for smallest positive element (and thus find pivot row index)
	smallestPositiveElement = Infinity;
	pivotRowIndex = null;
	for (var i = 0; i < ratios.length; i++) {
		if (ratios[i] > 0) { //check if only positive
			if (ratios[i] < smallestPositiveElement) {
				smallestPositiveElement = ratios[i];
				pivotRowIndex = i;
			}
		}
	}
	return pivotRowIndex;
}
