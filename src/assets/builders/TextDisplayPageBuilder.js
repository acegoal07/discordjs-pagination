const { TextDisplayBuilder } = require("discord.js"),
   { PageType } = require("../enums/Enums"),
   PagePayloadData = require("../typedef/PagePayloadData")

module.exports = class TextDisplayPageBuilder extends TextDisplayBuilder {
   constructor() {
      super();

      /**
       * Defines the type of page it is
       * @type {PageType}
       */
      this.pageType = PageType.ComponentsV2;
   }

   /**
    * Returns a payload data without buttons
    * @returns {PagePayloadData}
    */
   toPayload() {
      return new PagePayloadData({
         component: this,
         flag: this.pageFlags
      })
   }
}