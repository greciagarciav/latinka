// Llamar a la función al cargar la página
formatearFechaHora("actualDate");
		
// NUMEROS
var J1 = '.J1check_1, .J1check_2, .J1check_3, .J1check_4, .J1check_5, .J1check_6, .J1check_7, .J1check_8, .J1check_9, .J1check_10, .J1check_11, .J1check_12, .J1check_13, .J1check_14, .J1check_15, .J1check_16, .J1check_17, .J1check_18, .J1check_19, .J1check_20, .J1check_21, .J1check_22, .J1check_23, .J1check_24, .J1check_25, .J1check_26, .J1check_27, .J1check_28, .J1check_29, .J1check_30, .J1check_31, .J1check_32, .J1check_33, .J1check_34, .J1check_35, .J1check_36, .J1check_37, .J1check_38, .J1check_39, .J1check_40, .J1check_41, .J1check_42';
var J2 = '.J2check_1, .J2check_2, .J2check_3, .J2check_4, .J2check_5, .J2check_6, .J2check_7, .J2check_8, .J2check_9, .J2check_10, .J2check_11, .J2check_12, .J2check_13, .J2check_14, .J2check_15, .J2check_16, .J2check_17, .J2check_18, .J2check_19, .J2check_20, .J2check_21, .J2check_22, .J2check_23, .J2check_24, .J2check_25, .J2check_26, .J2check_27, .J2check_28, .J2check_29, .J2check_30, .J2check_31, .J2check_32, .J2check_33, .J2check_34, .J2check_35, .J2check_36, .J2check_37, .J2check_38, .J2check_39, .J2check_40, .J2check_41, .J2check_42';
var J3 = '.J3check_1, .J3check_2, .J3check_3, .J3check_4, .J3check_5, .J3check_6, .J3check_7, .J3check_8, .J3check_9, .J3check_10, .J3check_11, .J3check_12, .J3check_13, .J3check_14, .J3check_15, .J3check_16, .J3check_17, .J3check_18, .J3check_19, .J3check_20, .J3check_21, .J3check_22, .J3check_23, .J3check_24, .J3check_25, .J3check_26, .J3check_27, .J3check_28, .J3check_29, .J3check_30, .J3check_31, .J3check_32, .J3check_33, .J3check_34, .J3check_35, .J3check_36, .J3check_37, .J3check_38, .J3check_39, .J3check_40, .J3check_41, .J3check_42';
var J4 = '.J4check_1, .J4check_2, .J4check_3, .J4check_4, .J4check_5, .J4check_6, .J4check_7, .J4check_8, .J4check_9, .J4check_10, .J4check_11, .J4check_12, .J4check_13, .J4check_14, .J4check_15, .J4check_16, .J4check_17, .J4check_18, .J4check_19, .J4check_20, .J4check_21, .J4check_22, .J4check_23, .J4check_24, .J4check_25, .J4check_26, .J4check_27, .J4check_28, .J4check_29, .J4check_30, .J4check_31, .J4check_32, .J4check_33, .J4check_34, .J4check_35, .J4check_36, .J4check_37, .J4check_38, .J4check_39, .J4check_40, .J4check_41, .J4check_42';

var gamePlayed = {};

var totalCosts = 0.00;
var totalPlays = 0;

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

			// Agrega valores o verifica si this.value ya existe
			if(gamePlayed[this.className] === undefined)
			{
				gamePlayed[this.className] = [this.value, selectedGame];
			}
			else{
				gamePlayed[this.className] = undefined;
			}							

            // Actualizar los valores
			var selectList = selectionList();
			
            selectedValues.innerText = selectList.join(', ');
			
			//Calcular precios
			calculateCosts(selectList, selectedGame, 1);
        });
    });
}

function selectionList() {
		// Actualizar los valores
	var selectionList = [];
	for(var key in gamePlayed) {
		if(gamePlayed[key] !== undefined)
		{
		  selectionList.push(gamePlayed[key]);
		}			  
	};
	
	return selectionList;
};

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
	
	totalCosts = 0;
	totalPlays = 0;	
	
	//Calcular precios
	calculateCosts(selectionList(), selectedGame, 1);
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
		gamePlayed[otherCheckbox.className] = undefined;
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

// Función reutilizable para seleccionar 14 resultados al azar
function randomSelection(checkboxSelector) {
    document.getElementById('clearCheckboxes').click();

    // Obtener todos los checkboxes con el selector especificado
    const checkboxes = document.querySelectorAll(checkboxSelector);

    // Dividir en grupos de 3 checkboxes sin barajar
    const checkboxGroups = [];
    for (let i = 0; i < checkboxes.length; i += 3) {
        checkboxGroups.push(Array.from(checkboxes).slice(i, i + 3));
    }

    // Seleccionar aleatoriamente un checkbox por cada grupo
    const selectedCheckboxes = checkboxGroups.map(group => {
        const randomIndex = Math.floor(Math.random() * group.length);
        return group[randomIndex];
    });

    // Actualizar los valores mostrados
    const selectedGame = document.querySelector('.game-playing').getAttribute('data-game');
    const selectedValues = document.getElementById(selectedGame);
	
	// Marcar los checkboxes seleccionados
    selectedCheckboxes.forEach(checkbox => {
        checkbox.checked = true;
		gamePlayed[checkbox.className] = [checkbox.value, selectedGame];
    });

    // Actualizar los valores
	var selectList = selectionList();
			
	selectedValues.innerText = selectList.join(', ');
			
	//Calcular precios
	calculateCosts(selectList, selectedGame, 1);
}

function printTotals() {
	// Actualizar los valores mostrados	
	if(document.getElementById('multiply').value === '0')
	{
		document.getElementById('totalCost').innerText = totalCosts.toFixed(2);	
		document.getElementById('totalPlay').innerText = totalPlays;
	}
	else{
		document.getElementById('totalCost').innerText = (totalCosts + 1).toFixed(2);
		document.getElementById('totalPlay').innerText = totalPlays + "1 G200";
	}

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
	var index = getCostsAndPlaysIndex(selectedGame);	
	var countA = 0;	var	countB = 0; var countC = 0; var countD = 0;
	for(var key in gamePlayed) {
		if(gamePlayed[key] !== undefined)
			{
			if(gamePlayed[key][1] === 'A')
			{
			  countA++;
			}
			if(gamePlayed[key][1] === 'B')
			{
			  countB++;
			}	
			if(gamePlayed[key][1] === 'C')
			{
			  countC++;
			}	
			if(gamePlayed[key][1] === 'D')
			{
			  countD++;
			}		
		}
	}
	
    // Verificar condiciones y actualizar valores según sea necesario
    if (countA < 14 && countB == 0 && countC == 0 && countD == 0) {
        setTotals(countA, 0, 0);
	} else if (countA < 14 && countB < 14 && countC < 14 && countD < 14) {
        setTotals(countA, 0, 0);
	} else if (countA == 14 && countB < 14 && countC < 14 && countD < 14) {
        setTotals(countA, 1, 3);
	} else if (countA == 14 && countB < 14 && countC == 14 && countD < 14) {
        setTotals(countA, 2, 6);
    } else if (countA == 0 && countB < 14 && countC == 0 && countD == 0) {
        setTotals(countB, 0, 0);
    } else if (countA == 0 && countB == 0 && countC < 14 && countD == 0) {
        setTotals(countC, 0, 0);
    } else if (countA == 0 && countB == 0 && countC == 0 && countD < 14) {
        setTotals(countD, 0, 0);				
    } else if (countA == 14 && countB == 0 && countC == 0 && countD == 0) {
        setTotals(countA, 1, 3);
	} else if (countA == 14 && countB == 14 && countC == 0 && countD == 0) {
        setTotals(countA, 2, 6);
    } else if (countA == 14 && countB == 14 && countC == 0 && countD == 0) {
        setTotals(countB, 2, 6);
    } else if (countA == 14 && countB == 14 && countC == 14 && countD == 0) {
        setTotals(countC, 3, 9);
    } else if (countA == 14 && countB == 14 && countC == 14 && countD == 14) {
        setTotals(countD, 4, 12);
	} else if (countA < 14 && countB < 14 && countC == 14 && countD < 14) {
        setTotals(countC, 1, 3);
	} else if (countA < 14 && countB == 14 && countC == 14 && countD < 14) {
        setTotals(countB, 2, 6);    		
	} else if (countA == 14 && countB == 0 && countC == 14 && countD == 0) {
        setTotals(countA, 2, 6);	
	} else if (countA < 14 && countB < 14 && countC < 14 && countD == 14) {
        setTotals(countD, 1, 3);
	} else if (countA == 14 && countB < 14 && countC < 14 && countD == 14) {
        setTotals(countD, 2, 6);
	} else if (countA == 14 && countB < 14 && countC < 14 && countD == 0) {
        setTotals(countA, 1, 3);
	} else if (countA == 14 && countB == 14 && countC < 14 && countD == 14) {
        setTotals(countA, 3, 9);	
	} else if (countA == 14 && countB == 14 && countC == 0 && countD < 14) {
        setTotals(countA, 2, 6);		
	} else if (countA == 14 && countB == 14 && countC < 14 && countD < 14) {
        setTotals(countA, 2, 6);
	} else if (countA < 14 && countB < 14 && countC == 14 && countD == 14) {
        setTotals(countC, 2, 6);
	} else if (countA < 14 && countB == 14 && countC < 14 && countD == 14) {
        setTotals(countB, 2, 6);
	} else if (countA == 14 && countB < 14 && countC == 14 && countD == 14) {
        setTotals(countA, 3, 9);
	} else if (countA == 0 && countB == 14 && countC == 0 && countD == 14) {
        setTotals(countB, 2, 6);
	} else if (countA < 14 && countB == 0 && countC < 14 && countD == 0) {
        setTotals(countB, 0, 0);
	} else if (countA == 0 && countB < 14 && countC == 0 && countD < 14) {
        setTotals(countA, 0, 0);
	} else if (countA == 14 && countB == 14 && countC < 14 && countD == 0) {
        setTotals(countB, 2, 6);
	} else if (countA == 14 && countB == 14 && countC == 14 && countD < 14) {
        setTotals(countB, 3, 9);
	} else if (countA < 14 && countB == 14 && countC == 14 && countD == 14) {
        setTotals(countB, 3, 9);
	} else if (countA == 14 && countB < 14 && countC == 14 && countD == 14) {
        setTotals(countC, 3, 9);						
    } else if (countA == 14 && countB < 14 && countC == 0 && countD == 0) {
        setTotals(countA, 1, 3);
    } else if (countA < 14 && countB == 14 && countC == 0 && countD == 0) {
        setTotals(countB, 1, 3);
    } else if (countA == 0 && countB < 14 && countC == 0 && countD == 0) {
        setTotals(countB, 0, 0);
    } else if (countA == 0 && countB == 0 && countC < 14 && countD == 0) {
        setTotals(countC, 0, 0);
    } else if (countA == 0 && countB == 0 && countC == 0 && countD < 14) {
        setTotals(countD, 0, 0);
    }
	
    // Actualizar los valores mostrados	
    printTotals();
}

function setTotals(count, playsMultiplier, costsMultiplier) {
    totalPlays = count == 0 ? 0 : count == 14 ? playsMultiplier : 0;
    totalCosts = costsMultiplier;
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
		localStorage.setItem("ganagol",
			JSON.stringify(document.getElementById('multiply').value === '0' ? parseFloat(totalCosts.toFixed(2)) : parseFloat((totalCosts + 1).toFixed(2)))
		);
        location.href = "./dashboard.html";
 };
 
 // Posiciona el juego al cargar
 function Scrolldown() {
     window.scroll(0,250); 
}

window.onload = Scrolldown;