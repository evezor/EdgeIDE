// declare the namespace for this example
var evezorIDE = {};

/**
 *
 * The **GraphicalEditor** is responsible for layout and dialog handling.
 *
 * @author Andreas Herz
 * @extends draw2d.ui.parts.GraphicalEditor
 */
evezorIDE.Application = Class.extend({
  NAME: "evezorIDE.Application",

  /**
   * @constructor
   *
   * @param {String} canvasId the id of the DOM element to use as paint container
   */
  init: function() {
    this.view = new evezorIDE.View("canvas");
    this.toolbar = new evezorIDE.Toolbar("toolbar", this.view);
  },
  setDefaultRouterClassName: function(defaultRouterClassName) {
    defaultRouterClassName = defaultRouterClassName;
    defaultRouter = eval("new " + defaultRouterClassName + "()");
  }


});