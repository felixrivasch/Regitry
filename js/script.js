//JSON estudiantes.
var estudiantes = [ ];


window.onload = eventsListener;

//Añadimos los eventos a los botones
function eventsListener () {
	document.getElementById("boton-registro").addEventListener("click", validarCampos, false);
	document.getElementById("mostrar-estudiantes").addEventListener("click", mostrarEstudiantes, false);
	document.getElementById("mostrar-promedio").addEventListener("click", mostrarPromedio);
	document.getElementById("mostrar-mayor").addEventListener("click", mostrarMayorNota);
	document.getElementById("mostrar-menor").addEventListener("click", mostrarMenorNota);
	document.getElementById("buscar-estudiantes").addEventListener("click", buscarEstudiante);
	document.getElementById("codigo-busqueda").addEventListener("keypress",buscarPressEnter);
}


function registrarEstudiantes () {
	var nuevoCodigo = document.getElementById("codigo");
	var mensajeRegistro = document.getElementById("mensaje-registro");
	var mensaje ="";

	if (validarExisteCodigo() == false) {
		var nuevoNombre = document.getElementById("nombre").value;
		var nuevoNota = parseInt(document.getElementById("nota").value);
		var nuevoEstudiante = {"codigo":nuevoCodigo.value, "nombre":nuevoNombre, "nota":nuevoNota};	
		estudiantes.push(nuevoEstudiante);
		mensaje = "(*) El estudiante fue registrado de manera satisfactoria."
		mensajeRegistro.innerHTML = mensaje;

		document.getElementById("form-registro").reset();
	} else {
		mensaje = "(*) El estudiante con código <b>' "+nuevoCodigo.value+" '</b> ya se encuentra registrado.";
		mensajeRegistro.innerHTML = mensaje;
		nuevoCodigo.focus();
		enfocarCampos(nuevoCodigo);
	}
}

function validarExisteCodigo () {
	var existe = false;
	if (estudiantes.length == 0) {
		return existe;
	} else {
		for (var i = 0; i < estudiantes.length; i++) {
			if ((document.getElementById("codigo").value).toString() == estudiantes[i].codigo) {
				existe = true;
				return existe;
			} else {
				existe = false;
			}
		}
		return existe;
	}
}

function buscarPressEnter (event) {
	if (event.characterCod == 13 || event.keyCode == 13) {
		buscarEstudiante();
	}
}

function buscarEstudiante() {
	var codigoBuscar = document.getElementById("codigo-busqueda");
	if ((codigoBuscar.value).toString() =="") {
		alert("Por favor, ingrese un código en el campo de búsqueda.");
		codigoBuscar.focus();
		enfocarCampos(codigoBuscar);
	} else {
		var resultadoBusqueda = document.getElementById("resultado-busqueda");
		resultadoBusqueda.innerHTML = estudianteEncontrado();
		desenfocarCampo(codigoBuscar);
	}
}

function estudianteEncontrado() {
	var codigoBuscado = document.getElementById("codigo-busqueda");
	var dataEstudiantes = "";
	if (estudiantes.length == 0) {
		dataEstudiantes = "<tr><td colspan = '3' align='center'>(*) No se encontraron estudiantes registrados</td></tr>"
		return dataEstudiantes;

	} else {
		
		for (var i = 0; i < estudiantes.length; i++) {
			if ((codigoBuscado.value).toString() == estudiantes[i].codigo) {
				dataEstudiantes = "<tr name='filas'><td>"+estudiantes[i].codigo+"</td><td>"+estudiantes[i].nombre+"</td><td>"+estudiantes[i].nota+"</td></tr>";
				return dataEstudiantes;
			} 
		}
		dataEstudiantes = "<tr><td colspan = '3' align='center'>(*) No se encontró ningún estudiante con el código ingresado</td></tr>"
		return dataEstudiantes;
	}
}

//Función que permite validar si exiten estudiantes
function validarLista () {
	numRegistros = estudiantes.length;
	if(numRegistros == 0){
		alert("No se encontraron estudiantes registrados.");
		return false;
	} else {
		return true;
	}
}

//Función que permite mostrar estudiantes.
function mostrarEstudiantes () {
	var tablaEstudiantes = document.getElementById("lista-estudiantes");
	var dataEstudiantes = "";

	if (estudiantes.length == 0) {
		dataEstudiantes = "<tr><td colspan = '3' align='center'>(*) No se encontraron estudiantes registrados</td></tr>"
		tablaEstudiantes.innerHTML = dataEstudiantes;

	} else {
		for (var i = 0; i < estudiantes.length; i++) {
		dataEstudiantes += "<tr><td>"+estudiantes[i].codigo+"</td><td>"+estudiantes[i].nombre+"</td><td>"+estudiantes[i].nota+"</td></tr>";
		}
		tablaEstudiantes.innerHTML = dataEstudiantes;
	}
}

//Función que permite calcular la nota promedio de los estudiantes.
function mostrarPromedio () {
	if (validarLista()) {
		var suma = 0;
		for (var i = 0; i < estudiantes.length; i++) {
		var suma = suma+estudiantes[i].nota;
		var prom = suma/estudiantes.length;
		}
		alert("El promedio de las notas es: " +prom);
	}
	
}

//Función que permite calcular y mostrar al estudiante con mayor nota.
function mostrarMayorNota () {
	if (validarLista()) {
		var mayorNota = 0;
		var codigoMayorNota ="";
		var nombreMayorNota ="";

		for (var i = 0; i < estudiantes.length; i++) {
			if (estudiantes[i].nota > mayorNota) {
				mayorNota = estudiantes[i].nota;
				codigoMayorNota = estudiantes[i].codigo;
				nombreMayorNota = estudiantes[i].nombre;
			}
		}
	alert("Estudiante con mayor nota --> Código: "+codigoMayorNota+", Nombre: "+nombreMayorNota+", Nota: "+mayorNota);
	}
}

//Función que permite calcular y mostrar al estudiante con menor nota.
function mostrarMenorNota () {
	if (validarLista()) {
		var menorNota = 1000;
		var codigoMenorNota ="";
		var nombreMenorNota ="";
		for (var i = 0; i < estudiantes.length; i++) {

			if (estudiantes[i].nota < menorNota) {
				menorNota = estudiantes[i].nota;
				codigoMenorNota = estudiantes[i].codigo;
				nombreMenorNota = estudiantes[i].nombre;
			}
		}
		alert("Estudiante con menor nota --> Código: "+codigoMenorNota+", Nombre: "+nombreMenorNota+", Nota: "+menorNota);
	}
}

//Función que valida los campos para luego poder registrar los estudiantes.
function validarCampos () {
	var codigoIngresado = document.getElementById("codigo");
	var nombreIngresado = document.getElementById("nombre");
	var notaIngresada = document.getElementById("nota");

	var mensajeRegistro = document.getElementById("mensaje-registro");
	var mensaje ="";

	if (codigoIngresado.value == "" || codigoIngresado.value == null) {
		mensaje = "(<sup>1</sup> Codigo) Por favor, ingrese el código del estudiante.";
		mensajeRegistro.innerHTML = mensaje;
		codigoIngresado.focus();
		enfocarCampos(codigoIngresado);

	} else {
		desenfocarCampo(codigoIngresado);
		if (nombreIngresado.value == "" || nombreIngresado.value == null) {
			mensaje = "(<sup>2</sup> Nombre) Por favor, ingrese el nombre del estudiante.";
			mensajeRegistro.innerHTML = mensaje;
			nombreIngresado.focus();
			enfocarCampos(nombreIngresado);
		} else {
			desenfocarCampo(nombreIngresado);
			if (notaIngresada.value == "" || notaIngresada.value == null) {
				mensaje = "(<sup>3</sup> Nota) Por favor, ingrese un valor numérico entre 0 y 20 en nota del estudiante.";
				mensajeRegistro.innerHTML = mensaje;
				notaIngresada.focus();
				enfocarCampos(notaIngresada);
			} else {
				validarNota();
			}
		}
	}
}

function validarNota () {
	var notaIngresada = document.getElementById("nota");
	var valorNota = parseInt(document.getElementById("nota").value);

	var mensajeRegistro = document.getElementById("mensaje-registro");
	var mensaje ="";

	if (isNaN(valorNota)==false) {
		if (valorNota>=0 && valorNota<=20) {
			registrarEstudiantes();
			desenfocarCampo(notaIngresada);
		} else {
			mensaje ="(<sup>3</sup> Nota) Por favor, ingrese una nota entre 0 y 20.";
			mensajeRegistro.innerHTML = mensaje;
			notaIngresada.focus();
			enfocarCampos(notaIngresada);
		}
	} else {
		mensaje = "(<sup>3</sup> Nota) El campo nota solo admite números.";
		mensajeRegistro.innerHTML = mensaje;
		notaIngresada.focus();
		enfocarCampos(notaIngresada);
	}
}


function enfocarCampos (element) {
	element.style.borderColor = 'red';
}

function desenfocarCampo (element) {
	element.style.borderColor = 'black';
}