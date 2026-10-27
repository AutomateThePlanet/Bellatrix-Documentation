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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./web/themes/bellatrix/resources/js/bellatrix.js":
/*!********************************************************!*\
  !*** ./web/themes/bellatrix/resources/js/bellatrix.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var bellatrix = {
  init: function init() {
    this.quantities();
    this.addToCart();
    this.addons();
    this.pricingAnchors();
    this.modals();
    this.downloadHooks();
  },
  modals: function modals() {
    window.tat.modalHooks.push({
      id: 'contact-modal',
      hook: function hook() {
        bellatrix.modalForm();
      }
    }, {
      id: 'suggest-modal',
      hook: function hook() {
        bellatrix.modalForm();
      }
    });
  },
  modalForm: function modalForm() {
    jQuery('.modal div.wpcf7 > form').each(function () {
      var $form = jQuery(this);
      wpcf7.initForm($form);

      if (wpcf7.cached) {
        wpcf7.refill($form);
      }
    });
  },
  quantities: function quantities() {
    jQuery('#pricing-offers .qty, #pricing-offers .addon-qty, #pricing-offers .product-addon').on('change', function (e) {
      var product = jQuery(this).closest('.pricing-product');
      var qty = product.find('.qty option:selected');
      var price_field = product.find('.pricing-price-price');
      price_field.removeClass('fade-in');
      var new_price = qty.data('price');
      var include_addon = product.find('input[name="addon"]').attr('checked');

      if (include_addon) {
        var addon_price = product.find('.addon-qty option:selected').data('price');

        if (addon_price > 0) {
          new_price = new_price + addon_price;
        }
      }

      var new_price = Math.round(new_price / 12);
      price_field.text(new_price).addClass('fade-in');
      setTimeout(function () {
        price_field.removeClass('fade-in');
      }, 1000, price_field);
    });
  },
  addToCart: function addToCart() {
    jQuery('.bellatrix-buy').on('click', function (e) {
      e.preventDefault();
      var product = jQuery(this).closest('.pricing-product');
      var qty = product.find('.qty').val();
      var include_addon = product.find('input[name="addon"]').attr('checked');
      var url = this.href + '&quantity=' + qty;

      if (include_addon) {
        url = url + '&addon=' + product.find('input[name="addon"]').val() + '&addon_qty=' + product.find('select[name="addon_qty"]').val();
      }

      window.location.href = url;
    });
  },
  addons: function addons() {
    jQuery('.product-addon').on('change', function (e) {
      var checked = jQuery(this).attr('checked');

      if (checked) {
        jQuery(this).closest('.pricing-addon').addClass('opened');
      } else {
        jQuery(this).closest('.pricing-addon').removeClass('opened');
      }
    });
  },
  pricingAnchors: function pricingAnchors() {
    var page = document.querySelector('.page-template-pricing');

    if (page) {
      var anchors = document.querySelectorAll('.pricing-descr .js-scroll');
      Array.from(anchors).forEach(function (anchor) {
        anchor.addEventListener('click', bellatrix.scrollAnchor);
      });
    }
  },
  scrollAnchor: function scrollAnchor(e) {
    var id = this.dataset.scrollto;

    if (id) {
      var opened = document.querySelectorAll('.pricing-faq-single-title .toggled');

      if (opened) {
        Array.from(opened).forEach(function (accord) {
          accord.click();
        });
      }

      var parent = document.getElementById(id);
      var el = parent.querySelector('.pricing-faq-single-title a');

      if (el && el.classList.contains('js-toggle') && !el.classList.contains('toggled')) {
        el.click();
      }
    }
  },
  downloadHooks: function downloadHooks(e) {
    var form = document.querySelector('#resource-download .wpcf7');

    if (form) {
      form.addEventListener('wpcf7mailsent', function (event) {
        document.getElementById('resource-download-cta').classList.remove("hidden");
      }, false);
    }
  }
};
bellatrix.init();

/***/ }),

/***/ 1:
/*!**************************************************************!*\
  !*** multi ./web/themes/bellatrix/resources/js/bellatrix.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/Boyo/Mamp/apps/bellatrix/web/themes/bellatrix/resources/js/bellatrix.js */"./web/themes/bellatrix/resources/js/bellatrix.js");


/***/ })

/******/ });