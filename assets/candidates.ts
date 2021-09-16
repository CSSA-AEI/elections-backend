/* eslint-disable */

/**
 * An object containing the candidates for the current election
 * Must follow the format mentioned in the README (i.e {[name: 'First Name Last Name', val: 'Last Name']})
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
  PRES: [{ name: 'First Last', val: 'last' }],
  FNCE: [{ name: 'First Last', val: 'last' }],
  ACDM: [{ name: 'First Last', val: 'last' }],
  COMS: [{ name: 'First Last', val: 'last' }],
  INTR: [{ name: 'First Last', val: 'last' }],
  EXTR: [{ name: 'First Last', val: 'last' }],
  SOCL: [{ name: 'First Last', val: 'last' }],
  PHIL: [{ name: 'First Last', val: 'last' }],
  EQUT: [{ name: 'First Last', val: 'last' }],
  EXAF: [{ name: 'First Last', val: 'last' }],
  INTE: [{ name: 'First Last', val: 'last' }],
};

export default CANDIDATES;
