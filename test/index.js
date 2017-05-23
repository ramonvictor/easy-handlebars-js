const fs = require('fs')
const t = require('assert')

const html = fs.readFileSync('test/test.html').toString()
const easyHandlebars = require('../easy-handlebars');

global.document  = require('jsdom').jsdom(html)
global.window    = document.defaultView
document.scripts = document.querySelectorAll('script');

test('has scripts', () => {
    let scripts = document.scripts || [];
    t.equal(scripts.length, 2);
})

test('Greetings template', () => {
    let tmpl = easyHandlebars('greetings').render({
        title: 'Hi!'
    });
    t.equal(tmpl, '<h1>Hi!</h1>');
})

test('Thanks template', () => {
    let tmpl = easyHandlebars('thank-you').render({
        title: 'Thank you!'
    });
    t.equal(tmpl, '<h1 class="success">Thank you!</h1>');
})
