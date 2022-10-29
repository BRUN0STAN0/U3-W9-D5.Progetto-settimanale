class Utente {
  nome: string;
  cognome: string;
  smartphone?: Smartphone;

  constructor(nome: string, cognome: string) {
    this.nome = nome;
    this.cognome = cognome;
  }
}

abstract class Smartphone {
  carica = 0;
  numeroChiamate = 0;
  modello?: string;
  setRicarica(number: number): number {
    return (this.carica += number);
  }
  minutiDurata(minuti: number): void {
    if (this.carica < 0.2) {
      alert("Non hai credito sufficiente. Ricarica la scheda!");
    } else {
      this.carica -= minuti * 0.2;
      this.numeroChiamate++;
    }
  }
  numero404(): number {
    return this.carica;
  }
  getNumeroChiamata(): number {
    return this.numeroChiamate;
  }
  azzeraChiamate(): void {
    this.numeroChiamate = 0;
  }
}

class Iphone extends Smartphone {
  modello = "Iphone";
}
class SamsungGalaxy extends Smartphone {
  modello = "SamsungGalaxy";
}

let utente: Utente;
let nuovoSmartphone: Smartphone;

//! START GLOBAL VARIABLES FROM DOM
let iphoneContainer: HTMLDivElement;
let samsungGalaxyContainer: HTMLDivElement;
let iphone: HTMLImageElement;
let samsungGalaxy: HTMLImageElement;
let iphone_blank: HTMLImageElement;
let samsungGalaxy_blank: HTMLImageElement;

let tastieraChiamata: HTMLDivElement;
let title: HTMLHeadElement;
let home: HTMLHeadElement;
let smartphones: any;
let display: HTMLDivElement;

let homepage: HTMLDivElement;
let container: HTMLDivElement;
let procediButton: HTMLButtonElement;
let nome: HTMLInputElement;
let cognome: HTMLInputElement;

let outputNumeri: HTMLInputElement;

let inizioChiamata: HTMLSpanElement;
let fineChiamata: HTMLSpanElement;
let credito: any;
let numeroChiamate: any;
let aggiungiRicarica: any;
let charge: string | null;
let call: string | null;
let numbers: any;
let objectDisplay: HTMLDivElement;

//* END GLOBAL VARIABLES FROM DOM

window.onload = () => {
  getDOM();
};

function getDOM() {
  iphoneContainer = document.querySelector("#iphone") as HTMLDivElement;
  samsungGalaxyContainer = document.querySelector("#samsung-galaxy") as HTMLDivElement;
  iphone = document.querySelector("#iphone-start-img") as HTMLImageElement;
  samsungGalaxy = document.querySelector("#samsung-galaxy-start-img") as HTMLImageElement;
  iphone_blank = document.querySelector("#iphone-img") as HTMLImageElement;
  samsungGalaxy_blank = document.querySelector("#samsung-galaxy-img") as HTMLImageElement;
  smartphones = document.querySelectorAll(".smartphone");
  title = document.querySelector("#title") as HTMLHeadElement;
  home = document.querySelector("#home") as HTMLHeadElement;
  display = document.querySelector("#display") as HTMLDivElement;
  tastieraChiamata = document.querySelector("#tastiera-chiamata") as HTMLDivElement;

  procediButton = document.querySelector("#procedi") as HTMLButtonElement;
  homepage = document.querySelector("#homepage") as HTMLDivElement;
  container = document.querySelector("#container") as HTMLDivElement;
  nome = document.querySelector("#nome-input") as HTMLInputElement;
  cognome = document.querySelector("#cognome-input") as HTMLInputElement;
  inizioChiamata = document.querySelector("#inizio-chiamata") as HTMLSpanElement;
  fineChiamata = document.querySelector("#fine-chiamata") as HTMLSpanElement;
  outputNumeri = document.querySelector("#output-numeri") as HTMLInputElement;
  credito = document.querySelectorAll("#credito");
  numeroChiamate = document.querySelectorAll("#numero-chiamate");
  aggiungiRicarica = document.querySelectorAll("#aggiungi-ricarica");
  numbers = document.querySelectorAll(".number");
  objectDisplay = document.querySelector("#object-display") as HTMLDivElement;

  fineChiamata.addEventListener("click", resetCall);
  for (let number of numbers) number.addEventListener("click", (e: any) => (outputNumeri.value += e.target.id));
  for (let aggRic of aggiungiRicarica) aggRic.addEventListener("click", addCharge);
  inizioChiamata.addEventListener("click", startCall);
  procediButton.addEventListener("click", nuovoUtente);
  for (let smartphone of smartphones) smartphone.addEventListener("click", chooseSmartphone);
}

//* QUI SI CREA UN NUOVO UTENTE
function nuovoUtente() {
  utente = new Utente(nome.value, cognome.value);
  homepage.style.display = "none";
  container.style.display = "flex";
}

//* QUI SI CREA UN NUOVO SMARTPHONE
function chooseSmartphone(eventClick: any) {
  display.style.display = "block";
  if (eventClick.target.id === "iphone-start-img") {
    iphone.style.display = "none";
    iphone_blank.style.display = "block";
    samsungGalaxyContainer.style.display = "none";
    iphoneContainer.removeEventListener("click", chooseSmartphone);
    nuovoSmartphone = new Iphone();
    utente.smartphone = nuovoSmartphone;
    console.log(utente);
    nextPage();
  } else {
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
  for (let num of numeroChiamate) num.innerHTML = String(nuovoSmartphone.getNumeroChiamata());
  for (let credit of credito) credit.innerHTML = String(nuovoSmartphone.carica);
  console.log(utente);
  displayObject();
}

function resetCall() {
  charge = String(nuovoSmartphone.azzeraChiamate());
  outputNumeri.value = "";
  alert("Hai resettato il numero di chiamate!");
  for (let num of numeroChiamate) num.innerHTML = String(nuovoSmartphone.getNumeroChiamata());
  console.log(utente);
  displayObject();
}

function addCharge() {
  charge = prompt("Quanto vuoi caricare?", "10");
  nuovoSmartphone.carica = Number(nuovoSmartphone.setRicarica(Number(charge)));
  for (let credit of credito) credit.innerHTML = String(nuovoSmartphone.carica);
  for (let num of numeroChiamate) num.innerHTML = String(nuovoSmartphone.getNumeroChiamata());
  console.log(utente);
  displayObject();
}

function displayNumber() {
  outputNumeri.value = "prova";
}

function displayObject() {
  objectDisplay.style.display = "block";
  objectDisplay.innerHTML = `               --- CONSOLE LOG --- <br>
                                            ▼ Utente {nome<: <i>'${utente.nome}'</i>, cognome<: <i>'${utente.cognome}'</i>, smartphone: ${utente.smartphone?.modello}} ℹ️ <br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;           cognome:  <i>"${utente.cognome}"</i> <br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;           nome: <i>"${utente.nome}"</i><br>
  &nbsp;&nbsp;&nbsp;                           ▼ smartphone: Iphone {carica: <i>${nuovoSmartphone.carica}</i>, numeroChiamate: <i>${nuovoSmartphone.numeroChiamate}</i>, modello: <i>'${nuovoSmartphone.modello}'</i>}<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  carica: <i>${nuovoSmartphone.carica}</i> <br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  modello: <i>"${nuovoSmartphone.modello}"</i><br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  numeroChiamate: <i>${nuovoSmartphone.numeroChiamate}</i>
  `;
}
