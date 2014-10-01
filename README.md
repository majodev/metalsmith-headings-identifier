#metalsmith-headingsidentifier

> A Metalsmith plugin to add an id + anchor to all headings on a page. Ideal for permalinks.

Based on [code](https://github.com/remy/permalink/blob/master/permalink.js) and [idea by remy sharp](http://remysharp.com/2014/08/08/automatic-permalinks-for-blog-posts).  
Extracted from [majodev.github.io](http://majodev.github.io).

As part the my note *"[Extracting libs from a node.js project: Publishing my metalsmith plugins](http://ranf.tl/2014/10/01/extracting-libs-from-a-node-js-project/)"*.

## Installation

```bash
npm install --save metalsmith-headingsidentifier
```

## Usage

```javascript
var Metalsmith = require("metalsmith");
var headingsidentifier = require("metalsmith-headingsidentifier");


Metalsmith(__dirname)
  // html files are available (e.g. state when markdown was compiled)
  .use(headingsidentifier())
  // ...
```

Should also work in similar fashion with the `metalsmith.json` counterpart.

## Options

`headingsidentifier` accepts an hash to provide a few customization options.

### `linkTemplate` (optional)
`String`: Template of the anchor link (in `%s` the automatically generated id will be inserted) that will be prepended in the headings  
default: `<a class="heading-anchor" href="#%s"><span></span></a>`

### `allow` (optional)
`String`: A simple way to limit this plugin to only run on files that have the provided metakey set.  
default: `undefined`

## Full example with options set

```javascript
var Metalsmith = require("metalsmith");
var headingsidentifier = require("metalsmith-headingsidentifier");


Metalsmith(__dirname)
  // html files are available (e.g. state when markdown was compiled)
  .use(headingsidentifier({
    linkTemplate: "<a class="myCustomHeadingsAnchorClass" href="#%s"><span></span></a>",
    allow: "fileMetaKeyHeadingsAllowed"
  }))
  // ...
```


## Problems?
File an issue or fork 'n' fix and send a pull request.

## License
(c) 2014 Mario Ranftl  
[MIT License](majodev.mit-license.org)
