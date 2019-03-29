// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production : false ,
    host : 'http://192.168.24.100:9029', //测试
    // host : 'http://52.52.134.68:9002',//线上测试
    // host : 'http://10.0.52.36:8201',//
    // host : 'http://10.0.52.103:8201',//
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
