# Discordjs-pagination
This is a fork of <a href="https://github.com/ryzyx/discordjs-button-pagination/">ryzyx/discordjs-button-pagination</a>
<br><br>
To use this you need node version 16.0^ and discord.js version 13.0.1^ this is not a final version and things can be subject to change
<br><br>
To install use:
```cmd
npm i @acegoal07/discordjs-pagination
```

# Example bot using message pages
```js
// Import the @acegoal07/discordjs-pagination package
const paginationEmbed = require('@acegoal07/discordjs-pagination');
const { MessageEmbed , MessageButton} = require('discord.js');

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

// Create an array of embeds
pages = [
	embed1,
	embed2
];

//create an array of buttons
buttonList = [
    button1,
    button2
]

// Create timeout amount
const timeout = 3000;
// Timeout is how long the collector will listen to the buttons till 
// turing off if you do not include the timeout it defaults to 120000

// Call the paginationEmbed method, first three arguments are required
paginationEmbed.messageEmbed(message, pages, buttonList, timeout);
```

# Example bot using interaction pages
```js
// Import the @acegoal07/discordjs-pagination package
const paginationEmbed = require('@acegoal07/discordjs-pagination');
const { MessageEmbed , MessageButton} = require('discord.js');

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

// Create an array of embeds
pages = [
	embed1,
	embed2
];

//create an array of buttons
buttonList = [
    button1,
    button2
]

// Create timeout amount 
const timeout = 3000;
// Timeout is how long the collector will listen to the buttons till 
// turing off if you do not include the timeout it defaults to 120000

// Call the paginationEmbed method, first three arguments are required
paginationEmbed.interactionEmbed(interaction, pages, buttonList, timeout);
```