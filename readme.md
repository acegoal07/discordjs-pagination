<h1 align="center">discordjs-pagination</h1>
<div align="center">
   <img alt="Repository size" src="https://img.shields.io/github/repo-size/acegoal07/discordjs-pagination">
   <img alt="npm" src="https://img.shields.io/npm/v/@acegoal07/discordjs-pagination/latest">
   <img alt="NPM" src="https://img.shields.io/npm/l/@acegoal07/discordjs-pagination">
   <img alt="npm (prod) dependency version" src="https://img.shields.io/npm/dependency-version/@acegoal07/discordjs-pagination/discord.js">
   <img alt="Libraries.io dependency status for latest release" src="https://img.shields.io/github/issues-raw/acegoal07/discordjs-pagination">
   <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/acegoal07/discordjs-pagination">
   <img alt="Monthly Downloads" src="https://img.shields.io/npm/dm/@acegoal07/discordjs-pagination">
</div><br>
<p align="center">
   <a href="#about">About</a> &#xa0; | &#xa0;
   <a href="#example">Example</a> &#xa0; | &#xa0;
   <a href="#functions">Wrapper functions</a> &#xa0; | &#xa0;
   <a href="#settingsHelp">Optional settings help</a> &#xa0; | &#xa0;
   <a href="#createHelp">Page and button builder</a> &#xa0; | &#xa0;
   <a href="https://www.npmjs.com/package/@acegoal07/discordjs-pagination">NPM</a> &#xa0; | &#xa0;
   <a href="https://github.com/acegoal07" target="_blank">Author</a>
</p>

---

<h1 id="about">About</h1>
This pagination supports both Message and Interaction and automaticity switches between which interface is provided

To download the package use
```sh
npm i @acegoal07/discordjs-pagination
```

<h1 id="functions">All wrapper functions</h1>

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
.createPages()
.createButtons()
.paginate()
```
<h1 id="example">Example</h1>

```js
const { MessageEmbed, MessageButton } = require('discord.js');
const paginationWrapper = require('@acegoal07/discordjs-pagination');

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
<h1 id="settingsHelp">Optional settings help</h1>

Just add these methods before the paginate function to enable the addons e.g.
```js
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
   .enableAutoDelete() // <---- Make sure its before the paginate function or it wont enable
   .paginate()
```

All the available settings and the input they need
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
.createPages() // View create help to see how to use this feature
.createButtons() // View create help to see how to use this feature
```
<h1 id="createHelp">Create help</h1>

Create Pages example
```js
// This feature replaces the .setPageList() function
.createPages([
   {
      color: "RED",
	   title: "page1",
      url: "https://acegoal07.dev",
      description: "page1 is here",
      author: {
         name: "acegoal07",
         icon_url: "https://acegoal07.dev/Resources/Pictures/acegoal07.webP",
         url: "https://acegoal07.dev",
      },
      thumbnailUrl: "https://acegoal07.dev/Resources/Pictures/acegoal07.webP",
      fields: [
         {
            name: "Look i work",
            value: "Hello World!",
            inline: false,
         },
         {
            // And carry on like so
         }
      ],
      imageUrl: "https://acegoal07.dev/Resources/Pictures/acegoal07.webP",
   },
   {
      // And carry on like so
   }
])
```

create Buttons example
```js
// This feature replaces the .setButtonList() function
.createButtons([
   {
      customId: "button1",
      label: "i am button 1",
      emoji: "123456789012345678", // emoji replaces the label
      style: "SUCCESS"
   },
   {
      // And carry on like so
   }
])
```