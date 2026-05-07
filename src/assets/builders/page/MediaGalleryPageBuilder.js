const { MediaGalleryBuilder, MessageFlags } = require("discord.js"),
   { PageType } = require("../../enums/Enums"),
   PagePayloadData = require("../../typedef/PagePayloadData")

module.exports = class MediaGalleryPageBuilder extends MediaGalleryBuilder {
   constructor() {
      super();

      /**
       * Defines the type of page it is
       * @type {PageType}
       */
      this.pageType = PageType.ComponentsV2;

      /**
       * A attachment that can be used in the embed
       * @type {import("discord.js").AttachmentBuilder[]}
       */
      this.attachments = [];

      /**
       * These are flags that are added
       * @type {MessageFlags}
       */
      this.pageFlags = MessageFlags.IsComponentsV2;
   }

   /**
    * Set's an attachment that can be used in the embed
    * @param {import("discord.js").AttachmentBuilder} attachments
    * @returns {EmbedBuilder}
    */
   setAttachments(attachments) {
      if (!Array.isArray(attachments)) { throw new TypeError("[MEDIA GALLERY ERROR]: You tried passing in an none array"); }
      this.attachments = attachments;
      return this;
   }

   /**
    * Returns a payload data without buttons
    * @returns {PagePayloadData}
    */
   toPayload() {
      return new PagePayloadData({
         component: this,
         file: this.attachments,
         flag: this.pageFlags
      })
   }
}