var app = angular.module('cities',['ngAria', 'ngMessages', 'ngMaterial', 'material.svgAssetsCache']);
app.controller('CityCtrl', CityCtrl);

  function CityCtrl ($http, $timeout, $q) {
    var self = this;

    self.selectedItem  = null;
    self.searchText    = null;
    self.querySearch   = querySearch;


    $http.get('kladr.json').then(function(response){
      self.states = response.data;
    });

    function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : self.states;
      var deferred = $q.defer();
      $timeout(function () { 
        deferred.resolve(results); 
      }, Math.random() * 100, false);
      return deferred.promise;
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (angular.lowercase(state.City).indexOf(lowercaseQuery) === 0);
      };
    };
  };
