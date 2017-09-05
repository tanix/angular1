// angular.module('myApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']).controller('TodoItemsController', function($uibModal, $log, $document) {
// 	var todoItemsList = this;
//
// 	todoItemsList.items = [
// 			{
// 				description: 'Het is al geruime tijd een bekend',
// 			    status: 'Done'
// 			},
// 			{
// 				description: 'Lorem Ipsum als hun standaard',
// 				status: 'Done'
// 			},
// 			{
// 				description: 'Er zijn vele variaties van passages',
// 				status: 'To do'
// 			},
// 			{
// 				description: 'Alle Lorum Ipsum generators',
// 				status: 'To do'
// 			},
// 			{
// 				description: 'Alle Lorum Ipsum generators',
// 				status: 'To do'
// 			}
// 		];
//
// 	todoItemsList.addItem = function() {
// 		todoItemsList.items.push({ description: todoItemsList.newItem, status: 'To do' });
// 		todoItemsList.newItem = '';
// 	};
//
// 	todoItemsList.search = '';
//
// });

angular.module('myApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('myApp').controller('TodoItemsController', function ($uibModal, $log, $document) {
	var todoItemsList = this;

	todoItemsList.items = [
			{
				description: 'Het is al geruime tijd een bekend',
			    status: 'Done'
			},
			{
				description: 'Lorem Ipsum als hun standaard',
				status: 'Done'
			},
			{
				description: 'Er zijn vele variaties van passages',
				status: 'To do'
			},
			{
				description: 'Alle Lorum Ipsum generators',
				status: 'To do'
			},
			{
				description: 'Alle Lorum Ipsum generators',
				status: 'To do'
			}
		];

	todoItemsList.addItem = function() {
		todoItemsList.items.push({ description: todoItemsList.newItem, status: 'To do' });
		todoItemsList.newItem = '';
	};

	todoItemsList.search = '';
	todoItemsList.newItem = '';

	todoItemsList.animationsEnabled = true;

	todoItemsList.open = function () {
		var parentElem = angular.element($document[0].querySelector('body'));
		var modalInstance = $uibModal.open({
			animation: todoItemsList.animationsEnabled,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'myModalContent.html',
			controller: 'ModalInstanceCtrl',
			controllerAs: '$ctrl',
			resolve: {
				item: function () {
					console.log(todoItemsList.newItem);
					return todoItemsList.newItem;
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			todoItemsList.items.push({ description: selectedItem, status: 'To do' });
			todoItemsList.newItem = '';
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};

	todoItemsList.toggleAnimation = function () {
		todoItemsList.animationsEnabled = !todoItemsList.animationsEnabled;
	};
});

angular.module('myApp').controller('ModalInstanceCtrl', function ($uibModalInstance, item) {
	var $ctrl = this;

	$ctrl.item = item;

	$ctrl.add = function () {
		console.log($ctrl.item);
		$uibModalInstance.close($ctrl.item);

		console.log($ctrl.item);
	};

	$ctrl.cancel = function () {
		$uibModalInstance.dismiss('cancel');
		console.log("Cancel");
	};
});
