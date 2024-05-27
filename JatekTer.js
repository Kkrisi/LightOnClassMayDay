// JatekTer.js

import { Allapot } from './Allapot.js';



export class JatekTer {

    #mezo;
    #allapot;   //meret.Szam miatt

    constructor(mezo, allapot) {
        this.#mezo = mezo;
        this.#allapot = allapot;
        this.#negyzetGeneralas();
        this.randomizacio();
    }

    
    // Pálya létrehozása
    #negyzetGeneralas() {
        const mezo = document.getElementById("palya");
        let txt = "";
        for (let i = 0; i < Math.pow(this.#allapot.meretSzam, 2); i++) {
            txt += `<div class="kocka${i} kocka"><br></div>`;
        }
        this.#mezo.innerHTML = txt;
    }


    // Pálya négyzeteinek színének megkeverése
    randomizacio() {
    for (let i = 0; i < 5; i++) {
      const randSor = Math.floor(Math.random() * this.#allapot.meretSzam);
      const randOszlop = Math.floor(Math.random() * this.#allapot.meretSzam);
  
      
      const randIndex = randSor * this.#allapot.meretSzam + randOszlop;
      const randNegyzet = document.querySelector(`.kocka${randIndex}`);
  
      if (randNegyzet) {
        randNegyzet.click();
      }
    }
  }
  
}


