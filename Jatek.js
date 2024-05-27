// Jatek.js


import { Allapot } from './Allapot.js';
import { JatekTer } from './JatekTer.js';
import {JatekAkcio } from './JatekAkcio.js'









$(window).on("kapcsolat", () => {

  const allapot = new Allapot();
  const jatekter = new JatekTer(palyaElem, allapot);
  const jatekakcio = new JatekAkcio(allapot);

});











