var simplehtml = ["$scope", function ($scope) {
	var converter = new Showdown.converter();

	var gridElement = $scope.getGridElement();

	$scope.ContentToHtml = function () {
		return converter.makeHtml(gridElement.Resources && gridElement.Resources.text ? gridElement.Resources.text.Value : "");
	};
}];