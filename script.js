// CONFIGURACIÓN DE YOUTUBE
const CHANNEL_ID = 'UCy6FI4a-rOgTRaxJ9uWuhA'; //
const API_KEY = 'AIzaSyCxKYhvFhOadGCE5PnNWXIaU4NHGBbqvnw'; 
const UPLOADS_PLAYLIST_ID = 'UUcY6FI4a-rOgTRaxJ9uWuhA'; 

async function cargarUltimoSermon() {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=${UPLOADS_PLAYLIST_ID}&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        console.log("Datos recibidos de YouTube:", data); // Esto nos dirá si hay items

        if (data.items && data.items.length > 0) {
            const videoId = data.items[0].snippet.resourceId.videoId;
            console.log("ID del video encontrado:", videoId);

            const container = document.getElementById('video-dinamico');
            
            if (container) {
                container.innerHTML = `
                    <iframe 
                        width="100%" 
                        height="450" 
                        src="https://www.youtube.com/embed/${videoId}" 
                        frameborder="0" 
                        allowfullscreen>
                    </iframe>`;
            } else {
                console.error("No se encontró el elemento 'video-container' en el HTML");
            }
        }
    } catch (error) {
        console.error("Error en el script:", error);
    }
}

// 2. FUNCIÓN PARA DOCUMENTOS (Solo para documentos.html)
async function cargarDocumentos() {
    const listContainer = document.getElementById('pdf-list');
    if (!listContainer) return; // Si no existe el div, no hace nada

    try {
        const respuesta = await fetch('data.json'); //
        const pdfs = await respuesta.json();
        
        listContainer.innerHTML = pdfs.map(pdf => `
            <a href="${pdf.url}" class="document-card" download>
                <div>
                    <span class="date">${pdf.fecha}</span>
                    <h3>${pdf.titulo}</h3>
                </div>
                <div class="download-link">
                    Descargar PDF <i class="fas fa-file-download" style="margin-left:5px;"></i>
                </div>
            </a>
        `).join('');
    } catch (error) {
        console.error("Error Documentos:", error);
    }
}

// 3. EJECUCIÓN SEGURA AL CARGAR LA PÁGINA

document.addEventListener('DOMContentLoaded', () => {
    cargarUltimoSermon();
    cargarDocumentos();
});