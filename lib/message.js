///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const {
  MessageActionRow,
  Message,
  MessageEmbed,
  MessageButton,
  Interaction,
} = require("discord.js");
const disabledButtons = require('../util/disabledButtons');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Params ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param {Message} message
 * @param {MessageEmbed[]} pages
 * @param {MessageButton[]} buttonList
 * @param {number} timeout
 * @returns
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Message pagination ////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = MessagePagination = async (message, pages, buttonList, timeout) => {
  if (!message && !message.channel) throw new Error("Channel is inaccessible");
  if (pages.length < 2) return message.channel.send({embeds: [pages[0]]});
  if (buttonList[2] === undefined) {
    if (buttonList[0].style === "LINK" || buttonList[1].style === "LINK")
      throw new Error(
        "Link buttons are not supported with @acegoal07/discordjs-pagination"
      );
  } else {
    if (buttonList[0].style === "LINK" || buttonList[1].style === "LINK" || buttonList[2].style === "LINK")
      throw new Error(
        "Link buttons are not supported with @acegoal07/discordjs-pagination"
      );
  }
  if (buttonList.length < 2) throw new Error("Need two buttons");
  
  let page = 0;
  
  const row = new MessageActionRow().addComponents(buttonList);
  const curPage = await message.channel.send({
    embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
    components: [row],
  });
  
  let filter 
  if (buttonList[2] === undefined) {
    filter = (i) =>
      i.customId === buttonList[0].customId ||
      i.customId === buttonList[1].customId;
  } else {
    filter = (i) =>
      i.customId === buttonList[0].customId ||
      i.customId === buttonList[1].customId ||
      i.customId === buttonList[2].customId;
  }
  
  const collector = await curPage.createMessageComponentCollector({
    filter,
    time: timeout,
  });
  
  collector.on("collect", async (i) => {
    switch (i.customId) {
      case buttonList[0].customId:
        page = page > 0 ? --page : pages.length - 1;
        break;
      case buttonList[1].customId:
        page = page + 1 < pages.length ? ++page : 0;
        break;
      case buttonList[2].customId:
        curPage.delete();
        return;
      default:
        break;
    }
    await i.deferUpdate();
    await i.editReply({
      embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
      components: [row],
    });
    collector.resetTimer();
  });
  
  collector.on("end", async() => {
    try {
      await message.channel.messages.fetch(curPage.id);
      try {
        const disabledRow = await disabledButtons(buttonList);
        curPage.edit({
          embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
          components: [disabledRow],
        });
      } catch (error) {return}
    } catch (error) {return}
  });
  return curPage;
};