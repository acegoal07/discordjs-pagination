<h1 align="center">discordjs-pagination</h1>
<div align="center">
    <img alt="Repository size" src="https://img.shields.io/github/repo-size/acegoal07/discordjs-pagination">
    <img alt="npm" src="https://img.shields.io/npm/v/@acegoal07/discordjs-pagination">
    <img alt="NPM" src="https://img.shields.io/npm/l/@acegoal07/discordjs-pagination">
    <img alt="npm (prod) dependency version" src="https://img.shields.io/npm/dependency-version/@acegoal07/discordjs-pagination/discord.js">
    <img alt="Libraries.io dependency status for latest release" src="https://img.shields.io/github/issues-raw/acegoal07/discordjs-pagination">
    <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/acegoal07/discordjs-pagination">
</div><br>
<p align="center">
    <a href="#about">About</a> &#xa0; | &#xa0;
    <a href="#example">Example</a> &#xa0; | &#xa0;
    <a href="https://www.npmjs.com/package/@acegoal07/discordjs-pagination">NPM</a> &#xa0; | &#xa0;
    <a href="https://github.com/acegoal07" target="_blank">Author</a>
</p>

---

<h1 id="about">About</h1>

**1.0.9 contains changes that requires you to update your code to support the new version find the universal example <a href="#example">here</a> the change is very same but makes using the dependency easier**

Required dependencies: 
- discord.js version 13.0.1^

To install use:
```js
npm i @acegoal07/discordjs-pagination
```

When calling the pagination make sure it is pagination({ }) without the brackets it won't work
<h1 id="example">Example</h1>

```js
// Import the @acegoal07/discordjs-pagination package
const pagination = require('@acegoal07/discordjs-pagination');
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

// Call the pagination, first three arguments are required. make sure that the arguments are 
// within brackets like so ({}) otherwise you'll get an error and it won't work

// For messages use
pagination({message, pages, buttonList, timeout});

// For interaction use
pagination({interaction, pages, buttonList, timeout});
```