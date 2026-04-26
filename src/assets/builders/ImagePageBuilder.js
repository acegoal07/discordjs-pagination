const { AttachmentBuilder } = require('discord.js'),
   { PageType } = require('../enums/Enums');

/**
 * Used to build image pages for the pagination
 */
module.exports = class ImagePageBuilder {
   constructor() {
      /**
       * Defines the type of page it is
       * @type {PageType}
       */
      this.pageType = PageType.image;

      /**
       * The image to be displayed
       * @type {AttachmentBuilder}
       */
      this.image = null;
   }

   /**
    * @param {import('discord.js').BufferResolvable | import('node:stream').Stream} attachment
    * @param {import('discord.js').AttachmentData}
    * @returns {ImagePageBuilder}
    */
   setImage(attachment, attachmentData) {
      this.image = new AttachmentBuilder(attachment, attachmentData)
      return this;
   }
}