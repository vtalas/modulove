var homeController = ["$scope", "$api", function ($scope, $api) {

	$scope.homeData = [];
	$scope.nextWorkData = [];
	$scope.pageLink = "projekty";
	$scope.loadedData = false;
	$scope.loadedImages = false;
	$scope.showLoader = true;

	$scope.tempLength = 0;
	function getPhotos(index, gdataAlbumId) {
		return $api.getAlbumPhotos(gdataAlbumId)
			.then(function (photos) {
				$scope.homeData[index].images = photos.data[0];
				$scope.tempLength ++ ;
				if ($scope.tempLength > $scope.homeData.length) {
					$scope.loadedImages = true;
				}
			})
	}
	var container = $(".page-home");
	container.hide();

	function updateContainerDimensions(container, windowWidth, windowHeight) {
		var width = container.width(),
			height = container.height(),
			ratio,
			newWidth;
		if ($scope.disableAutoFormat) {
			return;
		}
		if (windowWidth > width  ){
			ratio = width / height;
			newWidth = Math.floor(ratio * windowHeight - 50);
			container.css("max-width", newWidth );
		}
	}
	$scope.$on("windowChanged", function (e, data) {
		updateContainerDimensions(container, data.width, data.height);
	});


	$api.getPage($scope.pageLink)
		.then(function (data) {
			$scope.homeData = data.data.GridElements;
			setTimeout(function () {
				$scope.loadedData = true;
				$scope.$digest();
			},1000);

			updateContainerDimensions(container, $(window).width(), $(window).height());

			$scope.$emit("data-loaded");

			return data.data;
		})
		.then(function (data) {
			var x = [];
			for (var i = 0; i < data.GridElements.length; i++) {
				var content = data.GridElements[i].Content;
				x.push(getPhotos(i, content.gdataAlbumId));
			}
		});

	$scope.showNextWork = function () {
		$scope.nextWork = true;
		$scope.disableAutoFormat = true;
		$("html, body").animate({ scrollTop: $(document).height() }, 1000);
	}
}];