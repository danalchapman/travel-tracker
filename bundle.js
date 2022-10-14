/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* Global Styling */\nbody {\n  background-color: grey;\n  font-family: Century Gothic, CenturyGothic, AppleGothic, sans-serif;\n  margin: 0px;\n}\n\n/* Log-In View */\n.user-screen {\n  align-items: center;\n  background-attachment: fixed;\n  background-image: url('https://images.unsplash.com/photo-1659458449825-1eb66f098d36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80');\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  color: white;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  height: 100vh;\n  margin: 0px;\n}\n\n.page-title {\n  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;\n  font-size: 65px;\n  font-style: italic;\n  font-weight: bolder;\n  padding: 20px;\n}\n\n.log-in {\n  height: 100px;\n  width: 300px;\n}\n\n.user {\n  display: flex;\n  justify-content: space-between;\n  margin-top: 5px;\n}\n\n.login-button {\n  border-radius: 5px;\n  cursor: pointer;\n  font-family: Century Gothic, CenturyGothic, AppleGothic, sans-serif;\n  width: 100px;\n}\n\n.disable-login-button {\n  cursor: not-allowed\n}\n\n.login-error {\n  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;\n  font-size: 12px;\n  font-style: italic;\n  padding: 10px;\n}\n\n/* Main View */\n/* Navigation */\n.nav-menu {\n  align-items: center;\n  background-color: #343D5B;\n  color: white;\n  display: flex;\n  justify-content: space-around;\n}\n\n.nav-users {\n  align-items: center;\n  display: flex;\n  justify-content: space-around;\n}\n\n.nav-greeting {\n  font-size: 14px;\n  font-style: italic;\n}\n\n.button-design {\n  background-color: #9B5863;\n  border: 1px solid white;\n  border-radius: 8%;\n  color: white;\n  cursor: not-allowed;\n  font-family: Century Gothic, CenturyGothic, AppleGothic, sans-serif;\n  font-size: 10px;\n  height: 20px;\n  margin-left: 10px;\n  padding: 3px;\n  visibility: hidden;\n  width: 100px;\n}\n\n/* Main */\n.main-content {\n  background-image: linear-gradient(#343D5B, #81566A, #9D653E);\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  height: 100vh;\n}\n\n/* Trip Cards */\n.content {\n  display: flex;\n  justify-content: space-evenly;\n}\n\n.long-card {\n  background-color: #9D653E;\n  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;\n  display: flex;\n  justify-content: space-evenly;\n  height: 150px;\n  width: 900px;\n}\n\n.main-new-trip {\n  display: flex;\n  justify-content: space-evenly;\n}\n\n.new-trip-box {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  padding: 10px;\n  width: 400px;\n}\n\n.new-info {\n  color: white;\n  width: 175px;\n}\n\n.input-box {\n  width: 175px;\n}\n\n.submit-box {\n  align-items: center;\n}\n\n.total-due {\n  color: white;\n  font-weight: bold;\n  text-decoration: underline;\n}\n\n.submit-button-design {\n  background-color: #81566A;\n  border: 1px solid white;\n  border-radius: 8%;\n  color: white;\n  cursor: pointer;\n  font-family: Century Gothic, CenturyGothic, AppleGothic, sans-serif;\n  font-size: 16px;\n  margin-left: 10px;\n  padding: 3px;\n  width: 100px;\n}\n\n.disable-button {\n  background-color: #9B5863;\n  color: #b4afaf;\n  cursor: default;\n}\n\n/* Trip Footer */\n.bottom-card {\n  align-items: center;\n  display: flex;\n}\n\n.footer-text {\n  color: white;\n  font-size: 18px;\n}\n\n/* Trip Cards */\n.card-container {\n  display: flex;\n  justify-content: space-evenly;\n}\n\n.card {\n  align-items: center;\n  background-color: #81566A;\n  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;\n  color: white;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  height: 400px;\n  width: 275px;\n}\n\n.card-wrap {\n  display: flex;\n  flex-direction: column;\n  overflow-y: scroll;\n  scrollbar-width: none;  /* Firefox */\n  -ms-overflow-style: none;  /* IE and Edge */\n}\n\n.card-wrap::-webkit-scrollbar {\n  display: none;\n}\n\n.card-text {\n  color: white;\n  font-size: 20px;\n  font-style: italic;\n  text-align: left;\n}\n\n.info-card {\n  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;\n  color: white;\n  display: flex;\n  flex-direction: column;\n  font-size: 14px;\n  justify-content: space-between;\n  margin: 8px 0px;\n  padding: 4px;\n  width: 225px;\n}\n\n.hidden {\n  display: none;\n}", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA,mBAAmB;AACnB;EACE,sBAAsB;EACtB,mEAAmE;EACnE,WAAW;AACb;;AAEA,gBAAgB;AAChB;EACE,mBAAmB;EACnB,4BAA4B;EAC5B,sLAAsL;EACtL,2BAA2B;EAC3B,4BAA4B;EAC5B,sBAAsB;EACtB,YAAY;EACZ,aAAa;EACb,sBAAsB;EACtB,2BAA2B;EAC3B,aAAa;EACb,WAAW;AACb;;AAEA;EACE,2CAA2C;EAC3C,eAAe;EACf,kBAAkB;EAClB,mBAAmB;EACnB,aAAa;AACf;;AAEA;EACE,aAAa;EACb,YAAY;AACd;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,eAAe;AACjB;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,mEAAmE;EACnE,YAAY;AACd;;AAEA;EACE;AACF;;AAEA;EACE,2CAA2C;EAC3C,eAAe;EACf,kBAAkB;EAClB,aAAa;AACf;;AAEA,cAAc;AACd,eAAe;AACf;EACE,mBAAmB;EACnB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,6BAA6B;AAC/B;;AAEA;EACE,mBAAmB;EACnB,aAAa;EACb,6BAA6B;AAC/B;;AAEA;EACE,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,yBAAyB;EACzB,uBAAuB;EACvB,iBAAiB;EACjB,YAAY;EACZ,mBAAmB;EACnB,mEAAmE;EACnE,eAAe;EACf,YAAY;EACZ,iBAAiB;EACjB,YAAY;EACZ,kBAAkB;EAClB,YAAY;AACd;;AAEA,SAAS;AACT;EACE,4DAA4D;EAC5D,aAAa;EACb,sBAAsB;EACtB,6BAA6B;EAC7B,aAAa;AACf;;AAEA,eAAe;AACf;EACE,aAAa;EACb,6BAA6B;AAC/B;;AAEA;EACE,yBAAyB;EACzB,2CAA2C;EAC3C,aAAa;EACb,6BAA6B;EAC7B,aAAa;EACb,YAAY;AACd;;AAEA;EACE,aAAa;EACb,6BAA6B;AAC/B;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,6BAA6B;EAC7B,aAAa;EACb,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,iBAAiB;EACjB,0BAA0B;AAC5B;;AAEA;EACE,yBAAyB;EACzB,uBAAuB;EACvB,iBAAiB;EACjB,YAAY;EACZ,eAAe;EACf,mEAAmE;EACnE,eAAe;EACf,iBAAiB;EACjB,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,yBAAyB;EACzB,cAAc;EACd,eAAe;AACjB;;AAEA,gBAAgB;AAChB;EACE,mBAAmB;EACnB,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,eAAe;AACjB;;AAEA,eAAe;AACf;EACE,aAAa;EACb,6BAA6B;AAC/B;;AAEA;EACE,mBAAmB;EACnB,yBAAyB;EACzB,2CAA2C;EAC3C,YAAY;EACZ,aAAa;EACb,sBAAsB;EACtB,2BAA2B;EAC3B,aAAa;EACb,YAAY;AACd;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,kBAAkB;EAClB,qBAAqB,GAAG,YAAY;EACpC,wBAAwB,GAAG,gBAAgB;AAC7C;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,eAAe;EACf,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,2CAA2C;EAC3C,YAAY;EACZ,aAAa;EACb,sBAAsB;EACtB,eAAe;EACf,8BAA8B;EAC9B,eAAe;EACf,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,aAAa;AACf","sourcesContent":["/* Global Styling */\nbody {\n  background-color: grey;\n  font-family: Century Gothic, CenturyGothic, AppleGothic, sans-serif;\n  margin: 0px;\n}\n\n/* Log-In View */\n.user-screen {\n  align-items: center;\n  background-attachment: fixed;\n  background-image: url('https://images.unsplash.com/photo-1659458449825-1eb66f098d36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80');\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  color: white;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  height: 100vh;\n  margin: 0px;\n}\n\n.page-title {\n  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;\n  font-size: 65px;\n  font-style: italic;\n  font-weight: bolder;\n  padding: 20px;\n}\n\n.log-in {\n  height: 100px;\n  width: 300px;\n}\n\n.user {\n  display: flex;\n  justify-content: space-between;\n  margin-top: 5px;\n}\n\n.login-button {\n  border-radius: 5px;\n  cursor: pointer;\n  font-family: Century Gothic, CenturyGothic, AppleGothic, sans-serif;\n  width: 100px;\n}\n\n.disable-login-button {\n  cursor: not-allowed\n}\n\n.login-error {\n  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;\n  font-size: 12px;\n  font-style: italic;\n  padding: 10px;\n}\n\n/* Main View */\n/* Navigation */\n.nav-menu {\n  align-items: center;\n  background-color: #343D5B;\n  color: white;\n  display: flex;\n  justify-content: space-around;\n}\n\n.nav-users {\n  align-items: center;\n  display: flex;\n  justify-content: space-around;\n}\n\n.nav-greeting {\n  font-size: 14px;\n  font-style: italic;\n}\n\n.button-design {\n  background-color: #9B5863;\n  border: 1px solid white;\n  border-radius: 8%;\n  color: white;\n  cursor: not-allowed;\n  font-family: Century Gothic, CenturyGothic, AppleGothic, sans-serif;\n  font-size: 10px;\n  height: 20px;\n  margin-left: 10px;\n  padding: 3px;\n  visibility: hidden;\n  width: 100px;\n}\n\n/* Main */\n.main-content {\n  background-image: linear-gradient(#343D5B, #81566A, #9D653E);\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  height: 100vh;\n}\n\n/* Trip Cards */\n.content {\n  display: flex;\n  justify-content: space-evenly;\n}\n\n.long-card {\n  background-color: #9D653E;\n  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;\n  display: flex;\n  justify-content: space-evenly;\n  height: 150px;\n  width: 900px;\n}\n\n.main-new-trip {\n  display: flex;\n  justify-content: space-evenly;\n}\n\n.new-trip-box {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  padding: 10px;\n  width: 400px;\n}\n\n.new-info {\n  color: white;\n  width: 175px;\n}\n\n.input-box {\n  width: 175px;\n}\n\n.submit-box {\n  align-items: center;\n}\n\n.total-due {\n  color: white;\n  font-weight: bold;\n  text-decoration: underline;\n}\n\n.submit-button-design {\n  background-color: #81566A;\n  border: 1px solid white;\n  border-radius: 8%;\n  color: white;\n  cursor: pointer;\n  font-family: Century Gothic, CenturyGothic, AppleGothic, sans-serif;\n  font-size: 16px;\n  margin-left: 10px;\n  padding: 3px;\n  width: 100px;\n}\n\n.disable-button {\n  background-color: #9B5863;\n  color: #b4afaf;\n  cursor: default;\n}\n\n/* Trip Footer */\n.bottom-card {\n  align-items: center;\n  display: flex;\n}\n\n.footer-text {\n  color: white;\n  font-size: 18px;\n}\n\n/* Trip Cards */\n.card-container {\n  display: flex;\n  justify-content: space-evenly;\n}\n\n.card {\n  align-items: center;\n  background-color: #81566A;\n  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;\n  color: white;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  height: 400px;\n  width: 275px;\n}\n\n.card-wrap {\n  display: flex;\n  flex-direction: column;\n  overflow-y: scroll;\n  scrollbar-width: none;  /* Firefox */\n  -ms-overflow-style: none;  /* IE and Edge */\n}\n\n.card-wrap::-webkit-scrollbar {\n  display: none;\n}\n\n.card-text {\n  color: white;\n  font-size: 20px;\n  font-style: italic;\n  text-align: left;\n}\n\n.info-card {\n  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;\n  color: white;\n  display: flex;\n  flex-direction: column;\n  font-size: 14px;\n  justify-content: space-between;\n  margin: 8px 0px;\n  padding: 4px;\n  width: 225px;\n}\n\n.hidden {\n  display: none;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Traveler {
    constructor(travelerData) {
        this.id = travelerData.id;
        this.name = travelerData.name;
        this.travelerType = travelerData.travelerType
    }

    returnFirstName() {
        const firstName = this.name.split(' ')
        return firstName[0]
    }

    returnYearlyTripCost(trips, year) {
        return trips.reduce((acc, trip) => {
            if (trip.status === 'approved' && trip.date.includes(year)) {
                acc += trip.calculateTripCost()
            }

            return acc
        }, 0).toFixed(2)
    }

    sortTrips(trips, date) {
        return trips.reduce((acc, trip) => {
            const todaysDate = Date.parse(new Date(date))
            const tripDate = Date.parse(new Date(trip.date))
            if (trip.status === 'pending') {
                acc.pending.push(trip)
            } else if (tripDate < todaysDate) {
                acc.past.push(trip)
            } else {
                acc.upcoming.push(trip)
            }

            return acc
        }, {
            past: [],
            pending: [],
            upcoming: []
        })
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Traveler); 

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _destination__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);


class Trip {
    constructor(tripData) {
        this.id = tripData.id;
        this.userID = tripData.userID;
        this.destinationID = tripData.destinationID;
        this.travelers = tripData.travelers;
        this.date = tripData.date;
        this.duration = tripData.duration;
        this.status = tripData.status;
        this.suggestedActivities = tripData.suggestedActivities
        this.destination = {}
    }

    storeDestination(destinationData) {
        const tripDestination = destinationData.find(destination => destination.id === this.destinationID)
        if (tripDestination) {
            this.destination = new _destination__WEBPACK_IMPORTED_MODULE_0__.default(tripDestination)
        }
    }

    calculateTripCost() {
        const lodging = this.destination.lodgingCost * this.duration
        const flight = this.destination.flightCost * this.travelers
        return (lodging + flight) * 1.1
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Trip); 

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Destination {
    constructor(destinationData) {
        this.id = destinationData.id;
        this.name = destinationData.destination;
        this.lodgingCost = destinationData.estimatedLodgingCostPerDay;
        this.flightCost = destinationData.estimatedFlightCostPerPerson;
        this.image = destinationData.image;
        this.alt = destinationData.alt
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Destination);

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDestinationData": () => (/* binding */ getDestinationData),
/* harmony export */   "getSingleTravelerData": () => (/* binding */ getSingleTravelerData),
/* harmony export */   "getTripData": () => (/* binding */ getTripData),
/* harmony export */   "postNewTrip": () => (/* binding */ postNewTrip)
/* harmony export */ });
/* GET Requests */
const getDestinationData = () => {
    return fetch('http://localhost:3001/api/v1/destinations')
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error))
}

const getSingleTravelerData = (id) => {
    return fetch(`http://localhost:3001/api/v1/travelers/${id}`)
    .then(response => {
        if (!response.ok) {
            return {status: response.status}
        } else {
            return response.json()
        }
    })
    .catch(err => console.error(err))
}

const getTripData = () => { 
    return fetch('http://localhost:3001/api/v1/trips')
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error))
}

/* POST Requests */
const postNewTrip = (data) => {
    return fetch('http://localhost:3001/api/v1/trips', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error))
}

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _traveler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _trip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* Imports */





/* Query Selectors */
const loginUsername = document.querySelector('#user-name')
const loginPassword = document.querySelector('#user-password')
const submitLoginButton = document.querySelector('#user-submit')
const navGreeting = document.querySelector('#nav-greeting-name')
const pastTrips = document.querySelector('#past-trips')
const pendingTrips = document.querySelector('#pending-trips')
const upcomingTrips = document.querySelector('#upcoming-trips')
const yearlyTotal = document.querySelector('#yearly-total')
const newTripDate = document.querySelector('#trip-date-input')
const newTripTravelers = document.querySelector('#trip-travelers-input')
const newTripDuration = document.querySelector('#trip-duration-input')
const newTripDestination = document.querySelector('#trip-destination-input')
const newTripTotal = document.querySelector('#new-trip-total')
const submitNewTripButton = document.querySelector('#new-trip-submit')
const loginPage = document.querySelector('#login')
const mainPageNav = document.querySelector('#nav-main')
const mainPageMain = document.querySelector('#main')
const loginPageError = document.querySelector('#user-error')

/* Instances */
let destinationData, travelerData, tripData
let travelerID 

/* apiCalls */
const loadAPIData = () => {
    return Promise.all([(0,_apiCalls__WEBPACK_IMPORTED_MODULE_3__.getDestinationData)(), (0,_apiCalls__WEBPACK_IMPORTED_MODULE_3__.getSingleTravelerData)(travelerID), (0,_apiCalls__WEBPACK_IMPORTED_MODULE_3__.getTripData)()])
    .then(responses => {
        destinationData = responses[0].destinations

        if (responses[1].status === 404) {
            loginPageError.innerHTML = 'Your username or password does not match our systems records, please check your information is correct.'
        } else {
            travelerData = new _traveler__WEBPACK_IMPORTED_MODULE_1__.default(responses[1])
            loginPageError.innerHTML = ''
        }
        
        tripData = responses[2].trips
            .filter(trip => trip.userID === travelerID)
            .map(trip => new _trip__WEBPACK_IMPORTED_MODULE_2__.default(trip))
        tripData.forEach(trip => trip.storeDestination(destinationData))
    })
    .then(() => {
        displayTravelerGreeting()
        displayTrips()
        displayYearlyTripTotal()
        generateDestinationDropdown()
        hideLoginShowMain()
    })
}

/* Functions */ 
function onLogin(e) {
    e.preventDefault()
    if (loginUsername.value.includes('traveler') && loginPassword.value === 'travel') {
        travelerID = parseInt(loginUsername.value.split('traveler')[1])
        loadAPIData()
    } 
}

function checkSubmitLoginEligibility() {
    if (loginUsername.value && loginPassword.value) {
        submitLoginButton.disabled = false
        submitLoginButton.classList.remove('disable-login-button')
    } else {
        submitLoginButton.disabled = true
        submitLoginButton.classList.add('disable-login-button')
    }
}

function hideLoginShowMain() {
    loginPage.classList.add('hidden')
    mainPageNav.classList.remove('hidden')
    mainPageMain.classList.remove('hidden')
}

function displayTravelerGreeting() {
    navGreeting.innerHTML = `Hello, ${travelerData.returnFirstName()}!`
}

function handleTrips(card, trips) {
    if (!trips.length) {
        card.innerHTML = 'No trips found!'
    } else {
        card.innerHTML = trips.map(trip => {
            return `
                <section class="info-card">
                    <p class="trip-destination">Destination: ${trip.destination.name}</p>
                    <p class="trip-date">Date: ${trip.date}</p>
                    <p class="trip-travelers">Travelers: ${trip.travelers} Adult(s)</p>
                    <p class="trip-duration">Duration: ${trip.duration} Day(s)</p>
                </section>
            `
        }).join('')
    }
}

function displayTrips() {
    const sortedTrips = travelerData.sortTrips(tripData, '2020/12/31')
    handleTrips(pastTrips, sortedTrips.past)
    handleTrips(pendingTrips, sortedTrips.pending)
    handleTrips(upcomingTrips, sortedTrips.upcoming)
}

function displayYearlyTripTotal() {
    yearlyTotal.innerHTML = `Total Spent This Year: $${travelerData.returnYearlyTripCost(tripData, 2020)}`
}

function generateDestinationDropdown() {
    newTripDestination.innerHTML += destinationData.map(destination => {
        return `<option value="${destination.id}">${destination.destination}</option>`
    }).join('')
}

function createNewTrip() {
    const tripDate = newTripDate.value.replaceAll('-', '/')
    const tripTravelers = parseInt(newTripTravelers.value)
    const tripDuration = parseInt(newTripDuration.value)
    const tripDestination = parseInt(newTripDestination.value)
    return {
        id: Date.now(),
        userID: travelerID,
        destinationID: tripDestination,
        travelers: tripTravelers,
        date: tripDate,
        duration: tripDuration,
        status: 'pending',
        suggestedActivities: []
    }
}

function onSubmit(e) {
    e.preventDefault()
    const newTripInfo = createNewTrip()
    return Promise.all([(0,_apiCalls__WEBPACK_IMPORTED_MODULE_3__.postNewTrip)(newTripInfo)])
    .then(response => {
        const newTrip = new _trip__WEBPACK_IMPORTED_MODULE_2__.default(response[0].newTrip)
        newTrip.storeDestination(destinationData)
        tripData.push(newTrip)
        displayTrips()
        newTripDate.value = ''
        newTripTravelers.value = ''
        newTripDuration.value = ''
        newTripDestination.value = '0'
        newTripTotal.innerText = '0.00'
        checkSubmitEligibility()
    })
}

function renderNewTripPrice() {
    const newTrip = new _trip__WEBPACK_IMPORTED_MODULE_2__.default(createNewTrip())
    newTrip.storeDestination(destinationData)
    if (newTrip.travelers && newTrip.duration && newTrip.destinationID) {
        newTripTotal.innerText = newTrip.calculateTripCost().toFixed(2)
    } else {
        newTripTotal.innerText = '0.00'
    }

    checkSubmitEligibility()
}

function checkSubmitEligibility() {
    if (newTripDate.value && newTripTravelers.value && newTripDuration.value && parseInt(newTripDestination.value)) {
        submitNewTripButton.disabled = false
        submitNewTripButton.classList.remove('disable-button')
    } else {
        submitNewTripButton.disabled = true
        submitNewTripButton.classList.add('disable-button')
    }
}

/* Event Listeners */
loginUsername.addEventListener('input', checkSubmitLoginEligibility)
loginPassword.addEventListener('input', checkSubmitLoginEligibility)
submitLoginButton.addEventListener('click', onLogin)
newTripDate.addEventListener('change', renderNewTripPrice)
newTripDestination.addEventListener('change', renderNewTripPrice)
newTripDuration.addEventListener('input', renderNewTripPrice)
newTripTravelers.addEventListener('input', renderNewTripPrice)
submitNewTripButton.addEventListener('click', onSubmit)
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map