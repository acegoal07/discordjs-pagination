/**
 * @param {import('../typedef/PaginationData')} paginationData
 * @returns {void}
 */
module.exports = function disableButtons(paginationData) {
   try {
      paginationData.buttons.forEach(button => {
         button.setDisabled(true);
      });
   } catch (error) {
      throw new Error("[DISABLE BUTTONS ERROR]:", error);
   }
}