/**
 * ============================================================
 *  FIPTRAC - Backend en Google Apps Script (code.gs)
 *  Funciones:
 *    - doPost(): recibir formularios
 *    - enviarCorreo(): enviar correos con plantilla HTML
 *    - generarPlantillaCorreo(): plantilla profesional
 * ============================================================
 */


/**
 * ------------------------------------------------------------
 *  doGet — Puede servir para pruebas o para ver si el servicio está activo
 * ------------------------------------------------------------
 */
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "OK", message: "FIPTRAC WebApp activo" })
  ).setMimeType(ContentService.MimeType.JSON);
}


/**
 * ------------------------------------------------------------
 *  doPost — recibe formularios desde tu contacto.html
 *  Espera JSON del frontend como:
 *  {
 *    "nombre": "Juan Pérez",
 *    "email": "juan@mail.com",
 *    "telefono": "+525533445566",
 *    "mensaje": "Quiero información"
 *  }
 * ------------------------------------------------------------
 */
function doPost(e) {
  try {
    // Validación inicial
    if (!e.postData || !e.postData.contents) {
      return responderError("No se recibieron datos en la petición.");
    }

    const data = JSON.parse(e.postData.contents);

    // Validaciones del lado servidor (doble seguridad)
    if (!validarEmail(data.email)) return responderError("Correo inválido.");
    if (!validarTelefono(data.telefono)) return responderError("Teléfono inválido.");
    if (!data.nombre || !data.mensaje) return responderError("Faltan campos obligatorios.");

    // Enviar correo
    enviarCorreo(data);

    return responderOK("Formulario enviado correctamente.");
  } catch (err) {
    return responderError("Error interno: " + err);
  }
}


/**
 * ------------------------------------------------------------
 *  enviarCorreo — usa GmailApp para enviar correo con plantilla HTML
 * ------------------------------------------------------------
 */
function enviarCorreo(data) {
  const destinatario = "fiptrac.platform@gmail.com";

  const asunto = "Nuevo contacto desde el sitio web — " + data.nombre;

  const htmlBody = generarPlantillaCorreo(data);

  GmailApp.sendEmail(destinatario, asunto, "Tu cliente envió un mensaje.", {
    htmlBody: htmlBody,
    name: "FIPTRAC Web Platform"
  });
}


/**
 * ------------------------------------------------------------
 *  generarPlantillaCorreo — HTML elegante para el correo
 * ------------------------------------------------------------
 */
function generarPlantillaCorreo(data) {
  return `
  <div style="font-family: Arial, sans-serif; border:1px solid #ddd; padding:20px; border-radius:12px;">
      <h2 style="color:#0055ff;">Nuevo mensaje desde el sitio FIPTRAC</h2>
      <p><strong>Nombre:</strong> ${data.nombre}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Teléfono:</strong> ${data.telefono}</p>
      <hr>
      <p><strong>Mensaje:</strong><br>${data.mensaje}</p>

      <br>
      <p style="font-size:12px; color:#666;">
      Enviado automáticamente desde el formulario web de FIPTRAC.
      </p>
  </div>`;
}


/**
 * ------------------------------------------------------------
 *  Validaciones del lado servidor
 * ------------------------------------------------------------
 */

function validarEmail(email) {
  const regex = /^[\\w.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$/;
  return regex.test(email);
}

function validarTelefono(tel) {
  const regex = /^\\+?[0-9]{8,15}$/; // acepta formato internacional
  return regex.test(tel);
}


/**
 * ------------------------------------------------------------
 *  Respuestas estandarizadas JSON
 * ------------------------------------------------------------
 */
function responderOK(msg) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "success", message: msg })
  ).setMimeType(ContentService.MimeType.JSON);
}

function responderError(msg) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "error", message: msg })
  ).setMimeType(ContentService.MimeType.JSON);
}
