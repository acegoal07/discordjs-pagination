/**
 * Disables all the buttons stored in the pagination data
 * @param {import('../typedef/PaginationData')} paginationData
 */
module.exports = function disableButtons(paginationData) {
   try {
      paginationData.buttons.forEach(button => {
         button.setDisabled(true);
      });
   } catch (error) {
      throw new Error("[DISABLE BUTTONS ERROR]:", { cause: error });
   }
}