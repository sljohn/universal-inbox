angular
  .module('universal-inbox.MainController', [])
  .controller('MainController', MainController);

MainController.$inject = ['TweetsFactory'];

function MainController(TweetsFactory) {
  const vm = this;

  vm.name = 'Jane';
  vm.username = 'janedone';
  vm.messageBody = 'Look what we have here!';
  vm.dateTime = new Date().toLocaleString();

  // Saving this method when getTweets is a real
  // promoise
  // TweetsFactory.getTweets().then((data) => {
  //   console.log('data: ', data);
  // });

  const tweets = TweetsFactory.getTweets();

  console.log(tweets);
}