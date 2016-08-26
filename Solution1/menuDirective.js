angular.module('menu.directive', [])

/*TODO: Directive which generates dynamic menu tree Menu*/
    .directive('treeMenu', function () {
        return {
            restrict: "E",
            replace: true,
            template: "<sub-menu ng-repeat='member in childListMenu' child={{member}}></sub-menu>",
            link : function (scope, element, attrs) {
                scope.childListMenu = angular.fromJson(attrs.listmenu);
            }
        }
    })

    /*TODO: Directive which manages the submenu*/
    .directive('subMenu', function ($compile) {
        return {
            restrict: "E",
            replace: true,
            template : "<li class='dropdown-submenu' style='cursor: pointer;'>" +
            "<a>{{children.nameMenu_SubMenu}}</a></li>",

            link: function (scope, element, attrs) {
                scope.children = angular.fromJson(attrs.child);
                // check if this children has other children
                if (angular.isArray(scope.children.childrens) && (scope.children.childrens.length >0) ) {
                    // append the collection directive to this element
                    element.append("<ul class='dropdown-menu'>" +
                        "<tree-menu listmenu='{{child.childrens}}'></tree-menu></ul>");
                    // we need to tell angular to render the directive    
                    $compile(element.contents())(scope);
                }
            }
        }
    });
