# discordjs-pagination

Simple, flexible pagination for discord.js v14.

This package supports both interaction and message contexts and lets you mix multiple page types in one paginator:

- Embed pages
- Image pages
- Text pages

## Install

```bash
npm i @acegoal07/discordjs-pagination
```

```bash
yarn add @acegoal07/discordjs-pagination
```

## Quick Start

```js
const { ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, LabelBuilder } = require('discord.js');
const {
	Pagination,
	EmbedPageBuilder,
	ImagePageBuilder,
	TextPageBuilder,
	ContainerPageBuilder,
	PageButtonBuilder,
	TextDisplayPageBuilder,
	ButtonAction,
	TimeoutEnding
} = require('@acegoal07/discordjs-pagination');

await new Pagination()
	.setContext(interaction) // Can be a Message or an Interaction
	.config({
		timeout: 30000,
		timeoutEnding: TimeoutEnding.DisableButtons,
		interactionEphemeral: false,
		authorSpecific: true
	})
	.setButtons([
		new PageButtonBuilder()
			.setAction(ButtonAction.Back)
			.setCustomId('pagination_back')
			.setLabel('Back')
			.setStyle(ButtonStyle.Secondary),
		new PageButtonBuilder()
			.setAction(ButtonAction.Next)
			.setCustomId('pagination_next')
			.setLabel('Next')
			.setStyle(ButtonStyle.Primary),
		// An example of a custom button with a callback that opens a modal to ask the user for a page number to go to, then uses paginationSession.goToPage() to go to that page
		new PageButtonBuilder()
			.setAction(ButtonAction.Callback)
			.setCustomId('pagination_custom')
			.setLabel('custom')
			.setStyle(ButtonStyle.Primary)
			.setCallback(async (paginationSession, interaction) => {
				const modal = new ModalBuilder()
					.setCustomId('goToPageModal')
					.setTitle('Go to Page');

				const pageInput = new TextInputBuilder()
					.setCustomId('pageInput')
					.setStyle(TextInputStyle.Short);

				const pageLabel = new LabelBuilder()
					.setLabel("What page would you like to go to?")
					.setDescription('Page number')
					.setTextInputComponent(pageInput);

				modal.addLabelComponents(pageLabel);

				interaction.showModal(modal);

				const submitted = await interaction.awaitModalSubmit({
					time: 60000,
					filter: i =>
						i.customId === 'goToPageModal' &&
						i.user.id === interaction.user.id
				});

				// The paginationSession instance is passed to the callback to allow for control of the pagination offering nextPage, backPage, startPage, endPage, goToPage and deletePagination methods to be used in custom button callbacks like this one 
				await paginationSession.goToPage(interaction, submitted.fields.getTextInputValue('pageInput'));

				await submitted.deferUpdate();
			})
	])
	// None components v2 pages example
	.setPages([
		new EmbedPageBuilder()
			.setTitle('Welcome')
			.setDescription('This is an embed page.'),
		new EmbedPageBuilder()
			.setTitle('Embed with attachment')
			.setDescription('This embed uses an attached image file.')
			.setAttachment('./assets/example-image.png', { name: 'example-image.png' })
			.setImage('attachment://example-image.png'),
		new ImagePageBuilder().setImage('./assets/example-image.png', { name: 'example-image.png' }),
		new TextPageBuilder().setText('This is a text page.')
	])
	// Components v2 pages example
	.setPages([
		new ContainerPageBuilder()
			.addTextDisplayComponents((textDisplay) =>
				textDisplay.setContent(
					'this is a container page'
				)
			),
		new Pagination.TextDisplayPageBuilder()
			.setContent("This is a text display page")
	])
	.paginate();
```

## Core Methods

- `.setContext(context)`
  - Required. Accepts a discord.js `Message` or interaction.
- `.setPages(pages)`
  - Required. Accepts an array of `EmbedPageBuilder`, `ImagePageBuilder`, `TextPageBuilder`, `ContainerPageBuilder`, and/or `TextDisplayPageBuilder` instances
- `.setButtons(buttons)`
  - Optional. Accepts an array of `PageButtonBuilder`.
  - If you skip this, default buttons are generated automatically.
- `.config(settings)`
  - Optional configuration for timeout, interaction behaviour and more.
- `.paginate()`
  - Required. Starts the pagination flow.

## Notes

- You need at least one page to send a response.
- For multi-page navigation, provide two or more pages.
- If custom buttons are provided, include both `ButtonAction.Back` and `ButtonAction.Next`.
- All none component v2 pages are compatible with each other, so you can mix and match freely. The only exception is `ContainerPageBuilder`, which can only be used with other `ContainerPageBuilder` pages due to their specific implementation.

## Next

- npm: <https://www.npmjs.com/package/@acegoal07/discordjs-pagination>
- Repository: <https://github.com/acegoal07/discordjs-pagination>