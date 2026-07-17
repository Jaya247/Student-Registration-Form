document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const inputs = form.querySelectorAll("input[required]");

    // Har input ke baad ek error message span daal do
    inputs.forEach(function (input) {
        const errorSpan = document.createElement("span");
        errorSpan.classList.add("error-msg");
        errorSpan.textContent = "Yeh field zaroori hai";
        input.insertAdjacentElement("afterend", errorSpan);
    });

    form.addEventListener("submit", function (e) {
        let isValid = true;

        inputs.forEach(function (input) {
            const errorSpan = input.nextElementSibling;
            input.classList.remove("error");
            errorSpan.classList.remove("show");

            if (input.value.trim() === "") {
                input.classList.add("error");
                errorSpan.textContent = "Yeh field zaroori hai";
                errorSpan.classList.add("show");
                isValid = false;
            } else if (input.type === "mail" || input.getAttribute("type") === "mail") {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(input.value)) {
                    input.classList.add("error");
                    errorSpan.textContent = "Sahi email daaliye";
                    errorSpan.classList.add("show");
                    isValid = false;
                }
            } else if (input.type === "tel") {
                const phonePattern = /^[0-9]{10}$/;
                if (!phonePattern.test(input.value)) {
                    input.classList.add("error");
                    errorSpan.textContent = "10 digit ka phone number daaliye";
                    errorSpan.classList.add("show");
                    isValid = false;
                }
            } else if (input.type === "password") {
                if (input.value.length < 6) {
                    input.classList.add("error");
                    errorSpan.textContent = "Password kam se kam 6 characters ka ho";
                    errorSpan.classList.add("show");
                    isValid = false;
                }
            }
        });

        if (!isValid) {
            e.preventDefault();
        } else {
            e.preventDefault(); // demo ke liye, real backend ho to hata dena
            alert("Form successfully submit ho gaya!");
            form.reset();
        }
    });

    // Reset button dabane par saare error hata do
    form.addEventListener("reset", function () {
        inputs.forEach(function (input) {
            input.classList.remove("error");
            input.nextElementSibling.classList.remove("show");
        });
    });
});
