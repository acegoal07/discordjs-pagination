const { SectionBuilder } = require("discord.js"),
   { PageType } = require("../enums/Enums"),
   PagePayloadData = require("../typedef/PagePayloadData")

module.exports = class SectionPageBuilder extends SectionBuilder {
   constructor() {
      super();

      /**
       * Defines the type of page it is
       * @type {PageType}
       */
      this.pageType = PageType.ComponentsV2;

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

   /**
    * Returns a payload data without buttons
    * @returns {PagePayloadData}
    */
   toPayload() {
      return new PagePayloadData({
         component: this,
         file: this.attachment,
         flag: this.pageFlags
      })
   }
}