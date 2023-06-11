## Commands

* `npm install -ws`

Build:
* `npm run build -ws`

Start all (dev):
* `npm run serve -w=mfe`
* `npm run start -w=app`

Refresh only `mfe`
* `npm run build -w=mfe`
* `npm run serve -w=mfe`

## Architecture

Packages:
* `app` is the host application, that references a remote component published by `mfe`
* `api` provides a shared state used by `app` and `mfe`, as a shared singleton
* `mfe`: micro frontend, exposes a remote component consumed by `app`
* `ds`: design-system, exposes standard components for consumption by other UI packages


## References
* [module-federation-examples/complete-react-case](https://github.com/module-federation/module-federation-examples/tree/master/complete-react-case).
* [module-federation-examples/shared-context](https://github.com/module-federation/module-federation-examples/tree/master/shared-context) (not a singleton)