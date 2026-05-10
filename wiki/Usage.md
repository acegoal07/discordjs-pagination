# Usage

This page explains how to use `@acegoal07/discordjs-pagination`.

## Import

```js
const {
	Pagination,
	EmbedPageBuilder,
	ImagePageBuilder,
	TextPageBuilder,
	ContainerPageBuilder,
	PageButtonBuilder,
	ButtonAction,
	TimeoutEnding
} = require('@acegoal07/discordjs-pagination');
```

## Basic Flow

1. Create a new `Pagination()` instance.
2. Set context with `.setContext(interaction)`.
3. Optionally configure settings using `.config(...)`.
4. Set pages using `.setPages([...])`.
5. Optionally set custom buttons with `.setButtons([...])`.
6. Run `.paginate()`.

## Full Interaction Example

```js
const { ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, LabelBuilder } = require('discord.js');
const {
	Pagination,
	EmbedPageBuilder,
	ImagePageBuilder,
	TextPageBuilder,
	ContainerPageBuilder,
	PageButtonBuilder,
	TextDisplayPageBuilder
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
			.setCallback(async (paginationData, paginationSession, interaction) => {
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

## API Reference

### `.setContext(context)`

Sets the pagination context.

- Accepts: discord.js `Interaction` or `Message`
- Required: yes
- Returns: `Pagination`

### `.config(settings)`

Configures runtime behaviour.

- Accepts: object
- Required: no
- Returns: `Pagination`

Available options:

- `timeout` (number, default: `20000`)
- `timeoutEnding` (`TimeoutEnding`, default: `TimeoutEnding.DisableButtons`)
- `interactionEphemeral` (boolean, default: `false`)
- `authorSpecific` (boolean, default: `false`)
- `loop` (boolean, default: `false`)
- `autoDeleteButton` (boolean, default: `false`)
- `messageResponseType` (`reply` or `send`, default: `send`)

### `.setPages(pages)`

Sets page data.

- Accepts: array of `EmbedPageBuilder`, `ImagePageBuilder`, `TextPageBuilder`, `ContainerPageBuilder`, and/or `TextDisplayPageBuilder` instances
- Required: yes
- Returns: `Pagination`

Validation behaviors:

- Throws if input is not an array
- Throws if array is empty
- Throws if array contains no compatible page builder instances
- Throws if standard pages are mixed with components v2 pages this is due to limitation in how discord handles components V2 pages stopping the switching between the two types of pages in the same pagination session.

Page type breakdown:

| Page Type     | Builder Class            |
| ------------- | ------------------------ |
| Standard      | `EmbedPageBuilder`       |
| Standard      | `ImagePageBuilder`       |
| Standard      | `TextPageBuilder`        |
| Components v2 | `ContainerPageBuilder`   |
| Components v2 | `TextDisplayPageBuilder` |

### `.setButtons(buttons)`

Sets custom button layout.

- Accepts: array of `PageButtonBuilder`
- Required: no
- Returns: `Pagination`

Validation behaviors:

- Throws if input is not an array
- Throws if fewer than 2 valid buttons are provided
- Throws if no `ButtonAction.Next` button exists
- Throws if no `ButtonAction.Back` button exists

If omitted, default buttons are auto-generated.

### `.paginate()`

Starts pagination.

- Accepts: no arguments
- Required: yes
- Returns: `Promise`

## Builders

> Why builders? The builders extend the native discord.js builders and add additional functionality and information needed for the pagination to function.

### `EmbedPageBuilder`

Extends discord.js `EmbedBuilder` and adds `.setAttachment(attachment, attachmentData)` for embed attachments.

### `ImagePageBuilder`

Provides `.setImage(attachment, attachmentData)` for image-only pages.

### `TextPageBuilder`

Provides `.setText(text)` for text-only pages.

### `ContainerPageBuilder`

Extends `ContainerBuilder` and allows users to build components v2 pages. Not compatible with none component v2 pages.

### `TextDisplayPageBuilder`

Extends `TextDisplayBuilder` and allows users to build text display pages for components v2 paginations. Not compatible with none component v2 pages.

### `PageButtonBuilder`

Extends discord.js `ButtonBuilder` and adds `.setAction(...)`.

Supported actions:

- `ButtonAction.Unset` - default value, button has no function and the button will be removed from the pagination
- `ButtonAction.Next`
- `ButtonAction.Back`
- `ButtonAction.Start`
- `ButtonAction.End`
- `ButtonAction.Delete`
- `ButtonAction.Callback` - allows you to set a custom callback function that is executed when the button is pressed

> The callback function for `ButtonAction.Callback` buttons receives three arguments: `paginationData`, `paginationSession`, and `interaction`. `paginationData` contains information about the current pagination state, `paginationSession` provides methods to control the pagination (like nextPage, backPage, goToPage, etc.), and `interaction` is the interaction that triggered the button press.

## Timeout Behaviour

`timeoutEnding` controls what happens when the collector times out:

- `TimeoutEnding.DisableButtons`: disable current buttons
- `TimeoutEnding.DeleteButtons`: remove buttons from message
- `TimeoutEnding.DeletePagination`: delete the pagination message

## Auto Buttons

If you do not call `.setButtons(...)`, buttons are generated automatically:

- Always: `Back`, `Next`
- If pages are greater than 3: `Start`, `End` are also added