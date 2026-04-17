/**
 * Where all the pagination data is stored
 */
module.exports = class PaginationData {
   /**
    * @type {PaginationSettings}
    */
   settings = new PaginationSettings();

   /**
    * @type {import('discord.js').Interaction | import('discord.js').Message}
    */
   context = null;

   /**
    * @type {import('../enums/Enums').ContextType}
    */
   contextType = 0;

   /**
    * @type {Array<import('../builders/Builders').EmbedPageBuilder | import('../builders/Builders').ImagePageBuilder>}
    */
   pages = [];

   /**
    * @type {import('../builders/Builders').PageButtonBuilder[]}
    */
   buttons = [];
}

/**
 * The Pagination settings
 */
class PaginationSettings {
   /**
    * Whether or not to make the pagination ephemeral
    * @type {Boolean}
    */
   interactionEphemeral = false;

   /**
    * How long the pagination should stay active for (Default: 20000ms)
    * @type {Number}
    */
   timeout = 20000;
}