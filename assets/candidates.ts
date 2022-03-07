/* eslint-disable */

/**
 * An object containing the candidates for the current election
 * Must follow the format mentioned in the README (i.e {[name: 'FirstName LastName', val: 'lastname']})
 * 
 * PRES - President
 * FNCE - VP Finance
 * ACDM - VP Academic
 * COMS - VP Communications
 * INTR - VP Internal
 * EXTR - VP External
 * SOCL - VP Social
 * PHIL - VP Philanthropy
 * EQUT - VP Equity
 * EXAF - VP Executive Affairs
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
const CANDIDATES = {
  PRES: [{ name: 'Mario', val: 'mario' }, { name: 'Waluigi', val: 'waluigi' }],
  FNCE: [{ name: 'Yoshi', val: 'yoshi' }, { name: 'Bowser', val: 'bowser' }],
  ACDM: [{ name: 'Toad', val: 'toad' }, { name: 'Luigi', val: 'luigi' }],
  COMS: [{ name: 'Wario', val: 'wario' }, { name: 'Princess Daisy', val: 'daisy' }],
  INTR: [{ name: 'Rosalina', val: 'rosalina' }, { name: 'Diddy Kong', val: 'diddy' }],
  EXTR: [{ name: 'Princess Peach', val: 'peach' }, { name: 'Birdo', val: 'birdo' }],
  SOCL: [{ name: 'Donkey Kong', val: 'donkey' }, { name: 'Kamek', val: 'kamek' }],
  PHIL: [{ name: 'King Boo', val: 'boo' }],
  EQUT: [{ name: 'Bowser JR', val: 'bowserjr' }],
  EXAF: [{ name: 'Baby Mario', val: 'babymario' }],
  INTE: [{ name: 'Goomba', val: 'goomba' }],
};

export default CANDIDATES;
