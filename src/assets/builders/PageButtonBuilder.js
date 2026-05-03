const { ButtonBuilder } = require('discord.js'),
   { ButtonAction } = require('../enums/Enums');

/**
 * Used to build the buttons for the pagination
 */
module.exports = class PageButtonBuilder extends ButtonBuilder {
   constructor() {
      super();

      /**
       * @type {ButtonAction}
       */
      this.action = null;
   }

   /**
    * @param {ButtonAction} action
    * @returns {PageButtonBuilder}
    */
   setAction(action = null) {
      this.action = action;
      return this;
   }
}