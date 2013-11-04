var ngcGdataAlbumDirective = ["cmsApi", function(cmsApi) {
	var api = new ApiWrapper(cmsApi);

	return {
		scope: { ngcGdataAlbum: "=" },
		compile: function (iElement, iAttrs, transclude) {
			return function (scope, element, attrs) {

				api.getAlbum(scope.ngcGdataAlbum).then(function (data) {
				});
			};
		}
	};
}];