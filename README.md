format4js
=========

Java's String.format() compatible string formatting library for JavaScript.

## License
[MIT License](http://opensource.org/licenses/mit-license.php)

## How to Use
Include JavaScript library.

```html
<script src="format4js.js"></script>
```

The format4js extends String class to add format() method.
You can call format() as static and instance method.

```javascript
// static method: String.format("fmt", args...)
var str = String.format("5+5=%d", 10);

// instance method: "fmt".format(args...)
var str = "5+5=%d".format(10);
```

If you want to know detail of supported format string syntax, please see [JDK Reference](http://docs.oracle.com/javase/6/docs/api/java/util/Formatter.html#syntax).

## Limitation
* No Locale support.
* Following conversions are not supported.
    * %h, %H
    * %tN, %TN
    * %tZ, %TZ
    * %tc, %Tc

## Alternative Interfaces
The format4js behave as jQuery plugin.

```javascript
// as jQuery plugin
var str = $.format('5+5=%d', 10);
```

You can also use this library as a standalone.

```javascript
// as Standalone library
var str = mdgw.format('5+5=%d', 10);
```

