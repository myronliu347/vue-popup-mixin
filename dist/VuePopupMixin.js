(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["vue"], factory);
	else if(typeof exports === 'object')
		exports["VuePopupMixin"] = factory(require("vue"));
	else
		root["VuePopupMixin"] = factory(root["Vue"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.overlay = undefined;

	var _overlay = __webpack_require__(2);

	Object.defineProperty(exports, 'overlay', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_overlay).default;
	  }
	});

	var _popupManager = __webpack_require__(3);

	var _popupManager2 = _interopRequireDefault(_popupManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  props: {
	    show: {
	      type: Boolean,
	      default: false
	    },
	    overlay: {
	      type: Boolean,
	      default: true
	    },
	    overlayOpacity: {
	      type: Number,
	      default: 0.4
	    },
	    overlayColor: {
	      type: String,
	      default: '#000'
	    }
	  },
	  attached: function attached() {
	    if (this.show && this.overlay) {
	      _popupManager2.default.open(this);
	    }
	  },
	  detached: function detached() {
	    _popupManager2.default.close(this);
	  },

	  watch: {
	    show: function show(val) {
	      if (val && this.overlay) {
	        _popupManager2.default.open(this);
	      } else {
	        _popupManager2.default.close(this);
	      }
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    _popupManager2.default.close(this);
	  }
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var zIndex = 20141223;

	var getZIndex = exports.getZIndex = function getZIndex() {
	  return zIndex++;
	};

	var getDOM = exports.getDOM = function getDOM(dom) {
	  if (dom.nodeType === 3) {
	    dom = dom.nextElementSibling || dom.nextSibling;
	    getDOM(dom);
	  }
	  return dom;
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(5)
	__vue_script__ = __webpack_require__(4)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/overlay.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(6)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vue = __webpack_require__(7);

	var _vue2 = _interopRequireDefault(_vue);

	var _overlay = __webpack_require__(2);

	var _overlay2 = _interopRequireDefault(_overlay);

	var _utils = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Overlay = _vue2.default.extend(_overlay2.default);

	var PopupManager = {
	  instances: [],
	  overlay: false,

	  open: function open(instance) {
	    if (!instance || this.instances.indexOf(instance) !== -1) return;
	    if (this.instances.length === 0) {
	      this.showOverlay(instance.overlayColor, instance.overlayOpacity);
	    }
	    this.instances.push(instance);
	    this.changeOverlayStyle();
	    var dom = (0, _utils.getDOM)(instance.$el);
	    dom.style.zIndex = (0, _utils.getZIndex)();
	  },
	  close: function close(instance) {
	    var _this = this;

	    var index = this.instances.indexOf(instance);
	    if (index === -1) return;
	    _vue2.default.nextTick(function () {
	      _this.instances.splice(index, 1);
	      if (_this.instances.length === 0) {
	        _this.closeOverlay();
	      }
	      _this.changeOverlayStyle();
	    });
	  },
	  showOverlay: function showOverlay(color, opacity) {
	    var overlay = this.overlay = new Overlay({
	      el: document.createElement('div')
	    });
	    overlay.fixed = true;
	    overlay.color = color;
	    overlay.opacity = opacity;
	    overlay.onClick = this.handlerOverlayClick.bind(this);
	    overlay.$appendTo(document.body);

	    this.bodyOverflow = document.body.style.overflow;
	    document.body.style.overflow = 'hidden';
	  },
	  closeOverlay: function closeOverlay() {
	    if (!this.overlay) return;
	    document.body.style.overflow = this.bodyOverflow;
	    var overlay = this.overlay;
	    this.overlay = null;
	    overlay.$remove(function () {
	      overlay.$destroy();
	    });
	  },
	  changeOverlayStyle: function changeOverlayStyle() {
	    if (!this.overlay || this.instances.length === 0) return;
	    var instance = this.instances[this.instances.length - 1];
	    this.overlay.color = instance.overlayColor;
	    this.overlay.opacity = instance.overlayOpacity;
	  },
	  handlerOverlayClick: function handlerOverlayClick() {
	    if (this.instances.length === 0) return;
	    var instance = this.instances[this.instances.length - 1];
	    if (instance.overlayClick) {
	      instance.overlayClick();
	    }
	  }
	};

	window.addEventListener('keydown', function (event) {
	  if (event.keyCode === 27) {
	    if (PopupManager.instances.length > 0) {
	      var topInstance = PopupManager.instances[PopupManager.instances.length - 1];
	      if (!topInstance) return;
	      if (topInstance.escPress) {
	        topInstance.escPress();
	      }
	    }
	  }
	});

	exports.default = PopupManager;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(1);

	exports.default = {
	  props: {
	    fixed: {
	      type: Boolean,
	      default: false
	    },
	    onClick: {
	      type: Function
	    },
	    opacity: {
	      type: Number,
	      default: 0.4
	    },
	    color: {
	      type: String,
	      default: '#000'
	    }
	  },
	  data: function data() {
	    return {
	      zIndex: (0, _utils.getZIndex)()
	    };
	  },

	  computed: {
	    style: function style() {
	      return {
	        'opacity': this.opacity,
	        'background-color': this.color,
	        'position': this.fixed ? 'fixed' : '',
	        'z-index': this.zIndex
	      };
	    }
	  },
	  methods: {
	    prevent: function prevent(event) {
	      event.preventDefault();
	      event.stopPropagation();
	    },
	    handlerClick: function handlerClick() {
	      if (this.onClick) {
	        this.onClick();
	      }
	    }
	  }
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"overlay\" @click=\"handlerClick\" @touchmove=\"prevent\" :style=\"style\" transition=\"overlay-fade\"></div>\n";

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }
/******/ ])
});
;