const { MessagePayload } = require("discord.js"),
   { PaginationOptions } = require("./util/typedef/paginationOptions"),
   { PaginationInfo } = require("./util/typedef/paginationInfo"),
   { PaginationBase } = require("./lib/PaginationBase");

/**
 * Creates a paginations embed for discordjs with customisable options
 * @version 1.6.1
 * @license MIT
 * @author acegoal07
 */
exports.Pagination = class {
   constructor() {
      this.paginationInfo = new PaginationInfo();
      this.options = new PaginationOptions();
   }

   /**
    * Sets the used portal for the pagination
    * @param {import("discord.js").Message | import("discord.js").Interaction} portal
    * @param {{ interaction_ephemeral?: Boolean }} settings
    * @returns {exports.Pagination}
    */
   setPortal(portal, settings = { interaction_ephemeral: false }) {
      if (this.paginationInfo.portal) { throw new Error("setPortal ERROR: The portal has already been set and can't be changed"); }
      if (!portal) { throw new Error("setPortal ERROR: The portal you provided is invalid"); }
      if (new MessagePayload(portal).isMessage && settings.interaction_ephemeral) { process.emitWarning("setPortal WARNING: Ephemeral has no effect on non-interaction paginations"); }
      this.options.ephemeral = settings.interaction_ephemeral;
      this.paginationInfo.portal = portal;
      return this;
   }

   /**
    * Sets the button list for the pagination
    * @param {import("discord.js").ButtonBuilder[]} buttonList
    * @returns {exports.Pagination}
    */
   setButtonList(buttonList) {
      if (!Array.isArray(buttonList)) { throw new Error("setButtonList ERROR: The buttonList you provided is not an array"); }
      if (buttonList.length < 2) { throw new Error("setButtonList ERROR: You must provide at least 2 buttons"); }
      this.paginationInfo.buttonList = [...buttonList];
      return this;
   }

   /**
    * Sets the page list for the pagination
    * @param {import("discord.js").EmbedBuilder[]} pageList
    * @returns {exports.Pagination}
    */
   setPageList(pageList) {
      if (!Array.isArray(pageList)) { throw new Error("setPageList ERROR: The pageList you provided is not an array"); }
      if (pageList.length === 0) { throw new Error("setPageList ERROR: The pageList you provided is empty"); }
      this.paginationInfo.pageList = [...pageList];
      return this;
   }

   /**
    * Sets the image list for the pagination
    * @param {import("discord.js").AttachmentBuilder[]} imageList
    * @returns {exports.Pagination}
    */
   setImageList(imageList) {
      if (!Array.isArray(imageList)) { throw new Error("setImageList ERROR: The imageList you provided is not an array"); }
      if (imageList.length === 0) { throw new Error("setImageList ERROR: The imageList you provided is empty"); }
      this.paginationInfo.imageList = [...imageList];
      this.options.imageList = true;
      return this;
   }

   /**
    * Sets the attachment list for the pagination
    * @param {import("discord.js").AttachmentBuilder[]} attachmentList
    * @returns {exports.Pagination}
    */
   setAttachmentList(attachmentList) {
      if (!Array.isArray(attachmentList)) { throw new Error("setAttachmentList ERROR: The attachmentList you provided is not an array"); }
      if (attachmentList.length === 0) { throw new Error("setAttachmentList ERROR: The attachmentList you provided is empty"); }
      this.paginationInfo.attachmentList = [...attachmentList];
      return this;
   }

   /**
    * Runs the pagination
    * @returns {exports.Pagination}
    */
   async paginate() {
      const isInteraction = this.paginationInfo.portal?.constructor?.name?.endsWith('Interaction');
      if (!this.paginationInfo.portal) { throw new Error("paginate ERROR: You have not provided a portal to use"); }
      if (!isInteraction && !(new MessagePayload(this.paginationInfo.portal).isMessage)) { throw new Error("paginate ERROR: You have not provided a portal that can be used"); }
      if (!this.paginationInfo.buttonList && !this.options.autoButton) { throw new Error("paginate ERROR: You have not provided a buttonList to use"); }
      if (!this.paginationInfo.pageList && !this.options.pageBuilderInfo && !this.options.imageList) { throw new Error("paginate ERROR: You have not provided a pageList to use"); }
      if (isInteraction && this.options.replyMessage) { process.emitWarning("paginate WARNING: replyMessage can't be used by an interaction pagination"); }
      this.paginationInfo.pagination = await PaginationBase(this);
      return this;
   }

   /**
    * Sets the timeout for the pagination in milliseconds
    * @param {Number} timeout
    * @returns {exports.Pagination}
    */
   setTimeout(timeout) {
      if (typeof timeout !== "number") { throw new Error("setTimeout ERROR: The time provided is not a number"); }
      if (timeout < 3000) { throw new Error("setTimeout ERROR: The time set can't be less than 3000ms"); }
      this.options.timeout = timeout;
      return this;
   }

   /**
    * Enables and customizes a progress bar for your pagination
    * @param {{ slider?: String, bar?: String }} settings
    * @returns {exports.Pagination}
    */
   setProgressBar({ slider = "▣", bar = "▢" } = {}) {
      if (typeof slider !== "string") { throw new Error("setProgressBar ERROR: The slider you provided is not a string"); }
      if (slider.length !== 1) { throw new Error("setProgressBar ERROR: The slider must be 1 character"); }
      if (typeof bar !== "string") { throw new Error("setProgressBar ERROR: The bar you provided is not a string"); }
      if (bar.length !== 1) { throw new Error("setProgressBar ERROR: The bar must be 1 character"); }
      this.options.progressBar.toggle = true;
      this.options.progressBar.slider = slider;
      this.options.progressBar.bar = bar;
      return this;
   }

   /**
    * Enables replyMessage for your pagination
    * @returns {exports.Pagination}
    */
   enableReplyMessage() {
      this.options.replyMessage = true;
      return this;
   }

   /**
    * Enables autoDelete for your pagination
    * @returns {exports.Pagination}
    */
   enableAutoDelete() {
      this.options.autoDelete = true;
      return this;
   }

   /**
    * Enables privateReply for your pagination
    * @returns {exports.Pagination}
    */
   enablePrivateReply() {
      this.options.privateReply = true;
      return this;
   }

   /**
    * Enables authorIndependent for your pagination
    * @returns {exports.Pagination}
    */
   enableAuthorIndependent() {
      this.options.authorIndependent = true;
      return this;
   }

   /**
    * Enables autoButton for your pagination
    * @param {Boolean} deleteButton
    * @returns {exports.Pagination}
    */
   enableAutoButton(deleteButton = false) {
      this.options.autoButton.toggle = true;
      this.options.autoButton.deleteButton = deleteButton;
      return this;
   }

   /**
    * Enables selectMenu for your pagination
    * @param {{ customLabels?: Array<String>, useTitles?: Boolean }} settings
    * @returns {exports.Pagination}
    */
   enableSelectMenu({ customLabels = null, useTitles = false } = {}) {
      this.options.selectMenu.toggle = true;
      this.options.selectMenu.labels = customLabels;
      this.options.selectMenu.useTitle = useTitles;
      return this;
   }

   /**
    * Disables the buttons being disabled and reapplied to the pagination after the timeout ends
    * @returns {exports.Pagination}
    */
   disableDisabledButtons() {
      this.options.disabledButtons = false;
      return this;
   }
};

// Error and warning handling
process.on('uncaughtException', (err) => {
   console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
   console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('warning', (warning) => {
   console.warn('Warning:', warning.name, warning.message);
   if (warning.stack) {
      console.warn(warning.stack);
   }
});