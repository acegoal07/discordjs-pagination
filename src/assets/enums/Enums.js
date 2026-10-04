module.exports = {
   /**
    * @readonly
    * @enum {number}
    */
   ContextType: Object.freeze({
      Interaction: 2,
      Message: 1,
      Unknown: 0
   }),

   /**
    * @readonly
    * @enum {number}
    */
   PageType: Object.freeze({
      ComponentsV2: 1,
      Standard: 0
   }),

   /**
    * @readonly
    * @enum {number}
    */
   ButtonAction: Object.freeze({
      Callback: 6,
      Delete: 5,
      End: 4,
      Start: 3,
      Back: 2,
      Next: 1,
      Unset: 0
   }),

   /**
    * @readonly
    * @enum {number}
    */
   TimeoutEnding: Object.freeze({
      DeleteButtons: 2,
      DeletePagination: 1,
      DisableButtons: 0
   }),

   /**
    * @readonly
    * @enum {number}
    */
   MessageResponseType: Object.freeze({
      Reply: 1,
      Send: 0
   })
};
