/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */

 define(['angularjs','./controllers/index'], function (ng) {
 	'use strict';

 	return ng.module('node_chat', ['app.controllers']);
 });