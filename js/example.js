angular.module('ui.bootstrap.demo', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('TodoItemsController', function ($uibModal, $log, $document) {
	var todoItemsList = this;

	todoItemsList.items = [
		{
			title: 'Задача 1',
			description: 'Описание задачи 1',
			status: 'To do'
		},
		{
			title: 'Задача 2',
			description: 'Описание задачи 2',
			status: 'Done'
		},
		{
			title: 'Задача 3',
			description: 'Описание задачи 3',
			status: 'To do'
		}
	];

	todoItemsList.search = '';

	todoItemsList.newItem = {
		title: '',
		description: '',
		done: false
	};

	todoItemsList.remove = function(item) {
		var index = todoItemsList.items.indexOf(item);
		todoItemsList.items.splice(index, 1);
		console.log(todoItemsList.items);
	};

	todoItemsList.open = function (item) {
		//var parentElem = angular.element($document[0].querySelector('body'));
		var modalInstance = $uibModal.open({
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'myModalContent.html',
			controller: 'ModalInstanceCtrl',
			controllerAs: 'todoItemsList',
			resolve: {
				item: function () {
					return item;
				}
			}
		});

		modalInstance.result.then(function (data) {
			todoItemsList.items.push({ title: data.title, description: data.description, status: 'To do' });
			todoItemsList.newItem = '';
			console.log(data);
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
});


angular.module('ui.bootstrap.demo').controller('ModalInstanceCtrl', function ($uibModalInstance, item) {
	var $ctrl = this;
	var $item = item;

	console.log($item);

	//todoItemsList.newItem = items;

	$ctrl.ok = function () {
		$uibModalInstance.close($ctrl.newItem);
	};

	$ctrl.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});
