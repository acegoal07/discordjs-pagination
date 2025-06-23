exports.PaginationInfo = class {
   constructor() {
      /**
       * The portal for the pagination, can be a Message or Interaction
       * @type {import("discord.js").Message | import("discord.js").Interaction}
       */
      this.portal = null;
      /**
       * The list of pages for the pagination
       * @type {import("discord.js").EmbedBuilder[]}
       */
      this.pageList = null;
      /**
       * The list of images for the pagination
       * @type {import("discord.js").AttachmentBuilder[]}
       */
      this.imageList = null;
      /**
       * The list of buttons for the pagination
       * @type {import("discord.js").ButtonBuilder[]}
       */
      this.buttonList = null;
      /**
       * The list of attachments for the pagination
       * @type {import("discord.js").AttachmentBuilder[] | null}
       */
      this.attachmentList = null;
      /**
       * The pagination instance, used to track the pagination state
       * @type {null | import("../lib/PaginationBase.js")}
       */
      this.pagination = null;
   }
};