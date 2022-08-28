///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const { Message, Interaction, EmbedBuilder, ButtonBuilder, MessagePayload } = require("discord.js");
const PaginationBase = require("./lib/PaginationBase");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Wrapper ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates a paginations embed for discordjs with customisable options
 * @version 1.3.7
 * @author acegoal07
 */
module.exports = class PaginationWrapper {
   // Constructor
   constructor() {
      // Interfaces
      this.interface = null;
      // Required inputs
      this.pageList = null;
      this.buttonList = null;
      // Options
      this.timeout = 12000;
      this.replyMessage = false;
      this.autoDelete = false;
      this.privateReply = false;
      this.authorIndependent = false;
      this.pageBuilderInfo = null;
      this.buttonBuilderInfo = null;
      this.ephemeral = false;
      this.autoButton = {
         toggle: false,
         deleteButton: false
      };
      this.progressBar = {
         toggle: false,
         slider: "▣",
         bar: "▢"
      };
      this.selectMenu = {
         toggle: false,
         labels: null
      }
      // Pagination
      this.pagination = null;
   }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Required //////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // Set interface
   /**
    * Sets the used interface for the pagination
    * @param {Message | Interaction} _interface
    * @returns {PaginationWrapper}
    */
   setInterface(_interface, options = {interaction_ephemeral: false}) {
      // Interface already set
      if (this.interface) throw new Error("setInterface ERROR: The interface has already been set and can't be changed");
      // Missing interface
      if (!_interface) throw new Error("setInterface ERROR: The interface you have provided is invalid");
      // Set message interface
      if (new MessagePayload(_interface).isMessage) {
         if (options.interaction_ephemeral) throw process.emitWarning("setInterface WARNINGS: Ephemeral has no effect on none interaction paginations");
      }
      // Set ephemeral
      this.ephemeral = options.interaction_ephemeral;
      // Set and return
      this.interface = _interface;
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
      this.buttonList = buttonList;
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
      this.pageList = pageList;
      return this;
   }
   // Run pagination
   /**
    * Run the pagination
    * @returns {PaginationWrapper}
    */
   async paginate() {
      // References
      const interfaceCheck = new MessagePayload(this.interface);
      // Checks
      if (!this.interface) throw new Error("paginate ERROR: You have not provided an interface to use");
      if (!interfaceCheck.isInteraction && !interfaceCheck.isMessage) throw new Error("paginate ERROR: You have not provided an interface that can be used");
      if (!this.buttonList && !this.autoButton && !this.buttonBuilderInfo) throw new Error("paginate ERROR: You have not provided a buttonList to use");
      if (!this.pageList && !this.pageBuilderInfo) throw new Error("paginate ERROR: You have not provided a pageList to use");
      if (interfaceCheck.isInteraction && this.replyMessage) process.emitWarning("paginate WARNING: replyMessage can't be used by an interaction pagination");
      // Set and return
      this.pagination = await PaginationBase(this);
      return this;
   }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Optional //////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // Set timeout time
   /**
    * How many milliseconds your pagination will run for
    * @param {Number} timeout
    * @returns {PaginationWrapper}
    */
   setTimeout(timeout) {
      // Checks
      if (timeout <= 3000) throw new Error("setTimeout ERROR: The time set can't be less than 3000ms");
      if (typeof timeout !== "number") throw new Error("setTimeout ERROR: The time provided is not a number");
      // Set and return
      if (!timeout) {
         process.emitWarning("setTimeout WARNING: You did not provide a timeout to set so it has defaulted to 12000ms");
      } else {
         this.timeout = timeout;
      }
      return this;
   }
   // Set progressBar
   /**
    * Allows you to enable and edit a progressBar for your pagination
    * @param {String} slider
    * @param {String} bar
    * @returns {PaginationWrapper}
    */
   setProgressBar({slider = "▣", bar = "▢"}) {
      // Checks
      if (typeof slider !== "string") throw new Error("setProgressBar ERROR: The proSlider you have provided is not a string");
      if (slider.length > 1 || slider.length < 1) throw new Error("setProgressBar ERROR: The proSlider must be 1 character");
      if (typeof bar !== "string") throw new Error("setProgressBar ERROR: The proBar you have provided is not a string");
      if (bar.length > 1 || bar.length < 1) throw new Error("setProgressBar ERROR: The proBar must be 1 character");
      // Set and return
      this.progressBar.toggle = true;
      this.progressBar.slider = slider;
      this.progressBar.bar = bar;
      return this;
   }
   // Set replyMessage
   /**
    * Enables replyMessage for your pagination
    * @returns {PaginationWrapper}
    */
   enableReplyMessage() {
      // Set and return
      this.replyMessage = true;
      return this;
   }
   // Set autoDelete
   /**
    * Enables autoDelete for your pagination
    * @returns {PaginationWrapper}
    */
   enableAutoDelete() {
      // Set and return
      this.autoDelete = true;
      return this;
   }
   // Set privateReply
   /**
    * Enables privateReply for your pagination
    * @returns {PaginationWrapper}
    */
   enablePrivateReply() {
      // Set and return
      this.privateReply = true;
      return this;
   }
   // Set authorIndependent
   /**
    * Enables authorIndependent for your pagination
    * @returns {PaginationWrapper}
    */
   enableAuthorIndependent() {
      // Set and return
      this.authorIndependent = true;
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
      this.autoButton.toggle = true;
      this.autoButton.deleteButton = deleteButton;
      return this;
   }
   // Set selectMenu
   /**
    * Enables selectMenu for your pagination
    * @param {Array} data
    * @returns {PaginationWrapper}
    */
   enableSelectMenu(data = null) {
      // Set and return
      this.selectMenu.toggle = true;
      this.selectMenu.labels = data
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
      this.pageBuilderInfo = data;
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
      this.buttonBuilderInfo = info;
      return this;
   }
}