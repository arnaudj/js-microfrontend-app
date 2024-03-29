[![CI](https://github.com/arnaudj/js-microfrontend-app/actions/workflows/ci-build-test.js.yml/badge.svg)](https://github.com/arnaudj/js-microfrontend-app/actions/workflows/ci-build-test.js.yml) [![Netlify Status](https://api.netlify.com/api/v1/badges/0cb6b5e8-e4d1-41e8-a750-8d1f859fcd5d/deploy-status)](https://app.netlify.com/sites/js-microfrontend-app/deploys)

## Commands

* `npm install -ws`

Start all (dev):
* `npm run start -w=ds`
* `npm run start -w=mfe`
* `npm run start -w=app`

Build and serve locally:
* `npm run build`
* `npm run serve`

## Overview
<img src="doc/core-ep-overview-github.svg" width="700">

## Architecture

Packages:
* `app` is the host application, that references a remote component published by `mfe`
* `api` provides a shared state used by `app` and `mfe`, as a shared singleton
* `mfe`: micro frontend, exposes a remote component consumed by `app`
* `ds`: design-system, exposes standard components for consumption by other UI packages

## Demo

https://js-microfrontend-app.netlify.app/


## References
* [module-federation-examples/complete-react-case](https://github.com/module-federation/module-federation-examples/tree/master/complete-react-case).
* [module-federation-examples/shared-context](https://github.com/module-federation/module-federation-examples/tree/master/shared-context) (not a singleton)