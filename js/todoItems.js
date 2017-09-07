angular.module('todo.items.demo', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('todo.items.demo').controller('ToDoItemsCtrl', ToDoItemsCtrl);
angular.module('todo.items.demo').controller('ModalInstanceCtrl', ModalInstanceCtrl);

function ToDoItemsCtrl($uibModal, $log) {
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
			component: 'modalComponent',
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
			component: 'modalComponent',
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
}

function ModalInstanceCtrl() {
	var $ctrl = this;

	$ctrl.$onInit = function () {
		var $ctrl = this;
		$ctrl.modalTask = $ctrl.resolve.modalTask;
		$ctrl.newItem = { title: '', description: '', status: false};

		if($ctrl.resolve.item) {
			$ctrl.newItem = { title: $ctrl.resolve.item.title, description: $ctrl.resolve.item.description, status: $ctrl.resolve.item.status };
		}
	};

	$ctrl.ok = function () {
		$ctrl.close({$value: $ctrl.newItem});
	};

	$ctrl.cancel = function () {
		$ctrl.dismiss({$value: 'cancel'});
	};
}

angular.module('todo.items.demo').component('itemsList', {
	templateUrl: 'components/toDoItems.html',
	controller: ToDoItemsCtrl
});

angular.module('todo.items.demo').component('modalComponent', {
	templateUrl: 'components/modalContent.html',
	bindings: {
		resolve: '<',
		close: '&',
		dismiss: '&'
	},
	controller: ModalInstanceCtrl
});


