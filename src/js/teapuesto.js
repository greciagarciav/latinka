	// Llamar a la función al cargar la página
	formatearFechaHora("actualDate");
	formatearFechaHora("actualDate2");	

	// Botones de salida
	document.getElementById('exitBtn').addEventListener('click', function () {
		var confirmarSalidaModal = new bootstrap.Modal(document.getElementById('confirmarSalidaModal'));
		confirmarSalidaModal.show();
	});

	document.getElementById('confirmarSalida').addEventListener('click', function () {
		window.location.href = "./dashboard.html";
	});

	document.getElementById("finishBtn").onclick = function () {
		location.href = "./dashboard.html";
	};

	// Teclado
	$(function() {

	$('#keyboard').keyboard({
		visible: function(e, keyboard) {
		initTypeAhead(keyboard);
		},
		change: function(e, keyboard) {
		// trigger "input" required for typeahead to recognize a change
		e.type = 'input';
		keyboard.$preview.trigger(e);
		}
	})
	// activate the typing extension
	.addTyping({
		showTyping: true,
		delay: 250
	});
	var substringMatcher = function(strs) {
			return function findMatches(q, cb) {
				var matches, substringRegex;

				// an array that will be populated with substring matches
				matches = [];

			// regex used to determine if a string contains the substring `q`
			substrRegex = new RegExp(q, 'i');

			// iterate through the pool of strings and for any string that
			// contains the substring `q`, add it to the `matches` array
			$.each(strs, function(i, str) {
			if (substrRegex.test(str)) {
				matches.push(str);
			}
			});

			cb(matches);
		};
		},
		states = ['Peru'
		],
		initTypeAhead = function(keyboard) {
		keyboard.$preview.typeahead({
			hint: true,
			highlight: true,
			minLength: 1
		}, {
			name: 'states',
			source: substringMatcher(states)
		});
		};

	});   

  ClearSessions();

  // Mantener una variable para almacenar los números seleccionados
  var numerosSeleccionados = '';

  // Obtener todos los botones con la clase "pdNumber"
  var buttons = document.querySelectorAll('.pdNumber');

  // Obtener el botón de borrar último número
  var deleteButton = document.getElementById('pdDelete');

  // Obtener el botón de borrar todo
  var clearButton = document.getElementById('pdClear');

  // Obtener el botón de aceptar
  var acceptButton = document.getElementById('pdAcept');

  // Obtener el botón de evento especial
  var specialEventButton = document.getElementById('pdEspecialEvt');
  
  // Obtener el boton de resultado exacto
  var exactResultButton = document.getElementById('pdExactResult');
  
  // Obtener el boton de multiplicador
  var multiplyButton = document.getElementById('multiply');
  
  // Obtener el boton de más eventos
  var moreEventsButton = document.getElementById('pdMore');
    
  var fTimeL = document.getElementById('pi1tl');
  var fTimeE = document.getElementById('pi1te');
  var fTimeV = document.getElementById('pi1tv');
  var sTimeL = document.getElementById('pi2tl');
  var sTimeE = document.getElementById('pi2te');
  var sTimeV = document.getElementById('pi2tv');
  
  var HCButton = document.getElementById('pdHC');
  var FButton = document.getElementById('pdF');
  
  var NAButton = document.getElementById('pdNA');
  var AButton = document.getElementById('pdA');
  var Pd1Button = document.getElementById('pd01');
  var Pd23Button = document.getElementById('pd23');
  var Pd4mButton = document.getElementById('pd4m');
    
  var PdPlusButton = document.getElementById('pdPlus');
  var PdMinusButton = document.getElementById('pdMinus');
  var Pd05Button = document.getElementById('pd05');
  
  var combineButton = document.getElementById('combine');
  
  var clearAllButton = document.getElementById('clearAll');
  
  var selectionSquare = document.getElementById('selectionSquare');
  var multiplySpanSelected = document.getElementById('multiplySelected');
     
  sessionStorage.setItem('tablePosition', 0);
  
  var table = sessionStorage.getItem('table');
  var multiply = sessionStorage.getItem('multiply');
  if(table === null) {
	  table = [];
  }
  if(multiply === null) {
	  multiply = [];
  }
  
  moreEventsButton.disabled = true;

  // Agregar un event listener de clic a cada botón
  buttons.forEach(function(button) {
    button.addEventListener('click', function() {
      var numeroBoton = parseInt(button.textContent);
	  var exactResultSelected = sessionStorage.getItem('exactResultSelected');	  
	  var minusSelected = sessionStorage.getItem('minus');
	  var plusSelected = sessionStorage.getItem('plus');
	  var multiplySelected = sessionStorage.getItem('multiplySelected');
	   
		  numerosSeleccionados += numeroBoton;
		  sessionStorage.setItem('numerosSeleccionados', numerosSeleccionados);	  
		  var position = sessionStorage.getItem('tablePosition');		  		 
		  
		if(numerosSeleccionados === "111") {
			agregarBloqueado(numerosSeleccionados);
			disableButtons();
		}
		else{  
			  
				if(multiplySelected !== 'true')
				{
					if(minusSelected === 'true') {			
						table[position] = [table[position][0], "Goles - "+numerosSeleccionados, 0, ""];			
						PrintTable();
					} 
					else if(plusSelected === 'true') {			
						table[position] = [table[position][0], "Goles + "+numerosSeleccionados, 0, ""];			
						PrintTable();
					}
					else if (exactResultSelected !== 'true') {  							
						if(table.length === 0 || table[position] === null || table[position] === undefined) {
							table.push([numerosSeleccionados, "", 0, ""]);
						}else{
							table[position] = [numerosSeleccionados, "", 0, ""]
						}
						PrintTable();
					}		
				}else{							
					multiplySpanSelected.innerHTML = "s/ " + numerosSeleccionados;
					selectionSquare.style.display = 'block';
				}
		}
    });	
  });

  // Agregar un event listener de clic al botón de borrar último número
  deleteButton.addEventListener('click', function() {
    numerosSeleccionados = numerosSeleccionados.slice(0, -1);
	var position = sessionStorage.getItem('tablePosition');
	table[position][0] = numerosSeleccionados;
	PrintTable();
  });

  // Agregar un event listener de clic al botón de borrar todo
  clearButton.addEventListener('click', function() {
	var position = sessionStorage.getItem('tablePosition');
	if(table[position] === undefined || table[position].every(element => element === "")){
	if(position !== "0")
	{
		position = Number(position) - 1;
		sessionStorage.setItem('tablePosition', position);
		table[position] = ["","","",""];
		multiply[position] = ["",""];
		PrintTable();
		PrintMultiplyTable();
		PrintTotal();		
	}		
	}else{
		enableButtons();
		numerosSeleccionados = '';	
		table[position] = ["","","",""];
		multiply[position] = ["",""];
		PrintTable();
		PrintMultiplyTable();
		PrintTotal();
		ClearSessionsButNotTable();	
	}	
	
	table.pop();
	multiply.pop();
	moreEventsButton.disabled = true;
	multiplySpanSelected.innerHTML = "";
	selectionSquare.style.display = 'none';
  });

  // Agregar un event listener de clic al botón de evento especial
  specialEventButton.addEventListener('click', function() {
    // Guardar en la sesión que se ha seleccionado el evento especial
    sessionStorage.setItem('specialEventSelected', 'true');
	var position = sessionStorage.getItem('tablePosition');
	table[position] = [numerosSeleccionados, "Cod Esp Messi x 3", 0, ""];
	PrintTable();
  });
  
  // Agregar un event listener de clic al botón de resultado exacto
  exactResultButton.addEventListener('click', function() {	
	// Guardar en la sesión que se ha seleccionado el resultado exacto
	sessionStorage.setItem('exactResultSelected', 'true');
	numerosSeleccionados = '';
	sessionStorage.removeItem("numerosSeleccionados");	
  });  
  
  // Agregar un event listener de clic al botón de 1er tiempo Local
  fTimeL.addEventListener('click', function() {
    sessionStorage.setItem('fTimeL', 'true'); 
	var position = sessionStorage.getItem('tablePosition');
	if(table[position][1] === "")
	{
		table[position] = [numerosSeleccionados, "1t L", 0, ""];	
	}else{
		table[position] = [numerosSeleccionados, "1t L / "+table[position][1], 0, ""];	
	}
	PrintTable();
  });
  
  // Agregar un event listener de clic al botón de 1er tiempo empate
  fTimeE.addEventListener('click', function() {
    sessionStorage.setItem('fTimeE', 'true');   
	var position = sessionStorage.getItem('tablePosition');
	if(table[position][1] === "")
	{
		table[position] = [numerosSeleccionados, "1t E", 0, ""];	
	}else{
		table[position] = [numerosSeleccionados, "1t E / "+table[position][1], 0, ""];
	}
	PrintTable();	
  });
  
  // Agregar un event listener de clic al botón de 1er tiempo visita
  fTimeV.addEventListener('click', function() {
    sessionStorage.setItem('fTimeV', 'true');
	var position = sessionStorage.getItem('tablePosition');
	if(table[position][1] === "")
	{
		table[position] = [numerosSeleccionados, "1t V", 0, ""];	
	}else{
		table[position] = [numerosSeleccionados, "1t V / "+table[position][1], 0, ""];
	}
	PrintTable();	
  });
  
  // Agregar un event listener de clic al botón de 2do tiempo Local
  sTimeL.addEventListener('click', function() {
    sessionStorage.setItem('sTimeL', 'true');
	var position = sessionStorage.getItem('tablePosition');
	if(table[position][1] === "")
	{
		table[position] = [numerosSeleccionados, "2t L", 0, ""];	
	}else{
		table[position] = [numerosSeleccionados, table[position][1]+" / 2t L", 0, ""];
	}
	PrintTable();	
  });
  
  // Agregar un event listener de clic al botón de 2do tiempo Empate
  sTimeE.addEventListener('click', function() {
    sessionStorage.setItem('sTimeE', 'true');
	var position = sessionStorage.getItem('tablePosition');
	if(table[position][1] === "")
	{
		table[position] = [numerosSeleccionados, "2t E", 0, ""];	
	}else{
		table[position] = [numerosSeleccionados, table[position][1]+" / 2t E", 0, ""];
	}
	
	PrintTable();	
  });
  
  // Agregar un event listener de clic al botón de 2do tiempo visita
  sTimeV.addEventListener('click', function() {
    sessionStorage.setItem('sTimeV', 'true');
	var position = sessionStorage.getItem('tablePosition');
	if(table[position][1] === "")
	{
		table[position] = [numerosSeleccionados, "2t V", 0, ""];	
	}else{
		table[position] = [numerosSeleccionados, table[position][1]+" / 2t V", 0, ""];	
	}
	PrintTable();	
  });
    
  // Agregar un event listener de clic al botón de HC
  HCButton.addEventListener('click', function() {    
	var position = sessionStorage.getItem('tablePosition');
	table[position] = [numerosSeleccionados, "V: Comienza 5G+", 0, ""];	
	PrintTable();	
  });
  
  // Agregar un event listener de clic al botón de NA
  NAButton.addEventListener('click', function() {    
	var position = sessionStorage.getItem('tablePosition');
	table[position] = [numerosSeleccionados, "Ninguno o 1 anota", 0, ""];	
	PrintTable();	
  });
  
  // Agregar un event listener de clic al botón de A
  AButton.addEventListener('click', function() {    
	var position = sessionStorage.getItem('tablePosition');
	table[position] = [numerosSeleccionados, "Ambos anotan", 0, ""];	
	PrintTable();	
  });
  
  // Agregar un event listener de clic al botón de 0-1
  Pd1Button.addEventListener('click', function() {
	var position = sessionStorage.getItem('tablePosition');
	table[position] = [numerosSeleccionados, "Goles de 0-1", 0, ""];	
	PrintTable();	
  });
  
  // Agregar un event listener de clic al botón de 2-3
  Pd23Button.addEventListener('click', function() {
	var position = sessionStorage.getItem('tablePosition');
	table[position] = [numerosSeleccionados, "Goles de 2-3", 0, ""];	
	PrintTable();	
  });
  
  // Agregar un event listener de clic al botón de 4+
  Pd4mButton.addEventListener('click', function() {
	var position = sessionStorage.getItem('tablePosition');
	table[position] = [numerosSeleccionados, "Goles de 4+", 0, ""];	
	PrintTable();
  });
  
  // Agregar más eventos  
  moreEventsButton.addEventListener('click', function() {
	 if(table.length < 16){
		var position = sessionStorage.getItem('tablePosition');
		sessionStorage.setItem('tablePosition', Number(position) + 1);
		numerosSeleccionados = '';
		ClearSessionsButNotTable();
	 }
	 moreEventsButton.disabled = true;
  });
    
  // Agregar un event listener de clic al botón de Menos
  PdMinusButton.addEventListener('click', function() {
	sessionStorage.setItem('minus', 'true');
	var position = sessionStorage.getItem('tablePosition');
	table[position] = [numerosSeleccionados, "Goles - ", 0, ""];
	numerosSeleccionados = '';
	sessionStorage.removeItem("numerosSeleccionados");
	PrintTable();
  });
  
  // Agregar un event listener de clic al botón de Menos
  PdPlusButton.addEventListener('click', function() {
	sessionStorage.setItem('plus', 'true');
	var position = sessionStorage.getItem('tablePosition');
	table[position] = [numerosSeleccionados, "Goles + ", 0, ""];
	numerosSeleccionados = '';
	sessionStorage.removeItem("numerosSeleccionados");
	PrintTable();
  });   
  
  // Agregar un event listener de clic al botón de 0.5
  Pd05Button.addEventListener('click', function() {
	var position = sessionStorage.getItem('tablePosition');
	table[position] = [table[position][0], table[position][1]+".5", 0, ""];
	numerosSeleccionados = '';
	sessionStorage.removeItem("numerosSeleccionados");
	sessionStorage.setItem('minus', 'false');
	sessionStorage.setItem('plus', 'false');
	PrintTable();
  });
    
  // Agregar un event listener de clic al botón de multiplicador
  multiplyButton.addEventListener('click', function() {
	numerosSeleccionados = '';
	sessionStorage.removeItem("numerosSeleccionados");
    sessionStorage.setItem('multiplySelected', 'true');
  });  
  
  // Agregar un event listener de clic al botón de aceptar
  acceptButton.addEventListener('click', function() {
    // Verificar si el evento especial está seleccionado
    var specialEventSelected = sessionStorage.getItem('specialEventSelected');
	var exactResultSelected = sessionStorage.getItem('exactResultSelected');	
	var multiplySelected = sessionStorage.getItem('multiplySelected');
	var specialEventCode = sessionStorage.getItem('specialEventCode');	
	var exactResult = sessionStorage.getItem('exactResult');	
	numerosSeleccionados = sessionStorage.getItem('numerosSeleccionados');
	var position = sessionStorage.getItem('tablePosition');
	var minusSelected = sessionStorage.getItem('minus');
	var plusSelected = sessionStorage.getItem('plus');			 		
					
		if(multiplySelected === 'true') {
			var randomFac = generarNumeroAleatorio().toFixed(2);
			if(multiply.length === 0 || multiply[position] === null || multiply[position] === undefined) {
					multiply.push([numerosSeleccionados, (numerosSeleccionados * randomFac).toFixed(2)]);					
			}else{
					multiply[position] = [numerosSeleccionados, (numerosSeleccionados * randomFac).toFixed(2)]
			}
			table[position][2] = randomFac;
			sessionStorage.setItem('multiplySelected', 'false');
			//print detalle apuesta
			PrintMultiplyTable();
			PrintTable();
			PrintTotal();
			
			//Hide square
			selectionSquare.style.display = "none";
			multiplySpanSelected.innerHTML = "";
			
			if(table.length < 15)
			{
				moreEventsButton.disabled = false;
			}
		} else {		
			//Eventos - Resultado Exacto
			if (exactResultSelected === 'true') {
				if(exactResult === null)
				{
					 sessionStorage.setItem('exactResult', numerosSeleccionados);
				}
			    else 
			    {
					 table[position] = [table[position][0], "L:"+exactResult+" - V:" + numerosSeleccionados, 0, ""];
					
					 sessionStorage.setItem('specialEventSelected', 'false');
					 sessionStorage.setItem('exactResultSelected', 'false');
																		
					 PrintTable();
				}
			}
			//Minus
			else if(minusSelected === 'true'){
				table[position] = [table[position][0], table[position][1], 0, ""];					
				sessionStorage.setItem('minus', 'false');
				PrintTable();	
			}
			// Plus
			else if(plusSelected === 'true'){
				table[position] = [table[position][0], table[position][1], 0, ""];					
				sessionStorage.setItem('plus', 'false');
				PrintTable();				
			} else{
				PrintTable();
			}
		}
	  numerosSeleccionados = '';
	  sessionStorage.removeItem("numerosSeleccionados");
  });

  // Agregar un event listener de clic al botón de Limpiar
  clearAllButton.addEventListener('click', function() {
	location.href = "./teapuesto.html";
  });

function PrintTable() {
  // Obtener la tabla por su ID
  var tabla = document.getElementById('tableResult');
  var filas = tabla.getElementsByTagName('tr');

  if(table.length === 0)
  {
	for (var i = 0; i < 15; i++) {
    var celdas = filas[i + 1].getElementsByTagName('td'); // Se inicia desde 1 para omitir la fila de encabezado
		for (var j = 0; j < 4; j++) {
		  celdas[j + 1].textContent = ""; // Se inicia desde 1 para omitir la primera celda de número
		  celdas[j + 1].style="background-color:none";
		}
	}
  }else{
	  // Iterar sobre las filas y actualizar las celdas
	  for (var i = 0; i < table.length; i++) {
		var celdas = filas[i + 1].getElementsByTagName('td'); // Se inicia desde 1 para omitir la fila de encabezado
		for (var j = 0; j < table[i].length; j++) {
		  celdas[j + 1].textContent = table[i][j]; // Se inicia desde 1 para omitir la primera celda de número
		  celdas[j + 1].style="background-color:none";
		}
	  }
  }
}

function PrintMultiplyTable() {
  // Obtener la tabla por su ID
  var tabla = document.getElementById('multiplyTableResult');
  var filas = tabla.getElementsByTagName('tr');

  // Iterar sobre las filas y actualizar las celdas
  for (var i = 0; i < multiply.length; i++) {
	var celdas = filas[i + 1].getElementsByTagName('td'); // Se inicia desde 1 para omitir la fila de encabezado
	for (var j = 0; j < multiply[i].length; j++) {
	  celdas[j + 1].textContent = multiply[i][j]; // Se inicia desde 1 para omitir la primera celda de número
	}
  }	
}

function PrintTotal() {
	var tCombinadas = document.getElementById('tCombinadas');
	var tMultiplicador = document.getElementById('tMultiplicador');
	var tApuestas = document.getElementById('tApuestas');
	var tMontoTotal = document.getElementById('tMontoTotal');
	
	var sumMultiply = 0;
	
	// Iterar sobre las filas y actualizar las celdas
	for (var i = 0; i < multiply.length; i++) {
		sumMultiply += Number(Number(multiply[i][1]).toFixed(2));
	}	
	
	tCombinadas.innerText = 0;
	tMultiplicador.innerText = Number(sumMultiply.toFixed(2));
	var count = multiply.filter(item => !item.every(element => element === "")).length;
	tApuestas.innerText = count;
	tMontoTotal.innerText = Number(sumMultiply.toFixed(2));
	localStorage.setItem("teApuesto",
		JSON.stringify(Number(sumMultiply.toFixed(2)))
	);
}

function PrintBlocked() {
	// Obtener la tabla por su ID
    var tabla = document.getElementById('tableResult');
    var filas = tabla.getElementsByTagName('tr');
  
	for (var i = 0; i < table.length; i++) {
		var celdas = filas[i + 1].getElementsByTagName('td'); // Se inicia desde 1 para omitir la fila de encabezado
		for (var j = 0; j < table[i].length; j++) {
			if(table[i][j] === "BLOQUEO")
			{
				celdas[j + 1].style="background-color:red";
				celdas[j + 1].textContent = table[i][j]; // Se inicia desde 1 para omitir la primera celda de número				
			}
		}
	}
}

function ClearSessions() {
	  sessionStorage.removeItem('table');
	  sessionStorage.removeItem('tablePosition');
	  sessionStorage.removeItem('multiply');
	  sessionStorage.removeItem('multiplySelected');
	  sessionStorage.removeItem('specialEventSelected');
	  sessionStorage.removeItem('exactResultSelected');
	  sessionStorage.removeItem('specialEventCode');
	  sessionStorage.removeItem('exactResult');
	  sessionStorage.removeItem('numerosSeleccionados');
	  sessionStorage.removeItem('fTimeL');    
	  sessionStorage.removeItem('fTimeE');    
      sessionStorage.removeItem('fTimeV');    
	  sessionStorage.removeItem('sTimeL');    
	  sessionStorage.removeItem('sTimeE');    
      sessionStorage.removeItem('sTimeV');      
	  sessionStorage.removeItem('exactResult');
	  sessionStorage.removeItem('minus');
	  sessionStorage.removeItem('plus');
	  sessionStorage.removeItem('teApuesto');	  
	  sessionStorage.removeItem('jugadaTeApuesto');	  
}

function ClearSessionsButNotTable() {
	  sessionStorage.removeItem('specialEventSelected');
	  sessionStorage.removeItem('exactResultSelected');
	  sessionStorage.removeItem('specialEventCode');
	  sessionStorage.removeItem('exactResult');
	  sessionStorage.removeItem('numerosSeleccionados');
	  sessionStorage.removeItem('fTimeL');    
	  sessionStorage.removeItem('fTimeE');    
      sessionStorage.removeItem('fTimeV');    
	  sessionStorage.removeItem('sTimeL');    
	  sessionStorage.removeItem('sTimeE');    
      sessionStorage.removeItem('sTimeV');      
	  sessionStorage.removeItem('exactResult');
	  sessionStorage.removeItem('minus');
	  sessionStorage.removeItem('plus');
	  sessionStorage.removeItem('multiplySelected');
}

function generarNumeroAleatorio() {
  // Generar un número aleatorio en el rango [0, 1)
  var numeroAleatorio = Math.random();

  // Ajustar el número al rango [0.1, 2.0]
  var numeroEnRango = 0.1 + numeroAleatorio * (2.0 - 0.1);

  return numeroEnRango;
}

function agregarBloqueado(numerosSeleccionados){
	var position = sessionStorage.getItem('tablePosition');	
	table[position] = [numerosSeleccionados, "", 0, "BLOQUEO"];
	PrintBlocked();
	// PrintTable();
}

function disableButtons()
{	
	buttons.forEach(function(button) {
		button.disabled = true;		
	});
	
  deleteButton.disabled = true;
  acceptButton.disabled = true;
  specialEventButton.disabled = true;  
  exactResultButton.disabled = true;  
  multiplyButton.disabled = true;
  fTimeL.disabled = true;
  fTimeE.disabled = true;
  fTimeV.disabled = true;
  sTimeL.disabled = true;
  sTimeE.disabled = true;
  sTimeV.disabled = true;  
  HCButton.disabled = true;
  FButton.disabled = true;
  NAButton.disabled = true;
  AButton.disabled = true;
  Pd1Button.disabled = true;
  Pd23Button.disabled = true;
  Pd4mButton.disabled = true;    
  PdPlusButton.disabled = true;
  PdMinusButton.disabled = true;
  Pd05Button.disabled = true;
  combineButton.disabled = true;
}

function enableButtons()
{	
	buttons.forEach(function(button) {
		button.disabled = false;		
	});
	
  deleteButton.disabled = false;
  acceptButton.disabled = false;
  specialEventButton.disabled = false;  
  exactResultButton.disabled = false;  
  multiplyButton.disabled = false;
  fTimeL.disabled = false;
  fTimeE.disabled = false;
  fTimeV.disabled = false;
  sTimeL.disabled = false;
  sTimeE.disabled = false;
  sTimeV.disabled = false;  
  HCButton.disabled = false;
  FButton.disabled = false;
  NAButton.disabled = false;
  AButton.disabled = false;
  Pd1Button.disabled = false;
  Pd23Button.disabled = false;
  Pd4mButton.disabled = false;    
  PdPlusButton.disabled = false;
  PdMinusButton.disabled = false;
  Pd05Button.disabled = false;
  combineButton.disabled = false;
}

document.getElementById("finishBtn").onclick = function () {		
		localStorage.setItem("jugadaTeApuesto", table.map(innerArray => innerArray.join(',')).join('|'));
        location.href = "./dashboard.html";
 };