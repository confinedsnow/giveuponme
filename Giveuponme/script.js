document.addEventListener("DOMContentLoaded", () => {

    /* ---------------- CLICK TO ENTER ---------------- */
    const overlay = document.getElementById("click-start-overlay");
    const bgm = document.getElementById("bgm");

    const start = () => {
        bgm.volume = 1;
        bgm.loop = true;
        bgm.play().catch(()=>{});

        overlay.classList.add("fade-out");
        setTimeout(() => overlay.remove(), 600);

        document.removeEventListener("click", start);
    };
    document.addEventListener("click", start);

    /* ---------------- PARTICLES ---------------- */
    const canvas = document.getElementById("particle-canvas");
    const ctx = canvas.getContext("2d");
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const particles = [];

    class Particle {
        constructor() { this.reset(); }
        reset() { this.x = Math.random()*w; this.y = Math.random()*h; this.size = Math.random()*3 +1; this.speedX = Math.random()-0.5; this.speedY = Math.random()-0.5; this.opacity = Math.random()*0.5 +0.1;}
        update(){ this.x += this.speedX; this.y += this.speedY; if(this.x<0||this.x>w||this.y<0||this.y>h)this.reset();}
        draw(){ ctx.fillStyle=`rgba(217,70,124,${this.opacity})`; ctx.beginPath(); ctx.arc(this.x,this.y,this.size,0,Math.PI*2); ctx.fill();}
    }
    for(let i=0;i<80;i++) particles.push(new Particle());
    function animate(){ ctx.clearRect(0,0,w,h); particles.forEach(p=>{p.update();p.draw();}); requestAnimationFrame(animate);}
    animate();
    window.addEventListener("resize",()=>{ w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight; });

});
