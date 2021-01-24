// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:4200/',
  firebase: {
    apiKey: 'AIzaSyA9iGfpD2hYjEYS2rBtvfoqqneK1E2okAE',
    authDomain: 'infocorner-2020.firebaseapp.com',
    databaseURL: 'https://infocorner-2020.firebaseio.com',
    projectId: 'infocorner-2020',
    storageBucket: 'infocorner-2020.appspot.com',
    messagingSenderId: '1056137457400',
    appId: '1:1056137457400:web:13a6fd59d1a9b0683f950d',
    measurementId: 'G-SKEY3QJQRL'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
