# Required functions breakdown
> These are breakdowns of what the functions do and how to use them
* <a href="#setPortal">`setPortal`</a> - This is used to set the way the pagination is going to interact with discord.js
* <a href="#setButtonList">`setButtonList`</a> - This is used to set the buttons to be used by the pagination
* <a href="#setPageList">`setPageList`</a> - This is used to set the pages used in the pagination
* <a href="#setImageList">`setImageList`</a> - This is used to set the images used for the pagination 
* <a href="#paginate">`paginate`</a> - This is used run the pagination

***
## `setPortal`
> This is used to set the way the pagination is going to interact with discord.js

**Parameters**
* `portal` - This is the interface type either interaction or message
* `settings` - This is an object containing additional settings for the pagination

**Example**
```js
// Message example
.setPortal(message)
// Interaction example
.setPortal(interaction)
// Settings example
.setPortal(interaction, {interaction_ephemeral})
```

***
## `setButtonList`
> This is used to set the buttons to be used by the pagination

**Parameters**
* `buttonList` - This is the interface type either interaction or message

**Example**
```js
// Using const
const ButtonList = [
   new ButtonBuilder()
      .setCustomId("previousbtn")
      .setLabel("Previous")
      .setStyle("Danger"),
   new ButtonBuilder()
      .setCustomId("nextbtn")
      .setLabel("Next")
      .setStyle("Success")
]
.setButtonList(buttonList)
// Inline
.setButtonList([
   new ButtonBuilder()
      .setCustomId("previousbtn")
      .setLabel("Previous")
      .setStyle("Danger"),
   new ButtonBuilder()
      .setCustomId("nextbtn")
      .setLabel("Next")
      .setStyle("Success")
])
```

***
## `setPageList`
> This is used to set the pages used in the pagination

**Parameters**
* `pageList` - This is an array of EmbedBuilders

**Example**
```js
// Using const
const pageList = [
   new EmbedBuilder()
      .setTitle("Page 1")
      .setDescription("This is page 1"),
   new EmbedBuilder()
      .setTitle("Page 2")
      .setDescription("This is page 2")
]
.setPageList(pageList)
// Inline
.setPageList([
   new EmbedBuilder()
      .setTitle("Page 1")
      .setDescription("This is page 1"),
   new EmbedBuilder()
      .setTitle("Page 2")
      .setDescription("This is page 2")
])
```

***
## `setImageList`
> This is used to set the images for the pagination, This replace setPageList

**Parameters**
* `imageList` - This is an array of AttachmentBuilders

**Example**
```js
// Using const
const imageList = [
   new AttachmentBuilder("url"),
   new AttachmentBuilder("path")
]
.setImageList(imageList)
// Inline
.setImageList([
   new AttachmentBuilder("url"),
   new AttachmentBuilder("path")
])
```

***
## `paginate`
> This is used run the pagination for all the settings to work the paginate function need to be at the end of the functions

**Example**
```js
new Pagination()
   .setPortal()
   .setPageList(pageList)
   .setButtonList(buttonList)
   .paginate();
```

***

# Option functions breakdown
> This is a breakdown of functions that are used to enable or edit options
* <a href="#setTimeout">`setTimeout`</a> - This options is used to edit the default time before the buttons are disabled on the pagination
* <a href="#setProgressBar">`setProgressBar`</a> - This option is used to enable the progressbar on the pagination and also edit the settings
* <a href="#enableReplyMessage">`enableReplyMessage`</a> - This function enables replyMessage for the pagination
* <a href="#enableAutoDelete">`enableAutoDelete`</a> - This function enables auto delete for paginations meaning when the timeout ends the pagination is deleted automatically
* <a href="#enablePrivateReply">`enablePrivateReply`</a> - This function private reply which makes it so all paginations are sent as private messages to the user
* <a href="#enableAuthorIndependent">`enableAuthorIndependent`</a> - This function enables author independent which makes it so only the user of the pagination can use the buttons
* <a href="#enableAutoButton">`enableAutoButton`</a> - This function enables autoButton which automattic creates and layouts out buttons depending on how many pages you provided
* <a href="#enableSelectMenu">`enableSelectMenu`</a> - This function enables selectMenu which replaces the buttons as the way traversing the pages
* <a href="#disableDisabledButtons">`disableDisabledButtons`</a> - Disables the buttons being disabled and re applied to the pagination after the timeout ends

***
## `setTimeout`
> This options is used to edit the default time before the buttons are disabled on the pagination

**Parameters**
* `timeout` - This is the amount of time in milliseconds

**Example**
```js
new Pagination()
   .setPortal()
   .setPageList(pageList)
   .setButtonList(buttonList)

   .setTimeout(15000)

   .paginate();
```

***
## `setProgressBar`
> This option is used to enable the progressbar on the pagination and also edit the settings

**Parameters**
* `slider` - This is an optional setting to change the slider icons used
* `bar` - This is an optional setting to change the bar icons used

**Example**
```js
new Pagination()
   .setPortal()
   .setPageList(pageList)
   .setButtonList(buttonList)

   // Enabled without custom icons
   .setProgressBar()

   // Enabled with custom icons
   .setProgressBar({slider: "▣", bar: "▢"})

   .paginate();
```

***
## `enableReplyMessage`
> This function enables replyMessage for the pagination

**Info**
> This setting can't be used with interaction paginations as they are already reply as default 

**Example**
```js
new Pagination()
   .setPortal()
   .setPageList(pageList)
   .setButtonList(buttonList)

   // Enables replyMessage
   .enableReplyMessage()

   .paginate();
```
## `enableAutoDelete`
> This function enables auto delete for paginations meaning when the timeout ends the pagination is deleted automatically

**Example**
```js
new Pagination()
   .setPortal()
   .setPageList(pageList)
   .setButtonList(buttonList)

   // Enables autoDelete
   .enableAutoDelete()

   .paginate();
```
## `enablePrivateReply`
> This function enables private reply which makes it so all paginations are sent as private messages to the user

**Example**
```js
new Pagination()
   .setPortal()
   .setPageList(pageList)
   .setButtonList(buttonList)

   // Enables privateReply
   .enablePrivateReply()

   .paginate();
```
## `enableAuthorIndependent`
> This function enables author independent which makes it so only the user of the pagination can use the buttons

**Example**
```js
new Pagination()
   .setPortal()
   .setPageList(pageList)
   .setButtonList(buttonList)

   // Enables author independent
   .enableAuthorIndependent()

   .paginate();
```
## `enableAutoButton`
> This function enables autoButton which automattic creates and layouts out buttons depending on how many pages you provided

**Info**
> This setting replaces the required function buttonList because when enables it creates a button list when running

**Example**
```js
new Pagination()
   .setPortal()
   .setPageList(pageList)

   // Enable autoButton without delete button
   .enableAutoButton()

   // Enable autoButton with delete button
   .enableAutoButton(true)

   .paginate();
```
## `enableSelectMenu`
> This function enables selectMenu which replaces the buttons as the way traversing the pages

**Parameters**
* `labels` - This option allows you to provide an array with custom names for the selectMenu
* `useTitle` - This option allows you to make it so the pagination grabs the titles of the pages and use them as the names for selectMenu

**Example**
```js
new Pagination()
   .setPortal()
   .setPageList(pageList)

   // Enable selectMenu without any options
   .enableSelectMenu()

   // Enable selectMenu with custom labels
   .enableSelectMenu({
      labels: [
         "page 1",
         "page 2",
         "page 3",
         "page 4"
      ]
   })
   
   // Enable selectMenu with useTitle enabled
   .enableSelectMenu({useTitle: true})

   .paginate();
```

***
## `disableDisabledButtons`
> Disables the buttons being disabled and re applied to the pagination after the timeout ends

**Example**
```js
new Pagination()
   .setPortal()
   .setPageList(pageList)
   .setButtonList(buttonList)

   .disableDisabledButtons()

   .paginate();
```