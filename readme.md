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
   <a href="#makeSure">Make Sure</a> &#xa0; | &#xa0;
   <a href="https://www.npmjs.com/package/@acegoal07/discordjs-pagination">NPM</a> &#xa0; | &#xa0;
   <a href="https://github.com/acegoal07" target="_blank">Author</a>
</p>

---

<h1 id="about">About</h1>

Required dependency: 
- discord.js version 13.5.0^

To install use:
```js
npm i @acegoal07/discordjs-pagination
```

When using the interaction pagination you are able to defer the reply before calling pagination as it supports both deferred and non deferred interaction

If you supply the pagination with less than 2 embeds it will automaticity send the embed without the buttons as a normal embed

If you do not want custom buttons you can use the autoButton option this replaces the buttonList option and creates the buttons for you

A wrapper for this pagination can be found <a href="https://github.com/acegoal07/discordjs-pagination/tree/main/wrapper">here</a> but as of the moment is not included in the most recent version of the pagination

<h1 id="makeSure">Make sure</h1>

When calling the pagination make sure it is pagination({ }) without the brackets it won't work

If you want to use either autoDelete or the delete buttons with a interaction pagination if you have already deferred the reply you can't have ephemeral enabled

<h1 id="example">Example</h1>

```js
// Import the @acegoal07/discordjs-pagination package
const pagination = require('@acegoal07/discordjs-pagination');
const { MessageEmbed , MessageButton } = require('discord.js');

// Use MessageEmbed to make pages
// Keep in mind that Embeds should't have their footers set since
// the pagination will overwrite the set footer
const embed1 = new MessageEmbed()
   .setTitle('First Page')
   .setDescription('This is the first page');
const embed2 = new MessageEmbed()
   .setTitle('Second Page')
   .setDescription('This is the second page');

// Use MessageButton to create the buttons
// Do not used link buttons as they don't give an output
const button1 = new MessageButton()
   .setCustomId('previousbtn')
   .setLabel('Previous')
   .setStyle('DANGER');
const button2 = new MessageButton()
   .setCustomId('nextbtn')
   .setLabel('Next')
   .setStyle('SUCCESS');
// The delete button is optional and is not required for
// pagination to work
const button3 = new MessageButton()
   .serCustomId('delbtn')
   .setLabel('Delete')
   .setStyle('DANGER');
const button4 = new MessageButton()
   .serCustomId('lastbtn')
   .setLabel('Last Page')
   .setStyle('Success');
const button5 = new MessageButton()
   .serCustomId('firstbtn')
   .setLabel('First page')
   .setStyle('DANGER');

// Create an array of embeds
pageList = [
	embed1,
	embed2
   // ... Can add as many embeds as you want
];

// Create an array of buttons
buttonList = [
   button1, // Next page button
   button2, // Previous page button
   button3 // Optional delete button (do not include if you do not want it)
];
// To use the first and last buttons use
buttonList = [
   button5, // First page button
   button1, // Next page button
   button2, // Previous page button
   button4, // Last page button
   button3 // Optional delete button (do not include if you do not want it)
];

// Create timeout amount
const timeout = 3000;
// Timeout is how long the collector will listen to the buttons till
// turing off if you do not include the timeout it defaults to 12000
// and the minimum time that can be set is 3000 any lower will result in error

// For messages use
pagination({
   message, // Required
   pageList, // Required
   buttonList, // Required

   autoButton: true, // optional - if you do not want custom buttons remove the buttonList parameter
                     // and replace it will autoButtons: true which will create buttons depending on
                     // how many pages there are
   autoDelButton: true, // Optional - if you are using autoButton and would like delete buttons this 
                        // parameter adds delete buttons to the buttonList

   timeout, // Optional - if not provided it will default to 12000ms

   replyMessage: true, // Optional - An option to reply to the target message if you do not want
                       // this option remove it from the function call

   autoDelete: true, // Optional - An option to have the pagination delete it's self when the timeout ends
                     // if you do not want this option remove it from the function call

   privateReply: true, // Optional - An option to have the pagination sent in a dm
                      // if you do not want this option remove it from the function call

   // Optional - An option to have the footer replaced by a progress bar
   // if you do not want this option remove it from the function call
   progressBar: true, // Required if you want to use the progressBar
   proSlider: "▣", // Optional if you want a custom progressBar
   proBar: "▢", // Optional if you want a custom progressBar

   authorIndependent: true // Optional - An option to set pagination buttons only usable by the author
                           // if you do not want this option remove it from the function call
   
   selectMenu: true // Optional - Replaces the page buttons with a drop menu allowing you to select 
                    // which page you want to go to
});

// For interaction use
pagination({
   interaction, // Required
   pageList, // Required
   buttonList, // Required

   autoButton: true, // Optional - if you do not want custom buttons remove the buttonList parameter
                     // and replace it will autoButtons: true which will create buttons depending on
                     // how many pages there are
   autoDelButton: true, // Optional - if you are using autoButton and would like delete buttons this 
                        // parameter adds delete buttons to the buttonList

   timeout, // Optional - if not provided it will default to 12000ms

   autoDelete: true, // Optional - An option to have the pagination delete it's self when the timeout ends
                     // if you do not want this option remove it from the function call  

   privateReply: true, // Optional - An option to have the pagination sent in a dm
                      // if you do not want this option remove it from the function call

   // Optional - An option to have the footer replaced by a progress bar
   // if you do not want this option remove it from the function call
   progressBar: true, // Required if you want to use the progressBar
   proSlider: "▣", // Optional if you want a custom progressBar
   proBar: "▢", // Optional if you want a custom progressBar
   
   authorIndependent: true // Optional - An option to set pagination buttons only usable by the author
                           // if you do not want this option remove it from the function call
                              
   selectMenu: true // Optional - Replaces the page buttons with a drop menu allowing you to select 
                    // which page you want to go to
});
```
