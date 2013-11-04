var loginController = ["$scope", "cmsApi",  function($scope, cmsApi) {
	var api = new ApiWrapper(cmsApi);

	var loading = function (type) {
		if (type) {
			$scope.message = null;
		}
		$scope.loading = type === null || typeof type === "undefined" ? true : type;
	};
	loading();

	cmsApi.getRequestToken(function (data) {
		$scope.RequestToken = data.RequestToken;
		loading(false);
	}, function () {
		$scope.message = "Přihlašovací službe je nedostupná.";
	});

//	function getQueryStrings() {
//		var assoc  = {};
//		var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); };
//		var queryString = location.search.substring(1);
//		var keyValues = queryString.split('&');
//
//		for(var i in keyValues) {
//			var key = keyValues[i].split('=');
//			if (key.length > 1) {
//				assoc[decode(key[0])] = decode(key[1]);
//			}
//		}
//		return assoc;
//	}

	var parserStatus = function (status) {
		var message;

		switch (status) {
			case 401:
				message = "Špatné heslo nebo login";
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

	$scope.submit = function () {
		loading();
		var x = {};
		x.UserName = $scope.UserName;
		x.Password = $scope.Password;
		x.RequestToken = $scope.RequestToken;

		cmsApi.login(x, function (data) {
				window.location.hash = "home";
				loading(false);
			},
			function (err) {
				$scope.message = parserStatus(err.status);
				loading(false);
			});
	}
}];