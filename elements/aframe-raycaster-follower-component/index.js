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

    this.el.sceneEl.addEventListener("raycaster-intersected-cleared", e => {
      this.el.setAttribute("visible", false);
    });
  },

  remove: function() {
    this.el.sceneEl.removeEventListener("raycaster-intersected");
  }
});
