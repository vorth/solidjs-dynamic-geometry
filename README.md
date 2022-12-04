# Dynamic Geometry Tool POC using SolidJS

### [Try the app](https://www.vzome.com/webapps/solid-dynamic-geometry/)

SolidJS is built around fine-grained reactivity, which makes it very natural for building
anything with spreadsheet-like dynamic update.
In particular, it can be used quite naturally to build a geometry tool like
[Geogebra](https://www.geogebra.org/geometry), [Desmos](https://www.desmos.org/geometry),
or [Geometer's Sketchpad](https://en.wikipedia.org/wiki/The_Geometer%27s_Sketchpad) (the original).

The code here is just the barest proof-of-concept, thrown together in one day.
No dragging, sorry!

There were a couple of challenges.
First, I want to make sure the code could be used as an editor, which means that
the SolidJS signals and memos have to be created from data, not coded statically,
unlike many Solid examples.
Similarly, the dependency graph between signals and memos and rendered objects has to be
dynamically constructed, using a dictionary.
Solid is pretty unopinionated, so mostly these problems were in my head, and not that hard to overcome.
Nonetheless, I hope this helps anyone else trying to build a similarly dynamic system.

The rest of this README is the boilerplate from the SolidJS starter repo.

## Usage

Those templates dependencies are maintained via [pnpm](https://pnpm.io) via `pnpm up -Lri`.

This is the reason you see a `pnpm-lock.yaml`. That being said, any package manager will work. This file can be safely be removed once you clone a template.

```bash
$ npm install # or pnpm install or yarn install
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `npm dev` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)
