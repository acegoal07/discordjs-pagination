const { PageType } = require("../../enums/Enums"),
   PagePayloadData = require("../../typedef/PagePayloadData");

/**
 * Used to build image pages for the pagination
 */
module.exports = class TextPageBuilder {
   constructor() {
      /**
       * Defines the type of page it is
       * @type {PageType}
       */
      this.pageType = PageType.Standard;

      /**
       * The text for the page
       * @type {String}
       */
      this.text = "";

      /**
       * Whether or not custom callback buttons should be usable with this page
       * @type {Boolean}
       */
      this.blockCustomButtons = false;
   }

   /**
    * Set's the text that is sent in the text page
    * @param {String} text
    * @returns {TextPageBuilder}
    */
   setText(text) {
      this.text = text.trim();
      return this;
   }

   /**
    * Returns a payload data without buttons
    * @returns {PagePayloadData}
    */
   toPayload() {
      return new PagePayloadData({
         content: this.text
      })
   }

   /**
    * Makes it so custom callback buttons are disabled while you are on this page
    */
   enableBlockCustomButtons() {
      this.blockCustomButtons = true;
   }
}