var cheerio = require('cheerio');
var _ = require("lodash");

var util = require("util");
var extname = require('path').extname;

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * A Metalsmith plugin to add an id + anchor to all headings on a page
 * ideal for permalinks
 * adapted from code and idea by remy sharp
 * (blog post: http://remysharp.com/2014/08/08/automatic-permalinks-for-blog-posts/)
 * (src file: https://github.com/remy/permalink/blob/master/permalink.js) !
 *
 * @param {Object} options
 * @return {Function}
 */

function plugin(options) {

  var formatLinkString = '<a class="heading-anchor" href="#%s"><span></span></a>';
  var limitExecution = false;
  var allowField = "";


  if (_.isUndefined(options) === false) {
    if (_.isUndefined(options.allow) === false) {
      limitExecution = true;
      allowField = options.allow;
    }
    if (_.isUndefined(options.linkTemplate) === false) {
      formatLinkString = options.linkTemplate;
    }
  }

  return function(files, metalsmith, done) {
    setImmediate(done);

    Object.keys(files).forEach(function(file) {
      if (!html(file)) return;

      if (limitExecution) {
        if (files[file][allowField] !== true) {
          return;
        }
      }

      var idcache = {}; // to handle douple ids
      var data = files[file];
      var $ = cheerio.load(data.contents.toString());

      $("h1,h2,h3,h4,h5,h6").each(function(index, element) {
        var id = $(element).attr("id");
        if (!id) {
          id = ($(element).text()).replace(/&.*?;/g, '').replace(/\s+/g, '-').replace(/[^\w\-]/g, '').toLowerCase();
          if (idcache[id]) {
            id = id + '-' + index;
          }
          $(element).attr("id", id);
          idcache[id] = 1;
        } else {
        }
        $(element).prepend(util.format(formatLinkString, id));
      });

      data.contents = $.html();
      files[file] = data;
    });
  };
}

/**
 * Check if a `file` is html.
 *
 * @param {String} file
 * @return {Boolean}
 */

function html(file) {
  return /\.html?/.test(extname(file));
}