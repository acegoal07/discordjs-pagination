# Example bot using message pages

// Import the @acegoal07/discordjs-pagination package
const { messageEmbed } = require('@acegoal07/discordjs-pagination');

// Use MessageEmbed to make pages
// Keep in mind that Embeds should't have their footers set since the pagination method sets page info there
const { MessageEmbed , MessageButton} = require('discord.js');
const embed1 = new MessageEmbed()
                .setTitle('First Page')
                .setDescription('This is the first page');

const embed2 = new MessageEmbed()
                .setTitle('Second Page')
                .setDescription('This is the second page');

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
// Timeout is how long the collector will listen to buttons till turing off if you do not include the timeout it defaults to 120000

// Call the paginationEmbed method, first three arguments are required
messageEmbed(message, pages, buttonList, timeout);

# Example bot using interaction pages

// Import the @acegoal07/discordjs-pagination package
const { interactionEmbed } = require('@acegoal07/discordjs-pagination');

// Use MessageEmbed to make pages
// Keep in mind that Embeds should't have their footers set since the pagination method sets page info there
const { MessageEmbed , MessageButton} = require('discord.js');
const embed1 = new MessageEmbed()
                .setTitle('First Page')
                .setDescription('This is the first page');

const embed2 = new MessageEmbed()
                .setTitle('Second Page')
                .setDescription('This is the second page');

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
// Timeout is how long the collector will listen to buttons till turing off if you do not include the timeout it defaults to 120000

// Call the paginationEmbed method, first three arguments are required
interactionEmbed(interaction, pages, buttonList, timeout);