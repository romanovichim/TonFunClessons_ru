# node-inspect-extracted

This library provides an as-faithful-as-possible implementation of Node.js's
[`util.inspect`](https://nodejs.org/api/util.html#util_util_inspect_object_options) function.

It was built in such a way that it can be kept up-to-date with node's
[implementation](https://github.com/nodejs/node/blob/master/lib/internal/util/inspect.js),
by taking the code directly from node's repo, and changing nothing but the
`require()` statements.  All of the node built-in functions are emulated.
Many of the incompatibilities generated from that emulation are not
interesting for Web use cases.

## Installation

    npm install node-inspect-extracted

## Use

This should work in node (for testing) and browsers, using either `require`, `import`, or as `window.Inspect` if you include this in your page as a script tag.

With `require`:

```js
const util = require('node-inspect-extracted');
console.log(util.inspect(1));
```

With `import`:

```js
import util from 'node-inspect-extracted';
console.log(util.inspect(2));
```

From the browser:

```html
<script src="https://unpkg.com/node-inspect-extracted/dist/inspect.js"></script>
<script>
  console.log(util.inspect(3));
</script>
```

## API

The following [`util`](https://nodejs.org/api/util.html) functions:

 - [`inspect(object[,showHidden|options[,depth [, colors]]])`](https://nodejs.org/api/util.html#util_util_inspect_object_showhidden_depth_colors)
 - [`format(format[, ...args])`](https://nodejs.org/api/util.html#util_util_format_format_args)
 - [`formatWithOptions(inspectOptions, format[, ...args])`](https://nodejs.org/api/util.html#util_util_formatwithoptions_inspectoptions_format_args)

And these extras:

 - `Proxy(target, handler)`: a wrapper for the normal [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) class that allows the `showProxy` option of inspect to work.
 - `stylizeWithColor(str, styleType)`: colorize `str` with ANSI escapes according to the styleType
 - `stylizeWithHTML(str, styleType)`: colorize `str` with HTML span tags

## Colors

If you specify `{colors: true}` in the inspect options, you will get ANSI
escape codes, just as you would in Node.  That's unlikely to be helpful to you
on the Web, so you might want `stylizeWithHTML`, which is also exported from the package:

```js
inspect({ a: 1 }, {
  compact: false,
  stylize: stylizeWithHTML
});
```

which yields this ugly HTML:
```html
{
  a: <span style="color:yellow;">1</span>
}
```

If you want better HTML, the [lightly-documented](https://nodejs.org/api/util.html#util_custom_inspection_functions_on_objects) `stylize` option requires
a function that takes two parameters, a string, and a class name.  The mappings
from class names to colors is in `inspect.styles`, so start with this:

```js
function stylizeWithHTML(str, styleType) {
  const style = inspect.styles[styleType];
  if (style !== undefined) {
    return `<span style="color:${style};">${str}</span>`;
  }
  return str;
}
```

## Known Limitations

 - If you want your
   [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
   objects to have their internal object inspected, you may use the `Proxy`
   constructor exported by this project.  That was done mostly for test coverage
   purposes. It is not recommended for production code.
 - [`arguments`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)
   objects are not treated specially.
   [[bug](https://github.com/hildjj/node-inspect-extracted/issues/1)]
 - Several of the existing type checks (corresponding to Node's
   [`util.types`](https://nodejs.org/api/util.html#util_util_types)) are
   weaker than the ones in Node, which has the freedom to use internal
   capabilities of the runtime.  This means you can fake out the type
   detection to get output different than node.
   [[bug](https://github.com/hildjj/node-inspect-extracted/issues/2)]
 - Objects that have been mangled with `Object.setPrototypeOf`
   do not retain their original type information.
   [[bug](https://github.com/hildjj/node-inspect-extracted/issues/3)]
 - `Promise` state is not visible.  All Promises will show up as
   `Promise< pending >` no matter what state they are in.
 - `Map` and `Set` iterators will not show their internal state because that
   cannot be done from unprivileged code without modifying the iterator.
   Entry iterators are not distinguished from value iterators.
   [[bug](https://github.com/hildjj/node-inspect-extracted/issues/4)]
 - `WeakMap` and `WeakSet` will not show their contents, because those contents
   cannot be iterated over in unprivileged code.
 - Colorful stack traces are not completely accurate with respect to what
   modules are Node-internal.  This doesn't matter on the Web.

## Developing

Check out NodeJS and this package next to one another:

    git clone https://github.com/hildjj/node-inspect-extracted.git
    git clone https://github.com/nodejs/node.git
    cd node-inspect-extracted
    npm install -g pnpm
    pnpm install

 - `npm start` to build, run all tests and start an auto-refreshing web server
   to watch coverage change.
 - `npm run check` to see if there have been any changes to node that need to be integrated.
 - `npm run check -- -d` to see the diffs with node
 - `npm run check -- -u` to indicate that we have merged the current changes

Tests run mostly against the pre-webpack source at the moment, but there are
some spot checks for the webpack output.

## Supported Node.js versions

This project only supports versions of Node that the Node team is [currently
supporting](https://github.com/nodejs/Release#release-schedule).  Ava's
[support statement](https://github.com/avajs/ava/blob/master/docs/support-statement.md)
is what we will be using as well.  Currently, that means Node `10`+ is
required.

## LICENSE

This code is an adaptation of the Node.js internal implementation, mostly from
the file lib/internal/util/inspect.js, which does not have the Joyent
copyright header.  The maintainers of this package will not assert copyright
over this code, but will assign ownership to the Node.js contributors, with
the same license as specified in the Node.js codebase; the portion adapted
here should all be plain MIT license.

[![Tests](https://github.com/hildjj/node-inspect-extracted/workflows/Tests/badge.svg)](https://github.com/hildjj/node-inspect-extracted/actions?query=workflow%3ATests)
[![Coverage Status](https://coveralls.io/repos/github/hildjj/node-inspect-extracted/badge.svg?branch=main)](https://coveralls.io/github/hildjj/node-inspect-extracted?branch=main)
