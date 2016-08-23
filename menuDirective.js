angular.module('menu.directive', [])

/*TODO: Directive which generates dynamic menu tree Menu*/
    .directive('treeMenu', function () {
        return {
            restrict: "E",
            replace: true,
            scope: {
                listmenu: '='
            },
            template: "<sub-menu ng-repeat='member in listmenu' child='member'></sub-menu>"
        }
    })

    /*TODO: Directive which manages the submenu*/
    .directive('subMenu', function ($compile) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                child: '='
            },
            template : "<li class='dropdown-submenu' style='cursor: pointer;'>" +
            "<a>{{child.nameMenu_SubMenu}}</a></li>",

            link: function (scope, element, attrs) {
                // check if this child has other children
                if (angular.isArray(scope.child.children) && (scope.child.children.length >0) ) {
                    // append the collection directive to this element
                    element.append("<ul class='dropdown-menu'>" +
                        "<tree-menu listmenu='child.children'></tree-menu></ul>");
                    // we need to tell angular to render the directive    
                    $compile(element.contents())(scope);
                }
            }
        }
    })
    
