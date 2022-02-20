///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const { Message, Interaction } = require('discord.js');
const paginationBase = require('../index');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Wrapper ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = class paginationWrapper {
   // Constructor
   constructor() {
      this.pagination = null
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
      this.authorIndependent = false
   }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Required //////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // Set message interface
   /**
    * Set the message interface for the pagination
    * @param {Message} message
    * @returns {paginationWrapper}
    */
   setMessage(message) {
      // Checks TO ADD
      // Set and return
      this.message = message;
      return this;
   }
   // Set interaction interface
   /**
    * Set the interaction interface for the pagination
    * @param {Interaction} interaction 
    * @returns {paginationWrapper}
    */
   setInteraction(interaction) {
      // Checks TO ADD
      // Set and return
      this.interaction = interaction;
      return this;
   }
   // Set ButtonList
   /**
    * Set the buttonList for the pagination
    * @param {Object[]} buttonList 
    * @returns {paginationWrapper}
    */
   setButtonList(buttonList) {
      // Checks TO ADD
      // Set and return
      this.buttonList = buttonList;
      return this;
   }
   // Set pageList
   /**
    * Set the pageList for the pagination
    * @param {Object[]} pageList 
    * @returns {paginationWrapper}
    */
   setPageList(pageList) {
      // Checks TO ADD
      // Set and return
      this.pageList = pageList;
      return this;
   }
   // Run pagination
   /**
    * Run the pagination
    * @returns {paginationWrapper}
    */
   async run() {
      // Checks TO ADD
      // Set and return
      this.pagination = await paginationBase(this);
      return this;
   }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Optional ////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
   // Set timeout time
   /**
    * How many milliseconds the pagination should run for
    * @param {Number} timeout
    * @returns {paginationWrapper}
    */
   setTimeout(timeout) {
      // Checks and set
      if (!timeout) {
         process.emitWarning("You did not provide a timeout to set so it has defaulted to 12000ms");
      } else {
         this.timeout = timeout;
      }
      // return
      return this;
   }
   // Set replyMessage
   /**
    * Allows you to enable replyMessage on the pagination
    * @param {Boolean} replyMessage 
    * @returns {paginationWrapper}
    */
   setReplyMessage(replyMessage) {
      // Checks TO ADD
      // Set and return
      this.replyMessage = replyMessage;
      return this;
   }
   // Set autoDelete
   /**
    * Allows you to enable autoDelete on the pagination
    * @param {Boolean} autoDelete 
    * @returns {paginationWrapper}
    */
   setAutoDelete(autoDelete) {
      // Checks TO ADD
      // Set and return
      this.autoDelete = autoDelete;
      return this;
   }
   // Set privateReply
   /**
    * Allows you to enable privateReply on the pagination
    * @param {Boolean} privateReply
    * @returns {paginationWrapper}
    */
   setPrivateReply(privateReply) {
      // Checks TO ADD
      // Set and return
      this.privateReply = privateReply;
      return this;
   }
   // Set progressBar
   /**
    * Allows you to enable and edit a progressBar for the pagination
    * @param {Boolean} progressBar 
    * @param {String} proSlider 
    * @param {String} proBar 
    * @returns {paginationWrapper}
    */
   setProgressBar(progressBar, proSlider, proBar) {
      // Checks TO ADD
      // Set and return
      this.progressBar = progressBar;
      this.proSlider = proSlider;
      this.proBar = proBar;
      return this;
   }
   // Set authorIndependent
   /**
    * Allows you to enable authorIndependent for your pagination
    * @param {Boolean} authorIndependent 
    * @returns {paginationWrapper}
    */
   setAuthorIndependent(authorIndependent) {
      // Checks TO ADD
      // Set and return
      this.authorIndependent = authorIndependent;
      return this;
   }
}