const { AttachmentBuilder, EmbedBuilder, ButtonBuilder } = require('discord.js'),
   { PageType, ButtonAction } = require('../enums/Enums');

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
    * @returns {EmbedBuilder}
    */
   setAttachment(attachment, attachmentData) {
      this.attachment = new AttachmentBuilder(attachment, attachmentData);

      return this;
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
       * @type {ButtonAction}
       */
      this.function = null;
   }

   /**
    * @param {ButtonAction} action
    * @returns {PageButtonBuilder}
    */
   setPosition(action = null) {
      this.action = action;

      return this;
   }
}