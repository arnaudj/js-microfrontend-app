// exports made via ModuleFederationPlugin#exposes

import React from 'react';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container!);

/**
 * A dummy entry point, needed for bootstrap sequence when consumed by host.
 * An alternative is to set a remote to provide react & react-dom, and rely on this remote instead of shared dependencies (https://github.com/module-federation/module-federation-examples/blob/master/complete-react-case/component-app/webpack.config.js#L46)
For ReactCurrentActQueue:

react-dom.development.js:25258 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'current')
    at isConcurrentActEnvironment (react-dom.development.js:25258:1)
    at warnIfUpdatesNotWrappedWithActDEV (react-dom.development.js:27559:1)
    at scheduleUpdateOnFiber (react-dom.development.js:25508:1)
    at updateContainer (react-dom.development.js:28858:1)
    at ReactDOMHydrationRoot.render.ReactDOMRoot.render (react-dom.development.js:29314:1)
    at ./src/bootstrap.tsx (bootstrap.tsx:8:6)
    at __webpack_require__ (bootstrap:24:1)
    at Function.fn (hot module replacement:62:1)
 */
root.render(
  <React.StrictMode>
    <></>
  </React.StrictMode>
);
