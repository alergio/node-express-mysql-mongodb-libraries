const principalView = (req, res) => {
  res.render("home");
};

const tablesView = (req, res) => {
  res.render("tables");
};

const notificationsViews = (req, res) => {
  res.render("notifications");
};

module.exports = {
  principalView,
  tablesView,
  notificationsViews,
};
