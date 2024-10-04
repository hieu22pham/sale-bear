const Notification = require('../../models/notifications.model')

module.exports.GetQuickOrder = async (req, res) => {
  try {
    const notifications = await Notification.find({ type: 'quickOrder' });
    res.json(notifications);


  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports.PostQuickOrder = async (req, res) => {
  try {
    console.log(req.body)
    const notification = new Notification(req.body)
    const data = await notification.save()

    res.json({
      code: 200,
      message: "Tạo thành công!",
      data: data
    })
  } catch (e) {
    res.json({
      code: 400,
      message: "Lỗi!"
    })
  }
}