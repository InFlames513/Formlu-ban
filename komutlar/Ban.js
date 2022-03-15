const { Modal, TextInputComponent, showModal } = require('discord-modals')

module.exports = {
  name: "ban",
  description: "Ban kodu işte ne açıklayım.",
  options: [],
  async exe(client, interaction) {
    const modal = new Modal()
      .setCustomId('ban')
      .setTitle('Ban Menüsü')
      .addComponents(
        new TextInputComponent()
        .setCustomId('user')
        .setLabel('id yazınız...')
        .setStyle('SHORT')
        .setMinLength(18)
        .setMaxLength(18)
        .setPlaceholder('762420804066738186')
        .setRequired(true),
      );
      showModal(modal, { client, interaction });  
  }
}