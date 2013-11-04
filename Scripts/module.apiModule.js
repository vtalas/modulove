angular.module('apiModule', ['ngResource', 'appConfigModule'])
	.factory('cmsApi', ['$resource', function ($resource) {
		var api = $resource('Service/cmsClientPHPService/:service',
			{ service: "serverProxy.php" },
			{
				getPage: { method: 'GET', isArray: false, params: {action: "getPage"} },
				getRequestToken: { method: 'GET', isArray: false, params: {action: "getLogin"} },
				login: { method: 'POST', isArray: false, params: {action: "PostLogin", service: "login.php"} },
				post: { method: 'POST', isArray: false, params: {action: "getLogin"} },
				getPages: { method: 'GET', isArray: false, params: {action: "getPages"} },
				getAlbums: { method: 'GET', isArray: false, params: {action: "getAlbums"} },
				getAlbum: { method: 'GET', isArray: false, params: {action: "getAlbum"} },
				getAlbumPhotos: { method: 'GET', isArray: false, params: {action: "getAlbumPhotos"} },
				getPhotos: { method: 'GET', isArray: false, params: {action: "getPhotos"} },
				putUserData: { method: 'PUT', isArray: false, params: {service: "postData.php"} },
				putSnapshot: { method: 'PUT', isArray: false, params: {service: "snapshot.php"} }
			});

		return api;
	}]);

