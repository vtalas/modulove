var images = [
	"Modulove_byt_DSC_9388_exp.jpg",
	"Modulove_byt_DSC_9299-Edit_exp.jpg",
	"Modulove_byt_DSC_9309_exp.jpg",
	"Modulove_byt_DSC_9314_exp.jpg",
	"Modulove_byt_DSC_9329_exp.jpg",
	"Modulove_byt_DSC_9352_exp.jpg",
	"Modulove_byt_DSC_9369_exp.jpg",
	"Modulove_byt_DSC_9378_exp.jpg",
	"Modulove_byt_DSC_9381_exp.jpg",
	"Modulove_byt_DSC_9382_exp.jpg",
	"Modulove_byt_DSC_9384_exp.jpg",
	"Modulove_byt_DSC_9389_exp.jpg",
	"Modulove_byt_DSC_9393_exp.jpg",
	"Modulove_byt_DSC_9394_exp.jpg",
	"Modulove_byt_DSC_9396_exp.jpg",
	"Modulove_byt_DSC_9410_exp.jpg",
	"Modulove_byt_DSC_9418_exp.jpg",
	"Modulove_byt_DSC_9434_exp.jpg"
];


var module = angular.module("modulove", []);
module.controller("slideShow", function ($scope) {
	var imagesCount = images.length,
		position = 1,
		imageUrl;

	imageUrl = function (name) {
		return "Content/images/" + name;
	};

	var preLoadImage = function (name, index) {
		var image = new Image();

		image.src = "Content/images/" + name;
		angular.element(image).load(function () {
			if (index === 0) {
				setTimeout(function () {
					showContent();
				}, 20);
			}
		});
	};
	var showContent = function () {
		$scope.showContent = true;
		$scope.$broadcast("show-content");
		$scope.$digest();
		$(".content").mCustomScrollbar({
			scrollButtons: {enable: true},
			theme: "dark-thick"
		});
	};

	$scope.showContent = false;
	$scope.isVideo = Modernizr["video"];

	if ($scope.isVideo) {
		$scope.$on("video-loaded", function () {
			showContent();
		})
	} else {
		for (var i = 0; i < images.length; i++) {
			preLoadImage(images[i], i);
		}
	}

	$scope.image = imageUrl(images[position]);
	$scope.next = function () {
		position++;
		if (position > imagesCount) {
			position = 1;
		}
		$scope.image = imageUrl(images[position]);
	};

	$scope.prev = function () {
		position--;
		if (position < 1) {
			position = imagesCount - 1;
		}
		$scope.image = imageUrl(images[position]);
	};
	$scope.toggleContent = function () {
		if ($scope.contentVisible) {
			angular.element(".content.text-content").hide();
		} else {
			angular.element(".content.text-content").show();
		}
		$scope.contentVisible = !$scope.contentVisible;
	}

//	$scope.$on("show-content", function () {
//		$scope.showContent = true;
//	})
});

module.directive('ngcFloat', function ($window) {
	return {
		link: function (scope, element) {
			var window = angular.element($window),
				height = window.height(),

				divOffset = height / 5,
				elementHeight = element.outerHeight();

			if (elementHeight < height) {
				angular.element("body").css("overflow", "hidden");
				if (elementHeight + divOffset < height) {
					element.css("top", divOffset);
				} else {
					element.css("top", height - elementHeight - 20);
				}
			} else {
				angular.element("body").css("overflow", "auto");
			}
		}
	};
});
var updateImageElement = function (element, containerHeight) {
	var elementHeight = element.height();

	if (elementHeight === 0 || containerHeight === 0) {
		return;
	}
	if (containerHeight > elementHeight) {
		element.css("width", "auto");
		element.css("height", "100%");
	} else {
		element.css("height", "auto");
		element.css("width", "100%");
	}
};

module.directive('ngcFullscreenImage', function ($window) {
	var updateImage = function (url, element, containerHeight) {
		var image = new Image();
		image.src = url;
		angular.element(image).load(function () {
			updateImageElement(element, containerHeight);
		});
	};
	return {
		link: function (scope, element, attrs) {
			var window = angular.element($window),
				height = window.height();

			scope.$watch("image", function (a) {
				updateImage(a, element, height);
			});

			scope.$on("show-content", function () {
				updateImage(attrs.src, element, height);
			});
		}
	};
});

module.directive('ngcFullscreenVideo', function ($window) {
	return {
		link: function (scope, element, attrs) {
			var window = angular.element($window),
				windowHeight = window.height(),
				windowWidth = window.width();

			element.bind("loadedmetadata", function () {
				scope.$emit("video-loaded");
			});

			if (windowWidth > windowHeight) {
				element.css("width", "100%");
				element.css("height", "auto");
			} else {
				element.css("width", "auto");
				element.css("height", "100%");
			}
		}
}});

