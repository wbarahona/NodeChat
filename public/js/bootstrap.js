/**
 * bootstraps angular onto the window.document node
 * NOTE: the ng-app attribute should not be on the index.html when using ng.bootstrap
 */

define(['angularjs','app'],function (ng) {
	'use strict';

	// Init procedures should go here

	ng.bootstrap(document,['app']);
});