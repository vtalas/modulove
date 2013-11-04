var pageController = ["$scope", "$api", "$routeParams", function ($scope, $api, $routeParams) {
	$scope.link = $routeParams.link;

	$api.getPage($scope.link)
		.then(function (data) {
			$scope.page = data.data;
			console.log($scope.page.GridElements);
			var a = new GridElementsList(data.data.GridElements);
			console.log(JSON.stringify(a.data));
			return data;
		}, function (err) {
			console.log("ERROR!!", err.status);
		})
		.then(function (data) {
			setTimeout(function () {
				$api.checkForSnapshot($scope, data);
			}, 3000)
		});
}];

