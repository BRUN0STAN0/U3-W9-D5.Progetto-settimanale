"use strict";
class Utente {
    constructor(nome, cognome) {
        this.nome = nome;
        this.cognome = cognome;
    }
}
class Smartphone {
    constructor() {
        this.carica = 0;
        this.numeroChiamate = 0;
    }
    setRicarica(number) {
        return (this.carica += number);
    }
    minutiDurata(minuti) {
        if (this.carica < 0.2) {
            alert("Non hai credito sufficiente. Ricarica la scheda!");
        }
        else {
            this.carica -= minuti * 0.2;
            this.numeroChiamate++;
        }
    }
    numero404() {
        return this.carica;
    }
    getNumeroChiamata() {
        return this.numeroChiamate;
    }
    azzeraChiamate() {
        this.numeroChiamate = 0;
    }
}
class Iphone extends Smartphone {
}
class SamsungGalaxy extends Smartphone {
}
let utente;
let nuovoSmartphone;
//! START GLOBAL VARIABLES FROM DOM
let iphoneContainer;
let samsungGalaxyContainer;
let iphone;
let samsungGalaxy;
let iphone_blank;
let samsungGalaxy_blank;
let tastieraChiamata;
let title;
let home;
let smartphones;
let paragraphs;
let homepage;
let container;
let procediButton;
let nome;
let cognome;
let outputNumeri;
let inizioChiamata;
let fineChiamata;
let credito;
let numeroChiamate;
let aggiungiRicarica;
let charge;
let call;
//* END GLOBAL VARIABLES FROM DOM
window.onload = () => {
    getDOM();
};
function getDOM() {
    iphoneContainer = document.querySelector("#iphone");
    samsungGalaxyContainer = document.querySelector("#samsung-galaxy");
    iphone = document.querySelector("#iphone-start-img");
    samsungGalaxy = document.querySelector("#samsung-galaxy-start-img");
    iphone_blank = document.querySelector("#iphone-img");
    samsungGalaxy_blank = document.querySelector("#samsung-galaxy-img");
    smartphones = document.querySelectorAll(".smartphone");
    title = document.querySelector("#title");
    home = document.querySelector("#home");
    paragraphs = document.querySelectorAll("p");
    tastieraChiamata = document.querySelector("#tastiera-chiamata");
    procediButton = document.querySelector("#procedi");
    homepage = document.querySelector("#homepage");
    container = document.querySelector("#container");
    nome = document.querySelector("#nome-input");
    cognome = document.querySelector("#cognome-input");
    inizioChiamata = document.querySelector("#inizio-chiamata");
    fineChiamata = document.querySelector("#fine-chiamata");
    outputNumeri = document.querySelector("#output-numeri");
    credito = document.querySelectorAll("#credito");
    numeroChiamate = document.querySelectorAll("#numero-chiamate");
    aggiungiRicarica = document.querySelectorAll("#aggiungi-ricarica");
    fineChiamata.addEventListener("click", resetCall);
    for (let aggRic of aggiungiRicarica) {
        aggRic.addEventListener("click", addCharge);
    }
    inizioChiamata.addEventListener("click", startCall);
    procediButton.addEventListener("click", nuovoUtente);
    for (let smartphone of smartphones) {
        smartphone.addEventListener("click", chooseSmartphone);
    }
}
function nuovoUtente() {
    utente = new Utente(nome.value, cognome.value);
    homepage.style.display = "none";
    container.style.display = "flex";
}
function chooseSmartphone(eventClick) {
    for (let paragraph of paragraphs) {
        paragraph.style.display = "block";
    }
    if (eventClick.target.id === "iphone-start-img") {
        iphone.style.display = "none";
        iphone_blank.style.display = "block";
        samsungGalaxyContainer.style.display = "none";
        iphoneContainer.removeEventListener("click", chooseSmartphone);
        nuovoSmartphone = new Iphone();
        utente.smartphone = nuovoSmartphone;
        console.log(utente);
        nextPage();
    }
    else {
        samsungGalaxy.style.display = "none";
        samsungGalaxy_blank.style.display = "block";
        iphoneContainer.style.display = "none";
        samsungGalaxyContainer.removeEventListener("click", chooseSmartphone);
        nuovoSmartphone = new SamsungGalaxy();
        utente.smartphone = nuovoSmartphone;
        console.log(utente);
        nextPage();
    }
}
function nextPage() {
    tastieraChiamata.style.display = "flex";
    home.style.display = "block";
    title.style.display = "none";
}
function startCall() {
    call = prompt("Quanti minuti durerà questa chiamata?", "");
    nuovoSmartphone.minutiDurata(Number(call));
    for (let num of numeroChiamate)
        num.innerHTML = String(nuovoSmartphone.getNumeroChiamata());
    for (let credit of credito)
        credit.innerHTML = String(nuovoSmartphone.carica);
    console.log(utente);
}
function resetCall() {
    charge = String(nuovoSmartphone.azzeraChiamate());
    for (let num of numeroChiamate)
        num.innerHTML = String(nuovoSmartphone.getNumeroChiamata());
    console.log(utente);
}
function addCharge() {
    charge = prompt("Quanto vuoi caricare?", "10");
    nuovoSmartphone.carica = Number(nuovoSmartphone.setRicarica(Number(charge)));
    for (let credit of credito)
        credit.innerHTML = String(nuovoSmartphone.carica);
    for (let num of numeroChiamate)
        num.innerHTML = String(nuovoSmartphone.getNumeroChiamata());
    console.log(utente);
}
