/******/ (function(modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {}; // The require function

  /******/ /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId])
      /******/ return installedModules[moduleId].exports; // Create a new module (and put it into the cache)

    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ exports: {},
      /******/ id: moduleId,
      /******/ loaded: false
      /******/
    }); // Execute the module function

    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    ); // Flag the module as loaded

    /******/ /******/ module.loaded = true; // Return the exports of the module

    /******/ /******/ return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)

  /******/ /******/ __webpack_require__.m = modules; // expose the module cache

  /******/ /******/ __webpack_require__.c = installedModules; // __webpack_public_path__

  /******/ /******/ __webpack_require__.p = ""; // Load entry module and return exports

  /******/ /******/ return __webpack_require__(0);
  /******/
})(
  /************************************************************************/
  /******/ [
    /* 0 */
    /***/ function(module, exports) {
      if (typeof AFRAME === "undefined") {
        throw new Error(
          "Component attempted to register before AFRAME was available."
        );
      }

      /**
       * Alongpath component for A-Frame.
       * Move Entities along a predefined Curve
       */
      AFRAME.registerComponent("droppable-surface", {
        schema: {
          /**
           * Keep item active after it has been placed
           */
          keepActive: { type: "boolean", default: false }
        },

        /**
         * Initial creation and setting of the mesh.
         */
        init: function() {
          this.activeItem = null;
          this.vec3 = new THREE.Vector3();
          this.box3 = new THREE.Box3();

          this.el.addEventListener(
            "click",
            function(e) {
              this.placeItem(e.detail.intersection.point);
            }.bind(this)
          );

          this.el.sceneEl.addEventListener(
            "droppable-item-clicked",
            function(e) {
              this.setActiveItem(e.target);
            }.bind(this)
          );
        },

        remove: function() {
          this.el.removeEventListener("click");
          this.el.sceneEl.removeEventListener("droppable-item-clicked");
        },

        setActiveItem: function(item) {
          if (item) {
            if (item.isSameNode(this.activeItem)) {
              this.activeItem = null;
              this.el.emit(
                "droppable-surface-new-active-item-removed",
                item,
                true
              );
            } else {
              this.activeItem = item;
              this.el.emit("droppable-surface-active-item-added", item, true);
            }
          }
        },

        placeItem: function(location) {
          // if we have an active item
          if (this.activeItem) {
            this.activeItem.setAttribute("position", location);
            // unless specified, we should deactivate this item.
            if (!this.data.keepActive) {
              this.setActiveItem(this.activeItem);
            }
          }
        }
      });

      AFRAME.registerComponent("droppable-item", {
        schema: {
          offset: { type: "vec3", default: { x: 0, y: 0, z: 0 } }
        },

        /**
         * Initial creation and setting of the mesh.
         */
        init: function() {
          this.el.addEventListener(
            "click",
            function(e) {
              this.el.emit("droppable-item-clicked", this.data, true);
            }.bind(this)
          );
        },

        remove: function() {
          this.el.removeEventListener("click");
        }
      });

      /***/
    }
    /******/
  ]
);
