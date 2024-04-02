
    // Función para obtener el nombre del día en español
    function obtenerNombreDia(dia) {
      const diasSemana = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
      return diasSemana[dia];
    }

    // Función para obtener el nombre del mes en español
    function obtenerNombreMes(mes) {
      const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
      return meses[mes];
    }

    // Función para formatear la fecha y hora
    function formatearFechaHora(elementId) {
      const ahora = new Date();
      const dia = obtenerNombreDia(ahora.getDay());
      const numeroDia = ahora.getDate();
      const mes = obtenerNombreMes(ahora.getMonth());
      const año = ahora.getFullYear();
      const hora = ahora.getHours();
      const minutos = ahora.getMinutes();
      const segundos = ahora.getSeconds();

      const formatoFechaHora = `${dia}, ${numeroDia} de ${mes} de ${año} ${hora}:${minutos}:${segundos}`;

      // Mostrar en el elemento con el id "fechaHora"
      document.getElementById(elementId).innerText = formatoFechaHora;
    }