function openAccountModal(type, accounts) {
    const modalTitle = document.getElementById("modalTitle");
    const accountList = document.getElementById("modalAccountList");

    modalTitle.textContent = `${type} 측 계좌번호`;
    accountList.innerHTML = "";

    accounts.forEach(account => {
        const line = document.createElement("div");
        line.className = "account-line";

        const info = document.createElement("div");
        info.className = "account-info";
        info.textContent = `${account.label}: ${account.bank} ${account.number} (${account.owner})`;

        const btn = document.createElement("button");
        btn.className = "account-copy";
        btn.textContent = "복사";
        btn.onclick = () => {
            navigator.clipboard.writeText(`${account.number}`);
            showToast();
        };

        line.appendChild(info);
        line.appendChild(btn);
        accountList.appendChild(line);
    });

    document.getElementById("accountModal").style.display = "flex";
}

function closeAccountModal() {
    document.getElementById("accountModal").style.display = "none";
}

function showToast() {
    const toast = document.getElementById("toast");
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

function copyToClipboard(element) {
    const text = element.getAttribute('data-copy');
    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
        const toast = document.getElementById("toast");
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 1500);
    }).catch(err => {
        console.warn("📋 복사 실패:", err);
    });
}

// snow

const canvas = document.getElementById("snowCanvas");
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
});

const snowflakes = [];
const snowflakeCount = 80;
const snowChars = ['*', '✽', '✾', '❆'];

for (let i = 0; i < snowflakeCount; i++) {
    snowflakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        char: snowChars[Math.floor(Math.random() * snowChars.length)],
        size: Math.random() * 20 + 10, // font size
        speedY: Math.random() * 1 + 0.5,
        speedX: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.5
    });
}

function drawSnowflakes() {
    ctx.clearRect(0, 0, width, height);

    for (let flake of snowflakes) {
        ctx.font = `${flake.size}px serif`;
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx.fillText(flake.char, flake.x, flake.y);
    }

    updateSnowflakes();
    requestAnimationFrame(drawSnowflakes);
}

function updateSnowflakes() {
    for (let flake of snowflakes) {
        flake.y += flake.speedY;
        flake.x += flake.speedX;

        if (flake.y > height) {
            flake.y = 0;
            flake.x = Math.random() * width;
            flake.char = snowChars[Math.floor(Math.random() * snowChars.length)];
        }
        if (flake.x > width || flake.x < 0) {
            flake.x = Math.random() * width;
        }
    }
}


