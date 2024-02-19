/**
 * @typedef {string} alertmsg Message to display on alert
 * @typedef {Object} alertdesc Description of the alert such as how long it dhould stay open
 * @property {"success"|"error"|"info"|"warning"} [desc.type] The type of alert. Can be `error`/`success`/`warning`/`info`.
 * @property {number} [desc.openDuration] Duration in **milliseconds** the alert should stay open. Defaults to null i.e never closes.
 * @property {boolean} [desc.closeOnClickAway] Close when you click outside the alert.
 */

export {};
