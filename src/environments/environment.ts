// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiurl : "http://localhost:8000/api",
  localUrl : "https://gsb.victordurand.fr",
  assetsUrl : "https://gsbbackstorage.blob.core.windows.net/gsbback/", 
  socketServer : "https://gsb-socket-server.herokuapp.com/",//"https://gsb-socket-server.azurewebsites.net",
  firebase: {
    apiKey: "AIzaSyArEc4pfVdzPuZQsEPMBUJXhmTom0_tLgw",
    authDomain: "gsb-laboratoire.firebaseapp.com",
    databaseURL: "https://gsb-laboratoire.firebaseio.com",
    projectId: "gsb-laboratoire",
    storageBucket: "gsb-laboratoire.appspot.com",
    messagingSenderId: "994162446040",
    appId: "1:994162446040:web:6975b5db229d6ec054d1ad"
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
