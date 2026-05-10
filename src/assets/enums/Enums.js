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
   Standard: 0,
   ComponentsV2: 1
});

/**
 * @readonly
 * @enum {number}
 */
const ButtonAction = Object.freeze({
   Unset: 0,
   Next: 1,
   Back: 2,
   Start: 3,
   End: 4,
   Delete: 5,
   Callback: 6
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