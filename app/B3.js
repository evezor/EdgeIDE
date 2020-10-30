B3 = draw2d.shape.basic.Rectangle.extend({

  NAME: "B3",
  init: function(attr) {
    this._super($.extend({
      bgColor: "#999999"
    }, attr));

    this.classLabel = new draw2d.shape.basic.Label({
      text: "NewB3",
      stroke: 1,
      fontColor: "#5856d6",
      bgColor: "#f7f7f7",
      radius: this.getRadius(),
      padding: 10,
      resizeable: false,
    });
    this.add(this.classLabel, new draw2d.layout.locator.CenterLocator());

    /** Init IO
     *  This section is used to initialize the required IO for a board
     *
     **/
    var led0 = this.createPort("input");
    led0.add(new draw2d.shape.basic.Label({
      text: "LED 0",
    }), new draw2d.layout.locator.RightLocator());
    led0.setName("led0");

    var led1 = this.createPort("input");
    led1.add(new draw2d.shape.basic.Label({
      text: "LED 1",
    }), new draw2d.layout.locator.RightLocator());
    led1.setName("led1");

    var button0 = this.createPort("output");
    button0.add(new draw2d.shape.basic.Label({
      text: "Button 0",
    }), new draw2d.layout.locator.LeftLocator());
    button0.setName("button0");

    var button1 = this.createPort("output");
    button1.add(new draw2d.shape.basic.Label({
      text: "Button 1",
    }), new draw2d.layout.locator.LeftLocator());
    button1.setName("button1");

    var pot0 = this.createPort("output");
    pot0.add(new draw2d.shape.basic.Label({
      text: "Pot 0",
    }), new draw2d.layout.locator.LeftLocator());
    pot0.setName("pot0");
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
  },

  /**
   * @method
   *  returns all attributes for JSON serialization
   *
   * @param none
   */
  getPersistentAttributes: function() {
    var memento = {
      label: this.classLabel.getPersistentAttributes(),
      primary: this._super()
    }
    return memento;
  },

  /**
   * @method
   *  read all attributes for JSON serialization
   *
   * @param memento
   */
  setPersistentAttributes: function(memento) {
    this.classLabel.setPersistentAttributes(memento.label);
    this._super(memento.primary);
  }



});