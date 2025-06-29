const moment = require('moment');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation"); 
moment.locale('en');

module.exports = function (eleventyConfig) {
  eleventyConfig.addShortcode('now', () => {
    return new Date().toUTCString();
  });
  eleventyConfig.addFilter('dateIso', date => {
    return moment(date).toISOString();
  });
  eleventyConfig.addFilter('dateReadable', date => {
    return moment(date).utc().format('LL'); // E.g. May 31, 2019
  });
  eleventyConfig.addFilter('dateFeed', date => {
    return moment(date).utc();
  });
  eleventyConfig.addCollection('postArchive', function(collectionApi) {
    var coll = collectionApi.getFilteredByTag("post");
    coll.pop();
    return coll;
  });
  eleventyConfig.addCollection('allPosts', function(collectionApi) {
    return collectionApi.getFilteredByTag("post").sort(function (a, b) {
      return b.date - a.date;
    });
  });
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPassthroughCopy("resources");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("fonts");
};