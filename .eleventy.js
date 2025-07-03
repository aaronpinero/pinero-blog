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
  eleventyConfig.addCollection('latestPosts', function(collectionApi) {
    return collectionApi.getFilteredByTag("post").sort(function (a, b) {
      return b.date - a.date;
    }).slice(0,5);
  });
  eleventyConfig.addCollection('sortedWorks', function(collectionApi) {
    return collectionApi.getFilteredByTag("work").sort(function (a, b) {
      return a.data.ordinal - b.data.ordinal;
    });
  });
  eleventyConfig.addCollection('latestWorks', function(collectionApi) {
    return collectionApi.getFilteredByTag("work").sort(function (a, b) {
      return a.data.ordinal - b.data.ordinal;
    }).slice(0,2);
  });
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPassthroughCopy("resources");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("fonts");
};