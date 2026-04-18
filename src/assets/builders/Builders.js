const { AttachmentBuilder, EmbedBuilder, ButtonBuilder } = require('discord.js'),
   { PageType, ButtonAction } = require('../enums/Enums');

/**
 * Used to build embed pages for the pagination
 */
class EmbedPageBuilder extends EmbedBuilder {
   constructor() {
      super();

      /**
       * Defines the type of page it is
       * @type {PageType}
       */
      this.pageType = PageType.embed;

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
class PageButtonBuilder extends ButtonBuilder {
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

module.exports = { EmbedPageBuilder, ImagePageBuilder, PageButtonBuilder };