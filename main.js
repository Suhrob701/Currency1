const apiKey = "f679d30fb56bf3a1c18e9a01";
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");
const fromFlag = document.getElementById("fromFlag");
const toFlag = document.getElementById("toFlag");


const countryFlags = {
    "USD": "us", "EUR": "eu", "UZS": "uz", "GBP": "gb", "JPY": "jp", "RUB": "ru",
    "CNY": "cn", "CAD": "ca", "AUD": "au", "INR": "in", "BRL": "br", "CHF": "ch",
    "AED": "ae", "AFN": "af", "ALL": "al", "AMD": "am", "ARS": "ar", "AZN": "az",
    "BDT": "bd", "BGN": "bg", "BHD": "bh", "BOB": "bo", "CLP": "cl", "COP": "co",
    "CZK": "cz", "DKK": "dk", "EGP": "eg", "HKD": "hk", "HUF": "hu", "IDR": "id",
    "ILS": "il", "ISK": "is", "KRW": "kr", "KWD": "kw", "KZT": "kz", "LKR": "lk",
    "MAD": "ma", "MYR": "my", "MXN": "mx", "NOK": "no", "NZD": "nz", "OMR": "om",
    "PKR": "pk", "PLN": "pl", "QAR": "qa", "RON": "ro", "SAR": "sa", "SEK": "se",
    "SGD": "sg", "THB": "th", "TRY": "tr", "TWD": "tw", "UAH": "ua", "VEF": "ve",
    "VND": "vn", "ZAR": "za", "ZMW": "zm"
};

async function loadCurrencies() {
    try {
        let res = await fetch(apiURL + "USD");
        let data = await res.json();
        let currencies = Object.keys(data.conversion_rates);

        currencies.forEach(cur => {
            fromCurrency.innerHTML += `<option value="${cur}">${cur}</option>`;
            toCurrency.innerHTML += `<option value="${cur}">${cur}</option>`;
        });

        fromCurrency.value = "USD";
        toCurrency.value = "UZS";
        updateFlags();
    } catch (error) {
        console.error("Xatolik yuz berdi:", error);
    }
}


function updateFlags() {
    fromFlag.src = `https://flagcdn.com/w40/${countryFlags[fromCurrency.value]}.png`;
    toFlag.src = `https://flagcdn.com/w40/${countryFlags[toCurrency.value]}.png`;
}


async function convertCurrency() {
    let amount = parseFloat(amountInput.value);

    let from = fromCurrency.value;
    let to = toCurrency.value;

    try {
        let res = await fetch(apiURL + from);
        let data = await res.json();
        let rate = data.conversion_rates[to];

        let converted = (amount * rate).toFixed(2);
        result.innerText = `${amount} ${from} = ${converted} ${to}`;
    } catch (error) {
        console.error("Xatolik yuz berdi:", error);
        result.innerText = "Konvertatsiya muvaffaqiyatsiz bo‘ldi.";
    }
}

fromCurrency.addEventListener("change", updateFlags);
toCurrency.addEventListener("change", updateFlags);
convertBtn.addEventListener("click", convertCurrency);

window.addEventListener("load", loadCurrencies);
