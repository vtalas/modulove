var pController =  [ "$scope", "$api", "$routeParams", "$location", function($scope, $api, $routeParams, $location) {
	$scope.link = $routeParams.link;
	var getIndex = function () {
		var search = $location.search().elindex,
			elemIndex = $routeParams.elementIndex,
			index;

		index = !isNaN(elemIndex) ? elemIndex : 0;

		if (!isNaN(search)) {
			index = search;
		}

		return Number(index, 10);
	};
	var setBoundaries = function (index) {
		var length = $scope.page.GridElements.length;
		$scope.isFirst = index === 0;
		$scope.isLast = index === length - 1;
	};

	$scope.$on("$locationChangeSuccess", function () {
		setNewLocation(getIndex());
	});


	$scope.loading = true;
	$api.getPage($scope.link)
		.then(function (response) {
			var index = getIndex();
			$scope.page = response.data;
			setBoundaries(index);
			$scope.currentGridElement = $scope.page.GridElements[index];
			$scope.loading = false;
			$scope.$emit("data-loaded");
			return response;
		});

	var setNewLocation = function (index) {
		$location.search("elindex", index);
		$scope.currentGridElement = $scope.page.GridElements[index];
		setBoundaries(index);
	};



	$scope.next = function () {
		var galleryIndex = getIndex(),
			length = $scope.page.GridElements.length;

		galleryIndex++;
		if (galleryIndex > length - 1) {
			return;
		}
		setNewLocation(galleryIndex);
	};

	$scope.prev = function () {
		var galleryIndex = getIndex();

		if (galleryIndex <= 0) {
			return;
		}
		galleryIndex--;
		setNewLocation(galleryIndex);
	};

	var el = angular.element(".navigation");
	angular.element(window).scroll(function () {

		var fromTop = $(this).scrollTop(),
			threshold = 50;

		if (fromTop > threshold && !$scope.isScrolled) {
			$scope.isScrolled = true;
			el.addClass("scrolled");
		}
		if (fromTop < threshold && $scope.isScrolled) {
			$scope.isScrolled = false;
			el.removeClass("scrolled");
		}
	});
}];