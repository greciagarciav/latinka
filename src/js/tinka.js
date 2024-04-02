// Llamar a la función al cargar la página
formatearFechaHora("actualDate");
const tinkaPrice = 5;

// NUMEROS
var J1 = '.J1check_1, .J1check_2, .J1check_3, .J1check_4, .J1check_5, .J1check_6, .J1check_7, .J1check_8, .J1check_9, .J1check_10, .J1check_11, .J1check_12, .J1check_13, .J1check_14, .J1check_15, .J1check_16, .J1check_17, .J1check_18, .J1check_19, .J1check_20, .J1check_21, .J1check_22, .J1check_23, .J1check_24, .J1check_25, .J1check_26, .J1check_27, .J1check_28, .J1check_29, .J1check_30, .J1check_31, .J1check_32, .J1check_33, .J1check_34, .J1check_35, .J1check_36, .J1check_37, .J1check_38, .J1check_39, .J1check_40, .J1check_41, .J1check_42, .J1check_43, .J1check_44, .J1check_45, .J1check_46, .J1check_47, .J1check_48';
var J2 = '.J2check_1, .J2check_2, .J2check_3, .J2check_4, .J2check_5, .J2check_6, .J2check_7, .J2check_8, .J2check_9, .J2check_10, .J2check_11, .J2check_12, .J2check_13, .J2check_14, .J2check_15, .J2check_16, .J2check_17, .J2check_18, .J2check_19, .J2check_20, .J2check_21, .J2check_22, .J2check_23, .J2check_24, .J2check_25, .J2check_26, .J2check_27, .J2check_28, .J2check_29, .J2check_30, .J2check_31, .J2check_32, .J2check_33, .J2check_34, .J2check_35, .J2check_36, .J2check_37, .J2check_38, .J2check_39, .J2check_40, .J2check_41, .J2check_42, .J2check_43, .J2check_44, .J2check_45, .J2check_46, .J2check_47, .J2check_48';
var J3 = '.J3check_1, .J3check_2, .J3check_3, .J3check_4, .J3check_5, .J3check_6, .J3check_7, .J3check_8, .J3check_9, .J3check_10, .J3check_11, .J3check_12, .J3check_13, .J3check_14, .J3check_15, .J3check_16, .J3check_17, .J3check_18, .J3check_19, .J3check_20, .J3check_21, .J3check_22, .J3check_23, .J3check_24, .J3check_25, .J3check_26, .J3check_27, .J3check_28, .J3check_29, .J3check_30, .J3check_31, .J3check_32, .J3check_33, .J3check_34, .J3check_35, .J3check_36, .J3check_37, .J3check_38, .J3check_39, .J3check_40, .J3check_41, .J3check_42, .J3check_43, .J3check_44, .J3check_45, .J3check_46, .J3check_47, .J3check_48';
var J4 = '.J4check_1, .J4check_2, .J4check_3, .J4check_4, .J4check_5, .J4check_6, .J4check_7, .J4check_8, .J4check_9, .J4check_10, .J4check_11, .J4check_12, .J4check_13, .J4check_14, .J4check_15, .J4check_16, .J4check_17, .J4check_18, .J4check_19, .J4check_20, .J4check_21, .J4check_22, .J4check_23, .J4check_24, .J4check_25, .J4check_26, .J4check_27, .J4check_28, .J4check_29, .J4check_30, .J4check_31, .J4check_32, .J4check_33, .J4check_34, .J4check_35, .J4check_36, .J4check_37, .J4check_38, .J4check_39, .J4check_40, .J4check_41, .J4check_42, .J4check_43, .J4check_44, .J4check_45, .J4check_46, .J4check_47, .J4check_48';

var totalCosts = [0.00, 0.00, 0.00, 0.00];
var totalPlays = [0,0,0,0];

// Obtener todos los elementos con la clase 'box-current-game'
const gameBoxes = document.querySelectorAll('.box-current-game');

// Obtener todos los elementos con la clase 'body-single-game-X'
const gameDetails = document.querySelectorAll('.body-single-game-A, .body-single-game-B, .body-single-game-C, .body-single-game-D');

// Agregar event listeners de clic a cada caja de juego
gameBoxes.forEach(box => {
    box.addEventListener('click', function () {
        const allGameBoxes = document.querySelectorAll('.box-current-game');
        allGameBoxes.forEach(box => {
            box.classList.remove('game-playing');
        });
        this.classList.add('game-playing');

        // Obtener el valor data-game seleccionado
        const selectedGame = this.getAttribute('data-game');

        // Mostrar solo los números seleccionados
        const selectedNumbers = document.querySelectorAll('.selected-numbers');
        selectedNumbers.forEach(selectedNumberMessage => {
            selectedNumberMessage.classList.add('hidden');
        });
        document.getElementById(selectedGame).classList.remove('hidden');

        // Mostrar el texto de juego seleccionado
        const gameSelectedElement = document.querySelector('.game-selected');
        gameSelectedElement.innerHTML = "JUGADA " + selectedGame;

        // Ocultar todos los detalles del juego
        gameDetails.forEach(detail => {
            if (detail.classList.contains(`body-single-game-${selectedGame}`)) {
                // Mostrar los detalles del juego seleccionado
                detail.classList.remove('hidden');
            } else {
                detail.classList.add('hidden');
            }
        });
    });
});

// SELECCION DE NUMEROS
handleCheckboxes('.body-single-game-A', J1);
handleCheckboxes('.body-single-game-B', J2);
handleCheckboxes('.body-single-game-C', J3);
handleCheckboxes('.body-single-game-D', J4);

function handleCheckboxes(valuesContainerSelector, checkboxSelector) {
    // Obtener todos los checkboxes con el selector especificado
    const checkboxes = document.querySelectorAll(checkboxSelector);

    // Agregar event listeners de clic a cada checkbox
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', function () {
            const selectedGame = document.querySelector('.game-playing').getAttribute('data-game');
            const selectedValues = document.getElementById(selectedGame);
            const selectionList = selectedValues.innerText === "" ? [] : selectedValues.innerText.split(',').map(value => value.trim());

            // Verificar si this.value ya existe en selectionList
            const valueIndex = selectionList.indexOf(this.value);
            if (valueIndex !== -1) {
                // Si existe, eliminarlo de selectionList
				selectionList.splice(valueIndex, 1);
				calculateCosts(selectionList, selectedGame, 2);                
            } else {
                // Si no existe, agregarlo a selectionList
                if (selectionList.length < 15) {
                    selectionList.push(this.value);
					// Calcular costos
					calculateCosts(selectionList, selectedGame, 1);
                }
            }

            // Actualizar los valores mostrados
            selectedValues.innerText = selectionList.join(', ');

            // Deshabilitar otros checkboxes si se alcanza el límite
            enableOrDisableCheckboxes(selectionList, checkboxes);
			
			// Guarda 1era jugada sólo en A (solo demo, borrar luego)	
			if(selectedGame === "A")
			{				
				localStorage.setItem("jugadaTinka", selectionList);
			}			
        });
    });
}

// LIMPIAR
document.getElementById('clearCheckboxes').addEventListener('click', function () {
    const selectedGame = document.querySelector('.game-playing').getAttribute('data-game');
    if (selectedGame === "A") clearCheckboxes(J1);
    if (selectedGame === "B") clearCheckboxes(J2);
    if (selectedGame === "C") clearCheckboxes(J3);
    if (selectedGame === "D") clearCheckboxes(J4);
	
	var index = 0;
	switch(selectedGame)
	{
		case 'A': index = 0; break;
		case 'B': index = 1; break;
		case 'C': index = 2; break;
		case 'D': index = 3; break;
	}
	
	totalCosts[getCostsAndPlaysIndex(selectedGame)] = 0;
	totalPlays[getCostsAndPlaysIndex(selectedGame)] = 0;
	
	// Actualizar los valores mostrados	
    printTotals();
});

// Agregar event listener de clic al botón "Limpiar Checkboxes"
function clearCheckboxes(checkboxSelector) {
    // Obtener todos los checkboxes con la clase 'J1check_X'
    const checkboxes = document.querySelectorAll(checkboxSelector);

    // Desmarcar todos los checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    // Limpiar los valores mostrados
    const selectedGame = document.querySelector('.game-playing').getAttribute('data-game');
    const selectedValues = document.getElementById(selectedGame);
    selectedValues.innerText = "";
	
	checkboxes.forEach(otherCheckbox => {		
		otherCheckbox.disabled = false;		
	});
}

// ALEATORIO
document.getElementById('randomSelection').addEventListener('click', function () {
    const selectedGame = document.querySelector('.game-playing').getAttribute('data-game');
    if (selectedGame === "A") randomSelection(J1);
    if (selectedGame === "B") randomSelection(J2);
    if (selectedGame === "C") randomSelection(J3);
    if (selectedGame === "D") randomSelection(J4);
});

// Función reutilizable para seleccionar 15 números al azar
function randomSelection(checkboxSelector) {
    document.getElementById('clearCheckboxes').click();

    // Obtener todos los checkboxes con el selector especificado
    const checkboxes = document.querySelectorAll(checkboxSelector);

    // Barajar los checkboxes
    const shuffledCheckboxes = Array.from(checkboxes).sort(() => Math.random() - 0.5);

    // Seleccionar los primeros 15 checkboxes
    const selectedCheckboxes = shuffledCheckboxes.slice(0, 6);

    // Marcar los checkboxes seleccionados
    selectedCheckboxes.forEach(checkbox => {
        checkbox.checked = true;
    });

    // Actualizar los valores mostrados
    const selectedGame = document.querySelector('.game-playing').getAttribute('data-game');
    const selectedValues = document.getElementById(selectedGame);
    const selectionList = selectedCheckboxes.map(checkbox => checkbox.value.trim());
    selectedValues.innerText = selectionList.join(', ');
	
	// Deshabilitar otros checkboxes si se alcanza el límite
    enableOrDisableCheckboxes(selectionList, checkboxes);
	
	// Calcular costos	
	totalCosts[getCostsAndPlaysIndex(selectedGame)] = 0;
	totalPlays[getCostsAndPlaysIndex(selectedGame)] = 0;
    calculateCosts(selectionList, selectedGame, 1);
	
	// Guarda 1era jugada (solo demo, borrar luego)
	localStorage.setItem("jugadaTinka", selectionList);
}

function printTotals() {
	// Actualizar los valores mostrados	
    document.getElementById('totalCost').innerText = totalCosts.reduce((a, b) => a + b, 0).toFixed(2) * document.getElementById('multiply').value;
    document.getElementById('totalPlay').innerText = totalPlays.reduce((a, b) => a + b, 0);	
}

function getCostsAndPlaysIndex(selectedGame) {
	var index = 0;
	switch(selectedGame)
	{
		case 'A': index = 0; break;
		case 'B': index = 1; break;
		case 'C': index = 2; break;
		case 'D': index = 3; break;
	};
	return index;
};

function calculateCosts(selectionList, selectedGame, type) {	
	if(selectionList.length >= 6)
	{
		var index = getCostsAndPlaysIndex(selectedGame);	
		
		var totalCombinations = combinations(selectionList.length, 6);		
		
		totalPlays[index] = totalCombinations;
		totalCosts[index] = (totalCombinations * tinkaPrice);
	}
	else
	{
		totalCosts[getCostsAndPlaysIndex(selectedGame)] = 0;
		totalPlays[getCostsAndPlaysIndex(selectedGame)] = 0;
	}

    // Actualizar los valores mostrados	
    printTotals();
}

function enableOrDisableCheckboxes(selectionList, checkboxes) {
	if (selectionList.length >= 15) {
		checkboxes.forEach(otherCheckbox => {
			if (!selectionList.includes(otherCheckbox.value)) {
				otherCheckbox.disabled = true;
			}
		});
	} else {
		// Habilitar todos los checkboxes
		checkboxes.forEach(otherCheckbox => {
			otherCheckbox.disabled = false;
		});
	}
}

document.getElementById('multiply').addEventListener('change', function () {
    // Actualizar los valores mostrados	
    printTotals();
});

// Botones de salida
document.getElementById('exitBtn').addEventListener('click', function () {
	var confirmarSalidaModal = new bootstrap.Modal(document.getElementById('confirmarSalidaModal'));
	confirmarSalidaModal.show();
});

document.getElementById('confirmarSalida').addEventListener('click', function () {	
	window.location.href = "./dashboard.html";
});

 
document.getElementById("finishBtn").onclick = function () {
		localStorage.setItem("tinka",
			JSON.stringify(totalCosts.reduce((a, b) => a + b, 0).toFixed(2) * document.getElementById('multiply').value)
		);
        location.href = "./dashboard.html";
 };
 
 // Posiciona el juego al cargar
 function Scrolldown() {
     window.scroll(0,250); 
}

window.onload = Scrolldown;