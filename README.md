format4js
=========

Java's String.format() compatible string formatting library for JavaScript.

## License
[MIT License](http://opensource.org/licenses/mit-license.php)

## How to use
Include JavaScript library.

```html
<script src="format4js.js"></script>
```

This library behave as jQuery plugin.

```javascript
//as jQuery plugin
var str = $.format('5+5=%d', 10);
```

However, you can use this library as a standalone library.

```javascript
// as Standalone library
var str = mdgw.format('5+5=%d', 10);
```

If you want to know detail of supported format string syntax, please view [JDK Reference](http://docs.oracle.com/javase/6/docs/api/java/util/Formatter.html#syntax).

## Limitation
* No Locale support.
* Following conversions are not supported.
    * %h, %H
    * %tN, %TN
    * %tZ, %TZ
    * %tc, %Tc
