/*global MenuItemList, RawDataConverter, GalleryList*/
var ApiWrapper = (function () {

	function ApiWrapper(cmsApiImpl, cache, $q) {
		this.cmsApi = cmsApiImpl;
		this.cache = cache;
		this.q = $q;
	}

	ApiWrapper.prototype.chuj = function (key, deferred, callback) {
		var response = this.cache.get(key);

		if (response) {
			deferred.resolve(response);
			return deferred;
		}
		callback();
		return deferred;
	};

	ApiWrapper.prototype.getPage = function (link) {
		var deferred = this.q.defer(),
			key = "getPage_" + link,
			self = this;

		this.chuj(key, deferred, function () {
			self.cmsApi.getPage({id: link}, function (data) {
					self.cache.put(key, data);
					deferred.resolve(data);
				},
				function (err) {
					var returnUrl = (window.location);
					var hash = (window.location.hash);
					if (err.status === 403) {
						window.location.hash = "!login";//?returnuccrl=" + hash;
					}
					deferred.reject(err);
				});
		});

		return deferred.promise;
	};

	ApiWrapper.prototype.getPages = function () {
		var deferred = this.q.defer();

		this.cmsApi.getPages(function (data) {
			deferred.resolve(data);
		});

		return deferred.promise;
	};

	ApiWrapper.prototype.getAlbum = function (albumId, imageParams) {
		var deferred = this.q.defer(),
			albumParams = imageParams || {};


		if (albumId === null) {
			deferred.resolve(null);
			return deferred.promise;
		}

		albumParams.id = albumId;

		this.cmsApi.getAlbum(albumParams, function (data) {

			deferred.resolve(data);
		});
		return deferred.promise;
	};

	ApiWrapper.prototype.getAlbumPhotos = function (albumId) {
		var deferred = this.q.defer(),
			key = albumId + "getAlbumPhotos",
			self = this;

		if (!albumId) {
			deferred.resolve([]);
			return deferred.promise;
		}

		this.chuj(key, deferred, function () {

			self.cmsApi.getAlbumPhotos({id: albumId }, function (data, xhr) {
				self.cache.put(key, data);
				deferred.resolve(data);
			});
		});

		return deferred.promise;
	};

	ApiWrapper.prototype.getPhotos = function () {
		var deferred = this.q.defer(),
			key = "getAlbumPhotosStream",
			self = this;

		this.chuj(key, deferred, function () {
			self.cmsApi.getPhotos(function (data) {
				self.cache.put(key, data);
				deferred.resolve(data);
			});
		});
		return deferred.promise;
	};

	ApiWrapper.prototype.getAlbums = function () {
		var deferred = this.q.defer();

		this.cmsApi.getAlbums(function (data) {
			deferred.resolve(data);
		});
		return deferred.promise;
	};

	ApiWrapper.prototype.snapshot = function (pageContent, path) {
		var deferred = this.q.defer();

		this.cmsApi.putSnapshot({data: pageContent, path: path}, function (data) {
			deferred.resolve(data);
		});

		return deferred.promise;
	};

	ApiWrapper.prototype.checkForSnapshot = function (scope, data) {
		if (data && data.snapshot) {
			scope.$emit("page-loaded");
		}
	};

	return ApiWrapper;
}());