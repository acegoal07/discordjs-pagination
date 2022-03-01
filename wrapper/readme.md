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
.enableAutoButtonDel()
.enablePaginate()
```
## Example
```js
const { MessageEmbed, MessageButton } = require('discord.js');
const paginationWrapper = require('@acegoal07/discordjs-pagination/wrapper');

// Message example
new paginationWrapper().setMessage(message)
   .setPageList(
      new MessageEmbed()
         .setTitle("Embed 1")
         .setDescription("page 1"),
      new MessageEmbed()
         .setTitle("Embed 2")
         .setDescription("page 2")
   )
   .setButtonList(
      new MessageButton()
         .setLabel(`1`)
         .setStyle(`1`)
         .setCustomId(`1`),
      new MessageButton()
         .setLabel(`2`)
         .setStyle(`2`)
         .setCustomId(`2`)
   )
   .paginate()

// Interaction example
new paginationWrapper().setInteraction(interaction)
   .setPageList(
      new MessageEmbed()
         .setTitle("Embed 1")
         .setDescription("page 1"),
      new MessageEmbed()
         .setTitle("Embed 2")
         .setDescription("page 2")
   )
   .setButtonList(
      new MessageButton()
         .setLabel(`1`)
         .setStyle(`1`)
         .setCustomId(`1`),
      new MessageButton()
         .setLabel(`2`)
         .setStyle(`2`)
         .setCustomId(`2`)
   )
   .paginate()
```
## How to use addons
Just add these methods before the paginate method to enable the addons
```js
.setTimeout(timeoutMilliseconds)
.enableAuthorIndependent()
.enableAutoDelete()
.enablePrivateReply()
.enableReplyMessage()
.setProgressBar(sliderString, barString)
.enableAutoButton()
.enableAutoButtonDel()
```