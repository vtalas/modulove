var gridelementGdataAlbumCtrl =  ["$scope", "$api", "$routeParams", "$location", "$rootScope", function ($scope, $api, $routeParams, $location) {
	$scope.gdataAlbumId = getAlbumId();
	$scope.route = {
		link: $routeParams.link
	};

	function getAlbumId() {
		var x = $scope.gridelement.Content;
		return x !== null ? x.gdataAlbumId : null;
	}

	$scope.header = $scope.gridelement.Resources.header.Value;
	$scope.text = $scope.gridelement.Resources.text.Value;

	$api.getAlbum($scope.gdataAlbumId, {size:100, isSquare: true, type: 2})
	//$api.getAlbum($scope.gdataAlbumId)
		.then(function (data) {
			$scope.album = data.data;
			console.log(data)
		});

	$scope.showImage = function (galleryId, imageIndex) {
		$location.search("i", imageIndex);
		$location.search("gid", galleryId);
	};

}];