# Blocss Navigation – v1.0.1

A [Blocss](https://github.com/Blocss/blocss/) component to create navigation objects.

Read more about [Blocss](https://blocss.github.io/blocss).

## Installation

* [Bower](http://bower.io/): `bower install --save blocss-navigation`
* Download: [zip](https://github.com/Blocss/navigation/zipball/master)
* Git: `git clone https://github.com/Blocss/navigation`

## Available classes

* `.nav` - The core component class
* `.nav--stacked` - Modifyer class throws the list in vertical mode
* `.nav--banner` - Modifyer class centers the list
* `.nav--breadcrumb` - Modifyer class throws the list in breadcrumb mode
* `.nav--breadcrumb-path` - Modifyer class throws the list in breadcrumb mode with a path delimiter
* `.nav--pagination` - Modifyer class throws the list in pagination mode

## Usage

```html
<ul class="nav  [nav--stacked|nav--banner|nav--breadcrumb|nav--breadcrumb-path|nav--pagination]">
    <li><a>Home</a></li>
</ul>
```

## Browser support

* Google Chrome (latest)
* Opera (latest)
* Firefox 4+
* Safari 5+
* Internet Explorer 8+