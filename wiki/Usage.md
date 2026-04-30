# Usage

This page explains how to use `@acegoal07/discordjs-pagination`.

## Import

```js
const {
	Pagination,
	EmbedPageBuilder,
	ImagePageBuilder,
	TextPageBuilder,
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
const { ButtonStyle } = require('discord.js');
const {
	Pagination,
	EmbedPageBuilder,
	ImagePageBuilder,
	TextPageBuilder,
	PageButtonBuilder,
	ButtonAction,
	TimeoutEnding
} = require('@acegoal07/discordjs-pagination');

await new Pagination()
	.setContext(interaction)
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
			.setStyle(ButtonStyle.Primary)
	])
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

### `.setPages(pages)`

Sets page data.

- Accepts: array of `EmbedPageBuilder`, `ImagePageBuilder`, and/or `TextPageBuilder`
- Required: yes
- Returns: `Pagination`

Validation behavior:

- Throws if input is not an array
- Throws if array is empty
- Throws if array contains no compatible page builder instances

### `.setButtons(buttons)`

Sets custom button layout.

- Accepts: array of `PageButtonBuilder`
- Required: no
- Returns: `Pagination`

Validation behaviour:

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

### `EmbedPageBuilder`

Extends discord.js `EmbedBuilder` and adds `.setAttachment(attachment, attachmentData)` for embed attachments.

### `ImagePageBuilder`

Provides `.setImage(attachment, attachmentData)` for image-only pages.

### `TextPageBuilder`

Provides `.setText(text)` for text-only pages.

### `PageButtonBuilder`

Extends discord.js `ButtonBuilder` and adds `.setAction(...)`.

Supported actions:

- `ButtonAction.Next`
- `ButtonAction.Back`
- `ButtonAction.Start`
- `ButtonAction.End`
- `ButtonAction.Delete`

## Timeout Behaviour

`timeoutEnding` controls what happens when the collector times out:

- `TimeoutEnding.DisableButtons`: disable current buttons
- `TimeoutEnding.DeleteButtons`: remove buttons from message
- `TimeoutEnding.DeletePagination`: delete the pagination message

## Auto Buttons

If you do not call `.setButtons(...)`, buttons are generated automatically:

- Always: `Back`, `Next`
- If pages are greater than 3: `Start`, `End` are also added

## See Also

- Home page: [Home](./Home.md)