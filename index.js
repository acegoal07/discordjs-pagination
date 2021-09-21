// Dependencies
const {
  MessageActionRow,
  Message,
  MessageEmbed,
  MessageButton,
} = require("discord.js");

// Disabled buttons
const d1 = new MessageButton()
  .setLabel('Disabled')
  .setStyle('SECONDARY')
  .setDisabled(true)
  .setCustomId('0');
const d2 = new MessageButton()
  .setLabel('Disabled')
  .setStyle('SECONDARY')
  .setDisabled(true)
  .setCustomId('1');
const d3 = new MessageButton()
  .setLabel('Disabled')
  .setStyle('SECONDARY')
  .setDisabled(true)
  .setCustomId('2');

// Disabled button rows
const disabledRow1 = new MessageActionRow()
  .addComponents(d1, d2);
const disabledRow2 = new MessageActionRow()
  .addComponents(d1, d2, d3);
/**
 * Creates a pagination embed
 * @param {Interaction} interaction
 * @param {Message} message
 * @param {MessageEmbed[]} pages
 * @param {MessageButton[]} buttonList
 * @param {number} timeout
 * @returns
 */

// Interaction pagination
const interactionEmbed = async (interaction, pages, buttonList, timeout = 120000) => {
  if (!pages) throw new Error("Pages are not given.");
  if (!buttonList) throw new Error("Buttons are not given.");
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
  if (buttonList.length < 2) throw new Error("Need two buttons.");

  let page = 0;

  const row = new MessageActionRow().addComponents(buttonList);
  const curPage = await interaction.reply({
    embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
    components: [row],fetchReply: true,
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

  collector.on("end", () => {
    if (!curPage.deleted) {
      if (buttonList[2] === undefined) {
        curPage.edit({
          embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
          components: [disabledRow1],
        });
      } else {
        curPage.edit({
          embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
          components: [disabledRow2],
        });
      }
      return;
    }
  });
  return curPage;
};

// Message pagination
const messageEmbed = async (message, pages, buttonList, timeout = 120000) => {
  if (!message && !message.channel) throw new Error("Channel is inaccessible.");
  if (!pages) throw new Error("Pages are not given.");
  if (!buttonList) throw new Error("Buttons are not given.");
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
  if (buttonList.length < 2) throw new Error("Need two buttons.");

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
      await message.channel.messages.fetch(curPage.id)
      if (buttonList[2] === undefined) {
        curPage.edit({
          embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
          components: [disabledRow1],
        });
      } else {
        curPage.edit({
          embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
          components: [disabledRow2],
        });
      }
      return; 
    } catch (error) {
      return;
    }
  });
  return curPage;
};

module.exports = { interactionEmbed, messageEmbed };