(function () {
    'use strict';
    var PayUCouponApp = angular.module('PayUCouponApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngSanitize']);

    PayUCouponApp.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
      });

    //Search Box
    PayUCouponApp.controller('DemoCtrl', function ($timeout, $q, $log, $http) {
        var self = this;

        self.simulateQuery = false;
        self.isDisabled = false;

        self.repos = loadAll();
        self.getFilterItemFor = getFilterItemFor;
        self.querySearch = querySearch;
        self.selectedItemChange = selectedItemChange;
        self.searchTextChange = searchTextChange;

        function querySearch(query) {
            var results = query ? self.getFilterItemFor(query) : self.repos,
                deferred;
            if (self.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        function searchTextChange(text) {
            //$log.info('Text changed to ' + text);	  
        }

        function selectedItemChange(item) {
            var link;
            if (item.Name == "Stores" && item.Description == "eg. Amazon, Flipkart, eBay ...") {
                link = "/store/";
                window.location = link
            }
            else if (item.Description == "Store") {
                link = "/store/";
                window.location = link + item.FriendlyUrl
            }
            else if (item.Name == "Categories" && item.Description == "eg. Mobiles, Pizza, Fashion ...") {
                link = "/category/";
                window.location = link
            }
            else if (item.Description == "Category") {
                link = "/category/";
                window.location = link + item.FriendlyUrl
            }            
        }

        function loadAll() {
            var repos = [
              {
                  'Name': 'Stores',
                  'FriendlyUrl': '/Stores',
                  'Description': 'eg. Amazon, Flipkart, eBay ...',
                  'Img': 'android.svg',
              },
              {
                  'Name': 'Categories',
                  'FriendlyUrl': '/Categories',
                  'Description': 'eg. Mobiles, Pizza, Fashion ...',
                  'Img': 'cake.svg',
              }
            ];
            return repos;
        }

        function getFilterItemFor(query) {
            var repos = $.ajax({
                url: '/search?term=' + query,
                async: false,
                dataType: 'json'
            }).responseJSON;
            return repos;
        };
    });


    //Random Deals
    PayUCouponApp.controller('OfferController', function ($scope, OfferService, $timeout) {
        getOffers();
        function getOffers() {
            OfferService.getOffers()
                .success(function (offrs) {
                    $('#loading').hide();
                    $('#DisplayRandomDeals').removeClass('hideClass');
                    $scope.offers = offrs;

                    $("#lightSlider").lightSlider({
                        item: 4,
                        autoWidth: false,
                        slideMove: 1,
                        slideMargin: 10,

                        addClass: '',
                        mode: "slide",
                        useCSS: true,
                        cssEasing: 'ease',
                        easing: 'linear',

                        speed: 400,
                        auto: false,
                        loop: false,
                        slideEndAnimation: true,
                        pause: 2000,

                        keyPress: false,
                        controls: true,
                        prevHtml: '',
                        nextHtml: '',

                        rtl: false,
                        adaptiveHeight: false,

                        vertical: false,
                        verticalHeight: 500,
                        vThumbWidth: 100,

                        thumbItem: 10,
                        pager: true,
                        gallery: false,
                        galleryMargin: 5,
                        thumbMargin: 5,
                        currentPagerPosition: 'middle',

                        enableTouch: true,
                        enableDrag: true,
                        freeMove: true,
                        swipeThreshold: 40,

                        responsive: [],

                        onBeforeStart: function (el) { },
                        onSliderLoad: function (el) { },
                        onBeforeSlide: function (el) { },
                        onAfterSlide: function (el) { },
                        onBeforeNextSlide: function (el) { },
                        onBeforePrevSlide: function (el) { }
                    });



                })
                .error(function (error) {
                    $scope.status = 'Unable to load offer data: ' + error.message;
                });
        };

        $scope.offerPopUp = function (id, event) {
            event.stopPropagation();
            event.preventDefault();
            var link = "/offers/OfferById/" + id;
            $.ajax({
                url: link,
                type: "GET",
                beforeSend: function () {
                },
                success: function (result) {
                    $('#myModalContent').html(result);
                    $('#modal-couponcode').modal({
                        keyboard: true
                    }, 'show');
                },
                async: true
            });
            return false;
        };
    });


    PayUCouponApp.factory('OfferService', ['$http', function ($http) {
        var OfferService = {};
        OfferService.getOffers = function () {
            return $http.get('/Users/GetTopStoresOffers');
        };
        return OfferService;

    }]);

    //Latest Offer
    PayUCouponApp.controller('LatestOfferController', function ($scope, LatestOfferService) {
        var page = 1;
        $scope.Latestoffers = [];
        var load = function () {
            getLatestOffers();
            function getLatestOffers() {
                LatestOfferService.getLatestOffers(page)
                    .success(function (LatestOffrs) {
                        if (LatestOffrs != 0) {
                            $('#loadingLatestOffer').hide();
                            $('#DisplayLatestOffer').removeClass('hideClass');
                            $('#loadMoreLatest').removeClass('hideClass');
                            $('#loadingLatestOffersLoadMore').hide();
                            $scope.Latestoffers = $scope.Latestoffers.concat(LatestOffrs);
                        }
                        else {
                            $('#buttonLatestOffersLoadMore').hide();
                        }

                    })
                    .error(function (error) {
                        $scope.status = 'Unable to load offer data: ' + error.message;
                    });
            };
        };

        load();


        $scope.loadMore = function () {
            $('#loadingLatestOffersLoadMore').show();
            page++;
            load();
        }

        $scope.LatestOfferPopUp = function (id, event) {
            event.stopPropagation();
            event.preventDefault();
            var link = "/offers/OfferById/" + id;
            $.ajax({
                url: link,
                type: "GET",
                beforeSend: function () {
                },
                success: function (result) {
                    $('#myModalContent').html(result);
                    $('#modal-couponcode').modal({
                        keyboard: true
                    }, 'show');
                },
                async: true
            });
            return false;
        };
    });


    PayUCouponApp.factory('LatestOfferService', ['$http', function ($http) {
        var LatestOfferService = {};
        LatestOfferService.getLatestOffers = function (page) {
            return $http.get('/Offers/LatestListings?Id=' + page, {
                params: {
                    page: page
                }
            });
        };
        return LatestOfferService;

    }]);

    //Top Stores
    PayUCouponApp.controller('TopStoresController', function ($scope, TopStoresService) {
        var page = 1;
        $scope.TopStores = [];
        var load = function () {
            getTopStores();
            function getTopStores() {
                TopStoresService.getTopStores(page)
                    .success(function (TopStrs) {
                        if (TopStrs != 0) {
                            $('#loadingLatestOffer').hide();
                            $('#DisplayLatestOffer').removeClass('hideClass');
                            $('#loadMoreLatest').removeClass('hideClass');
                            $('#loadingLatestOffersLoadMore').hide();
                            $scope.TopStores = $scope.TopStores.concat(TopStrs);
                        }
                        else {
                            $('#buttonLatestOffersLoadMore').hide();
                        }

                    })
                    .error(function (error) {
                        $scope.status = 'Unable to load offer data: ' + error.message;
                    });
            };
        };

        load();


        $scope.loadMore = function () {
            $('#loadingLatestOffersLoadMore').show();
            page++;
            load();
        }

        $scope.TopStoresPopUp = function (id, event) {
            event.stopPropagation();
            event.preventDefault();
            var link = "/offers/OfferById/" + id;
            $.ajax({
                url: link,
                type: "GET",
                beforeSend: function () {
                },
                success: function (result) {
                    $('#myModalContent').html(result);
                    $('#modal-couponcode').modal({
                        keyboard: true
                    }, 'show');
                },
                async: true
            });
            return false;
        };
    });


    PayUCouponApp.factory('TopStoresService', ['$http', function ($http) {
        var TopStoresService = {};
        TopStoresService.getTopStores = function (page) {
            return $http.get('/Brand/GetTopStores?Id=' + page, {
                params: {
                    page: page
                }
            });
        };
        return TopStoresService;

    }]);

    //Latest Offer by Store Name
    PayUCouponApp.controller('OfferByStoreController', function ($scope, OfferByStoreService, $filter) {
        var page = 1; var searchTerm = $("#SearchTerm").val();
        $scope.OfferByStoreRslt = [];
        var load = function () {
            getOfferByStore();
            function getOfferByStore() {
                OfferByStoreService.getOfferByStore(page, searchTerm)
                    .success(function (OfferByStoreResult) {
                        if (OfferByStoreResult != 0) {
                            $('#loadingLatestOffer').hide();
                            $('#DisplayLatestOffer').removeClass('hideClass');
                            $('#loadMoreLatest').removeClass('hideClass');
                            $('#loadingLatestOffersLoadMore').hide();
                            $scope.OfferByStoreRslt = $scope.OfferByStoreRslt.concat(OfferByStoreResult);
                        }
                        else {
                            $('#buttonLatestOffersLoadMore').hide();
                        }

                    })
                    .error(function (error) {
                        $scope.status = 'Unable to load offer data: ' + error.message;
                    });
            };
        };

        load();


        $scope.loadMore = function () {
            $('#loadingLatestOffersLoadMore').show();
            page++;
            load();
        }

        $scope.LatestOfferPopUp = function (id, event) {
            event.stopPropagation();
            event.preventDefault();
            var link = "/offers/OfferById/" + id;
            $.ajax({
                url: link,
                type: "GET",
                beforeSend: function () {
                },
                success: function (result) {
                    $('#myModalContent').html(result);
                    $('#modal-couponcode').modal({
                        keyboard: true
                    }, 'show');
                },
                async: true
            });
            return false;
        };
    });


    PayUCouponApp.factory('OfferByStoreService', ['$http', function ($http) {
        var OfferByStoreService = {};
        OfferByStoreService.getOfferByStore = function (page, searchTerm) {
            return $http.get('/Offers/GetOfferByBrandFriendlyUrl?Id=' + page + '&name=' + searchTerm, {
                params: {
                    page: page
                }
            });
        };
        return OfferByStoreService;

    }]);

    //Latest Offer by Category Name
    PayUCouponApp.controller('OfferByCategoryController', function ($scope, OfferByCategoryService, $filter) {
        var page = 1; var searchTerm = $("#SearchTerm").val();
        $scope.OfferByCategoryRslt = [];
        var load = function () {
            getOfferByCategory();
            function getOfferByCategory() {
                OfferByCategoryService.getOfferByCategory(page, searchTerm)
                    .success(function (OfferByCategoryResult) {
                        if (OfferByCategoryResult != 0) {
                            $('#loadingLatestOffer').hide();
                            $('#DisplayLatestOffer').removeClass('hideClass');
                            $('#loadMoreLatest').removeClass('hideClass');
                            $('#loadingLatestOffersLoadMore').hide();
                            $scope.OfferByCategoryRslt = $scope.OfferByCategoryRslt.concat(OfferByCategoryResult);
                        }
                        else {
                            $('#buttonLatestOffersLoadMore').hide();
                        }

                    })
                    .error(function (error) {
                        $scope.status = 'Unable to load offer data: ' + error.message;
                    });
            };
        };

        load();


        $scope.loadMore = function () {
            $('#loadingLatestOffersLoadMore').show();
            page++;
            load();
        }

        $scope.LatestOfferPopUp = function (id, event) {
            event.stopPropagation();
            event.preventDefault();
            var link = "/offers/OfferById/" + id;
            $.ajax({
                url: link,
                type: "GET",
                beforeSend: function () {
                },
                success: function (result) {
                    $('#myModalContent').html(result);
                    $('#modal-couponcode').modal({
                        keyboard: true
                    }, 'show');
                },
                async: true
            });
            return false;
        };
    });


    PayUCouponApp.factory('OfferByCategoryService', ['$http', function ($http) {
        var OfferByCategoryService = {};
        OfferByCategoryService.getOfferByCategory = function (page, searchTerm) {
            return $http.get('/Offers/GetOffersByCategoryFriendlyUrl?Id=' + page + '&name=' + searchTerm, {
                params: {
                    page: page
                }
            });
        };
        return OfferByCategoryService;

    }]);

    //Latest Offer by Tag Name
    PayUCouponApp.controller('OfferByTagController', function ($scope, OfferByTagService, $filter) {
        var page = 1; var searchTerm = $("#SearchTerm").val();
        $scope.OfferByTagRslt = [];
        var load = function () {
            getOfferByTag();
            function getOfferByTag() {
                OfferByTagService.getOfferByTag(page, searchTerm)
                    .success(function (OfferByTagResult) {
                        if (OfferByTagResult != 0) {
                            $('#loadingLatestOffer').hide();
                            $('#DisplayLatestOffer').removeClass('hideClass');
                            $('#loadMoreLatest').removeClass('hideClass');
                            $('#loadingLatestOffersLoadMore').hide();
                            $scope.OfferByTagRslt = $scope.OfferByTagRslt.concat(OfferByTagResult);
                        }
                        else {
                            $('#buttonLatestOffersLoadMore').hide();
                        }

                    })
                    .error(function (error) {
                        $scope.status = 'Unable to load offer data: ' + error.message;
                    });
            };
        };

        load();


        $scope.loadMore = function () {
            $('#loadingLatestOffersLoadMore').show();
            page++;
            load();
        }

        $scope.LatestOfferPopUp = function (id, event) {
            event.stopPropagation();
            event.preventDefault();
            var link = "/offers/OfferById/" + id;
            $.ajax({
                url: link,
                type: "GET",
                beforeSend: function () {
                },
                success: function (result) {
                    $('#myModalContent').html(result);
                    $('#modal-couponcode').modal({
                        keyboard: true
                    }, 'show');
                },
                async: true
            });
            return false;
        };
    });


    PayUCouponApp.factory('OfferByTagService', ['$http', function ($http) {
        var OfferByTagService = {};
        OfferByTagService.getOfferByTag = function (page, searchTerm) {
            return $http.get('/Offers/GetOffersByTag?Id=' + page + '&name=' + searchTerm, {
                params: {
                    page: page
                }
            });
        };
        return OfferByTagService;

    }]);

    //Top Categories
    PayUCouponApp.controller('TopCategoryController', function ($scope, TopCategoryService) {
        getTopCategory();
        function getTopCategory() {
            TopCategoryService.getTopCategory()
                .success(function (TopCategories) {
                    $('#loadingLatestOffer').hide();
                    $('#DisplayTopCategory').removeClass('hideClass');
                    $scope.TopCategories = TopCategories;
                })
                .error(function (error) {
                    $scope.status = 'Unable to load offer data: ' + error.message;
                });
        };
    });


    PayUCouponApp.factory('TopCategoryService', ['$http', function ($http) {
        var TopCategoryService = {};
        TopCategoryService.getTopCategory = function () {
            return $http.get('/Categories/List');
        };
        return TopCategoryService;

    }]);

    //Top Tags
    PayUCouponApp.controller('TopTagsController', function ($scope, TopTagsService) {
        getTopTags();
        function getTopTags() {
            TopTagsService.getTopTags()
                .success(function (TopTags) {
                    $('#loadingLatestOffer').hide();
                    $('#DisplayTopTags').removeClass('hideClass');
                    $scope.TopTags = TopTags;
                })
                .error(function (error) {
                    $scope.status = 'Unable to load offer data: ' + error.message;
                });
        };
    });


    PayUCouponApp.factory('TopTagsService', ['$http', function ($http) {
        var TopTagsService = {};
        TopTagsService.getTopTags = function () {
            return $http.get('/Tags/List');
        };
        return TopTagsService;

    }]);

    //Banner
    //Top Categories
    PayUCouponApp.controller('BannerController', function ($scope, BannerService) {
        getBanner();
        function getBanner() {
            BannerService.getBanner()
                .success(function (Banners) {
                    $('#loadingBanner').hide();
                    $('#DisplayBanner').removeClass('hideClass');
                    $scope.Banners = Banners;
                    for (var i = 0, length = $scope.Banners.length; i < length; i++) {
                        if ($scope.Banners[i].BannerType == 3) {
                            setTimeout(function () {
                                var IMG_SRC = $scope.Banners[i].ImageLink + "?r=" + Math.random();
                                Lobibox.notify('error', {
                                    delay: false,
                                    title: '',
                                    position: 'bottom left',
                                    width: 300,
                                    onClickUrl: $scope.Banners[i].OfferLink,
                                    img: IMG_SRC,
                                    msg: ''
                                });
                            }, 5000);
                        }
                        break;
                    };
                })
                .error(function (error) {
                    $scope.status = 'Unable to load offer data: ' + error.message;
                });
        };
    });


    PayUCouponApp.factory('BannerService', ['$http', function ($http) {
        var BannerService = {};
        BannerService.getBanner = function () {
            return $http.get('/Banner/GetBanner');
        };
        return BannerService;
    }]);

})();