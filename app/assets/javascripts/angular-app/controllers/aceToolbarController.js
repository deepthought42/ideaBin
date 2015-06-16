var app = angular.module('ideaBin.aceToolbarControllers', []);

app.controller("AceToolbarController", ['$scope', '$localStorage', 'Repository', '$location', '$http', '$rootScope',
	function($scope, $localStorage, Repository, $location, $http, $rootScope) {
		$scope.$storage = $localStorage;

		$scope.themeOptions = [
		        {
		          name: 'Ambiance',
		          value: 'ambiance'
		        },
		        {
		          name: 'Chaos',
		          value: 'chaos'
		        },
		        {
		          name: 'Chrome',
		          value: 'chrome'
		        },
		        {
		          name: 'Clouds',
		          value: 'clouds'
		        },
		        {
		          name: 'Clouds Midnight',
		          value: 'clouds_midnight'
		        },
		        {
		          name: 'Cobalt',
		          value: 'cobalt'
		        },
		        {
		          name: 'Crimson Editor',
		          value: 'crimson_editor'
		        },
		        {
		          name: 'Dawn',
		          value: 'dawn'
		        },
		        {
		          name: 'Dreamweaver',
		          value: 'dreamweaver'
		        },
		        {
		          name: 'Eclipse',
		          value: 'eclipse'
		        },
		        {
		          name: 'Github',
		          value: 'github'
		        },
		        {
		          name: 'Idle Fingers',
		          value: 'idle_fingers'
		        },
		        {
		          name: 'iPlastic',
		          value: 'iplastic'
		        },
		        {
		          name: 'Katzenmilch',
		          value: 'katzenmilch'
		        },
		        {
		          name: 'Kr Theme',
		          value: 'kr_theme'
		        },
		        {
		          name: 'Kuroir',
		          value: 'kuroir'
		        },
		        {
		          name: 'Merbivore',
		          value: 'merbivore'
		        },
		        {
		          name: 'Merbivore Soft',
		          value: 'merbivore_soft'
		        },
		        {
		          name: 'Mono Industrial',
		          value: 'mono_industrial'
		        },
		        {
		          name: 'Monokai',
		          value: 'monokai'
		        },
		        {
		          name: 'Pastel On Dark',
		          value: 'pastel_on_dark'
		        },
		        {
		          name: 'Solarized Dark',
		          value: 'solarized_dark'
		        },
		        {
		          name: 'Solarized Light',
		          value: 'solarized_light'
		        },
		        {
		          name: 'SQL Server',
		          value: 'sqlserver'
		        },
		        {
		          name: 'Terminal',
		          value: 'terminal'
		        },
		        {
		          name: 'Textmate',
		          value: 'textmate'
		        },
		        {
		          name: 'Tomorrow',
		          value: 'tomorrow'
		        },
		        {
		          name: 'Tomorrow Night',
		          value: 'tomorrow_night'
		        },
		        {
		          name: 'Tomorrow Night Blue',
		          value: 'tomorrow_night_blue'
		        },
		        {
		          name: 'Tomorrow Night Blue',
		          value: 'tomorrow_night_bright'
		        },
		        {
		          name: 'Tomorrow Night Bright',
		          value: 'tomorrow_night_bright'
		        },
		        {
		          name: 'Tomorrow Night Eighties',
		          value: 'tomorrow_night_eighties'
		        },
		        {
		          name: 'Twilight',
		          value: 'twilight'
		        },
		        {
		          name: 'Vibrant Ink',
		          value: 'vibrant_ink'
		        },
		        {
		          name: 'XCode',
		          value: 'xcode'
		        }
		    ];
				$scope.selectedTheme = $scope.themeOptions[0];

		$scope.themesSrcs = {
			"ambiance": "https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-ambiance.js",
			"chaos": "https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-chaos.js",
			"clouds": "https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-clouds.js",
			"clouds_midnight": "https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-clouds_midnight.js",
			"cobalt": "https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-cobalt.js",
			"crimson_editor": "https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-crimson_editor.js",
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
			"xcode":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/theme-xcode.js"
		}

		$scope.modeSrcs = {
			"ace/mode/ace/mode/abap":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-abap.js",
			"ace/mode/abc":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-abc.js",
			"ace/mode/actionscript":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-actionscript.js",
			"ace/mode/ada":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-ada.js",
			"ace/mode/apache_conf":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-apache_conf.js",
			"ace/mode/applescript":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-applescript.js",
			"ace/mode/asciidoc":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-asciidoc.js",
			"ace/mode/assembly_x86":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-assembly_x86.js",
			"ace/mode/autohotkey":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-autohotkey.js",
			"ace/mode/batchfile":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-batchfile.js",
			"ace/mode/c9search":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-c9search.js",
			"ace/mode/c_cpp":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-c_cpp.js",
			"ace/mode/cirru":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-cirru.js",
			"ace/mode/clojure":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-clojure.js",
			"ace/mode/cobol":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-cobol.js",
			"ace/mode/coffee":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-coffee.js",
			"ace/mode/coldfusion":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-coldfusion.js",
			"ace/mode/csharp":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-csharp.js",
			"ace/mode/css":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-css.js",
			"ace/mode/curly":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-curly.js",
			"ace/mode/d":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-d.js",
			"ace/mode/dart":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-dart.js",
			"ace/mode/diff":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-diff.js",
			"ace/mode/django":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-django.js",
			"ace/mode/dockerfile":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-dockerfile.js",
			"ace/mode/dot":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-dot.js",
			"ace/mode/eiffel":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-eiffel.js",
			"ace/mode/ejs":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-ejs.js",
			"ace/mode/elixir":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-elixir.js",
			"ace/mode/elm":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-elm.js",
			"ace/mode/erlang":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-erlang.js",
			"ace/mode/forth":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-forth.js",
			"ace/mode/ftl":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-ftl.js",
			"ace/mode/gcode":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-gcode.js",
			"ace/mode/gherkin":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-gherkin.js",
			"ace/mode/gitignore":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-gitignore.js",
			"ace/mode/glsl":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-glsl.js",
			"ace/mode/golang":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-golang.js",
			"ace/mode/groovy":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-groovy.js",
			"ace/mode/haml":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-haml.js",
			"ace/mode/handlebars":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-handlebars.js",
			"ace/mode/haskell":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-haskell.js",
			"ace/mode/haxe":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-haxe.js",
			"ace/mode/html":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-html.js",
			"ace/mode/html_ruby":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-html_ruby.js",
			"ace/mode/ini":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-ini.js",
			"ace/mode/io":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-io.js",
			"ace/mode/jack":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-jack.js",
			"ace/mode/jade":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-jade.js",
			"ace/mode/java":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-java.js",
			"ace/mode/javascript":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-javascript.js",
			"ace/mode/json":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-json.js",
			"ace/mode/jsoniq":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-jsoniq.js",
			"ace/mode/jsp":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-jsp.js",
			"ace/mode/jsx":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-jsx.js",
			"ace/mode/julia":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-julia.js",
			"ace/mode/latex":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-latex.js",
			"ace/mode/lean":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-lean.js",
			"ace/mode/less":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-less.js",
			"ace/mode/liquid":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-liquid.js",
			"ace/mode/lisp":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-lisp.js",
			"ace/mode/livescript":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-livescript.js",
			"ace/mode/logiql":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-logiql.js",
			"ace/mode/lsl":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-lsl.js",
			"ace/mode/lua":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-lua.js",
			"ace/mode/luapage":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-luapage.js",
			"ace/mode/lucene":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-lucene.js",
			"ace/mode/makefile":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-makefile.js",
			"ace/mode/markdown":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-markdown.js",
			"ace/mode/mask":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-mask.js",
			"ace/mode/matlab":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-matlab.js",
			"ace/mode/mel":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-mel.js",
			"ace/mode/mips_assembler":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-mips_assembler.js",
			"ace/mode/mushcode":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-mushcode.js",
			"ace/mode/mysql":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-mysql.js",
			"ace/mode/nix":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-nix.js",
			"ace/mode/objectivec":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-objectivec.js",
			"ace/mode/ocaml":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-ocaml.js",
			"ace/mode/pascal":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-pascal.js",
			"ace/mode/perl":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-perl.js",
			"ace/mode/pgsql":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-pgsql.js",
			"ace/mode/php":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-php.js",
			"ace/mode/plain_text":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-plain_text.js",
			"ace/mode/powershell":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-powershell.js",
			"ace/mode/praat":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-praat.js",
			"ace/mode/prolog":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-prolog.js",
			"ace/mode/properties":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-properties.js",
			"ace/mode/protobuf":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-protobuf.js",
			"ace/mode/python":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-python.js",
			"ace/mode/r":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-r.js",
			"ace/mode/rdoc":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-rdoc.js",
			"ace/mode/rhtml":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-rhtml.js",
			"ace/mode/ruby":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-ruby.js",
			"ace/mode/rust":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-rust.js",
			"ace/mode/sass":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-sass.js",
			"ace/mode/scad":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-scad.js",
			"ace/mode/scala":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-scala.js",
			"ace/mode/scheme":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-scheme.js",
			"ace/mode/scss":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-scss.js",
			"ace/mode/sh":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-sh.js",
			"ace/mode/sjs":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-sjs.js",
			"ace/mode/smarty":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-smarty.js",
			"ace/mode/snippets":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-snippets.js",
			"ace/mode/soy_template":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-soy_template.js",
			"ace/mode/space":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-space.js",
			"ace/mode/sql":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-sql.js",
			"ace/mode/sqlserver":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-sqlserver.js",
			"ace/mode/stylus":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-stylus.js",
			"ace/mode/svg":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-svg.js",
			"ace/mode/tcl":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-tcl.js",
			"ace/mode/tex":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-tex.js",
			"ace/mode/textile":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-textile.js",
			"ace/mode/toml":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-toml.js",
			"ace/mode/twig":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-twig.js",
			"ace/mode/typescript":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-typescript.js",
			"ace/mode/vala":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-vala.js",
			"ace/mode/vbscript":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-vbscript.js",
			"ace/mode/velocity":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-velocity.js",
			"ace/mode/verilog":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-verilog.js",
			"ace/mode/vhdl":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-vhdl.js",
			"ace/mode/xml":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-xml.js",
			"ace/mode/xquery":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-xquery.js",
			"ace/mode/yaml":"https://ajaxorg.github.io/ace-builds/src-min-noconflict/mode-yaml.js"
		}

		$scope.updateResource = function(){
			$rootScope.$broadcast("updateResouce");
		}

		$scope.selectTheme = function(themeName){
			var src = $scope.themesSrcs[themeName];
			$("body").append("<script src='"+src+"' type='text/javascript'></script>");
			$rootScope.$broadcast("loadTheme", themeName);
		}

		$scope.$on("loadModeScript", function(event, mode){
			var src = $scope.modeSrcs[mode];
			$("body").append("<script src='"+src+"' type='text/javascript'></script>");
		});
  }
])
