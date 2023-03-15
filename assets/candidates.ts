/* eslint-disable */

/**
 * An object containing the candidates for the current election
 * Must follow the format mentioned in the README (i.e {[name: 'FirstName LastName', val: 'lastname']})
 * 
 * PRES - President
 * FNCE - VP Finance
 * ACDM - VP Academic
 * SOCL - VP Social
 * COMS - VP Communications
 * INTR - VP Internal
 * EXTR - VP External
 * PHIL - VP Philanthropy
 * EQUT - VP Equity
 * EXAF - VP Executive Affairs
 * LGST - VP Logistics
 * INTE - VP Information Technology
 *
 * @example
 * FNCE: [{ name: 'Omer Abubaker', val: 'abubaker' }]
 *
 * @example
 * FNCE: [
 *  { name: 'Omer Abubaker', val: 'abubaker' },
 *  { name: 'Sami Ben-Moussa', val: 'benmoussa' }
 * ]
 */

/** @note - Mario candidates are for demo purposes only */
// const CANDIDATES = {
//   PRES: [{ name: 'Mario', val: 'mario' }, { name: 'Waluigi', val: 'waluigi' }],
//   FNCE: [{ name: 'Yoshi', val: 'yoshi' }, { name: 'Bowser', val: 'bowser' }],
//   ACDM: [{ name: 'Toad', val: 'toad' }, { name: 'Luigi', val: 'luigi' }],
//   SOCL: [{ name: 'Donkey Kong', val: 'donkey' }, { name: 'Kamek', val: 'kamek' }],
//   COMS: [{ name: 'Wario', val: 'wario' }, { name: 'Princess Daisy', val: 'daisy' }],
//   INTR: [{ name: 'Rosalina', val: 'rosalina' }, { name: 'Diddy Kong', val: 'diddy' }],
//   EXTR: [{ name: 'Princess Peach', val: 'peach' }],
//   PHIL: [{ name: 'King Boo', val: 'boo' }],
//   EQUT: [{ name: 'Bowser JR', val: 'bowserjr' }],
//   EXAF: [{ name: 'Baby Mario', val: 'babymario' }],
//   LGST: [{ name: 'Birdo', val: 'birdo' }],
//   INTE: [{ name: 'Goomba', val: 'goomba' }],
// };

/** @note - Be aware in case of identical last names within the same position! */
const CANDIDATES = {
  PRES: [{ name: 'Tomer Szulsztein', val: 'szulsztein' }],
  FNCE: [{ name: 'Aashish Suresh', val: 'suresh' }],
  ACDM: [{ name: 'Ali Raza Bhangu', val: 'bhangu' }],
  SOCL: [
    { name: 'Meriem Mostefai', val: 'mostefai' },
    { name: 'Alex Ajersch', val: 'ajersch' }
  ],
  COMS: [],
  INTR: [
    { name: 'Cedric Luiz Dimatulac', val: 'dimatulac' },
    { name: 'Rachel Olugbemiro', val: 'olugbemiro' },
    { name: 'Sami Hassan', val: 'hassan' },
  ],
  EXTR: [
    { name: 'Erik Ang', val: 'ang' },
    { name: 'Zahra Suleymanova', val: 'suleymanova' },
  ],
  PHIL: [{ name: 'Fay Lee', val: 'lee' }],
  EQUT: [{ name: 'Chelsea Brown', val: 'brown' },],
  EXAF: [{ name: 'Angeleeca Jocson', val: 'jocson' }],
  LGST: [{ name: 'Tim Mao', val: 'mao' },],
  INTE: [{ name: 'Aydin Yalcinkaya', val: 'yalcinkaya' }],
};

export default CANDIDATES;
