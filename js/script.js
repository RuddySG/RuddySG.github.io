// archivo: js/script.js
// Programador romántico: lógica del sitio

document.addEventListener('DOMContentLoaded', () => {
    /* ========== CONFIG ========== */
    const coupleStart = new Date('2023-08-19T00:00:00');
    // Si quieres rutas permanentes en GitHub, pon aquí las rutas relativas (images/foto1.jpg)
    let preloadedImages = [
        'images/a1.jpeg',
        'images/a2.jpeg',
        'images/a3.jpeg',
        'images/a4.jpeg',
        'images/a5.jpeg',
        'images/a6.jpeg',
        'images/a7.jpeg',
        'images/a8.jpeg',
        'images/20220924_124919.jpg',
        'images/20230512_222649.jpg',
        'images/20230512_222654.jpg',
        'images/20230530_132510.jpg',
        'images/20230530_180502.jpg',
        'images/20230603_224322.jpg',
        'images/20230610_222947.jpg',
        'images/20230610_222948.jpg',
        'images/20230625_004024.jpg',
        'images/20230625_004028.jpg',
        'images/20230625_004031.jpg',
        'images/20230809_201147.jpg',
        'images/20230813_205435.jpg',
        'images/20230820_033304.jpg',
        'images/20230820_033331.jpg',
        'images/20230820_033350.jpg',
        'images/20230828_012546.jpg',
        'images/20231021_203758.jpg',
        'images/20231112_225320.jpg',
        'images/20231209_222848.jpg',
        'images/20240204_191351.jpg',
        'images/20240209_173924.jpg',
        'images/20240302_191309.jpg',
        'images/20250112_165112.jpg',
        'images/20250718_215019.jpg',
        'images/IMG-20241214-WA0071.jpg',
        'images/Screenshot_20231127_200654_WhatsApp.jpg',
        'images/VideoCapture_20230527-201631.jpg'
    ];
    // Música por defecto en /audio/one_direction.mp3 (coloca tu mp3 ahí)
    let musicSrc = 'audio/one_direction.mp3'; // o 'audio/one_direction.mp3'

    // Textos carta
    const letter = `Mi amor,

Hoy celebramos dos años. Dos años de risas, de aprendizajes, de pequeñas aventuras y de miradas que lo dicen todo. Cada día contigo reafirma que elegí bien, elegirte a ti fue la decisión más bonita que he tomado.

Gracias por tu paciencia, por tu risa, por tus abrazos en los días fríos y por ser cómplice de mis locuras. Prometo seguir aprendiendo a amarte mejor, a escuchar tus silencios y a construir recuerdos junto a ti

Sé que ha sido difícil para los dos. ¿Qué hubiese pasado si me hubiese rendido? ¿Si hubiese aceptado que nuestro amor "se había acabado" cuando ya no querías nada conmigo? No me hubiese perdonado nunca tan absurda decisión.

Tan solo míranos, aquí estamos, más FUERTES QUE NUNCA (en todos los sentidos). Te amo con todo mi corazón, como desde la primera vez que te ví. Me encanta tu sonrisa cada vez que te doy un bonobon, me hace acuerdo a la vez que te reíste cuando te dí el poderoso batón.

Pero bueno, este solo es el comienzo de algo maravilloso, de un futuro lleno de anhelos. Comenzamos como dos adolescentes inteligentes enamorados, ahora estamos a punto de los dos tener 20 años (1/5 de nuestra vida). No espero, VOY a pasar la parte que me queda a tu lado, porque sos mi persona favorita.

Con todo mi corazón,
Tu amor.`;
    const letterFull = letter + "\n\nPD: Eres la razón de muchas de mis sonrisas mi chiquitita.";

    /* ========== DOM ========== */
    const openLetterBtn = document.getElementById('openLetterBtn');
    const letterModal = document.getElementById('letterModal');
    const letterText = document.getElementById('letterText');
    const closeModal = document.getElementById('closeModal');
    const openLetterFull = document.getElementById('openLetterFull');
    const daysCounter = document.getElementById('daysCounter');
    const slideImg = document.getElementById('slideImg');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const addPhotosLocal = document.getElementById('addPhotosLocal');
    const photoInput = document.getElementById('photoInput');
    const uploadPhotosBtn = document.getElementById('uploadPhotosBtn');
    const playMusicBtn = document.getElementById('playMusicBtn');
    const bgMusic = document.getElementById('bgMusic');
    const openGiftBtn = document.getElementById('openGiftBtn');
    const giftInstr = document.getElementById('giftInstr');
    const heartsLayer = document.getElementById('hearts');

    /* ========== SLIDESHOW STATE ========== */
    let images = preloadedImages.slice();
    let idx = 0;
    let slideTimer = null;

    function updateSlide(){
        if(images.length === 0){
            slideImg.style.opacity = 0;
            slideImg.src = '';
            return;
        }
        const src = images[idx % images.length];
        slideImg.style.opacity = 0;
        setTimeout(()=> {
            slideImg.src = src;
            slideImg.onload = ()=> slideImg.style.opacity = 1;
        }, 120);
    }

    prevBtn.addEventListener('click', () => {
        if(!images.length) return;
        idx = (idx - 1 + images.length) % images.length;
        updateSlide();
    });
    nextBtn.addEventListener('click', () => {
        if(!images.length) return;
        idx = (idx + 1) % images.length;
        updateSlide();
    });
    shuffleBtn.addEventListener('click', () => {
        shuffle(images);
        idx = 0;
        updateSlide();
    });

    addPhotosLocal.addEventListener('click', () => photoInput.click());
    uploadPhotosBtn.addEventListener('click', () => photoInput.click());

    photoInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files).filter(f => f.type.startsWith('image/'));
        files.forEach(f => {
            const reader = new FileReader();
            reader.onload = ev => { images.push(ev.target.result); updateSlide(); }
            reader.readAsDataURL(f);
        });
    });

    // si el usuario puso rutas permanentes
    if(images.length > 0) updateSlide();

    /* ========== LETTER MODAL ========== */
    openLetterBtn.addEventListener('click', () => {
        letterModal.classList.add('open');
        letterText.textContent = '';
        typeWriter(letter, letterText);
        letterModal.setAttribute('aria-hidden', 'false');
    });
    closeModal.addEventListener('click', () => {
        letterModal.classList.remove('open');
        letterModal.setAttribute('aria-hidden', 'true');
    });
    openLetterFull.addEventListener('click', () => {
        letterText.textContent = letterFull;
    });

    // ESC to close
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') {
            letterModal.classList.remove('open');
            letterModal.setAttribute('aria-hidden', 'true');
        }
    });

    /* ========== COUNTER: días, horas, minutos, segundos ========== */
    function pad(n) {
        return n.toString().padStart(2, '0');
    }

    function updateElapsed() {
        const now = new Date();

        // segundos totales desde la fecha de inicio
        const totalSeconds = Math.floor((now - coupleStart) / 1000);

        // días completos desde la fecha de inicio
        const days = Math.floor(totalSeconds / 86400);

        // calcular segundos desde el inicio del día actual
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const secondsToday = Math.floor((now - startOfDay) / 1000);

        // Texto: "XXX días y YYY segundos"
        daysCounter.textContent = `${days} días y ${secondsToday} segundos`;
    }

    // iniciar y actualizar cada segundo
        updateElapsed();
        setInterval(updateElapsed, 1000);


    /* ========== MUSIC ========== */
    if(musicSrc){
        const srcNode = bgMusic.querySelector('source');
        srcNode.src = musicSrc;
        bgMusic.load();
    } else {
        // si existe archivo en /audio/one_direction.mp3 el browser lo intentará cargar (src en HTML)
    }

    playMusicBtn.addEventListener('click', async () => {
        try {
            if(bgMusic.paused){
                await bgMusic.play();
                playMusicBtn.textContent = 'Pausar música';
            } else {
                bgMusic.pause();
                playMusicBtn.textContent = 'Reproducir música';
            }
        } catch (err) {
            alert('La reproducción automática fue bloqueada. Pulsa el botón de reproducir en el reproductor si aparece.');
        }
    });

    bgMusic.addEventListener('error', () => {
        console.warn('audio file not found. Añade audio/one_direction.mp3 o ajusta musicSrc en js/script.js');
    });

    /* ========== GIFT ========== */
    openGiftBtn.addEventListener('click', () => {
        giftInstr.hidden = false;
        giftInstr.textContent = `Busca una pequeña caja escondida cerca de la cocina.`; // cambia la pista aquí
        burstHearts(40);
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });

    /* ========== HEARTS ANIMATION ========== */
    function createHeart(){
        const el = document.createElement('div');
        const size = Math.random() * 18 + 14;
        el.style.position = 'absolute';
        el.style.left = Math.random() * 100 + '%';
        el.style.top = '110%';
        el.style.width = size + 'px';
        el.style.height = size + 'px';
        el.style.transform = 'rotate(45deg)';
        el.style.background = `radial-gradient(circle at 35% 30%, #fff, rgba(255,255,255,0.05)), linear-gradient(135deg, rgba(255,107,146,0.95), rgba(255,61,90,0.9))`;
        el.style.borderRadius = '2px';
        el.style.boxShadow = '0 6px 18px rgba(99,40,64,0.08)';
        el.style.pointerEvents = 'none';
        el.style.zIndex = 10;
        heartsLayer.appendChild(el);
        const duration = Math.random() * 4500 + 3500;
        const dx = (Math.random() - 0.5) * 200;
        el.animate([
            { transform: `translate(0px, 0px) rotate(45deg) scale(1)`, opacity: 1 },
            { transform: `translate(${dx}px, -${800 + Math.random() * 300}px) rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.6 + 0.6})`, opacity: 0 }
        ], { duration, easing: 'cubic-bezier(.2,.8,.2,1)' });
        setTimeout(() => el.remove(), duration + 50);
    }

    function burstHearts(n = 20){
        for(let i = 0; i < n; i++) setTimeout(createHeart, i * 50 + Math.random() * 300);
    }

    setInterval(() => { if(Math.random() < 0.4) createHeart(); }, 800);

    /* ========== HELPERS ========== */
    function shuffle(arr){
        for(let i = arr.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    function typeWriter(text, node, speed = 18){
        let i = 0;
        node.textContent = '';
        const t = setInterval(() => {
            node.textContent += text.charAt(i);
            i++;
            if(i >= text.length) clearInterval(t);
        }, speed);
    }

    // (opcional) autoplay slideshow every 5s:
    // slideTimer = setInterval(()=>{ if(images.length){ idx=(idx+1)%images.length; updateSlide(); } }, 5000);
});
