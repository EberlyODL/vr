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
  schema: {},

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
        this.setActiveItem(e.detail);
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
        this.el.emit("droppable-surface-active-item-added", item, true);
      } else {
        this.activeItem = item;
        this.el.emit("droppable-surface-new-active-item-removed", item, true);
      }
    }
  },

  placeItem: function(location) {
    // if we have an active item
    if (this.activeItem) {
      const boundingBox = this.box3.setFromObject(
        this.activeItem.getObject3D("mesh")
      );
      const dimensions = {
        x: 0,
        y: -(boundingBox.max.y - boundingBox.min.y) / 2,
        z: 0
      };
      const newPosition = this.vec3.copy(location).sub(dimensions);
      this.activeItem.setAttribute("position", newPosition);
    }
  }
});

AFRAME.registerComponent("droppable-item", {
  schema: {},

  /**
   * Initial creation and setting of the mesh.
   */
  init: function() {
    this.el.addEventListener(
      "click",
      function(e) {
        this.el.emit("droppable-item-clicked", this.el, true);
      }.bind(this)
    );
  },

  remove: function() {
    this.el.removeEventListener("click");
  }
});
