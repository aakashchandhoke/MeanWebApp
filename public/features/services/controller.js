function ServiceCtrl($scope,$http){
	console.log("Hello from ServicesCtrl");
	$scope.message="Hello from Controller";
	
	$scope.renderServiceClients=function(response){
		$scope.serviceClients=response;
	};
	//Creating the object
	$scope.create=function(){
		console.log($scope.serviceClient);
		$http.post("/serviceClients",$scope.serviceClient)
		.success(function(response){
			$scope.all();
		});
	};
	
	//Reading all the objects
	$scope.all=function(){
		$http.get("/serviceClients")
		.success($scope.renderServiceClients);
	};

	$scope.all();

	//Deleting all the objects
	$scope.remove=function(id){
		$http.delete("/serviceClients/"+id)
		.success(function(response){
			$scope.all();
		});
	};

	//updating the object
	$scope.select=function(id){
		console.log(id);
		$http.get("/serviceClients/"+id)
		.success(function(response){
			$scope.serviceClient=response;
		});
	};

	/*$scope.update=function(){
		$http.put("/serviceClients/"+serviceClient._id,$scope.serviceClient);
	};*/
	$scope.update = function (id) {
		$http.put('/serviceClients/' + id + '/' + $scope.serviceClient.name) //Select a client of the list.
		.success(function (response) {
			$scope.all();
		});
	};
}