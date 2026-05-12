const { ContextType, ButtonAction, TimeoutEnding, MessageResponseType, PageType } = require("./assets/enums/Enums"),
   PaginationData = require("./assets/typedef/PaginationData"),
   EmbedPageBuilder = require("./assets/builders/page/EmbedPageBuilder"),
   ImagePageBuilder = require("./assets/builders/page/ImagePageBuilder"),
   TextPageBuilder = require("./assets/builders/page/TextPageBuilder"),
   ContainerPageBuilder = require("./assets/builders/page/ContainerPageBuilder"),
   TextDisplayPageBuilder = require("./assets/builders/page/TextDisplayPageBuilder"),
   PageButtonBuilder = require("./assets/builders/button/PageButtonBuilder"),
   pagination = require("./lib/Pagination");

/**
 * @version 2.0.3
 * @license MIT
 * @author acegoal07
 */
class Pagination {
   constructor() {
      this.paginationData = new PaginationData();
   }

   /**
    * Allows for pagination settings to be configured for it's need
    * @param {import("./assets/typedef/PaginationSettings")}
    * @returns {Pagination}
    */
   config({
      timeout = 20000,
      timeoutEnding = TimeoutEnding.DisableButtons,
      interactionEphemeral = false,
      authorSpecific = false,
      loop = false,
      autoDeleteButton = false,
      messageResponseType = MessageResponseType.Send,
      disableUnusableButtons = false
   }) {
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

      if (typeof autoDeleteButton === 'boolean') {
         this.paginationData.settings.autoDeleteButton = autoDeleteButton;
      } else {
         throw new TypeError("[AUTO DELETE BUTTON ERROR]: Auto delete button setting is not a boolean");
      }

      if (typeof messageResponseType === 'number') {
         this.paginationData.settings.messageResponseType = messageResponseType;
      } else {
         throw new TypeError("[MESSAGE RESPONSE TYPE ERROR]: Message response type setting is not a number");
      }

      if (typeof disableUnusableButtons === 'boolean') {
         this.paginationData.settings.disableUnusableButtons = disableUnusableButtons;
      } else {
         throw new TypeError("[DISABLE UNUSABLE BUTTON ERROR]: Disable unusable button setting is not a boolean");
      }

      return this;
   }

   /**
    * Set's the context to be used for the pagination
    * @param {import("discord.js").Message | import("discord.js").Interaction} context
    * @returns {Pagination}
    */
   setContext(context = null) {
      if (!context) { throw new Error("[CONTEXT ERROR]: No context has been passed in"); }
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
    * @param {Array<EmbedPageBuilder | ImagePageBuilder | TextPageBuilder | ContainerPageBuilder | TextDisplayPageBuilder>} pages
    * @returns {Pagination}
    */
   setPages(pages = []) {
      if (pages.length === 0) { throw new Error("[PAGE ERROR]: No Pages have been passed in"); }
      if (!Array.isArray(pages)) { throw new TypeError("[PAGE ERROR]: The pages you have provided is not an Array"); }
      if (pages.length === 0) { throw new Error("[PAGE ERROR]: No Pages have been provided") }
      const filteredPages = pages.filter(page => page instanceof EmbedPageBuilder || page instanceof ImagePageBuilder || page instanceof TextPageBuilder || page instanceof ContainerPageBuilder || page instanceof TextDisplayPageBuilder || page instanceof SectionPageBuilder || page instanceof MediaGalleryPageBuilder);
      if (filteredPages.length == 0) { throw new TypeError("[PAGE ERROR]: There are no compatible pages provided"); }
      if (filteredPages.some(page => page.pageType === PageType.Standard) && filteredPages.some(page => page.pageType === PageType.ComponentsV2)) { throw new Error("[PAGE ERROR]: You are not able to combine components v2 pages and standard pages"); }

      this.paginationData.pages = filteredPages;

      return this;
   }

   /**
    * Set's the buttons to be used by the pagination
    * @param {Array<PageButtonBuilder>} buttons
    * @returns {Pagination}
    */
   setButtons(buttons = []) {
      if (buttons.length === 0) { throw new Error("[BUTTON ERROR]: No buttons have been passed in"); }
      if (!Array.isArray(buttons)) { throw new TypeError("[BUTTON ERROR]: The buttons you have provided is not an Array"); }
      const filteredButtons = buttons.filter(button => button instanceof PageButtonBuilder && button.action != ButtonAction.Unset);
      if (filteredButtons.length < 2) { throw new Error("[BUTTON ERROR]: You need at least two buttons passed in for the pagination, a next and back button"); }
      if (!filteredButtons.some(button => button.action === ButtonAction.Next)) { throw new Error("[BUTTON ERROR]: No next button is present in the provided buttons"); }
      if (!filteredButtons.some(button => button.action === ButtonAction.Back)) { throw new Error("[BUTTON ERROR]: No back button is present in the provided buttons"); }
      if (filteredButtons.some(button => button.action != ButtonAction.Callback && button.callback != null)) { console.warn("[BUTTON WARNING]: Callback functions linked to buttons without the callback action will not be used"); }
      if (filteredButtons.length > 5) { throw new Error("[BUTTON ERROR]: More than 5 buttons have been passed in which is more than the allowed amount for an action row") }

      this.paginationData.buttons = filteredButtons;

      return this;
   }

   /**
    * Activates the pagination
    */
   async paginate() {
      await pagination(this.paginationData);
   }
}

module.exports = Pagination;
module.exports.Pagination = Pagination;
module.exports.EmbedPageBuilder = EmbedPageBuilder;
module.exports.ImagePageBuilder = ImagePageBuilder;
module.exports.TextPageBuilder = TextPageBuilder;
module.exports.PageButtonBuilder = PageButtonBuilder;
module.exports.ContainerPageBuilder = ContainerPageBuilder;
module.exports.TextDisplayPageBuilder = TextDisplayPageBuilder;
module.exports.ButtonAction = ButtonAction;
module.exports.TimeoutEnding = TimeoutEnding;
module.exports.MessageResponseType = MessageResponseType;