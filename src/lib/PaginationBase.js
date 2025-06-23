// Dependencies
const { MessageFlags } = require("discord.js"),
   { InteractionPagination } = require("./InteractionPagination"),
   { MessagePagination } = require("./MessagePagination"),
   { AutoButtonCreator } = require("../util/tools/ButtonCreator");

/**
 * The function that prepares the required data and detects whether it's an interaction or message pagination
 * @param {{
 *    paginationInfo: import("../util/typedef/paginationInfo").PaginationInfo,
 *    options: import("../util/typedef/paginationOptions").PaginationOptions
 * }} params
 * @returns {Promise.<import("discord.js").EmbedBuilder[]>}
 */
exports.PaginationBase = async ({ paginationInfo, options }) => {
   try {
      // Validate required inputs
      if (!paginationInfo.pageList && !paginationInfo.imageList) {
         throw new Error("PaginationBase ERROR: You must provide either a pageList or an imageList.");
      }
      if (paginationInfo.pageList && paginationInfo.imageList) {
         throw new Error("PaginationBase ERROR: Provide only one of pageList or imageList, not both.");
      }

      const pageLength = options.imageList
         ? paginationInfo.imageList.length
         : paginationInfo.pageList.length;

      // Button/SelectMenu setup
      if (!paginationInfo.buttonList && !options.selectMenu.toggle) {
         if (options.autoButton.toggle) {
            paginationInfo.buttonList = await AutoButtonCreator(pageLength, options.autoButton.deleteButton);
         } else {
            throw new Error("PaginationBase ERROR: You must provide a buttonList or enable selectMenu/autoButton.");
         }
      }

      if (
         options.selectMenu.toggle &&
         (paginationInfo.buttonList || options.autoButton.toggle || options.autoButton.deleteButton)
      ) {
         process.emitWarning(
            "PaginationBase WARNING: selectMenu overwrites any button settings. Remove all button settings to stop this warning."
         );
      }

      // ProgressBar validation
      if (options.progressBar.toggle) {
         if (typeof options.progressBar.slider !== "string" || options.progressBar.slider.length !== 1) {
            throw new Error("PaginationBase ERROR: The progressBar slider must be a single character string.");
         }
         if (typeof options.progressBar.bar !== "string" || options.progressBar.bar.length !== 1) {
            throw new Error("PaginationBase ERROR: The progressBar bar must be a single character string.");
         }
      }

      // SelectMenu label setup
      if (options.selectMenu.toggle && !options.selectMenu.labels) {
         const labelData = [];
         if (options.selectMenu.useTitle) {
            for (const page of paginationInfo.pageList) {
               labelData.push(`${page.data.title}`);
            }
         } else {
            for (let i = 0; i < pageLength; i++) {
               labelData.push(`Page ${i + 1}`);
            }
         }
         options.selectMenu.labels = labelData;
      } else if (paginationInfo.buttonList) {
         if (paginationInfo.buttonList.length < 2) {
            throw new Error("PaginationBase ERROR: You must provide at least 2 buttons.");
         }
         if (paginationInfo.buttonList.length > 5) {
            process.emitWarning(
               "PaginationBase WARNING: More than 5 buttons provided. Extras will be removed."
            );
            paginationInfo.buttonList = paginationInfo.buttonList.slice(0, 5);
         }
         for (const button of paginationInfo.buttonList) {
            if (button.style === "LINK") {
               throw new Error("PaginationBase ERROR: Link buttons are not supported.");
            }
            if (button.disabled) {
               throw new Error("PaginationBase ERROR: Provided buttons must not be disabled.");
            }
         }
      }

      // Interaction Pagination
      if (paginationInfo.portal?.constructor?.name?.endsWith('Interaction')) {
         if (pageLength < 2) {
            if (options.privateReply) {
               if (paginationInfo.portal.deferred) {
                  await paginationInfo.portal.editReply("The reply has been sent privately");
               } else {
                  await paginationInfo.portal.reply({ content: "The reply has been sent privately", flags: options.ephemeral ? MessageFlags.Ephemeral : null });
               }
               return paginationInfo.portal.client.users.cache.get(paginationInfo.portal.member.user.id).send(
                  options.imageList
                     ? { files: [paginationInfo.imageList[0]] }
                     : paginationInfo.attachmentList !== null
                        ? {
                           embeds: [paginationInfo.pageList[0]],
                           files: [paginationInfo.attachmentList[0] ?? null]
                        }
                        : { embeds: [paginationInfo.pageList[0]] }
               );
            } else {
               const payload = options.imageList
                  ? { files: [paginationInfo.imageList[0]] }
                  : paginationInfo.attachmentList !== null
                     ? {
                        embeds: [paginationInfo.pageList[0]],
                        files: [paginationInfo.attachmentList[0] ?? null]
                     }
                     : { embeds: [paginationInfo.pageList[0]] };

               if (paginationInfo.portal.deferred) {
                  return await paginationInfo.portal.editReply(payload);
               } else {
                  return await paginationInfo.portal.reply({ ...payload, flags: options.ephemeral ? MessageFlags.Ephemeral : null });
               }
            }
         }
         if (paginationInfo.portal.ephemeral) {
            if (paginationInfo.buttonList.length === 3 || paginationInfo.buttonList.length === 5) {
               throw new Error("PaginationBase ERROR: Delete buttons are not supported when ephemeral is enabled.");
            }
            if (options.ephemeral) {
               process.emitWarning(
                  "PaginationBase WARNING: The interaction already has ephemeral enabled; the pagination does not require the setting enabled."
               );
            }
         }
         return Promise.resolve(InteractionPagination(paginationInfo, options));
      }

      // Message Pagination
      if (options.replyMessage && options.privateReply) {
         process.emitWarning("PaginationBase WARNING: privateReply overwrites and disables replyMessage.");
      }
      if (!paginationInfo.portal.channel) {
         throw new Error("PaginationBase ERROR: Channel is inaccessible.");
      }
      if (pageLength < 2) {
         if (options.privateReply) {
            await paginationInfo.portal.channel.send("The reply has been sent privately");
            return paginationInfo.portal.author.send(
               options.imageList
                  ? { files: [paginationInfo.imageList[0]] }
                  : paginationInfo.attachmentList !== null
                     ? {
                        embeds: [paginationInfo.pageList[0]],
                        files: [paginationInfo.attachmentList[0] ?? null]
                     }
                     : { embeds: [paginationInfo.pageList[0]] }
            );
         } else {
            const payload = options.imageList
               ? { files: [paginationInfo.imageList[0]] }
               : paginationInfo.attachmentList !== null
                  ? {
                     embeds: [paginationInfo.pageList[0]],
                     files: [paginationInfo.attachmentList[0] ?? null]
                  }
                  : { embeds: [paginationInfo.pageList[0]] };
            return options.replyMessage
               ? paginationInfo.portal.reply(payload)
               : paginationInfo.portal.channel.send(payload);
         }
      }
      return Promise.resolve(MessagePagination(paginationInfo, options));
   } catch (error) {
      throw new Error(`Error occurred with ${__filename.split(/[\\/]/).pop().replace(".js", "")}: ${error.message}`);
   }
};