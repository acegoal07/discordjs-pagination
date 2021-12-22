///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const {
    MessageActionRow,
    MessageButton,
  } = require("discord.js");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Params ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param {MessageButton[]} buttonList
 * @return {MessageActionRow()}
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Disabler //////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = disabledButtons = async (buttonList) => {
    let disabledRow
    if (buttonList[2] === undefined) {
        const btn0 = new MessageButton()
          .setLabel(buttonList[0].label)
          .setStyle(buttonList[0].style)
          .setDisabled(true)
          .setCustomId('0');
        const btn1 = new MessageButton()
          .setLabel(buttonList[1].label)
          .setStyle(buttonList[1].style)
          .setDisabled(true)
          .setCustomId('1');
        disabledRow = new MessageActionRow()
          .addComponents(btn0, btn1);
      } 
      if (buttonList[2]) {
        const btn0 = new MessageButton()
          .setLabel(buttonList[0].label)
          .setStyle(buttonList[0].style)
          .setDisabled(true)
          .setCustomId('0');
        const btn1 = new MessageButton()
          .setLabel(buttonList[1].label)
          .setStyle(buttonList[1].style)
          .setDisabled(true)
          .setCustomId('1');
        const btn2 = new MessageButton()
          .setLabel(buttonList[2].label)
          .setStyle(buttonList[2].style)
          .setDisabled(true)
          .setCustomId('2');
        disabledRow = new MessageActionRow()
          .addComponents(btn0, btn1, btn2);
      }
    return disabledRow;
}