Joypad = draw2d.shape.basic.Rectangle.extend({

  NAME: "Joypad",
  init: function(attr) {
    this._super($.extend({
      bgColor: "#999999",
      width: 200,
      height: 100,
      resizeable: false
    }, attr));

    this.classLabel = new draw2d.shape.basic.Label({
      text: "New Joypad",
      stroke: 1,
      fontColor: "#5856d6",
      bgColor: "#f7f7f7",
      radius: this.getRadius(),
      padding: 10,
      resizeable: true,
      editor: new draw2d.ui.LabelInplaceEditor()
    });
    this.add(this.classLabel, new draw2d.layout.locator.CenterLocator());

    /** Init IO
     *  This section is used to initialize the required IO for a board
     *
     **/
    var redButLed = this.createPort("input");
    var grnButLed = this.createPort("input");
    var bluButLed = this.createPort("input");
    var yelButLed = this.createPort("input");
    var hbtLed = this.createPort("input");
    var neo1 = this.createPort("input");
    var neo2 = this.createPort("input");
    var neo3 = this.createPort("input");
    var neo4 = this.createPort("input");
    var neo5 = this.createPort("input");
    var joySW = this.createPort("output");
    var fiveWayUp = this.createPort("output");
    var fiveWayDown = this.createPort("output");
    var fiveWayPush = this.createPort("output");
    var fiveWayLeft = this.createPort("output");
    var fiveWayRight = this.createPort("output");
    var start = this.createPort("output");
    var select = this.createPort("output");
    var redBut = this.createPort("output");
    var grnBut = this.createPort("output");
    var bluBut = this.createPort("output");
    var yelBut = this.createPort("output");

    var joyX = this.createPort("output");
    var joyY = this.createPort("output");
  },



  /**
   * @method
   * Set the name of the DB table. Visually it is the header of the shape
   *
   * @param name
   */
  setName: function(name) {
    this.classLabel.setText(name);

    return this;
  }



});