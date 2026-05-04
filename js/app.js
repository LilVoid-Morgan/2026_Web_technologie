// // https://developer.mozilla.org/fr/docs/Web/API/Intersection_Observer_API
// const ratio = 0.1;
// const options = {
//     root: null,
//     rootMargin: '0px',
//     threshold: ratio
// }
//
// function handleIntersect(entries, observer) {
//     entries.forEach(function(entry) {
//         if(entry.intersectionRatio > ratio) {
//             entry.target.classList.add('fx-reveal-visible')
//             observer.unobserve(entry.target);
//         }
//     })
// }
//
// const observer = new IntersectionObserver(handleIntersect, options);
//
// document.querySelectorAll('.fx-reveal').forEach(function(r) {
//     observer.observe(r);
// });


//ON START

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const themeBTN = document.getElementById("change-theme");
const form = document.getElementById("complaint-form");
const container = document.getElementById("main-container");
let theme;
if (systemTheme.matches) {
    console.log("Detected Dark Theme");
    theme = "dark";
    changeTheme();
}
else {
    theme = "light";
    console.log("Detected Light Theme");
}

if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
    console.log("Saved theme " + theme);
    if (theme === "dark") {
        changeTheme();
    }
}


let currentLang;
if (!localStorage.getItem("lang")) {
    currentLang = "en";
}
else {
    currentLang = localStorage.getItem("lang");
}
console.log(currentLang);
if (currentLang === "sk") {
    setLang("sk");
    setLangTextSK();
}
else if (currentLang === "de") {
    setLang("de");
    setLangTextDE();
}


themeBTN.addEventListener("click", () => {
    changeTheme();
});


//EVENT LISTENERS

const enBTN = document.getElementById("lang-en");
const skBTN = document.getElementById("lang-sk");
const deBTN = document.getElementById("lang-de");
enBTN.addEventListener("click",  () => {
    if (currentLang === "en") {
        console.log("Language already set.");
        return;
    }
    setLang("en");
    setLangTextEN();
});

skBTN.addEventListener("click",  () => {
    if (currentLang === "sk") {
        console.log("Language already set.");
        return;
    }
    setLang("sk");
    setLangTextSK();
});

deBTN.addEventListener("click",  () => {
    if (currentLang === "de") {
        console.log("Language already set.");
        return;
    }
    alert("Nemčina bola preložená iba cez online prekladače!\n\nGerman was translated only with the use of online translators!\n\nDie deutsche Übersetzung erfolgte ausschließlich mithilfe von Online-Übersetzern!");
    setLang("de");
    setLangTextDE();
});

if (form) {
    const submit = document.getElementById("complaint-submit");
    submit.addEventListener("click", (event) => {
        document.querySelectorAll(".invalid").forEach(el => {
            el.classList.remove("invalid");
        })
        document.getElementById("warning").classList.add("invisible");
        event.preventDefault();
        let isValid = true;
        const name = document.getElementById("name");
        name.textContent = name.value.trim();
        if (name.value.trim().length < 3) {
            document.querySelector("[for='name']").classList.add("invalid");
            name.classList.add("invalid");
            isValid = false;
            console.log("Name is not valid");
        }
        const email = document.getElementById("email");
        email.textContent = email.value.trim();
        if (!email.checkValidity()) {
            document.querySelector("[for='email']").classList.add("invalid");
            email.classList.add("invalid");
            isValid = false;
            console.log("Email is not valid");
        }
        const street = document.getElementById("street");
        street.textContent = street.value.trim();
        if (street.value.trim().length < 5) {
            document.querySelector("[for='street']").classList.add("invalid");
            street.classList.add("invalid");
            isValid = false;
            console.log("Street is not valid");
        }
        const city = document.getElementById("city");
        city.textContent = city.value.trim();
        if (city.value.trim().length < 5) {
            document.querySelector("[for='city']").classList.add("invalid");
            city.classList.add("invalid");
            isValid = false;
            console.log("City is not valid");
        }
        const country = document.getElementById("country").value.trim();
        document.getElementById("country").textContent = country;
        if (country.length > 0) {
            const datalist = document.getElementById("countries");
            let found = false;
            for (let i = 0; i < datalist.options.length; i++) {
                if (datalist.options[i].value === country) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                document.querySelector("[for='country']").classList.add("invalid");
                document.getElementById("country").classList.add("invalid");
                isValid = false;
                console.log("Country is not valid");
            }
        }
        else {
            document.querySelector("[for='country']").classList.add("invalid");
            document.getElementById("country").classList.add("invalid");
            isValid = false;
            console.log("Country is not valid");
        }
        const orderNumber = document.getElementById("order-number");
        orderNumber.textContent = orderNumber.value.trim();
        const orderNumberRegex = /^[A-Za-z]{2}[0-9]{4}$/;
        if (!orderNumberRegex.test(orderNumber.value.trim())) {
            document.querySelector("[for='order-number']").classList.add("invalid");
            orderNumber.classList.add("invalid");
            isValid = false;
            console.log("Order number is not valid");
        }
        const problem = document.getElementById("problem");
        if (!problem.checkValidity()) {
            document.querySelector("[for='problem']").classList.add("invalid");
            problem.classList.add("invalid");
            isValid = false;
            console.log("Product problem is not valid");
        }
        const actionReturn = document.getElementById("return");
        const actionReplace = document.getElementById("replace");
        const actionRefund = document.getElementById("refund");
        if (!actionReturn.checked && !actionReplace.checked && !actionRefund.checked) {
            document.getElementById("action").classList.add("invalid");
            isValid = false;
            console.log("Preferred action is not valid");
        }
        if (isValid) {
            form.submit();
            console.log("Form successfully sent.");
        }
        else {
            document.getElementById("warning").classList.add("invalid");
            document.getElementById("warning").classList.remove("invisible");
        }
    });
}
const aboutUs = document.getElementById("about-toggle");
const aboutWindow = document.getElementById("about");
const closeBTN = document.getElementById("close-btn");
if (aboutUs) {
    if (aboutUs) {
        aboutUs.addEventListener("click", () => {
            openAbout();
        })
    }
    aboutWindow.addEventListener("click", () => {
        closeAbout();
    });
    closeBTN.addEventListener("click", () => {
        closeAbout();
    });
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeAbout();
        }
    })
}

//FUNCTIONS

function openAbout() {
    aboutWindow.style.display = "block";
    const blurBox = document.getElementById("blur-box");
    blurBox.classList.add("blur");
}

function closeAbout() {
    aboutWindow.style.display = "none";
    const blurBox = document.getElementById("blur-box");
    blurBox.classList.remove("blur");
}

function fixedMenu() {
    //
}

function changeTheme() {
    const themeBTN = document.getElementById("change-theme");
    if (container.classList.contains("light")) {
        container.classList.replace("light", "dark");
        themeBTN.textContent = "Light Theme";
        localStorage.setItem("theme", "dark");
    }
    else {
        container.classList.replace("dark", "light");
        themeBTN.textContent = "Dark Theme";
        localStorage.setItem("theme", "light");
    }
}

function setLang(lang) {
    document.querySelectorAll(".current-lang").forEach((el) => {
        el.classList.replace("current-lang", "hidden-lang");
    });
    document.querySelectorAll(`[lang="${lang}"]`).forEach((el) => {
        el.classList.replace("hidden-lang", "current-lang");
    });
    document.documentElement.lang = lang;
    currentLang = lang;
    localStorage.setItem("lang", currentLang);
}

function setLangTextEN() {
    document.getElementById("main-page").textContent = "Main Page";
    document.getElementById("contact").textContent = "Contact";
    document.getElementById("list").textContent = "List of Products";
    if (theme === "dark") {
        document.getElementById("change-theme").textContent = "Light Theme";
    }
    else {
        document.getElementById("change-theme").textContent = "Dark Theme";
    }
    document.getElementById("footer-p1").textContent = "Products everyone loves";
    document.getElementById("footer-p2").textContent = "Our products";
    document.getElementById("footer-p3").textContent = "Most popular product";
    document.getElementById("footer-p4").textContent = "We are here for you";
    document.getElementById("footer-p5").textContent = "Our Contact";
    document.getElementById("footer-p6").textContent = "Complaint";
    if (form) {
        document.getElementById("complaint-h2").textContent = "Submit a Complaint";
        document.getElementById("title1").textContent = "Personal Details";
        document.getElementById("title2").textContent = "Address";
        document.getElementById("title3").textContent = "Complaint Details";
        document.getElementById("name-label").textContent = "Name *";
        document.getElementById("email-label").textContent = "Contact Email *";
        document.getElementById("street-label").textContent = "Street *";
        document.getElementById("house-number-label").textContent = "House Number";
        document.getElementById("city-label").textContent = "City *";
        document.getElementById("county-label").textContent = "County";
        document.getElementById("country-label").textContent = "Country *";
        document.getElementById("product-label").textContent = "Choose Product Type";
        document.getElementById("product0").textContent = "--Select a product--";
        document.getElementById("product1").textContent = "Product 1";
        document.getElementById("product2").textContent = "Product 2";
        document.getElementById("product3").textContent = "Product 3";
        document.getElementById("product4").textContent = "Product 4";
        document.getElementById("product5").textContent = "Product 5";
        document.getElementById("product6").textContent = "Product 6";
        document.getElementById("product7").textContent = "Product 7";
        document.getElementById("product8").textContent = "Product 8";
        document.getElementById("product9").textContent = "Product 9";
        document.getElementById("product10").textContent = "Product 10";
        document.getElementById("order-number-label").textContent = "Order Number *";
        document.getElementById("problem-label").textContent = "Encountered Problem *";
        document.getElementById("problem-label1").setAttribute("value", "On Arrival");
        document.getElementById("problem-label2").setAttribute("value", "Within Warranty");
        document.getElementById("problem-label3").setAttribute("value", "Other");
        document.getElementById("problem0").textContent = "--Select a problem--";
        document.getElementById("problem1").textContent = "Never Arrived";
        document.getElementById("problem2").textContent = "Arrived Incomplete";
        document.getElementById("problem3").textContent = "Arrived Broken";
        document.getElementById("problem4").textContent = "Stopped Working";
        document.getElementById("problem5").textContent = "A Part Broke";
        document.getElementById("problem6").textContent = "Other";
        document.getElementById("image-label").textContent = "Image";
        document.getElementById("action").textContent = "Preferred Course of Action *";
        document.getElementById("return-label").textContent = "Return";
        document.getElementById("replace-label").textContent = "Replace";
        document.getElementById("refund-label").textContent = "Refund";
        document.getElementById("comment-label").textContent = "Additional Comments";
        document.getElementById("complaint-submit").textContent = "Submit Complaint";
        document.getElementById("warning").textContent = "Highlighted missing required fields!";
    }
}
function setLangTextSK() {
    document.getElementById("main-page").textContent = "Hlavná Stránka";
    document.getElementById("contact").textContent = "Kontakt";
    document.getElementById("list").textContent = "Zoznam Produktov";
    if (theme === "dark") {
        document.getElementById("change-theme").textContent = "Bledá Téma";
    }
    else {
        document.getElementById("change-theme").textContent = "Tmavá Téma";
    }
    document.getElementById("footer-p1").textContent = "Produkty ktoré každý miluje";
    document.getElementById("footer-p2").textContent = "Naše produkty";
    document.getElementById("footer-p3").textContent = "Najobľúbenejší product";
    document.getElementById("footer-p4").textContent = "Sme tu pre vás";
    document.getElementById("footer-p5").textContent = "Náš kontakt";
    document.getElementById("footer-p6").textContent = "Reklamácia";
    if (form) {
        document.getElementById("complaint-h2").textContent = "Podaj Reklamáciu";
        document.getElementById("title1").textContent = "Osobné Detaily";
        document.getElementById("title2").textContent = "Adresa";
        document.getElementById("title3").textContent = "Reklamácia";
        document.getElementById("name-label").textContent = "Meno *";
        document.getElementById("email-label").textContent = "Email *";
        document.getElementById("street-label").textContent = "Ulica *";
        document.getElementById("house-number-label").textContent = "Číslo Domu";
        document.getElementById("city-label").textContent = "Mesto *";
        document.getElementById("county-label").textContent = "Okres";
        document.getElementById("country-label").textContent = "Štát *";
        document.getElementById("product-label").textContent = "Vyber Typ Produktu";
        document.getElementById("product0").textContent = "--Vyber produkt--";
        document.getElementById("product1").textContent = "Produkt 1";
        document.getElementById("product2").textContent = "Produkt 2";
        document.getElementById("product3").textContent = "Produkt 3";
        document.getElementById("product4").textContent = "Produkt 4";
        document.getElementById("product5").textContent = "Produkt 5";
        document.getElementById("product6").textContent = "Produkt 6";
        document.getElementById("product7").textContent = "Produkt 7";
        document.getElementById("product8").textContent = "Produkt 8";
        document.getElementById("product9").textContent = "Produkt 9";
        document.getElementById("product10").textContent = "Produkt 10";
        document.getElementById("order-number-label").textContent = "Číslo Objednávky *";
        document.getElementById("problem-label").textContent = "Nájdený Problém *";
        document.getElementById("problem-label1").setAttribute("value", "Pri Dovážke");
        document.getElementById("problem-label2").setAttribute("value", "V Rámci Záruky");
        document.getElementById("problem-label3").setAttribute("value", "Iné");
        document.getElementById("problem0").textContent = "--Vybera problém--";
        document.getElementById("problem1").textContent = "Nedorazil";
        document.getElementById("problem2").textContent = "Dorazil Neúplný";
        document.getElementById("problem3").textContent = "Dorazil Pokazenýn";
        document.getElementById("problem4").textContent = "Prestal Fungovať";
        document.getElementById("problem5").textContent = "Súčiatka sa Pokazila";
        document.getElementById("problem6").textContent = "Iné";
        document.getElementById("image-label").textContent = "Obrázok";
        document.getElementById("action").textContent = "Preferovaný postup *";
        document.getElementById("return-label").textContent = "Vrátiť";
        document.getElementById("replace-label").textContent = "Vymeniť";
        document.getElementById("refund-label").textContent = "Uhradiť";
        document.getElementById("comment-label").textContent = "Ďalšie Komentáre";
        document.getElementById("complaint-submit").textContent = "Podať Reklamáciu";
        document.getElementById("warning").textContent = "Zvýraznenili sa chýbajúce povinné polia!";
    }
}
function setLangTextDE() {
    document.getElementById("main-page").textContent = "Die Startseite";
    document.getElementById("contact").textContent = "Der Kontakt";
    document.getElementById("list").textContent = "Die Produktliste";
    if (theme === "dark") {
        document.getElementById("change-theme").textContent = "Helles Thema";
    }
    else {
        document.getElementById("change-theme").textContent = "Dunkles Design";
    }
    document.getElementById("footer-p1").textContent = "Produkte, die jeder liebt";
    document.getElementById("footer-p2").textContent = "Unsere Produkte";
    document.getElementById("footer-p3").textContent = "Der Beliebtestes Produkt";
    document.getElementById("footer-p4").textContent = "Wir sind für Sie da";
    document.getElementById("footer-p5").textContent = "Unser Kontakt";
    document.getElementById("footer-p6").textContent = "Beschwerde";
    if (form) {
        document.getElementById("complaint-h2").textContent = "Einreicht eine Beschwerde";
        document.getElementById("title1").textContent = "Persönliche Daten";
        document.getElementById("title2").textContent = "Adresse";
        document.getElementById("title3").textContent = "Beschwerdedetails";
        document.getElementById("name-label").textContent = "Name *";
        document.getElementById("email-label").textContent = "Kontakt-E-Mail *";
        document.getElementById("street-label").textContent = "die Straße *";
        document.getElementById("house-number-label").textContent = "das Hausnummer";
        document.getElementById("city-label").textContent = "die Stadt *";
        document.getElementById("county-label").textContent = "der Landkreis";
        document.getElementById("country-label").textContent = "das Land *";
        document.getElementById("product-label").textContent = "Wählen Sie einen Produkttyp aus";
        document.getElementById("product0").textContent = "--Wählen Sie eine Ware aus--";
        document.getElementById("product1").textContent = "die Ware 1";
        document.getElementById("product2").textContent = "die Ware 2";
        document.getElementById("product3").textContent = "die Ware 3";
        document.getElementById("product4").textContent = "die Ware 4";
        document.getElementById("product5").textContent = "die Ware 5";
        document.getElementById("product6").textContent = "die Ware 6";
        document.getElementById("product7").textContent = "die Ware 7";
        document.getElementById("product8").textContent = "die Ware 8";
        document.getElementById("product9").textContent = "die Ware 9";
        document.getElementById("product10").textContent = "die Ware 10";
        document.getElementById("order-number-label").textContent = "Bestellnummer *";
        document.getElementById("problem-label").textContent = "Aufgetretene Problem *";
        document.getElementById("problem-label1").setAttribute("value", "bei Ankunft");
        document.getElementById("problem-label2").setAttribute("value", "Innerhalb der Garantie");
        document.getElementById("problem-label3").setAttribute("value", "Andere");
        document.getElementById("problem0").textContent = "--Wählen Sie ein Problem aus--";
        document.getElementById("problem1").textContent = "Ist nie angekommen";
        document.getElementById("problem2").textContent = "Unvollständig angekommen";
        document.getElementById("problem3").textContent = "Unvollständig kaputt";
        document.getElementById("problem4").textContent = "Funktioniert nicht mehr";
        document.getElementById("problem5").textContent = "Ein Teil ist kaputt";
        document.getElementById("problem6").textContent = "Andere";
        document.getElementById("image-label").textContent = "Bild";
        document.getElementById("action").textContent = "Bevorzugte Vorgehensweise *";
        document.getElementById("return-label").textContent = "Zurückkehren";
        document.getElementById("replace-label").textContent = "Ersetzen";
        document.getElementById("refund-label").textContent = "Erstattung";
        document.getElementById("comment-label").textContent = "Weitere Kommentare";
        document.getElementById("complaint-submit").textContent = "Beschwerde einreichen";
        document.getElementById("warning").textContent = "Fehlende Pflichtfelder wurden hervorgehoben!";
    }
}