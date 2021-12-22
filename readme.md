<h1 align="center">discordjs-pagination</h1>
<div align="center">
    <img alt="Repository size" src="https://img.shields.io/github/repo-size/acegoal07/discordjs-pagination">
    <img alt="npm" src="https://img.shields.io/npm/v/@acegoal07/discordjs-pagination">
    <img alt="NPM" src="https://img.shields.io/npm/l/@acegoal07/discordjs-pagination">
    <img alt="npm (prod) dependency version" src="https://img.shields.io/npm/dependency-version/@acegoal07/discordjs-pagination/discord.js">
    <img alt="Libraries.io dependency status for latest release" src="https://img.shields.io/librariesio/release/npm/@acegoal07/discordjs-pagination">
    <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/acegoal07/discordjs-pagination">
</div><br>
<p align="center">
    <a href="#about">About</a> &#xa0; | &#xa0; 
    <a href="#message">Message usage</a> &#xa0; | &#xa0; 
    <a href="#interaction">Interaction usage</a> &#xa0; | &#xa0; 
    <a href="https://github.com/acegoal07" target="_blank">Author</a>
</p>

---

<h1 id="about">About</h1>
To use this you need discord.js version 13.0.1^ this is not a final version and things can be subject to change

Report any issues you experience using the <a href="https://github.com/acegoal07/discordjs-pagination/issues">issues tab</a>  on the github or by using one of the contact methods on <a href="https://acegoal07.dev">my website</a>

To install use:
```js
npm i @acegoal07/discordjs-pagination
```

<h1 id="message">Message Usage</h1>

```js
// Import the @acegoal07/discordjs-pagination package
const paginationEmbed = require('@acegoal07/discordjs-pagination');
const { MessageEmbed , MessageButton } = require('discord.js');

// Use MessageEmbed to make pages
// Keep in mind that Embeds should't have their footers set since 
// the pagination method sets page info there
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

// Create an array of embeds
pages = [
	embed1,
	embed2
    // ... Can add as many embeds as you want
];

//create an array of buttons
buttonList = [
    button1,
    button2,
    button3 // just add the optional delete button here
]

// Create timeout amount 
const timeout = 3000;
// Timeout is how long the collector will listen to the buttons till 
// turing off if you do not include the timeout it defaults to 120000

// Call the paginationEmbed method, first three arguments are required
paginationEmbed.messageEmbed(message, pages, buttonList, timeout);
```

<h1 id="interaction">Interaction usage</h1>

```js
// Import the @acegoal07/discordjs-pagination package
const paginationEmbed = require('@acegoal07/discordjs-pagination');
const { MessageEmbed , MessageButton } = require('discord.js');

// Use MessageEmbed to make pages
// Keep in mind that Embeds should't have their footers set since 
// the pagination method sets page info there
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

// Create an array of embeds
pages = [
	embed1,
	embed2
    // ... Can add as many embeds as you want
];

//create an array of buttons
buttonList = [
    button1,
    button2,
    button3 // just add the optional delete button here
]

// Create timeout amount 
const timeout = 3000;
// Timeout is how long the collector will listen to the buttons till 
// turing off if you do not include the timeout it defaults to 120000

// Call the paginationEmbed method, first three arguments are required
paginationEmbed.interactionEmbed(interaction, pages, buttonList, timeout);
```