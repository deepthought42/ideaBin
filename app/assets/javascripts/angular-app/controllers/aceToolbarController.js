var app = angular.module('ideaBin.aceToolbarControllers', []);

app.controller("AceToolbarController", ['$scope', '$localStorage', 'Repository', '$location', '$http', '$rootScope',
	function($scope, $localStorage, Repository, $location, $http, $rootScope) {
		$scope.$storage = $localStorage;

		$scope.themesSrcs =
												{"ambiance": "https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-ambiance.js",
												"chaos": "https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-chaos.js",
												"clouds": "https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-clouds.js",
												"clouds Midnight": "https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-clouds_midnight.js",
												"cobalt": "https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-cobalt.js",
												"crimson Editor": "https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-crimson_editor.js",
												"dawn": "https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-dawn.js",
												"dreamweaver": "https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-dreamweaver.js",
												"eclipse":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-eclipse.js",
												"github":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-github.js",
												"idle_fingers":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-idle_fingers.js",
												"iplastic":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-iplastic.js",
												"katzenmilch":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-katzenmilch.js",
												"kr_theme":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-kr_theme.js",
												"kuroir":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-kuroir.js",
												"merbivore":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-merbivore.js",
												"merbivore_soft":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-merbivore_soft.js",
												"mono_industrial":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-mono_industrial.js",
												"monokai":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-monokai.js",
												"pastel_on_dark":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-pastel_on_dark.js",
												"solarized_dark":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-solarized_dark.js",
												"solarized_light":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-solarized_light.js",
												"sqlserver":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-sqlserver.js",
												"terminal":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-terminal.js",
												"textmate":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-textmate.js",
												"tomorrow":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-tomorrow.js",
												"tomorrow_night":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-tomorrow_night.js",
												"tomorrow_night_blue":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-tomorrow_night_blue.js",
												"tomorrow_night_bright":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-tomorrow_night_bright.js",
												"tomorrow_night_eighties":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-tomorrow_night_eighties.js",
												"twilight":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-twilight.js",
												"vibrant_ink":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-vibrant_ink.js",
												"xcode":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-xcode.js"												}

/*
Eclipse
Idle Fingers
Kr Theme
Merbivore
Merbivore Soft
Mono Industrial
Monokai
Pastel On Dark
Solarized Dark
Solarized Light
TextMate
Tomorrow
Tomorrow Night
Tomorrow Night Blue
Tomorrow Night Bright
Tomorrow Night Eighties
Twilight
Vibrant Ink
*/
		$scope.updateResource = function(){
			$rootScope.$broadcast("updateResouce");
		}

		$scope.selectTheme = function(themeName){
			var src = $scope.themesSrcs[themeName];
			console.log("THEMSES :: " + $scope.themesSrcs);
			console.log("APPENDING SRC :: " + src + " for theme name :: " +themeName);
			$("body").append("<script src='"+src+"' type='text/javascript'></script>");
			$rootScope.$broadcast("loadTheme", themeName);
		}
  }
])
