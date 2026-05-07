const PaginationSettings = require('./PaginationSettings');

/**
 * Where all the pagination data is stored
 */
module.exports = class PaginationData {
   /**
    * @type {import('./PaginationSettings')}
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
    * @type {Array<import('../builders/EmbedPageBuilder') | import('../builders/ImagePageBuilder') | import('../builders/TextPageBuilder') | import('../builders/ContainerPageBuilder') | import('../builders/TextDisplayPageBuilder') | import('../builders/SectionPageBuilder')>}
    */
   pages = [];

   /**
    * @type {import('../builders/PageButtonBuilder')[]}
    */
   buttons = [];
}