///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const {
  MessageActionRow,
  Message,
  MessageEmbed,
  MessageButton,
  Interaction,
} = require("discord.js");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Params ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param {Interaction} interaction
 * @param {Message} message
 * @param {MessageEmbed[]} pages
 * @param {MessageButton[]} buttonList
 * @param {number} timeout
 * @returns
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Message pagination ////////////////////////////////////////////////////////////////////////////////////////////////////
const MessagePagination = async ({message, pages, buttonList, timeout}) => {
  if (!message && !message.channel) throw new Error("Channel is inaccessible");
  if (!pages) throw new Error("Pages are not given");
  if (!buttonList) throw new Error("Buttons are not given");
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
          const disabledButtons2 = new MessageActionRow()
            .addComponents(btn0, btn1);
          curPage.edit({
            embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
            components: [disabledButtons2],
          });
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
          const disabledButtons = new MessageActionRow()
            .addComponents(btn0, btn1, btn2);
          curPage.edit({
            embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
            components: [disabledButtons],
          });
        }
      } catch (error) {return}
    } catch (error) {return}
  });
  return curPage;
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Exporter //////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = MessagePagination;