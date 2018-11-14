angular.module('activity', [])
.controller('MainCtrl', [
    '$scope',
    '$http',
    function($scope, $http) {
        $scope.activities = []
        
       $scope.addActivity = function() {
            var newactivity = { name: $scope.formName, title: $scope.formTitle, type: $scope.formType, distance: $scope.formDistance, upvotes: 0 };
            $http.post('/activity', newactivity).success(function(data) {
                $scope.activities.push(data);
            });
            $scope.formTitle = '';
            $scope.formType = ''
            $scope.formDistance = ''
            $scope.formName = ''
        };
        
        $scope.incrementUpvotes = function(activity) {
            $http.put('/activity/' + activity._id + '/upvote')
                .success(function(data) {
                    console.log("upvote worked");
                    activity.upvotes += 1;
                });
        };
        
        $scope.getAll = function() {
            return $http.get('/activity').success(function(data){
                angular.copy(data, $scope.activities);
            });
        };
        $scope.getAll();
        
        $scope.delete = function(activity) {
            $http.delete('/activity/' + activity._id )
                .success(function(data){
                    console.log("delete worked");
                });
            $scope.getAll();
        };
    },
])