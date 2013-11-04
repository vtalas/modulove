var gridelementAlbumCtrl =  ["$scope", "$api", "$routeParams", "$location", "$rootScope", function ($scope, $api, $routeParams, $location) {
	$scope.gdataAlbumId = getAlbumId();
	$scope.route = {
		link: $routeParams.link
	};

	function getAlbumId() {
		var x = $scope.gridelement.Content;
		return x !== null ? x.gdataAlbumId : null;
	}

	var resources = $scope.gridelement.Resources || {};
	function getResource(key){
		return resources[key] ? resources[key].Value : "";
	}

	$scope.name = getResource("name");
	$scope.type = getResource("type");
	$scope.services = getResource("services");
	$scope.year = getResource("year");
	$scope.text = getResource("text");

	$api.getAlbum($scope.gdataAlbumId, {size:320, isSquare: false, type: 1})
//	$api.getAlbum($scope.gdataAlbumId)
		.then(function (data) {
			if (data) {
				$scope.album = data.data;
			}
		});

	$scope.showImage = function (galleryId, imageIndex) {
		$location.search("i", imageIndex);
		$location.search("gid", galleryId);
	};

}];