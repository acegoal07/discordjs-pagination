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
 * @return {MessageActionRow} Disabled message action row
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Disabler //////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = disabledButtons = async (buttonList) => {
    let disabledRow
    if (buttonList.length === 2) {
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
      if (buttonList.length === 3) {
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
      if (buttonList.length === 4) {
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
        const btn3 = new MessageButton()
          .setLabel(buttonList[3].label)
          .setStyle(buttonList[3].style)
          .setDisabled(true)
          .setCustomId('3');
        disabledRow = new MessageActionRow()
          .addComponents(btn0, btn1, btn2, btn3);
      }
      if (buttonList.length === 5) {
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
        const btn3 = new MessageButton()
          .setLabel(buttonList[3].label)
          .setStyle(buttonList[3].style)
          .setDisabled(true)
          .setCustomId('3');
        const btn4 = new MessageButton()
          .setLabel(buttonList[4].label)
          .setStyle(buttonList[4].style)
          .setDisabled(true)
          .setCustomId('4');
        disabledRow = new MessageActionRow()
          .addComponents(btn0, btn1, btn2, btn3, btn4);
      }
    return disabledRow;
}