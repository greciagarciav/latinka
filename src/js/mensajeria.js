// Llamar a la función al cargar la página
formatearFechaHora("actualDate");

// Obtén el boton de message
var messageButton = document.getElementById('messageButton');

messageButton.addEventListener('click', function () {
        //IMPRIME
		const element = document.getElementById('messageBody');
		// Especifica propiedades
		var opt = {
			  filename:     'mensajeria.pdf',
			};
		html2pdf().from(element).set(opt).save();
    });

document.addEventListener('DOMContentLoaded', function () {
	var buttons = document.querySelectorAll('.btn-mensajeria');

	buttons.forEach(function (button) {
		button.addEventListener('click', function () {
			// Quita la clase 'active' de todos los botones
			buttons.forEach(function (btn) {
				btn.classList.remove('active');
			});

			// Agrega la clase 'active' al botón clicado
			button.classList.add('active');
		});
	});
});