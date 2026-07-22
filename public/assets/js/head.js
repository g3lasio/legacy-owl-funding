/* Añade la clase .js al <html> antes del primer paint. Sin este script (JS
   deshabilitado o bloqueado) el contenido queda 100% visible: las animaciones
   de entrada (.reveal) solo se activan bajo `.js`. */
document.documentElement.classList.add("js");
