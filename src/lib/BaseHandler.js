const { ContextType } = require('../assets/enums/Enums'),
   interactionHandler = require('./InteractionHandler'),
   messageHandler = require('./MessageHandler');

/**
 * @param {import('../assets/typedef/PaginationData')} paginationData
 */
module.exports = async function baseHandler(paginationData) {
   if (paginationData.contextType === ContextType.message) {
      await messageHandler(paginationData);
   } else if (paginationData.contextType === ContextType.interaction) {
      await interactionHandler(paginationData);
   } else {
      throw new Error("[HANDLER ERROR]: No context type is set");
   }
}