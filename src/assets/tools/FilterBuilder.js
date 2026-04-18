const { ButtonAction, ContextType } = require('../enums/Enums')

/**
 * @param {import('../typedef/PaginationData')} paginationData
 */
module.exports = function filterBuilder(paginationData) {
   return (i) => (
      (i.customId === paginationData.buttons.find(b => b.action === ButtonAction.start).data.custom_id ||
         i.customId === paginationData.buttons.find(b => b.action === ButtonAction.next).data.custom_id ||
         i.customId === paginationData.buttons.find(b => b.action === ButtonAction.back).data.custom_id ||
         i.customId === paginationData.buttons.find(b => b.action === ButtonAction.end).data.custom_id ||
         i.customId === paginationData.buttons.find(b => b.action === ButtonAction.delete).data.custom_id) &&
      (
         paginationData.settings.authorSpecific &&
         i.user.id === paginationData.contextType == ContextType.message ?
         paginationData.context.author.id :
         paginationData.context.user.id || paginationData.member.user.id
      ) ||
      !paginationData.settings.authorSpecific
   )
}