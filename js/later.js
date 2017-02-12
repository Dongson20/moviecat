// 12创建一个即将上映的模块  和一个 即将上映的控制器 
angular.module('movieApp.laterCtrl1',[])
	.controller('laterCtrl1',['$scope','$movieServ','$routeParams',function($scope,$movieServ,$routeParams){
		//当前页数
		$scope.pageid = $routeParams.pageid || 1;
		// 电影图标显示的个数  根据url的 pagesize 获取  如果没有 默认为5
		$scope.pagesize = $routeParams.pagesize || 5;

		var start = ($scope.pageid - 1) * $scope.pagesize;
		// 发起JSONP跨域
		$movieServ.JSONP('https://api.douban.com/v2/movie/coming_soon',{
			count:$scope.pagesize,
			start:start
		},function(data){
			//创建一个电影列表
			$scope.movie = data;
			// 如果点击上一页，页数大于1，则上一页的页数 = 当前页面 -1
			if($scope.pageid > 1){
				$scope.prevPageid = $scope.pageid - 1;
			}else{
			// 如果 小于或者 等于 1 ，则上一页设置为1，头页
				$scope.prevPageid = 1;
			}

		
			//总页数计算 = 全部的 / 页面大小（页面容量）
			$scope.pageCount = Math.ceil($scope.movie.total / $scope.pagesize);

			// 如果当前页面页数 <  总页数
			// 则点击下一页 当前页数 +1
			if($scope.pageid < $scope.pageCount){
				$scope.nextPageid = $scope.pageid - 0 + 1;
			}else{
			// 如果不小于了 >= 总页数 则 相等
			// 设置为尾页
				$scope.nextPageid = $scope.pageCount;
			}

			// 总电影个数
			$scope.total = $scope.movie.total;//会变动

			$scope.$apply();
			//因为这也是属于异步赋值给$scope的并没有通知angular改变页面的值
			// 所以要手动触发一下脏检查
		})
	}])