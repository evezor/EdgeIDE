var DblClickCanvasPolicy = draw2d.policy.canvas.CanvasPolicy.extend({

  init: function() {
    this._super();
  },

  /**
   * @method
   * Called by the canvas if the user double click on a figure.
   *
   * @param {draw2d.Figure} the figure under the double click event. Can be null
   * @param {Number} mouseX the x coordinate of the mouse during the click event
   * @param {Number} mouseY the y coordinate of the mouse during the click event
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   *
   */
  onDoubleClick: function(figure, mouseX, mouseY, shiftKey, ctrlKey) {
    if (figure !== null) {
      $(function() {

        temp = document.getElementsByTagName("template")[0];
        table = temp.content.querySelector("div");
        a = document.importNode(table, true);
        var board = figure.getRoot();
        if (board == null) { // getRoot returns null if the shape clicked is already the root node.
          board = figure;
        }
        name = board.getChildren().get(0).getText(); //Get the name of the shape from the form

        name = name.replace(/[^a-z0-9\-_:\.]|^[^a-z]+/gi, ""); //
        a.setAttribute("id", name);

        document.body.appendChild(a);

        form = document.getElementById(name).firstElementChild;
        form.elements["name"].value = name;
        form.elements["figureID"].value = board.getId();
        form.elements["domID"].value = name;


        $("#" + name).dialog({
          position: [mouseX, mouseY]
        });
      });
    }
  }
});