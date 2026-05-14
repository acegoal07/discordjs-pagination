const { ButtonBuilder } = require("discord.js"),
   { ButtonAction } = require("../../enums/Enums");

/**
 * Used to build the buttons for the pagination
 */
module.exports = class PageButtonBuilder extends ButtonBuilder {
   constructor() {
      super();

      /**
       * @type {ButtonAction}
       */
      this.action = ButtonAction.Unset;

      /**
       * @type {Function}
       */
      this.callback = null;
   }

   /**
    * Set's the action for the button
    * @param {ButtonAction} action
    * @returns {PageButtonBuilder}
    */
   setAction(action = null) {
      if (this.action == ButtonAction.Unset && action != null) {
         this.action = action;
      }
      return this;
   }

   /**
    * Adds a callback for callback specified buttons
    * @param {Function} callback
    * @returns {PageButtonBuilder}
    */
   setCallback(callback = null) {
      if (!this.callback && callback != null) {
         this.callback = callback;
      }
      return this;
   }
}