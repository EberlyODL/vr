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
      AFRAME.registerComponent("raycaster-follower", {
        schema: {
          /**
           * Comma separated list of query selectors
           */
          targets: { type: "string", default: "" },
          offset: { type: "vec3", default: { x: 0, y: 0, z: 0 } }
        },

        /**
         * Initial creation and setting of the mesh.
         */
        init: function() {
          // default is that it's not visible
          this.el.setAttribute("visible", false);
          // for calculating positions
          const directionVec3 = new THREE.Vector3();

          this.el.sceneEl.addEventListener("raycaster-intersected", e => {
            // get the list of targets
            const targets = this.data.targets.split(",").map(i => i.trim());
            const isValid = targets.find(i => e.target.matches(i));
            if (typeof isValid !== "undefined" && isValid) {
              // set it to visible
              this.el.setAttribute("visible", true);
              // get the coordinates of the selected element and position set it there.
              const targetPosition = e.target.object3D.position;
              const newPosition = directionVec3
                .copy(targetPosition)
                .sub(this.data.offset);
              this.el.setAttribute("position", newPosition);
            }
          });

          this.el.sceneEl.addEventListener(
            "raycaster-intersected-cleared",
            e => {
              this.el.setAttribute("visible", false);
            }
          );
        },

        remove: function() {
          this.el.sceneEl.removeEventListener("raycaster-intersected");
        }
      });

      /***/
    }
    /******/
  ]
);
