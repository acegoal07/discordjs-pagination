/**
 * Sends back a string that represents the page as a progressbar
 * @param {Number} pageListLength - An array of the embeds
 * @param {Number} pageNumber - Current page number
 * @param {Object} progressBar - All the progressBar settings
 * @returns {Promise.<String>}
 */
exports.ProgressBarCreator = async (pageListLength, pageNumber, progressBar) => {
   try {
      // Progress text
      const progressText = progressBar.slider.repeat(pageNumber + 1);
      const emptyProgressText = progressBar.bar.repeat(pageListLength - (pageNumber + 1));
      // Create bar
      return Promise.resolve(`[${progressText+emptyProgressText}] : Page ${pageNumber + 1}`);
   } catch(error) {
      return Promise.reject(`Error occured with ${__filename.split(/[\\/]/).pop().replace(".js","")} ${error}`);
   }
}