B3 = draw2d.shape.basic.Rectangle.extend({

  NAME: "B3",
  init: function(attr) {
    this._super($.extend({
      bgColor: "#999999"
    }, attr));

    this.classLabel = new draw2d.shape.basic.Label({
      text: "New B3",
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
		var led0 = this.createPort("input");
		led0.add(new draw2d.shape.basic.Label({text: "LED 0",}),new draw2d.layout.locator.RightLocator());
		var led1 = this.createPort("input");
		led1.add(new draw2d.shape.basic.Label({text: "LED 1",}),new draw2d.layout.locator.RightLocator());
		var button0 = this.createPort("output");
		button0.add(new draw2d.shape.basic.Label({text: "Button 0",}),new draw2d.layout.locator.LeftLocator());
		var button1 = this.createPort("output");
		button1.add(new draw2d.shape.basic.Label({text: "Button 1",}),new draw2d.layout.locator.LeftLocator());

		var pot0 = this.createPort("output");
		pot0.add(new draw2d.shape.basic.Label({text: "Pot 0",}),new draw2d.layout.locator.LeftLocator());

  } ,



   /**
    * @method
    * Set the name of the DB table. Visually it is the header of the shape
    *
    * @param name
    */
   setName: function(name)
   {
       this.classLabel.setText(name);

       return this;
   }



});