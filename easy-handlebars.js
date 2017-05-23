'use strict';
/*
 * Easy to memorize API to render handlebars templates.
 * @module easy-handlebars
 */
var Handlebars = require('handlebars');
var cached = {};
/**
 * @typedef {Object} RenderAPI
 * @property {function} render
 */

/**
 * Get handlebars template.
 * @public
 * @param {string} name
 * @returns {RenderAPI}
 */
function getTemplate(name) {
  if (!cached.hasOwnProperty(name)) {
    findTemplates();

    if (!cached.hasOwnProperty(name)) {
      throw new Error('template-provider: could not find template ' + name);
    }
  }

  return {
    render: function(data) {
      var template = (cached[name].use || cached[name].compile());
      return template(data || {}).trim('');
    }
  }
}

/**
 * Register template pointers in single scoped object.
 * @private
 */
function eachTemplate(el) {
  var id = el.getAttribute('id');

  if (typeof id != 'undefined' && !cached.hasOwnProperty(id)) {
    cached[id] = {
      compile: function() {
        return (
          cached[id].use = Handlebars.compile(el.innerHTML)
        )
      }
    };
  }
}

/**
 * Look for template elements in the document.
 * @private
 */
function findTemplates() {
  var scripts = [].slice.call(document.scripts);

  scripts.filter(function(script) {
    return script.type === 'text/x-handlebars-template';
  })
  .forEach(eachTemplate);
}

module.exports = getTemplate;
