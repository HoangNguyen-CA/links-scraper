"use strict";

const cheerio = require("cheerio");
const getUrls = require("get-urls");
const fetch = require("node-fetch");

const scrapeMetaTags = (text) => {
  const urls = Array.from(getUrls(text));

  const requests = urls.map(async (url) => {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);

    const getMetaTag = (name) => {
      return (
        $(`meta[name="${name}"]`).attr("content") ||
        $(`meta[property="og:${name}"]`).attr("content") ||
        $(`meta[property="twitter:${name}"]`).attr("content")
      );
    };

    return {
      url,
      title: $("title").first().text(),
      favicon: $('link[rel="shortcut icon"]').attr("href"),
      description: getMetaTag("description"),
      image: getMetaTag("image"),
      author: getMetaTag("author"),
    };
  });

  return Promise.all(requests);
};

module.exports.scraper = async (event) => {
  const body = JSON.parse(event.body);
  const data = await scrapeMetaTags(body.text);

  return {
    statusCode: 200,
    body: JSON.stringify(data, null, 2),
  };
};
