## The current methods
```js
.setMessage()
.setInteraction()
.setPageList()
.setButtonList()
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
const { MessageEmbed, MessageButton } = require('discord.js');
const paginationWrapper = require('@acegoal07/discordjs-pagination/wrapper');

// Message example
new paginationWrapper().setMessage(message)
   .setPageList([
      new MessageEmbed()
         .setTitle("Embed 1")
         .setDescription("page 1"),
      new MessageEmbed()
         .setTitle("Embed 2")
         .setDescription("page 2")
   ])
   .setButtonList([
      new MessageButton()
         .setLabel(`1`)
         .setStyle(`1`)
         .setCustomId(`1`),
      new MessageButton()
         .setLabel(`2`)
         .setStyle(`2`)
         .setCustomId(`2`)
   ])
   .paginate()

// Interaction example
new paginationWrapper().setInteraction(interaction)
   .setPageList([
      new MessageEmbed()
         .setTitle("Embed 1")
         .setDescription("page 1"),
      new MessageEmbed()
         .setTitle("Embed 2")
         .setDescription("page 2")
   ])
   .setButtonList([
      new MessageButton()
         .setLabel(`1`)
         .setStyle(`1`)
         .setCustomId(`1`),
      new MessageButton()
         .setLabel(`2`)
         .setStyle(`2`)
         .setCustomId(`2`)
   ])
   .paginate()
```
## How to use addons
Just add these methods before the paginate function to enable the addons
```js
.setTimeout(timeInMilliseconds) // Allows you to set a custom timeOut for your pagination
.enableAuthorIndependent() // Enables authorIndependent for your pagination
.enableAutoDelete() // Enables autoDelete for your pagination
.enablePrivateReply() // Enables privateReply for your pagination
.enableReplyMessage() // Enables replyMessage for your pagination
.setProgressBar({newSliderIcon, newBarIcon}) // Enables pagination for your pagination and allows you to edit the characters
.enableAutoButton() // Enables autoButton for your pagination
.enableAutoDelButton() // Enables autoDelButton for your pagination
.enableSelectMenu() // Enables selectMenu for your pagination
```