# Blocss Arrange – v1.0.3

A [Blocss](https://github.com/Blocss/blocss/) component for horizontally and vertically arranging a single row of
cells. Includes modifier classes for equal-width cells and gutter-separated
cells. Makes use of CSS table layout. Directly copied from [Suit-Arrange](https://raw.github.com/suitcss/arrange), but modified the classnames to comply with the BEM methodology.

Read more about [Blocss](https://blocss.github.io/blocss).

## Installation

* [Bower](http://bower.io/): `bower install --save blocss-arrange`
* Download: [zip](https://github.com/Blocss/arrange/zipball/master)
* Git: `git clone https://github.com/Blocss/arrange`

## Available classes

* `.arrange` - The core component class
* `.arrange--middle` - The modifier class for middle-aligned cells
* `.arrange--bottom` - The modifier class for bottom-aligned cells
* `.arrange--equal` - The modifier class for equal-width cells
* `.arrange--gutter` - The modifier class to add a gutter based on `$space`
* `.arrange__size-fit` - The child class for cells to snap to fit their content
* `.arrange__size-fill` - The child class for cells to expand to fill the remaining space

## Usage

N.B. This component affects the width of images in cells.

Like many components, arrange relies on a core component class
that is extended by additional modifier classes. This component works best for
small-scale UI layout, for example, image-content pairs:

```html
<div class="arrange">
    <div class="arrange__size-fit">
        <img src="img.png" alt="">
    </div>
    <div class="arrange__size-fill">
        Bram Smulders @bramsmulders
        …
    </div>
</div>
```

Or for an equally spaced row of buttons or icons, etc.

```html
<ul class="arrange  arrange--equal">
    <li class="arrange__size-fill">
        <button class="button">Reply</button>
    </li>
    <li class="arrange__size-fill">
        <button class="button">Like</button>
    </li>
    <li class="arrange__size-fill">
        <button class="button">Save</button>
    </li>
    <li class="arrange__size-fill">
        <button class="button">Remove</button>
    </li>
</ul>
```

## Browser support

* Google Chrome (latest)
* Opera (latest)
* Firefox 4+
* Safari 5+
* Internet Explorer 8+