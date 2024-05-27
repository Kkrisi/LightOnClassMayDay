// JatekAkcio.js

import { JatekTer } from "./JatekTer";



export class JatekAkcio {

  #allapot;  
  #eltelt = 0;
  #elteltPerc = 0;
  #elkezdodott = false;
  #klikk = 0;
  #stopperSzoveg;


  constructor(allapot) {
      this.#allapot = allapot;
      this.#kattintas();
      this.#szomszedotSzinez();
      this.#ujKor();
      this.#hanyszorHany();
      this.#kattintasSzamlalo();
      this.#stopperSzamolas();
      this.#stopperKiiras();
      this.#stopperMeghivas();
  }





  // Pálya életre keltése

  #kattintas() {
    $("#palya").on("click", ".kocka", function () {
      $(this).toggleClass("kockaValtozott");
      let index = $(this).index();
      let sor = Math.floor(index / this.#allapot.meretSzam);
      let oszlop = index % this.#allapot.meretSzam;

      let felsoIndex = (sor - 1) * this.#allapot.meretSzam + oszlop;
      let alsoIndex = (sor + 1) * this.#allapot.meretSzam + oszlop;
      let balIndex = sor * this.#allapot.meretSzam + oszlop - 1;
      let jobbIndex = sor * this.#allapot.meretSzam + oszlop + 1;


      if (sor > 0) this.#szomszedotSzinez(felsoIndex); 
      if (oszlop < this.#allapot.meretSzam - 1) this.#szomszedotSzinez(jobbIndex);

      //nyertesKiir();
    });
  }


  
  // Szomszédos négyzetek színváltásához

  #szomszedotSzinez(index) {
    $(".kocka").eq(index).toggleClass("kockaValtozott");
  }









  // Játék újrakezdése

  #ujKor() {
    const kezelesDiv = $(".kezeles");
    kezelesDiv.html(`<button class="ujKor">Új kör</button>`);

    kezelesDiv.on("click", ".ujKor", function () {   //a .kezeles HTML-tartalmát a függvény minden egyes meghívásakor egy új gombra cseréli. Ez a megközelítés eltávolítja az előző gombhoz csatolt eseménykezelőket.
      $(".kocka").removeClass("kockaValtozott");
      this.#eltelt = 0;
      this.#elteltPerc = 0;
      this.randomizacio();
      this.#klikk = 0;
      const szamlalo = $(".szamlalo");
      szamlalo.html(`<p>Kattintások száma: 0</p>`);
    });
  }






  // Pálya méretének megadása

  #hanyszorHany() {
    let grid = "";
    const kezelesDiv = $(".kezeles");
    kezelesDiv.append(`<button class="hanyszorHany">Méretállítás</button>`);

    $(".hanyszorHany").on("click", function () {
      this.#allapot.meretSzam = this.#allapot.meretSzam === 3 ? 5 : 3; // ha 3 akkor 5 lesz, ha 3 akkor 5 lesz

      const palya = document.querySelector('#palya');
      palya.innerHTML = ''; // Azért töröljük mert már új a meretSzam-unk és mást kell legenerálnia, új változó értékkel


      const jatekTer = new JatekTer(palya, this.#allapot);
      jatekTer.randomizacio();


      grid = ""; // Alaphelyzetbe állítása
      for (let i = 0; i < this.#allapot.meretSzam; i++) {
        grid += '1fr ';
      }
      palya.style.gridTemplateColumns = grid;

      const kocka = document.querySelectorAll('.kocka');
      kocka.forEach((kocka) => {
        kocka.style.width = '100%';
        kocka.style.height = '7em';
      });

      this.#eltelt = 0;
      this.#elteltPerc = 0;
      this.#klikk = 0;

      const szamlalo = $(".szamlalo");
      szamlalo.html(`<p>Kattintások száma: 0</p>`);


      if (this.#allapot.meretSzam === 3) {
        palya.style.maxWidth = '400px';
        palya.style.margin = '0% 20%';
      } else {
        palya.style.maxWidth = '600px';
        palya.style.margin = '0% 0%';
      }
    });
  }





  // Lépészszámláló

  #kattintasSzamlalo() {
    const szamlalo = $(".szamlalo");
    $("#palya").on("click", ".kocka", function () { // A későbbi méretváltoztatások miatt szükséges
      this.#klikk += 1;
      this.#elkezdodott = true;
      szamlalo.html(`<br><br><p>Kattintások száma: ${this.#klikk}</p>`);
    });
  }



  // Stopper

  #stopperSzamolas() {
    setInterval(function () {
      if (this.#elkezdodott) {
        this.#eltelt += 1;
        this.#stopperKiiras();
        if (this.#eltelt == 60) {
          this.#elteltPerc += 1;
          this.#eltelt = 0;66
        }
      }
    }, 1000);
  }


  #stopperKiiras() {
    const stopperHtml = $(".stopper");
    if (this.#elteltPerc > 0) {
      this.#stopperSzoveg = `<br><br><p>${this.#elteltPerc} perc és ${this.#eltelt} másodperc telt el</p>`;
    } else {
      this.#stopperSzoveg = `<br><br><p>${this.#eltelt} másodperc telt el</p>`;
    }
    stopperHtml.html(this.#stopperSzoveg);
  }


  #stopperMeghivas() {
    this.#stopperSzamolas();
  }



}





