mainApp = angular.module('mainApp', []);

mainApp.controller('mainCtrl', ['$scope', 'sharedData', function($scope, sharedData){
  $scope.sharedData = sharedData;

  var i = 0;
  $scope.button = function() {
    ++i;
    sharedData.append('button in main clicked (' + i + ')');
  }
  sharedData.append('hello from main!');
  $scope.messages = sharedData.getAll();
}]);


mainApp.factory('sharedData', function(){
  var list = [];
  var mainScope;
  var iframeScope;

  function update(){
    if(!mainScope){
      mainScope = angular.element(document.body).scope();
    }
    mainScope.$applyAsync();
    if(!iframeScope){
      if(document.getElementById('iframe').contentWindow.angular){
        iframeScope = document.getElementById('iframe').contentWindow.angular.element(document.body).scope();
        iframeScope.$applyAsync();
      }
    } else {
      iframeScope.$applyAsync();
    }
  }
  return {
    append: function(item) { list.push(item); update(); },
    getAll: function() { return list }
  }
});
