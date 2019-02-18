// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  AUTH0_CLIENTID: 'Uyxb6svhhh5Ve65gwmV6a5dGds61myOL',
  AUTH0_DOMAIN: 'communicating-hospitals.eu.auth0.com',
  AUTH0_AUDIENCE: 'https://communicating-hospitals.herokuapp.com/',
  AUTH0_REDIRECTURL: 'http://localhost:8100/callback'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
