/**
 * @param {import('../typedef/PaginationData')} paginationData
 * @returns {void}
 */
module.exports = function disableButtons(paginationData) {
   paginationData.buttons.forEach(button => {
      button.setDisabled(true);
   });
}