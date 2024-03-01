<h1 align="center">discordjs-pagination</h1>
<div align="center">
   <img alt="Repository size" src="https://img.shields.io/github/repo-size/acegoal07/discordjs-pagination">
   <img alt="npm" src="https://img.shields.io/npm/v/@acegoal07/discordjs-pagination/latest">
   <img alt="NPM" src="https://img.shields.io/npm/l/@acegoal07/discordjs-pagination">
   <img alt="npm (prod) dependency version" src="https://img.shields.io/npm/dependency-version/@acegoal07/discordjs-pagination/discord.js">
   <img alt="Libraries.io dependency status for latest release" src="https://img.shields.io/github/issues-raw/acegoal07/discordjs-pagination">
   <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/acegoal07/discordjs-pagination">
   <img alt="Monthly Downloads" src="https://img.shields.io/npm/dm/@acegoal07/discordjs-pagination">
</div>

***

## Pagination functions

```js
.setPortal()
.setPageList()
.setImageList()
.setButtonList()
.setAttachmentList()
.setTimeout()
.setProgressBar()
.enableReplyMessage()
.enableAutoDelete()
.enablePrivateReply()
.enableAuthorIndependent()
.enableAutoButton()
.enableAutoDelButtons()
.paginate()
```

## Example
```js
const { Pagination } = require("@acegoal07/discordjs-pagination");

// Message example
new Pagination().setPortal(message)
   .setPageList([
      new EmbedBuilder()
         .setTitle("Embed 1")
         .setDescription("page 1"),
      new EmbedBuilder()
         .setTitle("Embed 2")
         .setDescription("page 2")
   ])
   .setButtonList([
      new ButtonBuilder()
         .setLabel(`1`)
         .setStyle("Secondary")
         .setCustomId(`1`),
      new ButtonBuilder()
         .setLabel(`2`)
         .setStyle("Secondary")
         .setCustomId(`2`)
   ])
   .paginate()

// Interaction example
new Pagination().setPortal(interaction)
   .setPageList([
      new EmbedBuilder()
         .setTitle("Embed 1")
         .setDescription("page 1"),
      new EmbedBuilder()
         .setTitle("Embed 2")
         .setDescription("page 2")
   ])
   .setButtonList([
      new ButtonBuilder()
         .setLabel(`1`)
         .setStyle("Secondary")
         .setCustomId(`1`),
      new ButtonBuilder()
         .setLabel(`2`)
         .setStyle("Secondary")
         .setCustomId(`2`)
   ])
   .paginate()

// Interaction ephemeral examples
   // way 1 sends a deferred interaction with it enabled
   await interaction.deferReply({ephemeral: true})
   new Pagination().setPortal(interaction)
      .setPageList([ ........

   // way 2 sends an un-deferred interaction which is used to enable it
   new Pagination().setPortal(interaction, {interaction_ephemeral: true}) 
      .setPageList([ ........

// How to use setImageList instead of setPageList
// to use images you just replace the setPageList with
// setImageList
   .setImageList([
       new AttachmentBuilder(url),
       new AttachmentBuilder(path)
   ])
```