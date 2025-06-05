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


