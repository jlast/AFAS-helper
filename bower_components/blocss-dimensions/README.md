# Blocss Dimensions – v1.0.1

A [Blocss](https://github.com/Blocss/blocss/) collection of utility classes for low-level CSS dimensions.

Read more about [Blocss](https://blocss.github.io/blocss).

## Installation

* [Bower](http://bower.io/): `bower install --save blocss-dimensions`
* Download: [zip](https://github.com/Blocss/dimensions/zipball/master)
* Git: `git clone https://github.com/Blocss/dimensions`

## Available classes
Not: these are defaults, you can alter the names with variables

* `.u-x-x`: Gives an element width
* `.push-x-x`: Pushes an element to the right
* `.pull-x-x`: Pulls an element to the left

You can alter the `$divisions` variable to create several proportional divisions.
For example, `2 4 6 12` will let you use the `.u-1-2`, `.u-2-4`, `.u-3-6`, and
`.u-6-12` classes to specify that an element should take up 50% of its container.

## Browser support

* Google Chrome (latest)
* Opera (latest)
* Firefox 4+
* Safari 5+
* Internet Explorer 8+