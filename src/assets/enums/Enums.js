module.exports = { ContextType, PageType, ButtonAction };

/**
 * @readonly
 * @enum {number}
 */
const ContextType = Object.freeze({
   unknown: 0,
   message: 1,
   interaction: 2
});

/**
 * @readonly
 * @enum {number}
 */
const PageType = Object.freeze({
   embed: 0,
   image: 1
});

/**
 * @readonly
 * @enum {number}
 */
const ButtonAction = Object.freeze({
   next: 0,
   back: 1,
   start: 2,
   end: 3,
   delete: 4
});