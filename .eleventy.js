const moment = require('moment');
 
moment.locale('en');
 
module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter('dateIso', date => {
    return moment(date).toISOString();
  });
  eleventyConfig.addFilter('dateReadable', date => {
    return moment(date).utc().format('LL'); // E.g. May 31, 2019
  });
  eleventyConfig.addCollection('postArchive', function(collectionApi) {
    var coll = collectionApi.getFilteredByTag("post");
    var removed = coll.shift()
    return coll;
  });
  eleventyConfig.addPassthroughCopy("css");
};
