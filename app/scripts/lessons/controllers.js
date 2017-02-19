'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;

            $scope.dishes= menuFactory.getDishes();
            
                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', function($scope) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

       .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

            $scope.dish= menuFactory.getDish(parseInt($stateParams.id,10));            
            
                        
        }])

        .controller('DishCommentController', ['$scope', function($scope) {
            
            //Step 1: Create a JavaScript object to hold the comment from the form
            $scope.dishcomment = {authorName:"", ratingNumber:"5", yourComments:"" };
            
            $scope.submitComment = function () {
           
                
            //Step 2: This is how you record the date "The date property of your JavaScript object holding the comment" = new Date().toISOString();
                $scope.date = new Date().toISOString();
            
            // Step 3: Push your comment into the dish's comment array
                $scope.yourDishComment =  {
                    rating:$scope.dishcomment.ratingNumber,
                    comment:$scope.dishcomment.yourComments,
                    author:$scope.dishcomment.authorName,
                    date:$scope.date
                }
                
                $scope.dish.comments.push($scope.yourDishComment);
                
            //Step 4: reset your form to pristine
              $scope.commentsForm.$setPristine();
            //Step 5: reset your JavaScript object that holds your comment
              $scope.dishcomment = {authorName:"", ratingNumber:"5", yourComments:"" };
                
              console.log($scope.dishcomment);
                    
            }
        }])

;
