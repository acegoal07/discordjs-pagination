// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const { MessagePayload } = require("discord.js"),
   { PaginationBase } = require("./lib/PaginationBase");
// Wrapper ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates a paginations embed for discordjs with customisable options
 * @version 1.5.4
 * @author acegoal07
 */
exports.Pagination = class {
   // Constructor
   constructor() {
      // System settings
      this.paginationInfo = {
         // Interfaces
         portal: null,
         // Required inputs
         pageList: null,
         imageList: null,
         buttonList: null,
         // Pagination
         pagination: null
      }
      // Options
      this.options = {
         // General options
         timeout: 20000,
         replyMessage: false,
         autoDelete: false,
         privateReply: false,
         authorIndependent: false,
         ephemeral: false,
         disabledButtons: true,
         imageList: false,
         // BuilderData
         pageBuilderData: null,
         buttonBuilderData: null,
         // AutoButton settings
         autoButton: {
            toggle: false,
            deleteButton: false
         },
         // ProgressBar settings
         progressBar: {
            toggle: false,
            slider: "▣",
            bar: "▢"
         },
         // SelectMenu settings
         selectMenu: {
            toggle: false,
            useTitle: false,
            labels: null
         }
      }
   }
// Required //////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // Set portal
   /**
    * Sets the used portal for the pagination
    * @param {import("discord.js").Message | import("discord.js").Interaction} portal
    * @param {{
    *    interaction_ephemeral?: Boolean
    * }} settings
    * @returns {exports.Pagination}
    */
   setPortal(portal, settings = {interaction_ephemeral: false}) {
      // Portal already set
      if (this.paginationInfo.portal) {throw new Error("setInterface ERROR: The portal has already been set and can't be changed");}
      // Missing portal
      if (!portal) {throw new Error("setInterface ERROR: The portal you have provided is invalid");}
      // Set message portal
      if (new MessagePayload(portal).isMessage && settings.interaction_ephemeral) {throw process.emitWarning("setInterface WARNINGS: Ephemeral has no effect on none interaction paginations");}
      // Set other settings
      this.options.ephemeral = settings.interaction_ephemeral;
      // Set and return
      this.paginationInfo.portal = portal;
      return this;
   }
   // Set ButtonList
   /**
    * Set the buttonList for the paginationY
    * @param {import("discord.js").ButtonBuilder[]} buttonList
    * @returns {exports.Pagination}
    */
   setButtonList(buttonList) {
      // Checks
      if (!buttonList) {throw new Error("setButtonList ERROR: The buttonList you have provided is empty");}
      if (typeof buttonList !== "object") {throw new Error("setButtonList ERROR: The buttonList you have provided is not an object");}
      if (buttonList.length < 2) {throw new Error("setButtonList ERROR: You need to provided a minimum of 2 buttons");}
      // Set and return
      this.paginationInfo.buttonList = buttonList;
      return this;
   }
   // Set pageList
   /**
    * Set the pageList for the pagination
    * @param {import("discord.js").EmbedBuilder[]} pageList
    * @returns {exports.Pagination}
    */
   setPageList(pageList) {
      // Checks
      if (!pageList) {throw new Error("setPageList ERROR: The pageList you have provided is empty");}
      if (typeof pageList !== "object") {throw new Error("setPageList ERROR: The pageList you have provided is not an object");}
      // Set and return
      this.paginationInfo.pageList = pageList;
      return this;
   }
   // Set imageList
   /**
    * Sets the imageList for the pagination
    * @param {import("discord.js").AttachmentBuilder[]} imageList
    * @returns {exports.Pagination}
    */
   setImageList(imageList) {
      // Checks
      if (!imageList) {throw new Error("setImageList ERROR: The imageList you have provided is empty");}
      if (typeof imageList !== "object") {throw new Error("setImageList ERROR: The imageList you have provided is not an object");}
      // Set and return
      this.paginationInfo.imageList = imageList;
      this.options.imageList = true;
      return this;
   }
   // Run pagination
   /**
    * Run the pagination
    * @returns {exports.Pagination}
    */
   async paginate() {
      // Checks portal info exists
      if (!this.paginationInfo.portal) {throw new Error("paginate ERROR: You have not provided an portal to use");}
      // References
      const portalCheck = new MessagePayload(this.paginationInfo.portal);
      // Checks
      if (!portalCheck.isInteraction && !portalCheck.isMessage) {throw new Error("paginate ERROR: You have not provided an portal that can be used");}
      if (!this.paginationInfo.buttonList && !this.options.autoButton && !this.buttonBuilderData) {throw new Error("paginate ERROR: You have not provided a buttonList to use");}
      if (!this.paginationInfo.pageList && !this.options.pageBuilderInfo && !this.options.imageList) {throw new Error("paginate ERROR: You have not provided a pageList to use");}
      if (portalCheck.isInteraction && this.options.replyMessage) {process.emitWarning("paginate WARNING: replyMessage can't be used by an interaction pagination");}
      // Set and return
      this.paginationInfo.pagination = await PaginationBase(this);
      return this;
   }
// Optional //////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // Set timeout time
   /**
    * How many milliseconds your pagination will run for
    * @param {Number} timeout
    * @returns {exports.Pagination}
    */
   setTimeout(timeout) {
      // Checks
      if (timeout <= 3000) {throw new Error("setTimeout ERROR: The time set can't be less than 3000ms");}
      if (typeof timeout !== "number") {throw new Error("setTimeout ERROR: The time provided is not a number");}
      // Set and return
      if (!timeout) {
         process.emitWarning("setTimeout WARNING: You did not provide a timeout to set so it has defaulted to 12000ms");
      } else {
         this.options.timeout = timeout;
      }
      return this;
   }
   // Set progressBar
   /**
    * Allows you to enable and edit a progressBar for your pagination
    * @param {{
    *    slider?: String,
    *    bar?: String
    * }} settings
    * @returns {exports.Pagination}
    */
   setProgressBar(settings = {slider: "▣", bar: "▢"}) {
      // Checks
      if (typeof settings.slider !== "string") {throw new Error("setProgressBar ERROR: The proSlider you have provided is not a string");}
      if (settings.slider.length > 1 || settings.slider.length < 1) {throw new Error("setProgressBar ERROR: The proSlider must be 1 character");}
      if (typeof settings.bar !== "string") {throw new Error("setProgressBar ERROR: The proBar you have provided is not a string");}
      if (settings.bar.length > 1 || settings.bar.length < 1) {throw new Error("setProgressBar ERROR: The proBar must be 1 character");}
      // Set and return
      this.options.progressBar.toggle = true;
      this.options.progressBar.slider = settings.slider;
      this.options.progressBar.bar = settings.bar;
      return this;
   }
   // Set replyMessage
   /**
    * Enables replyMessage for your pagination
    * @returns {exports.Pagination}
    */
   enableReplyMessage() {
      // Set and return
      this.options.replyMessage = true;
      return this;
   }
   // Set autoDelete
   /**
    * Enables autoDelete for your pagination
    * @returns {exports.Pagination}
    */
   enableAutoDelete() {
      // Set and return
      this.options.autoDelete = true;
      return this;
   }
   // Set privateReply
   /**
    * Enables privateReply for your pagination
    * @returns {exports.Pagination}
    */
   enablePrivateReply() {
      // Set and return
      this.options.privateReply = true;
      return this;
   }
   // Set authorIndependent
   /**
    * Enables authorIndependent for your pagination
    * @returns {exports.Pagination}
    */
   enableAuthorIndependent() {
      // Set and return
      this.options.authorIndependent = true;
      return this;
   }
   // Set autoButton
   /**
    * Enables autoButton for your pagination
    * @param {Boolean} deleteButton
    * @returns {exports.Pagination}
    */
   enableAutoButton(deleteButton = false) {
      // Set and return
      this.options.autoButton.toggle = true;
      this.options.autoButton.deleteButton = deleteButton;
      return this;
   }
   // Set selectMenu
   /**
    * Enables selectMenu for your pagination
    * @param {{
    *    customLabels?: Array<String>,
    *    useTitles?: Boolean
    * }} settings
    * @returns {exports.Pagination}
    */
   enableSelectMenu(settings = {customLabels: null, useTitles: false}) {
         // Set and return
         this.options.selectMenu.toggle = true;
         this.options.selectMenu.labels = settings.customLabels;
         this.options.selectMenu.useTitle = settings.useTitles;
         return this;
   }
   // Disable DisabledButtons
   /**
    * Disables the buttons being disabled and re applied to the pagination after the timeout ends
    * @returns {exports.Pagination}
    */
   disableDisabledButtons() {
      this.options.disabledButtons = false;
      return this;
   }
   // Page creator
   /**
    * Allows you to use the pagination to create the pages for the pagination
    * @param {[{
    *    title?: String,
    *    url?: String,
    *    author?: {
    *       name: String,
    *       icon_url?: String,
    *       url?: String
    *    },
    *    description?: String,
    *    thumbnailUrl?: String,
    *    fields?: [{
    *       name: String,
    *       value: String,
    *       inline?: Boolean
    *    }],
    *    imageUrl?: String,
    *    color?: 'Default'
    *       |  'Random'
    *       |  'White'
    *       |  'Aqua'
    *       |  'Green'
    *       |  'Blue'
    *       |  'Yellow'
    *       |  'Purple'
    *       |  'LuminousVividPink'
    *       |  'Fuchsia'
    *       |  'Gold'
    *       |  'Orange'
    *       |  'Red'
    *       |  'Grey'
    *       |  'Navy'
    *       |  'DarkAqua'
    *       |  'DarkGreen'
    *       |  'DarkBlue'
    *       |  'DarkPurple'
    *       |  'DarkVividPink'
    *       |  'DarkGold'
    *       |  'DarkOrange'
    *       |  'DarkRed'
    *       |  'DarkGrey'
    *       |  'DarkerGrey'
    *       |  'LightGrey'
    *       |  'DarkNavy'
    *       |  'Blurple'
    *       |  'Greyple'
    *       |  'DarkButNotBlack'
    *       |  'NotQuiteBlack'
    * }]} buildData
    * @deprecated This function has been deprecated has it is not required
    * @returns {exports.Pagination}
    */
   createPages(buildData = [{
	   title: null,
      url: null,
      author: {
         name: null,
         icon_url: null,
         url: null
      },
      description: null,
      thumbnailUrl: null,
      fields: [
         {
            name: null,
            value: null,
            inline: false
         }
      ],
      imageUrl: null,
      color: null
   }]) {
      this.options.pageBuilderData = buildData;
      return this;
   }
   // Button creator
   /**
    * Allows you to use the pagination to create the buttons for the pagination
    * @param {[{
    *    customId: String,
    *    label?: String,
    *    style: "Primary"
    *       | "Secondary"
    *       | "Success"
    *       | "Danger",
    *    emoji?: String
    * }]} buildData
    * @deprecated This function has been deprecated has it is not required
    * @returns {exports.Pagination}
    */
   createButtons(buildData = [{
      customId: null,
      label: null,
      style: null,
      emoji: null
   }]) {
      this.options.buttonBuilderData = buildData;
      return this;
   }
}