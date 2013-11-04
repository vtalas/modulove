var userDataForm = ["$scope", "cmsApi", "$routeParams", function($scope, cmsApi, $routeParams) {
	$scope.link = $routeParams.link;

	var parserStatus = function (status) {
		var message;

		switch (status) {
			case 401:
				message = "Pro odeslání formuláře je potřeba se přihásit. ";
				break;
			case 400:
			case 500:
				message = ".";
				break;
			default :
				message = "Vyskytla se neznámá chyba ".status;
		}
		return message;
	};

	$scope.post = function () {
		cmsApi.putUserData({data: $scope.data, key: $scope.key}, function (data) {
		}, function (err) {
			$scope.$emit("set-message", parserStatus(err.status));

		});
	};

	$scope.serialized = function () {
		JSON.stringify($scope.data);
	}
}];