This is just me learning as i have not made something like this before and it may not be added to a released version of the pagination

At the moment if this wrapper is it will stay apart of the original package and not become a separate one but that could change
## The current functions
```js
.setMessage()
.setInteraction()
.setPageList()
.setButtonList()
.setTimeout()
.setProgressBar()
.setReplyMessage()
.setAutoDelete()
.setPrivateReply()
.setAuthorIndependent()
.paginate()
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
Just add these settings before the paginate function to enable the addons
```js
.setTimeout(set time)
.setAuthorIndependent()
.setAutoDelete()
.setPrivateReply()
.setReplyMessage()
.setProgressBar(new slider, new bar)
```