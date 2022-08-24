[![Svelte v3](https://img.shields.io/badge/svelte-v3-orange.svg)](https://svelte.dev)
[![npm](https://img.shields.io/npm/v/svelte-common.svg)](https://www.npmjs.com/package/svelte-common)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![Open Bundle](https://bundlejs.com/badge-light.svg)](https://bundlejs.com/?q=svelte-common)
[![downloads](http://img.shields.io/npm/dm/svelte-common.svg?style=flat-square)](https://npmjs.org/package/svelte-common)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/svelte-common.svg?style=flat-square)](https://github.com/arlac77/svelte-common/issues)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Farlac77%2Fsvelte-common%2Fbadge\&style=flat)](https://actions-badge.atrox.dev/arlac77/svelte-common/goto)
[![Styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/svelte-common/badge.svg)](https://snyk.io/test/github/arlac77/svelte-common)
[![Coverage Status](https://coveralls.io/repos/arlac77/svelte-common/badge.svg)](https://coveralls.io/github/arlac77/svelte-common)
[![Tested with TestCafe](https://img.shields.io/badge/tested%20with-TestCafe-2fa4cf.svg)](https://github.com/DevExpress/testcafe)

# svelte-common

common components utils used in svelte apps

# usage

Check out the code in the [example](/example) folder,
or the [live example](https://arlac77.github.io/components/svelte-common/example/index.html).

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [initializeServiceWorker](#initializeserviceworker)
    *   [Parameters](#parameters)
*   [toggleOrderBy](#toggleorderby)
    *   [Parameters](#parameters-1)
*   [sortable](#sortable)
    *   [Parameters](#parameters-2)
*   [sorter](#sorter)
    *   [Parameters](#parameters-3)

## initializeServiceWorker

Create a store holding a service worker

### Parameters

*   `script` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The URL of the service worker script
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** An object containing registration options

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** store holding the service worker

## toggleOrderBy

Deliver next value in the order by cycle.
SORT\_NONE -> SORT\_ASCENDING -> SORT\_DESCENDING -> SORT\_NONE ...

### Parameters

*   `orderBy` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** new order either SORT\_NONE, SORT\_ASCENDING or SORT\_DESCENDING

## sortable

Add sortable toggle to a node.
Synchronizes store value with node "aria-sort" attribute.

### Parameters

*   `node` **[Node](https://developer.mozilla.org/docs/Web/API/Node/nextSibling)**&#x20;
*   `store` &#x20;
*   `to` **WritableStore** keep in sync with sorting properties

## sorter

Generate a sort function for a given sort by set.

### Parameters

*   `sortBy` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;
*   `getters` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `{}`)

Returns **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** sorter

# install

With [npm](http://npmjs.org) do:

```shell
npm install svelte-common
```

or with [yarn](https://yarnpkg.com)

```shell
yarn add svelte-common
```

# license

BSD-2-Clause
