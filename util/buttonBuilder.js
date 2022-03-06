///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const {
   MessageButton
} = require('discord.js')
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Buttons ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const next = new MessageButton()
   .setLabel(`>`)
   .setStyle(`SECONDARY`)
   .setDisabled(false)
   .setCustomId(`nextbtn`);
const previous = new MessageButton()
   .setLabel(`<`)
   .setStyle(`SECONDARY`)
   .setDisabled(false)
   .setCustomId(`previousbtn`);
const first = new MessageButton()
   .setLabel(`<<`)
   .setStyle(`SECONDARY`)
   .setDisabled(false)
   .setCustomId(`firstbtn`);
const last = new MessageButton()
   .setLabel(`>>`)
   .setStyle(`SECONDARY`)
   .setDisabled(false)
   .setCustomId(`lastbtn`);
const del = new MessageButton()
   .setLabel(`🗑`)
   .setStyle(`DANGER`)
   .setDisabled(false)
   .setCustomId(`delbtn`);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Params ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Sends back a list of buttons to be used
 * @param {Number} pageListLength
 * @param {Boolean} autoDelButton
 * @returns {MessageButton[]}
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Portal ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = buttonBuilder = async(pageListLength, autoDelButton) => {
   let buttonList
   if (pageListLength <= 3) {
      buttonList = [previous, next];
   } else {
      buttonList = [first, previous, next, last];
   }
   if (autoDelButton) buttonList.push(del)
   return buttonList;
}