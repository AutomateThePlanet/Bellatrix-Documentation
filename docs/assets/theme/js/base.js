/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  }

  return _typeof(obj);
}

module.exports = _typeof;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./web/themes/bellatrix-parent/resources/admin/css/blocks.scss":
/*!*********************************************************************!*\
  !*** ./web/themes/bellatrix-parent/resources/admin/css/blocks.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./web/themes/bellatrix-parent/resources/css/app.scss":
/*!************************************************************!*\
  !*** ./web/themes/bellatrix-parent/resources/css/app.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./web/themes/bellatrix-parent/resources/js/base.js":
/*!**********************************************************!*\
  !*** ./web/themes/bellatrix-parent/resources/js/base.js ***!
  \**********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);

window.tat = {
  modalHooks: [],
  modalConfirmHook: null,
  modalConfirmData: null,
  modalCloseHook: {},
  lang: {
    ok: 'OK',
    cancel: 'Cancel'
  },
  init: function init() {
    this.listeners();
    this.modalOnListener();
    this.stickyListener();
    this.inViewListener();
  },
  listeners: function listeners() {
    this.modalListener();
    this.toggleListener();
    this.tabsListener();
    this.tooltipListener();
    this.scrollToListener();
    this.confirmListener();
    this.inputListener();
    this.addRowsListener();
    this.delRowsListener();
  },
  modalListener: function modalListener() {
    var modals = document.querySelectorAll('.js-modal');
    Array.from(modals).forEach(function (modal) {
      modal.addEventListener('click', tat.modalShow);
    });
  },
  modalShow: function modalShow(event) {
    event.preventDefault();
    var modalClicked = this;
    var modalID = modalClicked.dataset.modal;
    var modalContent = modalClicked.dataset.modalContent;

    if (modalContent == undefined || modalContent.length < 1) {
      var modalGet = document.getElementById(this.dataset.modalGet);

      if (modalGet) {
        modalContent = modalGet.innerHTML;
      }
    }

    tat.modal(modalID, modalContent, modalClicked);
  },
  modal: function modal(modalID, modalContent, elementClicked) {
    var modal = document.querySelector('.modal');

    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'modal';
      var modalContentDiv = document.createElement('div');
      modalContentDiv.className = 'modal-content';
      modal.append(modalContentDiv);
      document.body.prepend(modal);
    } else {
      var modalContentDiv = document.querySelector('.modal-content');
    }

    modal.id = modalID;

    if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(modalContent) === 'object') {
      modalContentDiv.innerHTML = '';
      modalContentDiv.prepend(modalContent);
    } else {
      modalContentDiv.innerHTML = modalContent;
    }

    document.body.classList.add('modal-open');
    var modalCloseDiv = document.createElement('div');
    modalCloseDiv.classList.add('modal-close', 'js-modal-close');
    modalContentDiv.prepend(modalCloseDiv);
    modal.classList.add('fade-in');
    modal.addEventListener('click', tat.modalCloseEv, {
      'capture': false
    });
    tat.modalCloseListeners();
    tat.modalConfirmListeners();
    tat.confirmListener();
    tat.inputListener();
    tat.modalHooks.forEach(function (modalHook, i) {
      if (modalHook.id == modalID) {
        if (typeof modalHook.hook == 'function') {
          modalHook.hook(i, elementClicked);
        }
      }
    });
  },
  modalConfirmListeners: function modalConfirmListeners() {
    var confirms = document.querySelectorAll('.js-modal-confirm');
    Array.from(confirms).forEach(function (confirm) {
      confirm.addEventListener('click', tat.modalConfirm, {
        'once': true
      });
    });
  },
  modalConfirm: function modalConfirm() {
    if (typeof tat.modalConfirmHook == 'function') {
      tat.modalConfirmHook(tat.modalConfirmData);
    } else {
      tat.modalClose();
    }
  },
  modalCloseListeners: function modalCloseListeners() {
    var closes = document.querySelectorAll('.js-modal-close');
    Array.from(closes).forEach(function (close) {
      close.addEventListener('click', tat.modalCloseEv);
    });
  },
  modalCloseEv: function modalCloseEv(event) {
    if (event.target !== this) {
      return;
    }

    event.stopPropagation();
    event.preventDefault();
    tat.modalClose(this);
  },
  modalClose: function modalClose(el) {
    if (typeof tat.modalCloseHook == 'function') {
      tat.modalCloseHook(el);
    } else {
      var modal = document.querySelector('.modal');
      modal.classList.remove('fade-in');
      modal.classList.add('fade-out');
      setTimeout(function () {
        modal.remove();
      }, 500);
      document.body.classList.remove('modal-open');
      tat.modalConfirmHook = null;
      tat.modalConfirmData = null;
    }

    tat.modalCloseHook = {};
  },
  modalOnListener: function modalOnListener() {
    var modalOn = document.querySelector('.js-modal-on');

    if (modalOn) {
      var delay = parseInt(modalOn.dataset.delay) || 0;
      setTimeout(function () {
        modalOn.click();
      }, delay);
    }
  },
  confirmListener: function confirmListener() {
    var confirms = document.querySelectorAll('.js-confirm');
    Array.from(confirms).forEach(function (confirm) {
      confirm.addEventListener('click', function (e) {
        e.preventDefault();
        var modalID = this.dataset.modal ? this.dataset.modal : 'modal-confirm';
        var text = this.dataset.text;
        tat.modalConfirmData = this.dataset.confirmData;
        var follow = this.dataset.follow;
        tat.confirmPrep(modalID, text, this, follow);
      });
    });
  },
  confirmPrep: function confirmPrep(modalID, text, click, follow) {
    var modalContent = document.createElement('div');
    modalContent.innerHTML = text;
    modalContent.classList = 'modal-confirm-content';
    var modalButtons = document.createElement('div');
    modalButtons.className = 'modal-confirm';
    var modalButtonN = document.createElement('button');
    modalButtonN.classList.add('button', 'cancel', 'js-modal-close');
    modalButtonN.innerHTML = tat.lang.cancel;
    modalButtons.prepend(modalButtonN);
    var modalButtonY = document.createElement('button');
    modalButtonY.classList.add('button', 'confirm', 'js-modal-confirm');
    modalButtonY.innerHTML = tat.lang.ok;
    modalButtons.prepend(modalButtonY);
    modalContent.append(modalButtons);

    if (follow) {
      var href = this.href;
      modalButtonY.addEventListener('click', function () {
        window.location = href;
      });
    }

    tat.modal(modalID, modalContent, click);
  },
  confirm: function confirm(modalID, modalContent, hook, data) {
    tat.modalConfirmHook = hook;
    tat.modalConfirmData = data;
    tat.confirmPrep(modalID, modalContent, null, false);
  },
  toggleListener: function toggleListener() {
    var toggles = document.querySelectorAll('.js-toggle');
    Array.from(toggles).forEach(function (toggle) {
      toggle.addEventListener('click', tat.toggle);
    });
  },
  toggle: function toggle(event) {
    event.preventDefault();
    var toggle = document.getElementById(this.dataset.toggle);

    if (toggle) {
      this.classList.toggle('toggled');
      toggle.classList.toggle('opened');
      var bodyClass = this.dataset.bodyClass;

      if (bodyClass != undefined) {
        document.body.classList.toggle(bodyClass);
      }
    }
  },
  tabsListener: function tabsListener() {
    var tabs = document.querySelectorAll('.js-tab');
    Array.from(tabs).forEach(function (tab) {
      tab.addEventListener('click', tat.tabs);
    });
  },
  tabs: function tabs(event) {
    event.preventDefault();
    var menuTabs = document.querySelectorAll('#' + this.dataset.menu + ' .js-tab.active');
    Array.from(menuTabs).forEach(function (menuTab) {
      menuTab.classList.remove('active');
    });
    this.classList.add('active');
    var wrapTabs = document.querySelectorAll('#' + this.dataset.wrap + ' .tab.active');
    Array.from(wrapTabs).forEach(function (wrapTab) {
      wrapTab.classList.remove('active');
    });
    var tab = document.getElementById(this.dataset.tab);
    tab.classList.add('active');
  },
  tooltipListener: function tooltipListener() {
    var tooltips = document.querySelectorAll('.js-tooltip');
    Array.from(tooltips).forEach(function (tooltip) {
      tooltip.addEventListener('mouseenter', tat.tooltipOn);
      tooltip.addEventListener('mouseleave', tat.tooltipOff);
    });
    var tooltipsFocus = document.querySelectorAll('.js-tooltip-focus');
    Array.from(tooltipsFocus).forEach(function (tooltipFocus) {
      tooltipFocus.addEventListener('focus', tat.tooltipOn);
      tooltipFocus.addEventListener('blur', tat.tooltipOff);
    });
  },
  tooltipOn: function tooltipOn(event) {
    event.preventDefault();
    this.classList.add('tooltipped');
    var tooltip = document.getElementById(this.dataset.tooltip);

    if (tooltip) {
      tooltip.classList.add('opened');
    }
  },
  tooltipOff: function tooltipOff(event) {
    event.preventDefault();
    this.classList.remove('tooltipped');
    var tooltip = document.getElementById(this.dataset.tooltip);

    if (tooltip) {
      tooltip.classList.remove('opened');
    }
  },
  addRowsListener: function addRowsListener() {
    var addRows = document.querySelectorAll('.js-add-row');
    Array.from(addRows).forEach(function (addRow) {
      addRow.addEventListener('click', tat.addRow);
    });
  },
  addRow: function addRow(event) {
    event.preventDefault();
    var table = document.getElementById(this.dataset.table);

    if (table) {
      var max = table.dataset.maxRows;

      if (max && max <= table.childElementCount) {
        return;
      }

      var prototype = this.dataset.prototype;
      var lastRow = table.querySelector('.row:last-child');

      if (!lastRow || lastRow.dataset.key === undefined) {
        var key = 1;
      } else {
        var key = parseInt(lastRow.dataset.key) + 1;
      }

      prototype = prototype.replace(/__key__/gi, key);
      table.insertAdjacentHTML('beforeend', prototype);
      tat.delRowsListener();
      tat.toggleListener();

      var _event = new CustomEvent('rowAdded', {
        detail: key
      });

      table.dispatchEvent(_event);
    }
  },
  delRowsListener: function delRowsListener() {
    var delRows = document.querySelectorAll('.js-del-row');
    Array.from(delRows).forEach(function (delRow) {
      delRow.addEventListener('click', tat.delRow);
    });
  },
  delRow: function delRow(event) {
    event.preventDefault();
    var row = this.closest('.row');
    row.classList.add('fade-out');
    setTimeout(function () {
      row.remove();
    }, 500);
  },
  scrollToListener: function scrollToListener() {
    var scrolls = document.querySelectorAll('.js-scroll');
    Array.from(scrolls).forEach(function (scroll) {
      scroll.addEventListener('click', tat.scrollTo);
    });
  },
  scrollTo: function scrollTo(event) {
    event.preventDefault();
    var offset = this.dataset.offset;

    if (offset == undefined) {
      offset = 60;
    }

    var target = document.getElementById(this.dataset.scrollto);

    if (target) {
      var yCoordinate = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: yCoordinate - offset,
        behavior: 'smooth'
      });
    }
  },
  inputListener: function inputListener() {
    var inputs = document.querySelectorAll('input, select, textarea');
    Array.from(inputs).forEach(function (input) {
      input.addEventListener('focus', function () {
        this.classList.add('has-input');
      }, {
        'once': true
      });
    });
  },
  scrollHeight: 0,
  viewport: null,
  scrollTop: null,
  stickyIsOn: false,
  stopScroll: true,
  sticky: null,
  inviews: [],
  resizeListener: function resizeListener() {
    tat.viewport = window.innerHeight;
    tat.scrollTop = window.scrollY;
    window.addEventListener('resize', tat.resize, true);
  },
  resize: function resize() {
    if (window.innerHeight != tat.viewport) {
      tat.viewport = window.innerHeight;
      tat.scrollTop = window.scrollY;
      tat.inViewListener();
    }
  },
  stickyListener: function stickyListener() {
    var sticky = document.querySelector('.js-sticky');

    if (sticky) {
      tat.resizeListener();

      if (sticky.dataset.scrollheight) {
        this.scrollHeight = sticky.dataset.scrollheight;
      }

      tat.sticky = sticky;
      window.addEventListener('scroll', tat.scroll);
    }
  },
  inViewListener: function inViewListener() {
    tat.inviews = [];
    var inviews = document.querySelectorAll('.js-inview');

    if (inviews) {
      tat.inviews = Array.from(inviews);
      tat.resizeListener();
      tat.scrollListener();
    }
  },
  inview: function inview(el, index) {
    tat.stopScroll = false;
    var scrollElement = tat.scrollPosition(el);
    var scrollMin = scrollElement - tat.viewport;
    var scrollMax = scrollElement + el.offsetHeight;

    if (tat.scrollTop > scrollMin && tat.scrollTop < scrollMax) {
      el.classList.add('in-viewport');
      var event = new CustomEvent('inView');
      el.dispatchEvent(event);

      if (el.dataset.once !== undefined) {
        el.classList.remove('js-inview');
        tat.inviews.splice(index, 1);
      }
    }
  },
  scrollListener: function scrollListener() {
    if (tat.inviews.length > 0) {
      window.addEventListener('scroll', tat.scroll);
    }
  },
  scroll: function scroll() {
    tat.stopScroll = true;
    tat.scrollTop = window.scrollY;
    tat.inviews.forEach(tat.inview);

    if (tat.sticky) {
      tat.stopScroll = false;

      if (!tat.stickyIsOn && tat.scrollTop > tat.scrollHeight) {
        tat.sticky.classList.add('scrolled');
        document.body.classList.add('sticky-fixed');
        tat.stickyIsOn = true;
      } else if (tat.stickyIsOn && tat.scrollTop <= tat.scrollHeight) {
        tat.sticky.classList.remove('scrolled');
        document.body.classList.remove('sticky-fixed');
        tat.stickyIsOn = false;
      }
    }

    if (tat.stopScroll) {
      window.removeEventListener('scroll', tat.scroll);
    }
  },
  scrollPosition: function scrollPosition(el) {
    var yPos = 0;

    while (el) {
      yPos += el.offsetTop;
      el = el.offsetParent;
    }

    return yPos;
  },
  scrollPositionViewport: function scrollPositionViewport(el) {
    var yPos = 0;

    while (el) {
      if (el.tagName == "BODY") {
        var yScroll = el.scrollTop || document.documentElement.scrollTop;
        yPos += el.offsetTop - yScroll + el.clientTop;
      } else {
        yPos += el.offsetTop - el.scrollTop + el.clientTop;
      }

      el = el.offsetParent;
    }

    return yPos;
  }
};
window.tat.init();

var tatCookie = function tatCookie() {
  if (document.body.classList.contains('js-cookie')) {
    var match = document.cookie.match(new RegExp('cookielaw=([^;]+)'));

    if (!match) {
      var cookieDiv = document.createElement('div');
      cookieDiv.id = 'cookielaw';
      var cookieMsgDiv = document.createElement('div');
      cookieMsgDiv.id = 'cookielaw-msg';
      cookieMsgDiv.innerHTML = document.body.dataset.cookieMsg;
      var cookieBtnDiv = document.createElement('div');
      cookieBtnDiv.id = 'cookielaw-btn';
      var cookieAccept = document.createElement('button');
      cookieAccept.id = 'cookiewlaw-accept';
      cookieAccept.innerHTML = document.body.dataset.cookieBtn;
      cookieBtnDiv.prepend(cookieAccept);
      cookieDiv.prepend(cookieBtnDiv);
      cookieDiv.prepend(cookieMsgDiv);
      document.body.prepend(cookieDiv);
      setTimeout(function () {
        cookieDiv.classList.add('fade-in');
      }, 1000);
      cookieAccept.addEventListener('click', function () {
        cookieDiv.classList.add('fade-out');
        setTimeout(function () {
          cookieDiv.remove();
        }, 500);
        var d = new Date();
        d.setTime(d.getTime() + 90 * 24 * 60 * 60 * 1000);
        var expires = "expires=" + d.toUTCString();
        document.cookie = 'cookielaw=Seen; path=/; ' + expires;
      });
    }
  }
};

tatCookie();
window.base = {
  init: function init() {
    this.featureSubMenu();
    this.stopScrollListener();
    this.menuWinScrollListener();
    this.codeListener();
  },
  featureSubMenu: function featureSubMenu() {
    var internal = document.getElementById('internal-menu');

    if (internal) {
      var content = internal.innerHTML;
      var currentMenu = document.querySelector('#menu-pagenav .current-menu-item');
      currentMenu.insertAdjacentHTML('beforeend', content);
      internal.remove();
      tat.scrollToListener();
    }

    base.menuScrollListeners();
  },
  stopScrollListener: function stopScrollListener() {
    var stops = document.querySelectorAll('.js-stopscroll');
    Array.from(stops).forEach(function (stop) {
      stop.addEventListener('mouseenter', base.stopScrollOn);
      stop.addEventListener('mouseleave', base.stopScrollOff);
    });
  },
  stopScrollOn: function stopScrollOn(event) {
    event.preventDefault();
    document.documentElement.classList.add('no-scroll');
  },
  stopScrollOff: function stopScrollOff(event) {
    event.preventDefault();
    document.documentElement.classList.remove('no-scroll');
  },
  menuScrollListeners: function menuScrollListeners() {
    var menu = document.getElementById('page-nav');

    if (menu) {
      var current = document.querySelector('#page-nav .current-menu-item');

      if (current) {
        var scrollDiv = current.offsetTop;

        if (scrollDiv > 40) {
          menu.scrollTop = scrollDiv - 40;
        }
      }

      var anchors = document.querySelectorAll('#page-nav .sub-anchor a');

      if (anchors) {
        Array.from(anchors).forEach(function (anchor) {
          anchor.addEventListener('click', function (e) {
            var el = this;
            setTimeout(function () {
              base.selectAnchor(el);
            }, 100);
          });
        });
      }
    }

    var sections = document.querySelectorAll('.feature-section');

    if (sections) {
      Array.from(sections).forEach(function (section) {
        section.classList.add('js-inview');
        section.addEventListener('inView', function (e) {
          var el = document.querySelector('.sub-anchor [data-scrollto="' + section.id + '"]');

          if (el) {
            base.selectAnchor(el);
          }
        });
      });
      tat.inViewListener();
    }
  },
  selectAnchor: function selectAnchor(element) {
    var active = document.querySelectorAll('#page-nav .sub-anchor.current-menu-item');

    if (active) {
      Array.from(active).forEach(function (el) {
        el.classList.remove('current-menu-item');
      });
    }

    element.parentNode.classList.add('current-menu-item');
  },
  menuWinScrollListener: function menuWinScrollListener() {
    var menu = document.querySelector('.js-moving-nav');

    if (menu) {
      var scrollOn = false;
      var scrollEnd = false;
      var scrollMin = 96;
      var scrollMax = document.body.scrollHeight - window.innerHeight - 467 + (window.innerHeight - (56 + menu.clientHeight));
      setTimeout(function () {
        scrollMax = document.body.scrollHeight - window.innerHeight - 467 + (window.innerHeight - (56 + menu.clientHeight));
      }, 1000);
      window.addEventListener('scroll', function () {
        if (!scrollOn && window.scrollY > scrollMin && window.scrollY < scrollMax) {
          scrollOn = true;
          menu.classList.add('scrolled');
        } else if (scrollOn && window.scrollY <= scrollMin) {
          scrollOn = false;
          menu.classList.remove('scrolled');
        }

        if (!scrollEnd && window.scrollY >= scrollMax) {
          scrollEnd = true;
          menu.classList.add('stop');
        } else if (scrollEnd && window.scrollY < scrollMax) {
          scrollEnd = false;
          menu.classList.remove('stop');
        }
      });
      window.addEventListener('resize', function () {
        scrollMax = document.body.scrollHeight - window.innerHeight - 467 + (window.innerHeight - (56 + menu.clientHeight));
      }, true);
    }
  },
  codeListener: function codeListener() {
    var codes = document.querySelectorAll('pre');

    if (codes) {
      Array.from(codes).forEach(function (code) {
        if (code.offsetHeight > 750) {
          code.classList.add('expand');
          var btn = document.createElement('button');
          btn.classList.add('expand-button');
          btn.textContent = 'Expand';
          code.parentNode.insertBefore(btn, code.nextSibling);
          btn.addEventListener('click', base.expandCode);
        }
      });
    }
  },
  expandCode: function expandCode(e) {
    e.preventDefault();
    var previousNode = this.previousSibling;
    previousNode.classList.remove('expand');
    this.remove();
  }
};
window.base.init();

/***/ }),

/***/ "./web/themes/bellatrix/resources/css/bellatrix.scss":
/*!***********************************************************!*\
  !*** ./web/themes/bellatrix/resources/css/bellatrix.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./web/themes/meissa/resources/css/meissa.scss":
/*!*****************************************************!*\
  !*** ./web/themes/meissa/resources/css/meissa.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./web/themes/bellatrix-parent/resources/js/base.js ./web/themes/bellatrix-parent/resources/css/app.scss ./web/themes/bellatrix-parent/resources/admin/css/blocks.scss ./web/themes/bellatrix/resources/css/bellatrix.scss ./web/themes/meissa/resources/css/meissa.scss ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/Boyo/Mamp/apps/bellatrix/web/themes/bellatrix-parent/resources/js/base.js */"./web/themes/bellatrix-parent/resources/js/base.js");
__webpack_require__(/*! /Users/Boyo/Mamp/apps/bellatrix/web/themes/bellatrix-parent/resources/css/app.scss */"./web/themes/bellatrix-parent/resources/css/app.scss");
__webpack_require__(/*! /Users/Boyo/Mamp/apps/bellatrix/web/themes/bellatrix-parent/resources/admin/css/blocks.scss */"./web/themes/bellatrix-parent/resources/admin/css/blocks.scss");
__webpack_require__(/*! /Users/Boyo/Mamp/apps/bellatrix/web/themes/bellatrix/resources/css/bellatrix.scss */"./web/themes/bellatrix/resources/css/bellatrix.scss");
module.exports = __webpack_require__(/*! /Users/Boyo/Mamp/apps/bellatrix/web/themes/meissa/resources/css/meissa.scss */"./web/themes/meissa/resources/css/meissa.scss");


/***/ })

/******/ });