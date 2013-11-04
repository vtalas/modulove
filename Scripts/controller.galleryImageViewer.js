/*global MaspartiData, ApiWrapper*/
var  galleryImageViewerController = ["$scope", "$routeParams", "$api", "$location", function($scope, $routeParams, $api, $location) {

	$scope.$on("galleryImageViewer-display-image", function (e, galleryId, imageIndex) {
		$scope.imageIndex = imageIndex;
		$scope.galleryId = galleryId;
		getImage(galleryId, imageIndex);
	});


	$scope.$on("global-keydown", function (e, $event) {
		if (!visible()) {
			return;
		}
		var key = $event.keyCode;
		switch (key) {
			case 27 :
				$scope.close();
				break;
			case 37 :
				$scope.prev();
				break;
			case 32 :
			case 39 :
				$scope.next();
				break;
		}
	});

	$scope.$on("ngc-responsive-image-loading", function (e, data) {
		$scope.loading = data;
		if ($scope.$$phase !== "$digest"){
			$scope.$digest();
		}
	});

	$scope.$on("ngc-responsive-image-skipping", function (e, data) {
		$scope.skipping = data;
		if ($scope.$$phase !== "$digest") {
			$scope.$digest();
		}
	});

	function visible() {
		return $scope.gallery !== null && $scope.gallery !== undefined;
	}

	function getImage(galleryId, index) {
		if (!$scope.gallery) {
			$scope.newindex = index;
			$api.getAlbumPhotos(galleryId).then(function (data) {
				$scope.gallery = data.data;
				$scope.image = $scope.gallery[index];
			});
			return;
		}
		$scope.image = $scope.gallery[index];
	}

	$scope.close = function () {
		$location.search("gid", null);
		$location.search("i", null);
		$scope.gallery = null;
	};

	$scope.next = function () {
		var length = $scope.gallery.length,
			imageIndex = $scope.imageIndex;

		imageIndex++;
		if (imageIndex >= length) {
			imageIndex = 0;
		}

		$location.search("i", imageIndex);
	};

	$scope.prev = function () {
		var length = $scope.gallery.length,
			imageIndex = $scope.imageIndex;

		imageIndex--;
		if (imageIndex <= 0) {
			imageIndex = length - 1;
		}
		$location.search("i", imageIndex);
	};

}];





