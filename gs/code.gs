function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

function sendContactForm(data) {
  var email = "info@fiptrac.com";
  var subject = "Nuevo mensaje de contacto desde FIPTRAC";
  var body = "Nombre: " + data.nombre + "\n"
           + "Correo: " + data.correo + "\n"
           + "Mensaje:\n" + data.mensaje;

  MailApp.sendEmail(email, subject, body);
  return "Mensaje enviado exitosamente";
}

function registrarEvento(datos) {
  var sheet = SpreadsheetApp.getActive().getSheetByName('Eventos');
  sheet.appendRow([new Date(), datos.nombre, datos.correo, datos.telefono, datos.evento]);
  return "Registro completado";
}

function registrarCurso(datos) {
  var sheet = SpreadsheetApp.getActive().getSheetByName('Cursos');
  sheet.appendRow([new Date(), datos.nombre, datos.correo, datos.telefono, datos.curso]);
  return "Registro completado";
}

function registrarCertificacion(datos) {
  var sheet = SpreadsheetApp.getActive().getSheetByName('Certificaciones');
  sheet.appendRow([new Date(), datos.nombre, datos.correo, datos.telefono, datos.certificacion]);
  return "Registro completado";
}
