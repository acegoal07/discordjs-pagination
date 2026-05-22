const { AttachmentBuilder } = require("discord.js"),
   { PageType } = require("../../enums/Enums"),
   PagePayloadData = require("../../typedef/PagePayloadData");

/**
 * Used to build image pages for the pagination
 */
module.exports = class ImagePageBuilder {
   constructor() {
      /**
       * Defines the type of page it is
       * @type {PageType}
       */
      this.pageType = PageType.Standard;

      /**
       * The image to be displayed
       * @type {AttachmentBuilder}
       */
      this.image = null;

      /**
       * Whether or not custom callback buttons should be usable with this page
       * @type {Boolean}
       */
      this.blockCustomButtons = false;
   }

   /**
    * Set's the image for the page
    * @param {import("discord.js").BufferResolvable | import("node:stream").Stream} attachment
    * @param {import("discord.js").AttachmentData}
    * @returns {ImagePageBuilder}
    */
   setImage(attachment, attachmentData) {
      this.image = new AttachmentBuilder(attachment, attachmentData)
      return this;
   }

   /**
    * Returns a payload data without buttons
    * @returns {PagePayloadData}
    */
   toPayload() {
      return new PagePayloadData({
         file: this.image
      })
   }

   /**
    * Makes it so custom callback buttons are disabled while you are on this page
    */
   enableBlockCustomButtons() {
      this.blockCustomButtons = true;
   }
}