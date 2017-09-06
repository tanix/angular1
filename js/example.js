angular.module('ui.bootstrap.demo', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('ModalDemoCtrl', function ($uibModal, $log, $document) {
	var $ctrl = this;
	$ctrl.search = '';

	$ctrl.items  = [
		{
			title: 'Задача 1',
			description: 'Описание задачи 1',
			status: true
		},
		{
			title: 'Задача 2',
			description: 'Описание задачи 2',
			status: false
		},
		{
			title: 'Задача 3',
			description: 'Описание задачи 3',
			status: false
		},
	];

	$ctrl.remove = function(item) {
		var index = $ctrl.items.indexOf(item);
		$ctrl.items.splice(index, 1);
	};

	$ctrl.update = function(item) {
	};

	$ctrl.add = function(item) {
	};

	$ctrl.open = function(item) {
		var modalInstance = $uibModal.open({
		ariaLabelledBy: 'modal-title',
		ariaDescribedBy: 'modal-body',
		templateUrl: 'myModalContent.html',
		controller: 'ModalInstanceCtrl',
		controllerAs: '$ctrl',
		resolve: {
			item: function () {
				return item;
			}
		}
	});

	modalInstance.result.then(function (data) {
		// $ctrl.items.push(
		// 	{
		// 		title: data.title,
		// 		description: data.description,
		// 		status: ''
		// 	}
		// );

		var index = $ctrl.items.indexOf(item);
			$ctrl.items.splice(index, 1, 				{
			title: data.title,
			description: data.description,
			status: ''});

		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
});


angular.module('ui.bootstrap.demo').controller('ModalInstanceCtrl', function ($uibModalInstance, item) {
  var $ctrl = this;
 
  // $ctrl.selected = {
  //   item: $ctrl.items[0]
  // };

  $ctrl.newItem = {
  	title: '',
  	description: '',
  }
	if(item) {
		  $ctrl.newItem = {
  	title: item.title,
  	description: item.description,
  }

	}



	$ctrl.ok = function () {
		$uibModalInstance.close($ctrl.newItem);
	};

	$ctrl.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});

