const { ButtonAction, ContextType } = require('../enums/Enums')

/**
 * @param {import('../typedef/PaginationData')} paginationData
 */
module.exports = function filterBuilder(paginationData) {
   return (i) => (
      (paginationData.buttons.find(b => b.data.custom_id === i.customId)) &&
      (
         paginationData.settings.authorSpecific &&
            i.user.id === paginationData.contextType == ContextType.message ?
            paginationData.context.author.id :
            paginationData.context.user.id || paginationData.member.user.id
      ) ||
      !paginationData.settings.authorSpecific
   )
}