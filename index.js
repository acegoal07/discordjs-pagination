///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const { Message, Interaction, EmbedBuilder, ButtonBuilder, MessagePayload } = require("discord.js");
const { PaginationBase } = require("./lib/PaginationBase");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Wrapper ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates a paginations embed for discordjs with customisable options
 * @version 1.4.0
 * @author acegoal07
 */
class PaginationWrapper {
   // Constructor
   constructor() {
      // System settings 
      this.paginationInfo = {
         // Interfaces
         portal: null,
         // Required inputs
         pageList: null,
         buttonList: null,
         // Pagination
         pagination: null
      }
      // Options
      this.options = {
         // General options
         timeout: 12000,
         replyMessage: false,
         autoDelete: false,
         privateReply: false,
         authorIndependent: false,
         pageBuilderInfo: null,
         buttonBuilderInfo: null,
         ephemeral: false,
         // AutoButton settings
         autoButton: {
            toggle: false,
            deleteButton: false
         },
         // Progressbar settings
         progressBar: {
            toggle: false,
            slider: "▣",
            bar: "▢"
         },
         // SelectMenu settings
         selectMenu: {
            toggle: false,
            labels: null,
            useTitle: false
         }
      }
   }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Required //////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // Set interface
   /**
    * Sets the used portal for the pagination
    * @param {Message | Interaction} _interface
    * @deprecated This function has been deprecated and replaced with setPortal to stop clashes with future versions of javascript
    * @returns {PaginationWrapper}
    */
   setInterface(_interface, options = {interaction_ephemeral: false}) {
      process.emitWarning("This function has been deprecated and replaced with setPortal to stop clashes with future versions of javascript");
      // Interface already set
      if (this.portal) throw new Error("setInterface ERROR: The portal has already been set and can't be changed");
      // Missing portal
      if (!_interface) throw new Error("setInterface ERROR: The portal you have provided is invalid");
      // Set message portal
      if (new MessagePayload(_interface).isMessage) {
         if (options.interaction_ephemeral) throw process.emitWarning("setInterface WARNINGS: Ephemeral has no effect on none interaction paginations");
      }
      // Set ephemeral
      this.options.ephemeral = options.interaction_ephemeral;
      // Set and return
      this.paginationInfo.portal = _interface;
      return this;
   }
   // Set portal
   /**
    * Sets the used portal for the pagination
    * @param {Message | Interaction} portal
    * @param {{
    *    interaction_ephemeral: Boolean,
    *    timeout?: Number,
    *    autoDelete?: Boolean,
    *    authorIndependent?: Boolean,
    *    privateReply?: Boolean,
    *    replyMessage?: Boolean
    * }} options
    * @returns {PaginationWrapper}
    */
   setPortal(portal, options = {interaction_ephemeral: false, timeout: 12000, autoDelete: false, authorIndependent: false, privateReply: false, replyMessage: false}) {
      // Portal already set
      if (this.paginationInfo.portal) throw new Error("setInterface ERROR: The portal has already been set and can't be changed");
      // Missing portal
      if (!_interface) throw new Error("setInterface ERROR: The portal you have provided is invalid");
      // Set message portal
      if (new MessagePayload(portal).isMessage) {
         if (options.interaction_ephemeral) throw process.emitWarning("setInterface WARNINGS: Ephemeral has no effect on none interaction paginations");
      }
      // Set other settings
      this.options.ephemeral = options.interaction_ephemeral;
      this.options.timeout = options.timeout;
      this.options.autoDelete = options.autoDelete;
      this.options.authorIndependent = options.authorIndependent;
      this.options.privateReply = options.privateReply;
      this.options.replyMessage = options.replyMessage;
      // Set and return
      this.paginationInfo.portal = portal;
      return this;
   }
   // Set ButtonList
   /**
    * Set the buttonList for the paginationY
    * @param {ButtonBuilder[]} buttonList
    * @returns {PaginationWrapper}
    */
   setButtonList(buttonList) {
      // Checks
      if (!buttonList) throw new Error("setButtonList ERROR: The buttonList you have provided is empty");
      if (typeof buttonList !== "object") throw new Error("setButtonList ERROR: The buttonList you have provided is not an object");
      if (buttonList.length < 2) throw new Error("setButtonList ERROR: You need to provided a minimum of 2 buttons");
      // Set and return
      this.paginationInfo.buttonList = buttonList;
      return this;
   }
   // Set pageList
   /**
    * Set the pageList for the pagination
    * @param {EmbedBuilder[]} pageList
    * @returns {PaginationWrapper}
    */
   setPageList(pageList) {
      // Checks
      if (!pageList) throw new Error("setPageList ERROR: The pageList you have provided is empty");
      if (typeof pageList !== "object") throw new Error("setPageList ERROR: The pageList you have provided is not an object");
      // Set and return
      this.paginationInfo.pageList = pageList;
      return this;
   }
   // Run pagination
   /**
    * Run the pagination
    * @returns {PaginationWrapper}
    */
   async paginate() {
      // Checks portal info exists
      if (!this.paginationInfo.portal) throw new Error("paginate ERROR: You have not provided an portal to use");
      // References
      const portalCheck = new MessagePayload(this.paginationInfo.portal);
      // Checks
      if (!portalCheck.isInteraction && !portalCheck.isMessage) throw new Error("paginate ERROR: You have not provided an portal that can be used");
      if (!this.options.buttonList && !this.options.autoButton && !this.buttonBuilderInfo) throw new Error("paginate ERROR: You have not provided a buttonList to use");
      if (!this.options.pageList && !this.options.pageBuilderInfo) throw new Error("paginate ERROR: You have not provided a pageList to use");
      if (portalCheck.isInteraction && this.options.replyMessage) process.emitWarning("paginate WARNING: replyMessage can't be used by an interaction pagination");
      // Set and return
      this.paginationInfo.pagination = await PaginationBase(this);
      return this;
   }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Optional //////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // Set timeout time
   /**
    * How many milliseconds your pagination will run for
    * @param {Number} timeout
    * @returns {PaginationWrapper}
    * @deprecated This function has been deprecated and moved into the setPortal function options
    */
   setTimeout(timeout) {
      console.log("This function has been deprecated and moved into the setPortal function options");
      // Checks
      if (timeout <= 3000) throw new Error("setTimeout ERROR: The time set can't be less than 3000ms");
      if (typeof timeout !== "number") throw new Error("setTimeout ERROR: The time provided is not a number");
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
    * }}
    * @returns {PaginationWrapper}
    */
   setProgressBar({slider = "▣", bar = "▢"}) {
      // Checks
      if (typeof slider !== "string") throw new Error("setProgressBar ERROR: The proSlider you have provided is not a string");
      if (slider.length > 1 || slider.length < 1) throw new Error("setProgressBar ERROR: The proSlider must be 1 character");
      if (typeof bar !== "string") throw new Error("setProgressBar ERROR: The proBar you have provided is not a string");
      if (bar.length > 1 || bar.length < 1) throw new Error("setProgressBar ERROR: The proBar must be 1 character");
      // Set and return
      this.options.progressBar.toggle = true;
      this.options.progressBar.slider = slider;
      this.options.progressBar.bar = bar;
      return this;
   }
   // Set replyMessage
   /**
    * Enables replyMessage for your pagination
    * @returns {PaginationWrapper}
    */
   enableReplyMessage() {
      // Set and return
      this.options.replyMessage = true;
      return this;
   }
   // Set autoDelete
   /**
    * Enables autoDelete for your pagination
    * @returns {PaginationWrapper}
    * @deprecated This function has been deprecated and moved into the setPortal function options
    */
   enableAutoDelete() {
      console.log("This function has been deprecated and moved into the setPortal function options");
      // Set and return
      this.options.autoDelete = true;
      return this;
   }
   // Set privateReply
   /**
    * Enables privateReply for your pagination
    * @returns {PaginationWrapper}
    */
   enablePrivateReply() {
      // Set and return
      this.options.privateReply = true;
      return this;
   }
   // Set authorIndependent
   /**
    * Enables authorIndependent for your pagination
    * @returns {PaginationWrapper}
    * @deprecated This function has been deprecated and moved into the setPortal function options
    */
   enableAuthorIndependent() {
      console.log("This function has been deprecated and moved into the setPortal function options");
      // Set and return
      this.options.authorIndependent = true;
      return this;
   }
   // Set autoButton
   /**
    * Enables autoButton for your pagination
    * @param {Boolean} deleteButton
    * @returns {PaginationWrapper}
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
    *    data?: Array,
    *    useTitle?: Boolean
    * }} 
    * @returns {PaginationWrapper}
    */
   enableSelectMenu({labels = null, useTitle = false}) {
      // Set and return
      this.options.selectMenu.toggle = true;
      this.options.selectMenu.labels = labels;
      this.options.selectMenu.useTitle = useTitle;
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
    * }]} data
    * @returns {PaginationWrapper}
    */
   createPages(data = [{
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
         },
      ],
      imageUrl: null,
      color: null
   }]) {
      this.options.pageBuilderInfo = data;
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
    * }]} info
    * @returns {PaginationWrapper}
    */
   createButtons(info = [{
      customId: null,
      label: null,
      style: null,
      emoji: null
   }]) {
      this.options.buttonBuilderInfo = info;
      return this;
   }
}

// Exporter
module.exports = { PaginationWrapper };