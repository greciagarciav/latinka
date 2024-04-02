function post(JSONparameters){
	fetch('https://yblr6lzvwf.execute-api.us-east-1.amazonaws.com/novasys-dev/grabarTicket', {
	  method: 'POST',
	  mode: 'no-cors', // Solo para pruebas, ya que esto limita la visibilidad del error
	  headers: {
	   'Content-Type': 'application/json',
	   'Access-Control-Allow-Origin': 'https://mytinkademo.s3.amazonaws.com',
	  },
	  body: JSONparameters
	})
	.then(response => console.log(response.json()))
	.then(data => console.log(data))
	.catch(error => console.error('Error:', error));		
}