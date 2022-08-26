// Declaring Variables ( Selecting Elements )
const form = document.querySelector("form.data-input");
const billAmount = document.getElementById("bill-amount");
const radioTips = document.querySelectorAll(".tips-holder .tip input");
const inputCustomTip = document.querySelector(".custom input");
const peopleCount = document.getElementById("people-count");
const personTip = document.getElementById("person-tip-amount");
const personTotal = document.getElementById("total-person");
const resetBtn = document.getElementById("reset");

// Controlling Button Status
function btnStatus() {
    if (billAmount.value || peopleCount.value) {
        resetBtn.classList.remove("disabled");
    } else {
        resetBtn.classList.add("disabled");
    }
}
window.addEventListener("load", btnStatus);

// Prevent Writing [- + e] in Inputs
document.querySelectorAll('input[type="number"]').forEach((input) => {
    input.addEventListener("keypress", function (e) {
        if (["-", "+", "e"].includes(e.key)) e.preventDefault();
    });
});

// Formatting Currency Function
function formatCurrency(value) {
    return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
}

// Adding Error
function addError() {
    peopleCount.classList.add("invalid");
    peopleCount.nextElementSibling.innerHTML = "can't be zero";
}

// Removing Error
function removeError() {
    peopleCount.classList.remove("invalid");
    peopleCount.nextElementSibling.innerHTML = "";
}

// Reseting Form With Button
resetBtn.addEventListener("click", () => {
    if (!resetBtn.classList.contains("disabled")) {
        form.reset();
        removeError();
        radioTips.forEach((el) => el.parentElement.classList.remove("active"));
        personTip.innerHTML = "$0.00";
        personTotal.innerHTML = "$0.00";
        resetBtn.classList.add("disabled");
    }
});

// Controlling Custom Tip Input
inputCustomTip.addEventListener("click", () => {
    radioTips.forEach((el) => el.parentElement.classList.remove("active"));
    inputCustomTip.parentElement.classList.add("active");
});

// Calculation Function
function calculate() {
    let selectedTip = document.querySelector(".tip.active input").value / 100;
    let eachOneTip = (billAmount.value * selectedTip) / peopleCount.value;

    personTip.innerHTML = formatCurrency(eachOneTip);
    personTotal.innerHTML = formatCurrency(eachOneTip + billAmount.value / peopleCount.value);
}

// Making Real-time Calculation
function realtimeCalc() {
    if (+peopleCount.value === 0) {
        addError();
    } else {
        removeError();
        calculate();
    }
}

billAmount.addEventListener("input", realtimeCalc);
billAmount.addEventListener("input", btnStatus);
peopleCount.addEventListener("input", realtimeCalc);
peopleCount.addEventListener("input", btnStatus);
inputCustomTip.addEventListener("input", realtimeCalc);
inputCustomTip.addEventListener("input", btnStatus);

radioTips.forEach((radio) => {
    radio.addEventListener("click", () => {
        radioTips.forEach((el) => el.parentElement.classList.remove("active"));
        radio.parentElement.classList.add("active");
	inputCustomTip.value = "";
        realtimeCalc();
    });
});
