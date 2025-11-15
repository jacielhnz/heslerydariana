document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('pantalla-sobre');
    const sobre = overlay ? overlay.querySelector('.sobre') : null;
    const sello = overlay ? overlay.querySelector('.sello') : null;
    const main = document.getElementById('contenido');
    const countdownDays = document.getElementById('countdown-days');
    const countdownHours = document.getElementById('countdown-hours');
    const countdownMinutes = document.getElementById('countdown-minutes');
    const countdownSeconds = document.getElementById('countdown-seconds');
    const animatedElements = document.querySelectorAll('[data-animate]');

    const revealElement = function (element) {
        if (!element.classList.contains('is-visible')) {
            element.classList.add('is-visible');
        }
    };

    const revealInViewport = function () {
        animatedElements.forEach(function (element) {
            if (element.classList.contains('is-visible')) {
                return;
            }

            const rect = element.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.88) {
                revealElement(element);
            }
        });
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    revealElement(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px -10%',
            threshold: 0.2
        });

        animatedElements.forEach(function (element) {
            observer.observe(element);
        });
    } else {
        animatedElements.forEach(revealElement);
        window.addEventListener('scroll', revealInViewport);
    }

    const abrirSobre = function () {
        if (!sobre || sobre.classList.contains('abierto')) {
            return;
        }

        sobre.classList.add('abierto');
        setTimeout(function () {
            if (overlay) overlay.classList.add('oculta');
            if (main) main.classList.add('visible');
            requestAnimationFrame(function () {
                revealInViewport();
            });
        }, 1200);
    };

    if (sello) {
        sello.addEventListener('click', abrirSobre);
        sello.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                abrirSobre();
            }
        });
    }

    if (overlay) {
        overlay.addEventListener('transitionend', function (event) {
            if (event.target === overlay && overlay.classList.contains('oculta')) {
                overlay.style.display = 'none';
            }
        });

        setTimeout(function () {
            if (sobre && !sobre.classList.contains('abierto')) {
                abrirSobre();
            }
        }, 4200);
    }

    if (main && main.classList.contains('visible')) {
        requestAnimationFrame(function () {
            revealInViewport();
        });
    }

    // ==== COUNTDOWN ORIGINAL ====
    if (countdownDays && countdownHours && countdownMinutes && countdownSeconds) {
        const objetivo = new Date('2025-12-20T15:30:00-05:00');

        const actualizarConteo = function () {
            const ahora = new Date();
            const diferencia = Math.max(objetivo.getTime() - ahora.getTime(), 0);
            const totalSegundos = Math.floor(diferencia / 1000);

            const dias = Math.floor(totalSegundos / 86400);
            const horas = Math.floor((totalSegundos % 86400) / 3600);
            const minutos = Math.floor((totalSegundos % 3600) / 60);
            const segundos = totalSegundos % 60;

            const pad = function (valor) {
                return String(valor).padStart(2, '0');
            };

            countdownDays.textContent = pad(dias);
            countdownHours.textContent = pad(horas);
            countdownMinutes.textContent = pad(minutos);
            countdownSeconds.textContent = pad(segundos);
        };

        actualizarConteo();
        setInterval(actualizarConteo, 1000);
    }

    // =======================================================
    // SISTEMA DE PERSONALIZACIÓN + GOOGLE FORM + WHATSAPP
    // =======================================================

    // URL base de tu formulario (sin parámetros)
    const GOOGLE_FORM_BASE = 'https://docs.google.com/forms/d/e/1FAIpQLSedexV0RJps11EeFTVqK9hqCr0kQ1FUcgFL6AiuWVfoZ1A3HA/viewform';

    // Campos del form (sacados del enlace prellenado)
    const ENTRY_FAMILIA  = 'entry.1498135098';   // Nombre de la familia / invitado
    const ENTRY_PERSONAS = 'entry.2110637086';   // Número de personas invitadas
    // const ENTRY_ASISTIR = 'entry.877086558';  // ¿Puedes asistir? -> NO lo prellenamos

    const WHATSAPP_NUMERO = '50431783709'; // Cambia por tu número de WhatsApp con código de país

    const btnConfirmar = document.getElementById('btnConfirmar');
    const btnWhatsapp  = document.getElementById('btnWhatsapp');

    // Objeto de invitados
    const invitados = {
        'familia-romero-serrano': { nombre: 'Familia Romero Serrano', personas: 5 },
        'familia-garcia-maldonado': { nombre: 'Familia García Maldonado', personas: 4 },
        'familia-cruz': { nombre: 'Familia Cruz', personas: 5 },
        'nancy-romero': { nombre: 'Nancy Romero', personas: 1 },
        'familia-romero-blandon': { nombre: 'Familia Romero Blandón', personas: 3 },
        'familia-romero-orellana': { nombre: 'Familia Romero Orellana', personas: 5 },
        'familia-castro-rodriguez': { nombre: 'Familia Castro Rodríguez', personas: 4 },
        'familia-castro-reyes': { nombre: 'Familia Castro Reyes', personas: 4 },
        'glenda-castro': { nombre: 'Glenda Castro', personas: 1 },
        'lizet-flores': { nombre: 'Lizet Flores', personas: 1 },
        'doris-mejia': { nombre: 'Doris Mejía', personas: 2 },
        'familia-funez-acosta': { nombre: 'Familia Fúnez Acosta', personas: 3 },
        'merary-acosta': { nombre: 'Merary Acosta', personas: 1 },
        'familia-calix-pineda': { nombre: 'Familia Cálix Pineda', personas: 3 },
        'familia-velasquez-calix': { nombre: 'Familia Velásquez Cálix', personas: 2 },
        'familia-trochez-calix': { nombre: 'Familia Trochez Cálix', personas: 5 },
        'jenny-banegas': { nombre: 'Jenny Banegas', personas: 1 },
        'leyli-flores': { nombre: 'Leyli Flores', personas: 1 },
        'erika-castro': { nombre: 'Erika Castro', personas: 1 },
        'familia-lezama-castro': { nombre: 'Familia Lezama Castro', personas: 4 },
        'jenifer-jeferson': { nombre: 'Jenifer y Jefferson', personas: 2 },
        // Nuevos familiares agregados
        'familia-ilias-santos': { nombre: 'Familia Ilias – Santos', personas: 5 },
        'familia-aguilar-reyes': { nombre: 'Familia Aguilar – Reyes', personas: 2 },
        'familia-diaz-ruiz': { nombre: 'Familia Díaz – Ruiz', personas: 3 },
        'familia-sanchez': { nombre: 'Familia Sánchez', personas: 2 },
        'familia-diaz-barahona': { nombre: 'Familia Díaz – Barahona', personas: 2 },
        'familia-diaz-martinez': { nombre: 'Familia Díaz – Martínez', personas: 2 },
        'familia-diaz-funez': { nombre: 'Familia Díaz – Fúnez', personas: 3 },
        'familia-diaz': { nombre: 'Familia Díaz', personas: 2 },
        'familia-diaz-acosta': { nombre: 'Familia Díaz – Acosta', personas: 2 },
        'familia-diaz-alvarenga': { nombre: 'Familia Díaz – Alvarenga', personas: 2 },
        'familia-elvir-diaz': { nombre: 'Familia Elvir – Díaz', personas: 2 },
        'familia-diaz-maradiaga': { nombre: 'Familia Díaz – Maradiaga', personas: 4 },
        'familia-diaz-osorto': { nombre: 'Familia Díaz – Osorto', personas: 5 },
        'familia-sanchez-granados': { nombre: 'Familia Sánchez – Granados', personas: 3 },
        'familia-castellano-vasquez': { nombre: 'Familia Castellano – Vásquez', personas: 2 },
        'familia-hurtarte-rivera': { nombre: 'Familia Hurtarte – Rivera', personas: 2 },
        'familia-saens-rivera-sabilion': { nombre: 'Familia Saens – Rivera – Sabillón', personas: 3 },
        'familia-castellanos-recarte': { nombre: 'Familia Castellanos – Recarte', personas: 2 },
        'familia-benitez': { nombre: 'Familia Benítez', personas: 2 },
        'familia-galeano-reyes': { nombre: 'Familia Galeano – Reyes', personas: 2 },
        'familia-leveron-murillo': { nombre: 'Familia Leverón – Murillo', personas: 2 },
        'allan-velasquez': { nombre: 'Allan Velásquez', personas: 1 },
        'wendel-rosales': { nombre: 'Wendel Rosales', personas: 1 },
        'joel-orellana': { nombre: 'Joel Orellana', personas: 1 }
    };

    function obtenerParametroURL(nombre) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(nombre);
    }

    function aplicarInvitadoEnTexto(invitado) {
        const spanNombre = document.querySelector('.invitado-nombre');
        const spanPersonas = document.querySelector('.invitado-personas');

        if (spanNombre) {
            spanNombre.textContent = invitado ? invitado.nombre : 'Queridos invitados';
        }

        if (spanPersonas) {
            if (invitado) {
                spanPersonas.textContent = invitado.personas === 1
                    ? '1 persona'
                    : `${invitado.personas} personas`;
            } else {
                spanPersonas.textContent = 'Nos alegra que puedan acompañarnos';
            }
        }
    }

    function actualizarBotones(invitadoId) {
        let invitado = invitadoId ? invitados[invitadoId] : null;

        // --------- FORMULARIO GOOGLE ----------
        let formUrl = GOOGLE_FORM_BASE + '?usp=pp_url';

        if (invitado) {
            const params = new URLSearchParams();
            params.set('usp', 'pp_url');
            params.set(ENTRY_FAMILIA, invitado.nombre);
            params.set(ENTRY_PERSONAS, invitado.personas.toString());
            formUrl = `${GOOGLE_FORM_BASE}?${params.toString()}`;
        }

        if (btnConfirmar) {
            btnConfirmar.href = formUrl;
        }

        // --------- WHATSAPP ----------
        let whatsappUrl = `https://wa.me/${WHATSAPP_NUMERO}`;
        if (invitado) {
            const mensaje = `Hola, somos ${invitado.nombre}. Queremos confirmar nuestra asistencia (${invitado.personas} persona${invitado.personas > 1 ? 's' : ''}).`;
            whatsappUrl += `?text=${encodeURIComponent(mensaje)}`;
        }
        if (btnWhatsapp) {
            btnWhatsapp.href = whatsappUrl;
        }

        aplicarInvitadoEnTexto(invitado);
    }

    function inicializarInvitado() {
        const invitadoId = obtenerParametroURL('invitado');
        if (invitadoId && invitados[invitadoId]) {
            actualizarBotones(invitadoId);
        } else {
            actualizarBotones(null);
        }
    }

    // Hacer disponible cambiarInvitado para pruebas en consola
    window.cambiarInvitado = function (id) {
        if (!invitados[id]) {
            console.log('ID de invitado no encontrado:', id);
            console.log('IDs disponibles:', Object.keys(invitados));
            return;
        }

        // Actualizar URL sin recargar
        const url = new URL(window.location);
        url.searchParams.set('invitado', id);
        window.history.replaceState({}, '', url);

        actualizarBotones(id);
    };

    inicializarInvitado();

    console.log('Invitación de Dariana & Hesler cargada correctamente');
    console.log('Para cambiar invitado manualmente, usa: cambiarInvitado("id-del-invitado")');
    console.log('IDs disponibles:', Object.keys(invitados));
});
