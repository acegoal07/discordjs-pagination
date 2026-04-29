const { PageType } = require('../enums/Enums');

/**
 * Used to build image pages for the pagination
 */
module.exports = class TextPageBuilder {
   constructor() {
      /**
       * Defines the type of page it is
       * @type {PageType}
       */
      this.pageType = PageType.Text;

      /**
       * The text for the page
       * @type {String}
       */
      this.text = "";
   }

   /**
    * @param {String} text
    * @returns {TextPageBuilder}
    */
   setText(text) {
      this.text = text.trim();

      return this;
   }
}