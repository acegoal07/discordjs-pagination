///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const { 
   Message, 
   Interaction, 
   MessageEmbed, 
   MessageButton 
} = require("discord.js");
const PaginationBase = require("./lib/PaginationBase");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Wrapper ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = class PaginationWrapper {
   // Constructor
   constructor() {
      this.message = null,
      this.interaction = null,
      this.pageList = null,
      this.buttonList = null,
      this.timeout = 12000,
      this.replyMessage = false,
      this.autoDelete = false,
      this.privateReply = false,
      this.progressBar = false,
      this.proSlider = "▣",
      this.proBar = "▢",
      this.authorIndependent = false,
      this.autoButton = false,
      this.autoDelButton = false,
      this.selectMenu = false,
      this.pageBuilderInfo = null,
      this.buttonBuilderInfo = null,
      this.pagination = null
   }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Required //////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // Set message interface
   /**
    * Set the message interface for the pagination
    * @param {Message} message
    * @returns {PaginationWrapper}
    */
   setMessage(message) {
      // Checks
      if (typeof message !== "object") throw new Error("The message you have provided is not an object");
      if (!message?.author) throw new Error("The message you have provided is incorrect");
      // Set and return
      this.message = message;
      return this;
   }
   // Set interaction interface
   /**
    * Set the interaction interface for the pagination
    * @param {Interaction} interaction 
    * @returns {PaginationWrapper}
    */
   setInteraction(interaction) {
      // Checks
      if (typeof interaction !== "object") throw new Error("The interaction you have provided is not an object");
      if (!interaction?.applicationId) throw new Error("The interaction you have provided is incorrect");
      // Set and return
      this.interaction = interaction;
      return this;
   }
   // Set ButtonList
   /**
    * Set the buttonList for the pagination
    * @param {MessageButton[]} buttonList 
    * @returns {PaginationWrapper}
    */
   setButtonList(buttonList) {
      // Checks
      if (!buttonList) throw new Error("The buttonList you have provided is empty");
      if (typeof buttonList !== "object") throw new Error("The buttonList you have provided is not an object");
      if (buttonList.length < 2) throw new Error("You need to provided a minimum of 2 buttons");
      // Set and return
      this.buttonList = buttonList;
      return this;
   }
   // Set pageList
   /**
    * Set the pageList for the pagination
    * @param {MessageEmbed[]} pageList 
    * @returns {PaginationWrapper}
    */
   setPageList(pageList) {
      // Checks
      if (!pageList) throw new Error("The pageList you have provided is empty");
      if (typeof pageList !== "object") throw new Error("The pageList you have provided is not an object");
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
      console.log(this.pageBuilderInfo)
      // Checks
      if (!this.message && !this.interaction) throw new Error("You have not provided an interface to use");
      if (!this.buttonList && !this.autoButton && !this.buttonBuilderInfo) throw new Error("You have not provided a buttonList to use");
      if (!this.pageList && !this.pageBuilderInfo) throw new Error("You have not provided a pageList to use");
      if (this.interaction && this.replyMessage) process.emitWarning("replyMessage can't be used by an interaction pagination");
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
      if (timeout <= 3000) throw new Error("The time set can't be less than 3000ms");
      if (typeof timeout !== "number") throw new Error("The time provided is not a number");
      // Set and return
      if (!timeout) {
         process.emitWarning("You did not provide a timeout to set so it has defaulted to 12000ms");
      } else {
         this.timeout = timeout;
      }
      return this;
   }
   // Set progressBar
   /**
    * Allows you to enable and edit a progressBar for your pagination
    * @param {String} proSlider 
    * @param {String} proBar 
    * @returns {PaginationWrapper}
    */
   setProgressBar({proSlider = "▣", proBar = "▢"}) {
      // Checks
      if (typeof proSlider !== "string") throw new Error("The proSlider you have provided is not a string");
      if (proSlider.length > 1 || proSlider.length < 1) throw new Error("The proSlider must be 1 character");
      if (typeof proBar !== "string") throw new Error("The proBar you have provided is not a string");
      if (proBar.length > 1 || proBar.length < 1) throw new Error("The proBar must be 1 character");
      // Set and return
      this.progressBar = true;
      this.proSlider = proSlider;
      this.proBar = proBar;
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
    * @returns {PaginationWrapper}
    */
   enableAutoButton() {
      // Set and return
      this.autoButton = true;
      return this;
   }
   // Set autoButtonDel
   /**
    * Enables autoDelButton for your pagination
    * @returns {PaginationWrapper}
    */
   enableAutoDelButton() {
      // Set and return
      this.autoDelButton = true;
      return this;
   }
   // Set selectMenu
   /**
    * Enables selectMenu for your pagination
    * @returns {PaginationWrapper}
    */
   enableSelectMenu() {
      // Set and return
      this.selectMenu = true;
      return this;
   }
   // Page creator
   /**
    * Allows you to use the pagination to create the pages for the pagination
    * @returns {PaginationWrapper}
    */
   createPages(info = [{
      color: String,
	   title: String,
      url: String,
      author: {
         name: String,
         icon_url: String,
         url: String
      },
      description: String,
      thumbnail: {
         url: String
      },
      fields: [
         {
            name: String,
            value: String,
            inline: Boolean
         },
      ],
      image: {
         url: String
      }
   }]) {
      this.pageBuilderInfo = info;
      return this;
   }
   // Button creator
   /**
    * Allows you to use the pagination to create the buttons for the pagination
    * @returns {PaginationWrapper}
    */
   createButtons(info = [{
      customId: String,
      label: String,
      style: String,
      emoji: String
   }]) {
      this.buttonBuilderInfo = info;
      return this;
   }
}