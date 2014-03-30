/*
// Common JS
// Date: March 2014
// Developers:
// 	Luis Matute      - luis.matute@me.com
// Description:
// 	This is the first JS file that's loaded.
// 	Takes care of the require.config which has
// 	the js paths and at the end calls the common module
// -----------------------------------------------------
*/

// Rule of thumb:
// 	Define: If you want to declare a module other parts of your application will depend on.
// 	Require: If you just want to load and use stuff.

require.config({
	baseUrl: '/js',
	// urlArgs: 'bust=2',
	paths: {
		// The Libraries we use
		angularjs: [
            '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.0-beta.3/angular.min' // CDNJS
        ],
        app: 		'app',
        msg_ctrl: 	'controllers/MessageController'
	},
	shim: {
		angularjs: {
        	exports: 'angular'
    	}
    },
    deps: [
    	// Start App
    	'./bootstrap'
    ]
});