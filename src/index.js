const { Message } = require('discord.js'),
   { ContextType, ButtonFunction } = require('./assets/enums/Enums'),
   PaginationData = require('./assets/typedef/PaginationData'),
   { EmbedPageBuilder, ImagePageBuilder, PageButtonBuilder } = require('./assets/builders/Builders'),
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
    * @param {{
    *    interactionEphemeral?: Boolean;
    *    timeout: Number;
    * }}
    * @returns {Pagination}
    */
   config({ interactionEphemeral = false, timeout = 20000 }) {
      if (typeof interactionEphemeral === 'boolean') {
         this.paginationData.settings.interactionEphemeral = interactionEphemeral;
      } else {
         throw new TypeError("[TYPE ERROR]: Ephemeral setting is not a boolean");
      }

      if (Number.isNaN(timeout)) {
         this.paginationData.settings.timeout = timeout;
      } else {
         throw new TypeError("[TYPE ERROR]: Timeout setting is not a number");
      }

      return this;
   }

   /**
    * Set's the context to be used for the pagination
    * @param {import('discord.js').Interaction | import('discord.js').Message} context
    * @returns {Pagination}
    */
   setContext(context) {
      if (context instanceof Message) {
         this.paginationData.contextType = ContextType.message;
      } else if (context.commandType == null) {
         throw new TypeError("[TYPE ERROR]: The context that has been provided is neither a interaction or message");
      } else {
         this.paginationData.contextType = ContextType.interaction;
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
      if (!Array.isArray(pages)) { throw new TypeError("[TYPE ERROR]: The pages you have provided is not an Array"); }
      this.paginationData.pages = pages;

      return this;
   }

   /**
    * Set's the buttons to be used by the pagination
    * @param {Array<PageButtonBuilder>} buttons
    * @returns {Pagination}
    */
   setButtons(buttons) {
      if (!Array.isArray(buttons)) { throw new TypeError("[TYPE ERROR]: The buttons you have provided is not an Array"); }

      const filteredButtons = buttons.filter(button => button instanceof PageButtonBuilder);

      if (filteredButtons.length < 2) { throw new Error("[DATA ERROR]: You need at least to buttons passed in for the pagination a next and back button"); }
      if (filteredButtons.some(button => button.position == ButtonFunction.next)) { throw new Error("[DATA ERROR]: No next button is present in the provided buttons"); }
      if (filteredButtons.some(button => button.position == ButtonFunction.back)) { throw new Error("[DATA ERROR]: No back button is present in the provided buttons"); }

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
module.exports.PageButtonBuilder = PageButtonBuilder;
module.exports.ButtonFunction = ButtonFunction;