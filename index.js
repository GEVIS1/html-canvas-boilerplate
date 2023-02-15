window.addEventListener("load", function() {
    const width = 800;
    const height = 600;
    const canvas = document.getElementById("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    console.log(ctx);

    class Demo {
        constructor(ctx) {
            this.ctx = ctx
            this.x = 0;
            this.y = 0;
            this.ax = 1;
            this.ay = 1;
            this.radius = 50;
        }
        update(dt) {
            this.x += (this.ax * dt);
            this.y += (this.ay * dt);

            if (this.y + this.radius >= ctx.canvas.height) {
                this.y = ctx.canvas.height - this.radius;
                this.ay *= -1;
            }

            if (this.y - this.radius <= 0) {
                this.y = this.radius;
                this.ay *= -1;
            }

            if (this.x + this.radius >= ctx.canvas.width) {
                this.x = ctx.canvas.width - this.radius;
                this.ax *= -1;
            }

            if (this.x - this.radius <= 0) {
                this.x = this.radius;
                this.ax *= -1;
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.stroke(); 
        }
    }

    const demo = new Demo(ctx);
    let lastRender = 0;

    function loop(t) {
        const dt = t - lastRender;
        demo.update(dt);
        demo.draw();
        
        lastRender = t
        window.requestAnimationFrame(loop);
    }
    window.requestAnimationFrame(loop);
});