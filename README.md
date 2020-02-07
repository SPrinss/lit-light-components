# Lit light component library
Component library build on native browser standards. See the [repository](https://github.com/SPrinss/lit-light-components) for the source code.

## Send events
Send events for every user interaction we might want to track in the parent app.

## Documentation
[Jsdoc](https://devdocs.io/jsdoc/) is used as the standard for documentation. This standard works well with the [web-component-analyzer](https://github.com/runem/web-component-analyzer) which can extract all the documentation and convert it to a JSON file. `npm run analyze` to udate the documentation of a package. Make sure you use Node >v10.

## Serve
[es-dev-server](https://www.npmjs.com/package/es-dev-server) is use to serve the apps locally. Using [api-viewer-element](https://github.com/web-padawan/api-viewer-element) we can show detailed information on the web components extracted by the [web-component-analyzer](https://github.com/runem/web-component-analyzer). `npm start` will serve the demo. Stylus can compile file changes to css with each save, run `npm run stylus:watch` in a second terminal.