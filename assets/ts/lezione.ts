// ! Interfaccia

interface Navigatore {
  start(): void;
  stop(): void;
  setMap(): void;
  avviaPercorso(): void;
}

//* Si deve rispondere alla domanda Automobile "HA UN ...?" NAVIGATORE??? Si. Allora 'implements'

//* Mentre quando estendi una classe con 'extends' la domanda è: "E' UN...?" NAVIGAOTRE? No. Alllora niente "extends".

class Automobile implements Navigatore {
  start(): void {
    throw new Error("Method not implemented.");
  }
  stop(): void {
    throw new Error("Method not implemented.");
  }
  setMap(): void {
    throw new Error("Method not implemented.");
  }
  avviaPercorso(): void {
    throw new Error("Method not implemented.");
  }
}

// class Iphone extends Smartphone {}

// let iphone = new Iphone();
// let ut1 = new Utente();
// ut1.smartphone = iphone;
