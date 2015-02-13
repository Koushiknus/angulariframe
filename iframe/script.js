iframeApp = angular.module('iframeApp', []);


iframeApp.controller('iFrameCtrl', function($scope){
  var sharedData = window.parent.angular.element(window.frameElement).scope().sharedData;

  sharedData.append('hello from the IFrame');
  var i = 0;
  $scope.button = function() {
    ++i;
    sharedData.append('button in iframe was clicked! (' + i + ')');
  };
  $scope.messages = sharedData.getAll();
});
