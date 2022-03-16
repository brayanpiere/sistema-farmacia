const renderIndex = (req, res) => {
    res.render("compras/index");
}

const renderRealizar = (req, res) => {
    res.render("compras/realizar");
}

module.exports = { renderIndex, renderRealizar }