AFRAME.registerComponent("tour", {
    schema: {
      state: { type: "string", default: "places-list" },
      selectedPlace: { type: "string", default: "#card1" }
    },
    init: function() {
      this.placesContainer = this.el;
      this.createPlace();
    },
    tick: function() {
      const { state } = this.el.getAttribute("tour");
  
      if (state === "view") {
        this.hideEl([this.placesContainer]);
        this.showView();
      }
    },
    hideEl: function(elList) {
      elList.map(el => {
        el.setAttribute("visible", false);
      });
    },
    createPlace: function() {
      const details = {
        garden: {
          position: { x: 20, y: -4.5, z: -5.5 },
          rotation: { x: 0, y: -90, z: 0 },
          src: "./assets/thumbnails/fountain.jpg",
          title: "Garden",
          id: "garden"
        },
        main_gate: {
          position: { x: 4.6, y: -5, z: 15 },
          rotation: { x: 180, y: 0, z: 0 },
          src: "./assets/thumbnails/street.jpg",
          title: "Main Gate",
          id: "mainGate"
        },
        home: {
          position: { x: -9, y: 34, z: -70 },
          rotation: { x: 0, y: 0, z: 0 },
          src: "./assets/thumbnails/House.jpeg",
          title: "Home",
          id: "home"
        }
      };
  
      for (var key in details) {
        const item = details[key];
        // Thumbnail Element
        const thumbNail = this.createThumbNail(item);
        // Title
        const title = this.createTitleEl(item);
        thumbNail.appendChild(title);
        this.placesContainer.appendChild(thumbNail);
      }
    },
    createThumbNail: function(item) {
      const entityEl = document.createElement("a-entity");
      const id = `place-${item.id}`;
      entityEl.setAttribute("visible", true);
      entityEl.setAttribute("id", id);
      entityEl.setAttribute("geometry", {
        primitive: "circle",
        radius: 3
      });
      entityEl.setAttribute("position", item.position);
      entityEl.setAttribute("rotation", item.rotation);
      entityEl.setAttribute("material", { src: item.src, opacity: 0.6 });
      entityEl.setAttribute("cursor-listener", {});
      return entityEl;
    },
    createTitleEl: function(item) {
      const entityEl = document.createElement("a-entity");
      const id = `title-${item.id}`;
      entityEl.setAttribute("text", {
        font: "exo2bold",
        align: "center",
        width: 50,
        color: "#e91e63",
        value: item.title
      });
      const position = { x: 0, y: -4, z: 0 };
      entityEl.setAttribute("position", position);
  
      if (item.title === "Main Gate") {
        entityEl.setAttribute("rotation", { x: 180, y: 180, z: 0 });
        entityEl.setAttribute("position", { x: 0, y: 4, z: 0 });
      }
      entityEl.setAttribute("visible", true);
      return entityEl;
    },
    showView: function() {
      const { selectedPlace } = this.data;
      const skyEl = document.querySelector("#main-container");
      skyEl.setAttribute("material", {
        src: `./assets/${selectedPlace}.jpg`,
        color: "#fff"
      });
    }
  });
  