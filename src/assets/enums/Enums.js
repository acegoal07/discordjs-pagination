/**
 * @readonly
 * @enum {number}
 */
const ContextType = Object.freeze({
   Unknown: 0,
   Message: 1,
   Interaction: 2
});

/**
 * @readonly
 * @enum {number}
 */
const PageType = Object.freeze({
   Embed: 0,
   Image: 1,
   Text: 2,
   Container: 3
});

/**
 * @readonly
 * @enum {number}
 */
const ButtonAction = Object.freeze({
   Next: 0,
   Back: 1,
   Start: 2,
   End: 3,
   Delete: 4
});

/**
 * @readonly
 * @enum {number}
 */
const TimeoutEnding = Object.freeze({
   DisableButtons: 0,
   DeletePagination: 1,
   DeleteButtons: 2
});

/**
 * @readonly
 * @enum {number}
 */
const MessageResponseType = Object.freeze({
   Send: 0,
   Reply: 1
});

module.exports = { ContextType, PageType, ButtonAction, TimeoutEnding, MessageResponseType };