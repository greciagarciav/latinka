document.addEventListener('DOMContentLoaded', function () {
	
	// Llamar a la función al cargar la página
	formatearFechaHora("actualDate");

	//Limpio local storage
	localStorage.removeItem("tinka");
	localStorage.removeItem("kabala");
	localStorage.removeItem("ganagol");
	localStorage.removeItem("userSession");
	localStorage.removeItem("jugadaTinka"); // Agregado por demo, borrar luego
	localStorage.removeItem("teApuesto");
	
    // Obtén los elementos de entrada de usuario y contraseña
    var userInput = document.getElementById('user');
    var passwordInput = document.getElementById('password');

    // Obtén los botones "CLR" para usuario y contraseña
    var clrUserButton = document.getElementById('clr_user');
    var clrPasswordButton = document.getElementById('clr_password');

    // Obtén todos los casilleros de verificación
    var checkboxes = document.querySelectorAll('input[type="checkbox"][name="login"]');

    // Almacena el elemento activo antes de manejar el evento de clic del casillero de verificación
    var activeElement;

    // Función para almacenar el elemento activo
    function storeActiveElement() {
        activeElement = document.activeElement;
    }

    // Llama a storeActiveElement si ningún elemento está enfocado en el momento de la carga   
	userInput.focus(); // Establece el foco en el campo de usuario por defecto
	storeActiveElement();
	userInput.blur();

    // Agrega un escuchador de eventos focus a los campos de entrada
    userInput.addEventListener('focus', storeActiveElement);
    passwordInput.addEventListener('focus', storeActiveElement);

    // Agrega un escuchador de eventos de clic a cada casillero de verificación
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('click', function () {
            // Actualiza el valor del elemento activo basado en el valor del casillero de verificación
            if (activeElement === userInput || activeElement === passwordInput) {
                if (checkbox.value === 'delete') {
                    activeElement.value = activeElement.value.slice(0, -1); // Elimina el último carácter
                } else if (checkbox.value === 'clr') {
                    activeElement.value = ''; // Borra la entrada del activo
                } else {
                    activeElement.value += checkbox.value; // Agrega el valor del casillero de verificación al elemento activo
                }

                // Restaura el enfoque al elemento activo con un retraso de 0 milisegundos
                setTimeout(function () {
                    activeElement.focus();
                }, 0);
            }
        });
    });

    // Agrega un escuchador de eventos de clic al botón "CLR" para usuario
    clrUserButton.addEventListener('click', function () {
        userInput.value = '';
        userInput.focus();
    });

    // Agrega un escuchador de eventos de clic al botón "CLR" para contraseña
    clrPasswordButton.addEventListener('click', function () {
        passwordInput.value = '';
        passwordInput.focus();
    });

    function mostrarModalCondicional() {
        // Ejemplo de condición (puedes cambiar esto según tus necesidades)
        var condicion = true;

        if (condicion) {
            $('#miModal').modal('show');
        }
    }

    // Agrega un escuchador de eventos de envío al formulario
    var form = document.querySelector('.login-form');     
    form.addEventListener('submit', function (event) {          
        // Verifica si los campos de usuario o contraseña están vacíos        
        if (userInput.value.trim() === '' || passwordInput.value.trim() === '') {           
            alert('Por favor, ingrese el usuario y la contraseña.');
            event.preventDefault();
        } else {
            var miModal = new bootstrap.Modal(document.getElementById('loginModal'));                      
            document.getElementById('enviar').addEventListener('click', miModal.show());

            setTimeout(function(){
                document.getElementById('spinner-login').classList.add("hidden");
                document.getElementById('success-login').classList.remove("hidden");
            }, 1000);            
 
			event.preventDefault();
        }
    });

    var succes_login = document.getElementById("success-login");
    succes_login.addEventListener('click', function(event) {
        location.href = "./dashboard.html";              
        event.preventDefault();
    })
    
});
