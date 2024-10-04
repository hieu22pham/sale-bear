const Notification = require('../../models/notifications.model')

module.exports.QuickOrder = async (req, res) => {
  try {
    const notifications = await Notification.find({ type: 'quickOrder' });
    res.json(notifications);
  } catch (error) {
    res.status(500).send(error.message);
  }
}