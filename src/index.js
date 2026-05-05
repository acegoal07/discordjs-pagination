const { ContextType, ButtonAction, TimeoutEnding, MessageResponseType } = require('./assets/enums/Enums'),
   PaginationData = require('./assets/typedef/PaginationData'),
   EmbedPageBuilder = require('./assets/builders/EmbedPageBuilder'),
   ImagePageBuilder = require('./assets/builders/ImagePageBuilder'),
   TextPageBuilder = require('./assets/builders/TextPageBuilder'),
   ContainerPageBuilder = require('./assets/builders/ContainerPageBuilder'),
   PageButtonBuilder = require('./assets/builders/PageButtonBuilder'),
   baseHandler = require('./lib/BaseHandler');

/**
 * @version 2.0.0
 * @license MIT
 * @author acegoal07
 */
class Pagination {
   constructor() {
      this.paginationData = new PaginationData();
   }

   /**
    * Allows for pagination settings to be configured for it's need
    * @param {import('./assets/typedef/PaginationSettings')}
    * @returns {Pagination}
    */
   config({ timeout = 20000, timeoutEnding = TimeoutEnding.DisableButtons, interactionEphemeral = false, authorSpecific = false, loop = false, messageResponseType = MessageResponseType.Send }) {
      if (Number.isNaN(timeout)) {
         throw new TypeError("[TIMEOUT ERROR]: Timeout setting is not a number");
      } else {
         this.paginationData.settings.timeout = timeout;
      }

      if (typeof timeoutEnding === 'number') {
         this.paginationData.settings.timeoutEnding = timeoutEnding;
      } else {
         throw new TypeError("[TIMEOUT ENDING ERROR]: Timeout ending setting is not a number");
      }

      if (typeof interactionEphemeral === 'boolean') {
         this.paginationData.settings.interactionEphemeral = interactionEphemeral;
      } else {
         throw new TypeError("[EPHEMERAL ERROR]: Ephemeral setting is not a boolean");
      }

      if (typeof authorSpecific === 'boolean') {
         this.paginationData.settings.authorSpecific = authorSpecific;
      } else {
         throw new TypeError("[AUTHOR SPECIFIC ERROR]: Author specific setting is not a boolean");
      }

      if (typeof loop === 'boolean') {
         this.paginationData.settings.loop = loop;
      } else {
         throw new TypeError("[LOOP ERROR]: Loop setting is not a boolean");
      }

      if (typeof messageResponseType === 'number') {
         this.paginationData.settings.messageResponseType = messageResponseType;
      } else {
         throw new TypeError("[MESSAGE RESPONSE TYPE ERROR]: Message response type setting is not a number");
      }

      return this;
   }

   /**
    * Set's the context to be used for the pagination
    * @param {import('discord.js').Message | import('discord.js').Interaction} context
    * @returns {Pagination}
    */
   setContext(context) {
      if (context?.content) {
         this.paginationData.contextType = ContextType.Message;
      } else if (context?.isCommand?.()) {
         this.paginationData.contextType = ContextType.Interaction;
      } else {
         throw new TypeError("[CONTEXT ERROR]: The context that has been provided is neither a interaction or message");
      }

      this.paginationData.context = context;

      return this;
   }

   /**
    * Set's the pages for the pagination
    * @param {Array<EmbedPageBuilder | ImagePageBuilder>} pages
    * @returns {Pagination}
    */
   setPages(pages = []) {
      if (!Array.isArray(pages)) { throw new TypeError("[PAGE ERROR]: The pages you have provided is not an Array"); }
      if (pages.length === 0) { throw new Error("[PAGE ERROR]: No Pages have been provided") }

      const filteredPages = pages.filter(page => page instanceof EmbedPageBuilder || page instanceof ImagePageBuilder || page instanceof TextPageBuilder || page instanceof ContainerPageBuilder);

      if (filteredPages.length == 0) { throw new TypeError("[PAGE ERROR]: There are no compatible pages provided"); }
      if (filteredPages.some(page => page instanceof EmbedPageBuilder || page instanceof ImagePageBuilder || page instanceof TextPageBuilder) && filteredPages.some(page => page instanceof ContainerPageBuilder)) { throw new Error("[PAGE ERROR]: You are not able to combine components v2 pages and normal pages"); }

      this.paginationData.pages = filteredPages;

      return this;
   }

   /**
    * Set's the buttons to be used by the pagination
    * @param {Array<PageButtonBuilder>} buttons
    * @returns {Pagination}
    */
   setButtons(buttons) {
      if (!Array.isArray(buttons)) { throw new TypeError("[BUTTON ERROR]: The buttons you have provided is not an Array"); }

      const filteredButtons = buttons.filter(button => button instanceof PageButtonBuilder);

      if (filteredButtons.length < 2) { throw new Error("[BUTTON ERROR]: You need at least two buttons passed in for the pagination, a next and back button"); }
      if (!filteredButtons.some(button => button.action === ButtonAction.Next)) { throw new Error("[BUTTON ERROR]: No next button is present in the provided buttons"); }
      if (!filteredButtons.some(button => button.action === ButtonAction.Back)) { throw new Error("[BUTTON ERROR]: No back button is present in the provided buttons"); }

      this.paginationData.buttons = filteredButtons;

      return this;
   }

   /**
    * Activates the pagination
    * @returns {void}
    */
   async paginate() {
      await baseHandler(this.paginationData);
   }
}

module.exports = Pagination;
module.exports.Pagination = Pagination;
module.exports.EmbedPageBuilder = EmbedPageBuilder;
module.exports.ImagePageBuilder = ImagePageBuilder;
module.exports.TextPageBuilder = TextPageBuilder;
module.exports.PageButtonBuilder = PageButtonBuilder;
module.exports.ContainerPageBuilder = ContainerPageBuilder;
module.exports.ButtonAction = ButtonAction;
module.exports.TimeoutEnding = TimeoutEnding;
module.exports.MessageResponseType = MessageResponseType;