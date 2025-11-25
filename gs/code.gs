/* Code.gs
- Punto de entrada para Web App de Google Apps Script
- Usa HtmlService con templates para incluir header/footer
*/


function doGet(e) {
// Determina cuál página servir según query param "page"
var page = (e && e.parameter && e.parameter.page) || 'index';
return renderPage(page);
}


function renderPage(page) {
// Valida páginas permitidas
var allowed = ['index','cursos','clientes','politicas','testimonios'];
if (allowed.indexOf(page) === -1) page = 'index';


var template = HtmlService.createTemplateFromFile(page);
// Puedes pasar datos al template aquí, por ejemplo: cursos, clientes, testimonios
template.data = {
siteName: 'FIPTRAC',
baseUrl: ScriptApp.getService().getUrl ? ScriptApp.getService().getUrl() : '',
};
var html = template.evaluate().setTitle('FIPTRAC - ' + (page==='index'?'Inicio':page));
html.addMetaTag('viewport','width=device-width, initial-scale=1');
return html;
}


// Helper para incluir archivos HTML (header/footer)
function include(filename) {
return HtmlService.createHtmlOutputFromFile(filename).getContent();
}


// EJEMPLO: función para obtener cursos (simulada)
function getCursos() {
// En un proyecto real, esto podría leer de una hoja de cálculo o base de datos
return [
{ id: 'c1', title: 'Protección contra incendios - Básico', duration: '8 h', price: '$1,200 MXN' },
{ id: 'c2', title: 'Manejo de extintores y brigadas', duration: '4 h', price: '$800 MXN' },
];
}


// EJEMPLO: función para enviar mensaje de contacto (desde formulario cliente)
function enviarContacto(payload) {
// payload: {name, email, message}
// Aquí podrías escribir a una hoja de cálculo, mandar un correo, etc.
Logger.log('Contacto recibido: ' + JSON.stringify(payload));
return { ok: true, message: 'Mensaje recibido, gracias.' };
}
