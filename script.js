// ==========================================================================
// 🧭 PART 1: Top Main Nav Bar Views Router (With Micro-Delay Animation Fix)
// ==========================================================================
const navButtons = document.querySelectorAll('.nav-btn');
const pageViews = document.querySelectorAll('.page-view');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        navButtons.forEach(btn => btn.classList.remove('active'));
        pageViews.forEach(view => view.classList.remove('active'));
        
        button.classList.add('active');
        const targetId = button.getAttribute('data-target');
        const targetView = document.getElementById(targetId);
        
        // Temporarily reset view state coordinates to trick browser rendering engines
        targetView.style.opacity = '0';
        targetView.classList.add('active');
        
        // A 20ms timeout guarantees the top-to-bottom fade glide animation triggers visibly
        setTimeout(() => {
            targetView.style.opacity = '';
        }, 20);
    });
});

// ==========================================================================
// 🔍 PART 2: Sidebar Insight Widget Toggle Switch Logic
// ==========================================================================
const subButtons = document.querySelectorAll('.sub-widget-btn');
const subContents = document.querySelectorAll('.sub-content');
const displayPanel = document.querySelector('.widget-display-panel');

subButtons.forEach(button => {
    button.addEventListener('click', () => {
        const isAlreadyActive = button.classList.contains('active');
        
        subButtons.forEach(btn => btn.classList.remove('active'));
        subContents.forEach(content => content.classList.remove('active'));
        displayPanel.classList.remove('open');
        
        if (!isAlreadyActive) {
            button.classList.add('active');
            displayPanel.classList.add('open');
            
            const targetSubId = button.getAttribute('data-sub');
            const targetContent = document.getElementById(targetSubId);
            
            targetContent.style.opacity = '0';
            targetContent.classList.add('active');
            
            setTimeout(() => {
                targetContent.style.opacity = '';
            }, 20);
        }
    });
});

// ==========================================================================
// ⚡ PART 3: Fluid High-Glow Inertial Physics Spark Engine (Golden Intensity)
// ==========================================================================
const canvas = document.getElementById('spark-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let prevMouseX = 0;
let prevMouseY = 0;
let mouseVelocityX = 0;
let mouseVelocityY = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class SparkParticle {
    constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        
        // Razor-sharp thin element scaling metrics
        this.size = Math.random() * 0.4 + 0.8; 
        
        // Pseudo-Force Inertia Vector calculations tracking mouse paths
        let lengthCheck = Math.hypot(vx, vy) || 1;
        let baseDirX = vx === 0 ? (Math.random() - 0.5) * 2 : -vx / lengthCheck;
        let baseDirY = vy === 0 ? (Math.random() - 0.5) * 2 : -vy / lengthCheck;
        
        this.speedX = (baseDirX * 3.5) + (Math.random() - 0.5) * 2.5;
        this.speedY = (baseDirY * 3.5) + (Math.random() - 0.5) * 2.5;
        
        // 📌 COLOR SHIFT: Changed from bright yellow to 80% Molten Gold (#ffd700) and 20% Neon Blue
        this.color = Math.random() > 0.2 ? '#ffd700' : '#58a6ff'; 
        this.alpha = 1.0; 
        this.decay = Math.random() * 0.04 + 0.03; 
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedX += (Math.random() - 0.5) * 0.3;
        this.speedY += (Math.random() - 0.5) * 0.3;
        this.alpha -= this.decay;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        
        // LAYER 1: Deep Radiant Outer Gold/Blue Glowing Aura Footprint
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size * 3.8; 
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.speedX * 1.8, this.y - this.speedY * 1.8);
        ctx.stroke();
        
        // LAYER 2: Ultra-Bright High-Contrast Center Core Line (White Hot Laser Center)
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = this.size * 0.8; 
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.speedX * 1.8, this.y - this.speedY * 1.8);
        ctx.stroke();
        
        ctx.restore();
    }
}

window.addEventListener('mousemove', (e) => {
    if (prevMouseX !== 0 && prevMouseY !== 0) {
        mouseVelocityX = e.clientX - prevMouseX;
        mouseVelocityY = e.clientY - prevMouseY;
    }
    
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;

    if (Math.abs(mouseVelocityX) > 1 || Math.abs(mouseVelocityY) > 1) {
        // 📌 INTENSITY INCREASE: Set a loop to spawn 2 gold sparks per movement tick for a richer trail density
        for (let i = 0; i < 2; i++) {
            particles.push(new SparkParticle(e.clientX, e.clientY, mouseVelocityX, mouseVelocityY));
        }
    }
});

window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        particles.push(new SparkParticle(e.touches.clientX, e.touches.clientY, 1, 1));
    }
});

function animateSparks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        if (particles[i].alpha <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animateSparks);
}
animateSparks();
