<div class="text-xs-center" align="center" style="margin: 20px">
  <img src="./logo.png" height="255" alt="lazy-image-component">
</div><br><br>

<div class="text-xs-center" align="center">

  [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)
  [![NPM version](https://img.shields.io/npm/v/lazy-image-component.svg?style=flat)](https://npmjs.com/package/lazy-image-component)
  [![NPM downloads](https://img.shields.io/npm/dm/lazy-image-component.svg?style=flat)](https://npmjs.com/package/lazy-image-component)

</div>

## Introduction

Defer or lazy load images

## Usage

### Installation

```shell
npm install --save lazy-image-component
```

### Examples

```js
import { LazyImage } from 'lazy-image-component';

export default {
  ...
  components: { LazyImage }
  ...
}
```

Examples of using LazyImage in a Vue component, which also
documents the different options provided:

```html
<template>
  <div>
    <!-- `src` and `alt` are required props -->
    <LazyImage src="./images/foo.png" alt="An image of foo" />

    <!-- Provide low resolution tumbnail image (64x64 is enough) -->
    <LazyImage src="./images/foo.png" thumbnail="./images/foo.png" />

    <!-- Page Header Image. VERY IMPORTANT -->
    <LazyImage src="./images/foo.png" critical />

    <!-- Important image but outside of initial view. (Good for low memory devices) -->
    <LazyImage src="./image/foo.png" eager />

    <!-- Resize placeholder image to correct size. And silent warning logs 😛  -->
    <LazyImage src="./image/foo.png" width="360px" height="200px" />
  </div>
</template>
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/znck/lazy-image-component/releases).

## Author

**lazy-image-component** © [Rahul Kadyan](https://github.com/znck), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by Rahul Kadyan with help from contributors ([list](https://github.com/znck/lazy-image-component-temp/contributors)).

> [znck.me](https://znck.me) · GitHub [@Rahul Kadyan](https://github.com/znck) · Twitter [@znck0](https://twitter.com/@znck0)
