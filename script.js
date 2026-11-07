
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. CARGA DEL FEED DE NOTICIAS (news.json)
    // ==========================================
    async function loadNews() {
        const container = document.getElementById('news-container');
        try {
            // Se usa cache-buster para asegurar la versión más reciente
            const res = await fetch(`news.json?t=${new Date().getTime()}`);
            if (!res.ok) throw new Error("No se encontró news.json");
            
            const newsData = await res.json();
            
            newsData.forEach(item => {
                const card = document.createElement('div');
                card.className = 'news-card';
                card.innerHTML = `
                    <span class="news-date">${item.date}</span>
                    <h3 class="news-title">${item.title}</h3>
                    <p class="news-desc">${item.description}</p>
                `;
                container.appendChild(card);
            });
        } catch (error) {
            console.error("Error cargando noticias:", error);
            container.innerHTML = '<p style="color:#aaa;">No hay noticias recientes.</p>';
        }
    }
    loadNews();

    // ==========================================
    // 2. LÓGICA DEL SLIDER AUTOMÁTICO (10 Segundos)
    // ==========================================
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Quitar la clase active del actual
        slides[currentSlide].classList.remove('active');
        
        // Calcular el nuevo índice (cíclico)
        currentSlide = (index + slides.length) % slides.length;
        
        // Poner la clase active al nuevo
        slides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Botones manuales
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetTimer(); // Reinicia el contador si el usuario hace clic
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetTimer();
    });

    // Auto-play cada 10 segundos (10000 ms)
    function startTimer() {
        slideInterval = setInterval(nextSlide, 10000);
    }

    function resetTimer() {
        clearInterval(slideInterval);
        startTimer();
    }

    // Iniciar el temporizador al cargar la página
    startTimer();
});
