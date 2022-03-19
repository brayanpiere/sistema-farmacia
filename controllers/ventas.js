const renderIndex = (req, res) => {
    res.render("ventas/index");
}

const renderRealizar = (req, res) => {
    res.render("ventas/realizar");
}

module.exports = { renderIndex, renderRealizar }