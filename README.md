[![Svelte v3](https://img.shields.io/badge/svelte-v3-orange.svg)](https://svelte.dev)
[![npm](https://img.shields.io/npm/v/svelte-common.svg)](https://www.npmjs.com/package/svelte-common)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![bundlejs](https://deno.bundlejs.com/?q=svelte-common\&badge=detailed)](https://bundlejs.com/?q=svelte-common)
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

*   [AttributeDefinition](#attributedefinition)
    *   [Properties](#properties)
*   [tokens](#tokens)
    *   [Parameters](#parameters)
*   [setAttribute](#setattribute)
    *   [Parameters](#parameters-1)
*   [getAttribute](#getattribute)
    *   [Parameters](#parameters-2)
*   [getAttributeAndOperator](#getattributeandoperator)
    *   [Parameters](#parameters-3)
*   [filter](#filter)
    *   [Parameters](#parameters-4)
*   [Pagination](#pagination)
    *   [Parameters](#parameters-5)
    *   [page](#page)
        *   [Parameters](#parameters-6)
    *   [page](#page-1)
    *   [pageNavigationElement](#pagenavigationelement)
*   [initializeServiceWorker](#initializeserviceworker)
    *   [Parameters](#parameters-7)
*   [toggleOrderBy](#toggleorderby)
    *   [Parameters](#parameters-8)
*   [sortable](#sortable)
    *   [Parameters](#parameters-9)
*   [sorter](#sorter)
    *   [Parameters](#parameters-10)
*   [keyPrefixStore](#keyprefixstore)
    *   [Parameters](#parameters-11)

## AttributeDefinition

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

### Properties

*   `type` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;
*   `writable` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)**&#x20;
*   `private` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** should the value be shown
*   `depends` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** name of an attribute we depend on
*   `additionalAttributes` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** extra attributes that are present in case our attribute is set
*   `description` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;
*   `default` **any?** the default value
*   `set` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)?** set the value
*   `get` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)?** get the value can be used to calculate default values
*   `env` **([Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)> | [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))?** environment variable use to provide the value

## tokens

Split property path into tokens

### Parameters

*   `string` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;

## setAttribute

Set Object attribute.
The name may be a property path like 'a.b.c'.

### Parameters

*   `object` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;
*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;
*   `value` **any**&#x20;

## getAttribute

Deliver attribute value.
The name may be a property path like 'a.b.c'.

### Parameters

*   `object` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;
*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;

Returns **any** value associated with the given property name

## getAttributeAndOperator

Deliver attribute value and operator.
The name may be a property path like 'a.b.c <='.

### Parameters

*   `object` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;
*   `expression` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;
*   `getters`   (optional, default `{}`)

Returns **\[any, [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)]** value associated with the given property name

## filter

Generate filter function.

### Parameters

*   `filterBy` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?**&#x20;
*   `getters` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?**&#x20;

Returns **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)**&#x20;

## Pagination

Pagination support store.

### Parameters

*   `source` &#x20;
*   `itemsPerPage`   (optional, default `10`)

### page

Set current page

#### Parameters

*   `n` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)**&#x20;

### page

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** current page

### pageNavigationElement

*   **See**: @link <https://getbootstrap.com/docs/4.0/components/pagination>
*   **See**: @link <https://a11y-style-guide.com/style-guide/section-navigation.html#kssref-navigation-pagination>

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

Add sortable toggle button to a th node.
Synchronizes store value with the nodes "aria-sort" attribute.

### Parameters

*   `th` **[Element](https://developer.mozilla.org/docs/Web/API/Element)** the header node
*   `store` **WritableStore** keep in sync with sorting properties

## sorter

Generate a sort function for a given sort-by set.

### Parameters

*   `sortBy` **([Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) | [undefined](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined))?**&#x20;
*   `getters` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?**&#x20;

Returns **([Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function) | [undefined](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined))** sorter

## keyPrefixStore

Create a derived store where all the object keys are prefixed.

    { a: 1, b: 2 } -> { foo_a: 1 foo_b: 2 } // prefix: foo_

### Parameters

*   `store` **WriteableStore** we derive from
*   `prefix` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** for each key

Returns **WriteableStore**&#x20;

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
