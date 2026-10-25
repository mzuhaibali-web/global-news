(function () {
    if (document.getElementById("gn-star-canvas")) return;

    const canvas = document.createElement("canvas");
    canvas.id = "gn-star-canvas";
    Object.assign(canvas.style, {
        position: "fixed",
        inset: "0",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: "0",
        opacity: "0.8"
    });
    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");
    let stars = [];
    let w = 0, h = 0, raf;

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        stars = Array.from({ length: Math.min(150, Math.floor(w * h / 8000)) }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 1.7 + 0.3,
            speed: Math.random() * 0.35 + 0.08,
            phase: Math.random() * Math.PI * 2
        }));
    }

    function draw(time) {
        ctx.clearRect(0, 0, w, h);
        stars.forEach(s => {
            s.y -= s.speed;
            if (s.y < -4) {
                s.y = h + 4;
                s.x = Math.random() * w;
            }
            const glow = 0.35 + (Math.sin(time * 0.0015 + s.phase) + 1) * 0.3;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 218, 130, ${glow})`;
            ctx.shadowBlur = 7;
            ctx.shadowColor = "#f7c85b";
            ctx.fill();
        });
        ctx.shadowBlur = 0;
        raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        raf = requestAnimationFrame(draw);
    }
})();
