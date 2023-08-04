const dns = require("node:dns");

const urls = [];
let count = 1;

const createShortURL = (req, res) => {
  const url = new URL(req.body.url);

  dns.lookup(url.hostname, (err) => {
    if (err) {
      res.send({ error: "Invalid Hostname" });
      return;
    }
    const shortURL = {
      original_url: url,
      short_url: count,
    };
    urls.push(shortURL);
    count++;
    res.json(shortURL);
  });
};

const getShortURL = (req, res) => {
  const { id } = req.params;
  const { original_url } = urls.find((url) => url.short_url == id);
  res.redirect(original_url.href);
};

module.exports = { createShortURL, getShortURL };
