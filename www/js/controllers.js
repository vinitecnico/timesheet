angular.module('timesheet.controllers', [])

.controller('DashCtrl', function($scope, $cordovaSQLite, moment) {
  var vm = this;
  vm.insert = insert;
  vm.select = select;
  vm.remove = remove;
  
  init();

  function init(){
    vm.test = 'vinicius rodrigues';    
  }

  function insert() {
        
        var query = "INSERT INTO timesheet (name, dt) VALUES (?,?)";

        var db = null;
        
        try {
          db = $cordovaSQLite.openDB({name:"nextflow.db",location:'default'});
          $cordovaSQLite.execute(db, query, ['vinicius', moment()]).then(function(res) {
              alert("INSERT ID -> " + res.insertId);
              vm.select();
          }, function (err) {
              alert(JSON.stringify(err));
        });
        } catch (error) {
          alert(JSON.stringify(error));
        }
    }
 
     function select() {
        vm.item = [];
        var db = null;
        db = $cordovaSQLite.openDB({name:"nextflow.db",location:'default'});

        var query = "SELECT name,dt FROM timesheet order by dt DESC";
        $cordovaSQLite.execute(db, query).then(function(res) {
          for (var i = 0; i < res.rows.length; i++) 
          {
            var t = {
              'name': res.rows.item(i).name,
              'dt': res.rows.item(i).dt
            };
            vm.item.push(t);
          }
        }, function (err) {
            alert(JSON.stringify(err));
        });
    }

    function remove() {
      var db = null;
      db = $cordovaSQLite.openDB({name:"nextflow.db",location:'default'});
      var query = "DELETE FROM timesheet";
        $cordovaSQLite.execute(db, query).then(function(res) {
          vm.select();
        }, function (err) {
            alert(JSON.stringify(err));
        });
    }


})

.controller('ChatsCtrl', function($scope, Chats) {
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
