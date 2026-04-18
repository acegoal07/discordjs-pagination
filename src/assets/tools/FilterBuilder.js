const { ButtonAction, ContextType } = require('../enums/Enums')

/**
 * @param {import('../typedef/PaginationData')} paginationData
 */
module.exports = function filterBuilder(paginationData) {
   return (i) => (
      (i.customId === paginationData.buttons.find(b => b.position === ButtonAction.start).button.data.custom_id ||
         i.customId === paginationData.buttons.find(b => b.position === ButtonAction.next).button.data.custom_id ||
         i.customId === paginationData.buttons.find(b => b.position === ButtonAction.back).button.data.custom_id ||
         i.customId === paginationData.buttons.find(b => b.position === ButtonAction.end).button.data.custom_id ||
         i.customId === paginationData.buttons.find(b => b.position === ButtonAction.delete).button.data.custom_id) &&
      (
         paginationData.settings.authorSpecific &&
         i.user.id === paginationData.contextType == ContextType.message ?
         paginationData.context.author.id :
         paginationData.context.user.id || paginationData.member.user.id
      ) ||
      !paginationData.settings.authorSpecific
   )
}