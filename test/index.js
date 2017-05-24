const fs = require('fs')
const t = require('assert')

const html = fs.readFileSync('test/test.html').toString()
const easyHandlebars = require('../easy-handlebars');

global.document  = require('jsdom').jsdom(html)
global.window    = document.defaultView
document.scripts = document.querySelectorAll('script');

test('Has document.scripts', () => {
    let scripts = document.scripts || [];
    t.equal(scripts.length, 2);
})

test('Undefined template name', () => {
    const name = 'successful-mesage'
    let message = 'easy-handlebars: could not find template "' + name + '"';
    t.throws(() => easyHandlebars(name), message);
})

test('Greetings template', () => {
    let tmpl = easyHandlebars('greetings').compile({
        title: 'Hi!'
    });
    t.equal(tmpl, '<h1>Hi!</h1>');
})

test('Thanks template', () => {
    let tmpl = easyHandlebars('thank-you').compile({
        title: 'Thank you!'
    });
    t.equal(tmpl, '<h1 class="success">Thank you!</h1>');
})
