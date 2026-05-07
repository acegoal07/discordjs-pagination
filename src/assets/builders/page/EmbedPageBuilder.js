const { AttachmentBuilder, EmbedBuilder } = require("discord.js"),
   { PageType } = require("../../enums/Enums"),
   PagePayloadData = require("../../typedef/PagePayloadData");

/**
 * Used to build embed pages for the pagination
 */
module.exports = class EmbedPageBuilder extends EmbedBuilder {
   constructor() {
      super();

      /**
       * Defines the type of page it is
       * @type {PageType}
       */
      this.pageType = PageType.Standard;

      /**
       * A attachment that can be used in the embed
       * @type {AttachmentBuilder}
       */
      this.attachment = null;
   }

   /**
    * Set's an attachment that can be used in the embed
    * @param {import("discord.js").BufferResolvable | import("node:stream").Stream} attachment
    * @param {import("discord.js").AttachmentData} attachmentData
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
         embed: this,
         file: this.attachment
      })
   }
}