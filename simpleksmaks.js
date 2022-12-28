function simplexMaksimizasyon(matrix) {

	numColumns = matrix[0].length;
	numRows = matrix.length;
	basicVarsNum = numRows - 1;

	//temel degisken dizilerini doldur
	basicVars = [];
	for (var i = 0; i < numRows - 1; i++) {
		basicVars.push('s' + (i + 1));
	}

	//column header dizilerini doldur
	columnHeaderVars = [];
	columnHeaderVars.push('z');
	for (var i = 1; i <= numColumns - 2 - (numRows - 1); i++) {
		columnHeaderVars.push('x' + i);
	}
	columnHeaderVars.push(...basicVars);

	//pivot sutun indexi al
	pivotColumnIndex = getPivotColumnIndex(matrix);


	while (pivotColumnIndex != null) {


		//ratios sutununu doldur
		ratios = getRatios(matrix, numColumns, pivotColumnIndex)

		//pivot satir indexi al
		pivotRowIndex = getPivotRowIndex(ratios);
		if (pivotRowIndex == null) {
			return {
				error: true,
				message: "Sorun sinirsiz."
			};
		}

		//"cikan" temel degiskeni "giren" degiskenle degistir
		basicVars[pivotRowIndex] = columnHeaderVars[pivotColumnIndex];

		//pivot satiri guncelle
		pivotElement = matrix[pivotRowIndex][pivotColumnIndex];
		for (var i = 0; i < numColumns; i++) {
			matrix[pivotRowIndex][i] /= pivotElement;
		}

		//pivot olmayan satirlari guncelle
		for (var i = 0; i < numRows; i++) {
			oldrow = matrix[i].slice(); //asagidaki for dongusundeki satir ici islemler icin degere gore kopyala
			for (var j = 0; j < numColumns; j++) {
				if (i != pivotRowIndex) {
					matrix[i][j] = oldrow[j] - oldrow[pivotColumnIndex] * matrix[pivotRowIndex][j];
				}
			}
		}

		//pivot sutun indexi al
		pivotColumnIndex = getPivotColumnIndex(matrix);

	}

	return {
		error: false,
		vars: basicVars
	};
}



function getPivotColumnIndex(matrix) {
	//z-row kontrol et (ve boylece pivot sutun indexini bul)
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
	//ratios hesapla
	ratios = [];
	for (var i = 0; i < matrix.length - 1; i++) { //matrix.length-1 cunku z-row(son satir) icin oran istemiyoruz
		row = matrix[i];
		rowSolution = row[numColumns - 1];
		if (row[pivotColumnIndex] == 0) {
			ratios.push(-1); //sifira bolmeyi engeller ve ihmal edilebilir hale getirir
		} else {
			ratios.push(rowSolution / row[pivotColumnIndex])
		}
	}
	return ratios;
}

function getPivotRowIndex(ratios) {
	//en kucuk pozitif eleman icin ratios sutununu kontrol et (ve böylece pivot satir indexi bulunmus olunur)
	smallestPositiveElement = Infinity;
	pivotRowIndex = null;
	for (var i = 0; i < ratios.length; i++) {
		if (ratios[i] > 0) { //pozitiflik durumunu kontrol et
			if (ratios[i] < smallestPositiveElement) {
				smallestPositiveElement = ratios[i];
				pivotRowIndex = i;
			}
		}
	}
	return pivotRowIndex;
}
