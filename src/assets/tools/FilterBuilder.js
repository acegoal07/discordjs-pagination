const { ButtonFunction } = require('../enums/Enums')

/**
 * @param {import('../typedef/PaginationData')} paginationData
 */
module.exports = function filterBuilder(paginationData) {
   return (i) => (
      i.customId === paginationData.buttons.find(b => b.position === ButtonFunction.start).button.data.custom_id ||
      i.customId === paginationData.buttons.find(b => b.position === ButtonFunction.next).button.data.custom_id ||
      i.customId === paginationData.buttons.find(b => b.position === ButtonFunction.back).button.data.custom_id ||
      i.customId === paginationData.buttons.find(b => b.position === ButtonFunction.end).button.data.custom_id ||
      i.customId === paginationData.buttons.find(b => b.position === ButtonFunction.delete).button.data.custom_id
   )
}