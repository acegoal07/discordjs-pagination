const { AttachmentBuilder, EmbedBuilder, ButtonBuilder } = require('discord.js'),
   { PageType, ButtonPosition } = require('../enums/Enums');

module.exports = { EmbedPageBuilder, ImagePageBuilder, PageButtonBuilder };

/**
 * Used to build embed pages for the pagination
 */
class EmbedPageBuilder {
   constructor() {
      /**
       * Defines the type of page it is
       * @type {PageType}
       */
      this.pageType = PageType.embed;

      /**
       * The Embed you can edit your data to
       * @type {EmbedBuilder}
       */
      this.embed = new EmbedBuilder();

      /**
       * A attachment that can be used in the embed
       * @type {AttachmentBuilder}
       */
      this.attachment = null;
   }

   /**
    * Set's an attachment that can be used in the embed
    * @param {import('discord.js').BufferResolvable | import('node:stream').Stream} attachment
    * @param {import('discord.js').AttachmentData} attachmentData
    * @returns {void}
    */
   setAttachment(attachment, attachmentData) {
      this.attachment = new AttachmentBuilder(attachment, attachmentData);
   }
}

/**
 * Used to build image pages for the pagination
 */
class ImagePageBuilder {
   constructor(attachment, attachmentData) {
      /**
       * Defines the type of page it is
       * @type {PageType}
       */
      this.pageType = PageType.image;

      /**
       * The image to be displayed
       * @type {AttachmentBuilder}
       */
      this.image = new AttachmentBuilder(attachment, attachmentData);
   }
}

/**
 * Used to build the buttons for the pagination
 */
class PageButtonBuilder {
   constructor() {
      /**
       * @type {ButtonBuilder}
       */
      this.button = new ButtonBuilder();

      /**
       * @type {ButtonPosition}
       */
      this.position = null;
   }

   /**
    * @param {ButtonPosition} position
    * @returns {void}
    */
   setPosition(position = null) {
      this.position = position;
   }
}