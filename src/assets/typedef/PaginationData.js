const PaginationSettings = require('./PaginationSettings');

/**
 * Where all the pagination data is stored
 */
module.exports = class PaginationData {
   /**
    * @type {PaginationSettings}
    */
   settings = new PaginationSettings();

   /**
    * @type {import("discord.js").Interaction | import("discord.js").Message}
    */
   context = null;

   /**
    * @type {import("../enums/Enums").ContextType}
    */
   contextType = 0;

   /**
    * @type {Array<import("../builders/page/EmbedPageBuilder") | import("../builders/page/ImagePageBuilder") | import("../builders/page/TextPageBuilder") | import("../builders/page/ContainerPageBuilder") | import("../builders/page/TextDisplayPageBuilder")>}
    */
   pages = [];

   /**
    * @type {import("../builders/components/PageButtonBuilder")[]}
    */
   buttons = [];

   /**
    * @type {import('discord.js').ActionRowBuilder<import('../builders/components/PageButtonBuilder') | import('../builders/components/PageStringSelectMenuBuilder')>[]}
    */
   extraRows = [];
};
