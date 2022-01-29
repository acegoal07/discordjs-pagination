///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Params ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param {Number} pages - An array of the embeds
 * @param {Number} page - Current page number
 * @param {String} proSlider - The symbol used to symbolise position on the progressBar
 * @param {String} proBar - The symbol used to symbolise pages to go on the progressBar
 * @returns {String} Progress bar
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Progress bar maker ////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = progressBarBuilder = async(pages, page, proSlider, proBar) => {
   // Progress maths
   const progress = page + 1;
   const emptyProgress = pages - (page + 1);
   // Progress text
   const progressText = proSlider.repeat(progress);
   const emptyProgressText = proBar.repeat(emptyProgress);
   // Create bar
   return `[${progressText+emptyProgressText}] : Page ${page + 1}`;
}