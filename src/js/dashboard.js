	const email = "miguel.vega@novasysperu.com";
	
	document.addEventListener('DOMContentLoaded', function () {		
		// Llamar a la función al cargar la página
		formatearFechaHora("actualDate");
		
		//cargo carrito de compras
		loadShoppingCart();
		
        var miModal = new bootstrap.Modal(document.getElementById('juegosModal'));
        miModal.show();

		setTimeout(function () {
            miModal.hide();
        }, 800);
    }); 	

	 // Obtiene boton
	 var loginButton = document.getElementById('login');
	 var checkoutButton = document.getElementById('checkout');
	 var userSessionButton = document.getElementById('userSession');
	 var closeUserSessionButton = document.getElementById('closeUserSessionModal');
	 var saveUserSessionButton = document.getElementById('saveUserSessionModal');	 
	 
	 var tinkaNumbersTicket = document.getElementById('tinkaNumbersTicket');
	 var voucherDate = document.getElementById('voucherDate');
	 var voucherDate2 = document.getElementById('voucherDate2');
	 
	 // Mensaje modal
	 var errorMessageModal = document.getElementById('errorMessageModal');
	 
	 // Obtiene Modal
	 var userSession_modal = new bootstrap.Modal(document.getElementById('usuarioModal'));
	 
	// Asigno redirecto a login
	loginButton.addEventListener('click', function () {
        location.href = "./login.html";
    });
	
	userSessionButton.addEventListener('click', function () {        
        // Mostrar el modal
        userSession_modal.show();
		document.getElementById("name").focus;
    });	

	checkoutButton.addEventListener('click', function () {
		if(localStorage.getItem("userSession") === null)
		{
			userSession_modal.show();
			return;
		}
		
        var checkout_modal = new bootstrap.Modal(document.getElementById('checkoutModal'));

        // Mostrar el modal
        checkout_modal.show();

		setTimeout(function () {
            checkout_modal.hide();
        }, 1000);

        // Lógica adicional después de mostrar el modal y esperar 3 segundos
        setTimeout(function () {

		// Muestro voucher
		const voucher = document.getElementById('voucher');
		voucher.classList.remove("hidden");
        
		// Reemplazar numeros tinka (demo, borrar luego)
		if(localStorage.getItem("jugadaTinka") === null)
		{
			tinkaNumbersTicket.innerText = "06 14 33 12 15 01"
		}
		else{
			tinkaNumbersTicket.innerText = localStorage.getItem("jugadaTinka").replaceAll(',',' ');
		}		
		
		voucherDate.innerText = formatearFechaHora("voucherDate");
		voucherDate2.innerText = formatearFechaHora("voucherDate2");
		
		// Envia email
		sendEmail(voucher);
		
		// Exporta PDF
		var opt = {
		  margin:       0,
		  filename:     'carrito.pdf',
		  html2canvas:  { scale: 1 },
		  jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
		};
		
		// Elige el elemento para guardar
		html2pdf().from(voucher).set(opt).save();
		
		setTimeout(() => {
			voucher.classList.add("hidden");
		}, "500");

        }, 1000);
		
		// Guarda números en BD
		var request = localStorage.getItem('userSession');
		post(request);			
    });	
	
	function sendEmail(voucher) {
		(function(){
			emailjs.init("VOZ9O3T1mOWffGcW0");
		})();
		
		var params = {
          sendername: "tinka",
          to: email,
          subject: "test",
          replyto: "",
		  message: "",
          my_html: String(voucher.innerHTML),
        };

        var serviceID = "service_z9wl4sr"; // Email Service ID
        var templateID = "template_0rlwavf"; // Email Template ID

        emailjs.send(serviceID, templateID, params)
        .then( res => {
            console.log("success");
        })
        .catch(error => {
			console.log("error", error);
		});
      }	
	
	function loadShoppingCart() 
	{		
		addItemToTable('tinka', 'shopping-cart', 'Tinka');
		addItemToTable('kabala', 'shopping-cart', 'Kabala');
		addItemToTable('ganagol', 'shopping-cart', 'Ganagol');
		addItemToTable('teApuesto', 'shopping-cart', 'TeApuesto');
		
		calculateShoppingCartsummary('tinka', 'kabala', 'ganagol', 'teApuesto');
	};
	
	function addItemToTable(localStorageKey, tableId, headerLabel) {
	  // Obtener el valor del elemento desde localStorage.
	  var itemValue = localStorage.getItem(localStorageKey);

	  // Verificar si el valor existe en localStorage.
	  if (itemValue !== undefined && itemValue !== null) {
		// Obtener la referencia a la tabla.
		var table = document.getElementById(tableId);

		// Crear una nueva fila para la tabla.
		var row = document.createElement('tr');

		// Crear y agregar el encabezado de la tabla.
		var header = document.createElement('th');
		header.classList.add('py-1', 'tc-green');
		header.textContent = headerLabel;
		row.appendChild(header);

		// Crear y agregar los datos de la tabla.
		var data = document.createElement('td');
		data.classList.add('py-1', 'tc-green', 'text-end', 'text-muted');
		data.textContent = "S/ " + itemValue;
		row.appendChild(data);

		// Agregar la fila al cuerpo de la tabla.
		table.tBodies[0].appendChild(row);
	  }
	}
	
	//Calculo total general
	function calculateShoppingCartsummary(game1, game2, game3, game4)
	{		
		var summary = document.getElementById('shopping-cart-summary');
		var summary_footer = document.getElementById('shopping-cart-summary-footer');
		var summary_modal = document.getElementById('shopping-cart-summary-modal');
		
		var game1Value = parseFloat(localStorage.getItem(game1)) || 0;
		var game2Value = parseFloat(localStorage.getItem(game2)) || 0;
		var game3Value = parseFloat(localStorage.getItem(game3)) || 0;
		var game4Value = parseFloat(localStorage.getItem(game4)) || 0;

		var total = game1Value + game2Value + game3Value + game4Value;

		summary.textContent = "S/ " + total;
		summary_footer.textContent = "S/ " + total;
		summary_modal.textContent = "S/ " + total;
	};
		
	closeUserSessionButton.addEventListener('click', function () {
		// Ocultar el modal
		 userSession_modal.hide();
    });	
	
	saveUserSessionButton.addEventListener('click', function () {
		if (validateForm()) {
			var name = document.getElementById('name').value;
			var lastName = document.getElementById('lastName').value;
			var phone = document.getElementById('phone').value;
			var dni = document.getElementById('dni').value;
			var email = document.getElementById('email').value;
			
			var tinkaSelection = localStorage.getItem("jugadaTinka")?.split(',');
			var teApuestoSelection = localStorage.getItem("jugadaTeApuesto");
			
			// Genera JSON
			  var formData = {
				first_name: name,
				last_name: lastName,
				phone_number: "+"+phone,
				dni: dni,
				email: email,
				n1: tinkaSelection !== undefined ? tinkaSelection[0].toString() : "06",
				n2: tinkaSelection !== undefined ? tinkaSelection[1].toString() : "15",
				n3: tinkaSelection !== undefined ? tinkaSelection[2].toString() : "22",
				n4: tinkaSelection !== undefined ? tinkaSelection[3].toString() : "01",
				n5: tinkaSelection !== undefined ? tinkaSelection[4].toString() : "12",
				n6: tinkaSelection !== undefined ? tinkaSelection[5].toString() : "14",
				teapuesto: teApuestoSelection !== undefined ? teApuestoSelection : "",
			  };

			// Convierte JSON en string
			var userJSON = JSON.stringify(formData);
			
			// Guarda JSON en local storage
			localStorage.setItem('userSession', userJSON);
			  
			// Ocultar el modal
			userSession_modal.hide();
		}
    });		

	function validateForm() {
	  // Obtén los valores de los campos
	  var name = document.getElementById("name").value;
	  var lastName = document.getElementById("lastName").value;
	  var phone = document.getElementById("phone").value;
	  var dni = document.getElementById("dni").value;
	  var email = document.getElementById("email").value;

	  // Realiza la validación de cada campo
	  if (name.trim() === "") {
		errorMessageModal.innerText = "Por favor, ingrese el nombre.";
		return false;
	  }

	  if (lastName.trim() === "") {
		errorMessageModal.innerText = "Por favor, ingrese el apellido.";
		return false;
	  }

	  if (phone.trim() === "" || isNaN(phone)) {
		errorMessageModal.innerText = "Por favor, ingrese un número de teléfono válido.";
		return false;
	  }

	  if (dni.trim() === "" || isNaN(dni)) {
		errorMessageModal.innerText = "Por favor, ingrese un número de DNI válido.";
		return false;
	  }

	  if (email.trim() === "" || !isValidEmail(email)) {
		errorMessageModal.innerText = "Por favor, ingrese un correo electrónico válido.";
		return false;
	  }

	  // Si todos los campos son válidos, devuelve true
	  return true;
	}

	function isValidEmail(email) {
	  // Expresión regular simple para validar el formato del correo electrónico
	  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	  return emailRegex.test(email);
	}	