// 11 创建一个正在上映的模块  和一个 正在上映的控制器 
angular.module('movieApp.nowplayingCtrl',[])
	.controller('nowplayingCtrl',['$scope','$routeParams','$movieServ',function($scope,$routeParams,$movieServ){

		$scope.isLoading = false;
		//当前页数
		$scope.pageid = $routeParams.pageid || 1;
		// 页面电影图标显示的个数 
		// $routeParams.pagesize 根据url中的  pagesize 参数来 指定 如果没有默认5
		$scope.pagesize = $routeParams.pagesize || 5;
		// $scope.pagesize = 3;

		var start = ($scope.pageid - 1) * $scope.pagesize;

		$movieServ.JSONP('https://api.douban.com/v2/movie/in_theaters',{
			count:$scope.pagesize,
			start:start
		},function(data){
			//创建一个电影列表
			console.log(data);
			$scope.movie = data;
			// 如果点击上一页，页数大于1，则当前页面-1
			if($scope.pageid > 1){
				$scope.prevPageid = $scope.pageid - 1
			}else{
			// 如果 小于或者 等于 1 ，则上一页设置为1，头页
				$scope.prevPageid = 1;
			}
			//页数计算 = 全部的 / 页面大小（页面容量）
			$scope.pageCount = Math.ceil($scope.movie.total / $scope.pagesize);

			// 如果当前页面下雨 总页数
			// 则点击下一页 当前页数 +1

			if($scope.pageid < $scope.pageCount){
				$scope.nextPageid = $scope.pageid - 0 + 1;
			}else{
			// 如果 >= 总页数 则 相等
			// 设置为尾页
				$scope.nextPageid = $scope.pageCount;
			}
			// 总页数
			$scope.totalCount = $scope.movie.total;
			//因为这也是属于异步赋值给$scope的并没有通知angular改变页面的值
			// 所以要手动触发一下脏检查
			$scope.isLoading = true;
			$scope.$apply();
		})


		// 电影列表
		// 1创建一个电影列表
		
		// 2 通过ajax 请求data.json文件  获取数据
		// 使用$http.jsonp的方式访问豆瓣api 访问不聊  豆瓣api不支持angular的回调函数形式
		//anguar 的跨域解决不聊豆瓣api的跨域问题
		
	}])