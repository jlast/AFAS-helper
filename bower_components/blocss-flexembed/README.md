# Blocss Flexembed – v1.0.0

A [Blocss](https://github.com/Blocss/blocss/) component to create flexible embeds.
For use with multi-media embeds, such as videos or slideshows, that need to
retain a specific aspect ratio but adapt to elements of variable widths.

Read more about [Blocss](https://blocss.github.io/blocss).

## Installation

* [Bower](http://bower.io/): `bower install --save blocss-flexembed`
* Download: [zip](https://github.com/Blocss/flexembed/zipball/master)
* Git: `git clone https://github.com/Blocss/flexembed`

## Available classes

* `.flexembed` - The core component class
* `.flexembed--16by9` - Modifier class to enable 16by9 ratio
* `.flexembed--4by3` - Modifier class to enable 4by3 ratio
* `.flexembed` - Child component


## Usage

```html
<div class="container">
    <div class="flexembed  flexembed--16by9">
        [iframe|object|embed]
    </div>
    <div class="flexembed  flexembed--16by9">
        <img src="" class="flexembed__item" />
    </div>
</div>
```

## Browser support

* Google Chrome (latest)
* Opera (latest)
* Firefox 4+
* Safari 5+
* Internet Explorer 8+