function ngcLazyImage() {
	var loader = "Css/loaders/loader16.gif";

	return {
		scope: {
			ngcLazyImage: "="
		},
		link: function (scope, element, attrs) {
			if (attrs.loader !== undefined ){
				loader = attrs.loader;
			}
			//element.attr("src", loader);

			scope.$watch("ngcLazyImage", function (url, oldValue) {
				if (url !== undefined){
					element.attr("src", url);
				}
			});
		}
	}
}