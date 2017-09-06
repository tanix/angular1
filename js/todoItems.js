angular.module('todo.items.demo', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('todo.items.demo').controller('ToDoItemsCtrl', function ($uibModal, $log) {
	var $ctrl = this;
	$ctrl.isLoaded = false;
	$ctrl.search = '';
	$ctrl.addModal = 'Add';
	$ctrl.updateModal = 'Update';
	var updateModalInstance = {}, addModalInstance = {};

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
		updateModalInstance = $uibModal.open({
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'myModalContent.html',
			controller: 'ModalInstanceCtrl',
			controllerAs: '$ctrl',
			resolve: {
				item: function () { return item; },
				modalTask: function () { return $ctrl.updateModal; }
			}
		});

		updateModalInstance.result.then(function(data) {
			var index = $ctrl.items.indexOf(item);
			$ctrl.items.splice(index, 1, { title: data.title, description: data.description, status: data.status});

		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};

	$ctrl.add = function() {
		addModalInstance = $uibModal.open({
		ariaLabelledBy: 'modal-title',
		ariaDescribedBy: 'modal-body',
		templateUrl: 'myModalContent.html',
		controller: 'ModalInstanceCtrl',
		controllerAs: '$ctrl',
			resolve: {
				item: function () {},
				modalTask: function () { return $ctrl.addModal; }
			}
		});

		addModalInstance.result.then(function(data) {
			$ctrl.items.push({ title: data.title, description: data.description, status: data.status });
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
});


angular.module('todo.items.demo').controller('ModalInstanceCtrl', function ($uibModalInstance, item, modalTask) {
	var $ctrl = this;
	$ctrl.modalTask = modalTask;
	$ctrl.newItem = { title: '', description: '', status: false};

		if(item) {
			$ctrl.newItem = { title: item.title, description: item.description, status: item.status };
		}

	$ctrl.ok = function () {
		$uibModalInstance.close($ctrl.newItem);
	};

	$ctrl.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});

