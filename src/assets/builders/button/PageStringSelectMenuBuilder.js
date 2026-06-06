const { StringSelectMenuBuilder } = require("discord.js"),
   { ButtonAction } = require("../../enums/Enums");

/**
 * Used to build string select menus for the pagination
 */
class PageStringSelectMenuBuilder extends StringSelectMenuBuilder {
   constructor() {
      super();

      /**
       * @type {ButtonAction}
       */
      this.action = ButtonAction.Callback;

      /**
       * @type {Function}
       */
      this.callback = null;
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

module.exports = PageStringSelectMenuBuilder;