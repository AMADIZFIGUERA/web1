 document.addEventListener('DOMContentLoaded', () => {
        const liquid = document.querySelector('.liquid');
        const iceCubes = document.querySelectorAll('.ice-cube');

        // Animación de llenado del líquido
        gsap.to(liquid, {
            height: '80%', 
            duration: 2, 
            ease: 'power2.inOut',
            delay: 0.5, 
            onUpdate: function() {
                
                const progress = this.progress(); 
                liquid.style.filter = `brightness(${0.8 + progress * 0.2})`; 
            }
        });

        // Animación de los cubos de hielo
        gsap.from(iceCubes, {
            y: -100, 
            opacity: 0, 
            rotation: '+=360', 
            duration: 1.5,
            ease: 'bounce.out', 
            stagger: 0.2,
            delay: 1.5 
        });
    });

     document.addEventListener('DOMContentLoaded', () => {
            // Animación de la cabecera
            gsap.to("header", {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.2,
                ease: "power2.out"
            });

            gsap.to(".logo", {
                opacity: 1,
                x: 0,
                duration: 0.8,
                delay: 0.4,
                ease: "power2.out"
            });

            gsap.from("nav ul li", {
                opacity: 0,
                x: 20,
                duration: 0.6,
                stagger: 0.1, // Anima cada elemento de la lista con un pequeño retraso
                delay: 0.6,
                ease: "power2.out"
            });


            // Animación de la sección Hero
            gsap.to(".hero h1", {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.8,
                ease: "power3.out"
            });

            gsap.to(".hero p", {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 1.1,
                ease: "power3.out"
            });

            gsap.to(".cta-button", {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 1.4,
                ease: "back.out(1.7)" // Efecto de rebote al final
            });

           
            const liquid = document.querySelector('.liquid');
            const iceCubes = document.querySelectorAll('.ice-cube');
            const glassContainer = document.querySelector('.glass-container');

            if (liquid && iceCubes && glassContainer) {
                // Animación de la aparición del vaso
                gsap.to(glassContainer, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: 2.0, // Retraso mayor para que aparezca después del texto
                    ease: "power2.out",
                    onComplete: () => {
                        // Una vez que el vaso aparece, animamos el llenado
                        gsap.to(liquid, {
                            height: '80%',
                            duration: 2,
                            ease: 'power2.inOut',
                            onUpdate: function() {
                                const progress = this.progress();
                                liquid.style.filter = `brightness(${0.8 + progress * 0.2})`;
                            }
                        });

                        // Animación de los cubos de hielo
                        gsap.from(iceCubes, {
                            y: -100,
                            opacity: 0,
                            rotation: '+=360',
                            duration: 1.5,
                            ease: 'bounce.out',
                            stagger: 0.2,
                            delay: 0.5 // Retraso después de que el vaso se llena un poco
                        });
                    }
                });
            } else {
                console.error("No se pudieron encontrar todos los elementos del vaso en el DOM.");
            }
        });