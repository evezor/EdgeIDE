B3 = draw2d.shape.basic.Rectangle.extend({

  NAME: "B3",
  init: function(attr) {
    this._super($.extend({
      bgColor: "#999999",
      width: 200,
      height: 100,
      resizeable: false
    }, attr));

    this.classLabel = new draw2d.shape.basic.Label({
      text: "NewB3",
      stroke: 1,
      fontColor: "#5856d6",
      bgColor: "#f7f7f7",
      radius: this.getRadius(),
      padding: 10,
      resizeable: false
    });
    this.add(this.classLabel, new draw2d.layout.locator.CenterLocator());
    this.initParameterTable();
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
   * Initialize parameter table
   *
   * @param none
   */

  initParameterTable: function() {
    temp = document.getElementsByTagName("template")[0];
    table = temp.content.querySelector("form");
    a = document.importNode(table, true);

    name = this.classLabel.getText(); //Get the name of the shape from the form
    name = name.replace(/[^a-z0-9\-_:\.]|^[^a-z]+/gi, ""); //
    a.setAttribute("id", name);
    document.body.appendChild(a);
    boardID = this.getId();
    $("#" + name).jsonForm({
      schema: {
        name: {
          type: 'string',
          title: 'name',
          required: 'true'
        },
        pot0: {
          type: 'string',
          title: 'Potentiometer 0 Value'
        },
        pot0Display: {
          type: 'checkbox',
          title: "Show on Canvas - Potentiometer 0"
        },
        figureID: {
          type: 'hidden',
          title: 'figureID',
        },
        domID: {
          type: 'hidden',
          title: 'domID'
        }
      },
      form: [
        "*",
        {
          type: "submit",
          title: "Save"
        }
      ],
      value: {
        name: name,
        figureID: boardID,
        domID: "#" + name,
        pot0: "1234"
      },
      onSubmit: function(errors, values) {
        //alert("test");
        figure = app.view.getFigure(values.figureID);
        figure.setName(values.name);
        if (values.pot0Display == true) {
          figure.addEntity("Potentiometer 0 Value",values.pot0, 0);
        }
        $(values.domID).closest(".ui-dialog-content").dialog("close");
        $(values.domID).attr("id", values.name.replace(/[^a-z0-9\-_:\.]|^[^a-z]+/gi, ""));
        $('input[name="domID"]').val("#" + values.name.replace(/[^a-z0-9\-_:\.]|^[^a-z]+/gi, ""));
      }
    });

  },


  /**
   * @method
   * Add an entity to the db shape
   *
   * @param {String} txt the label to show
   * @param {Number} [optionalIndex] index where to insert the entity
   */
  addEntity: function(txt,value,optionalIndex) {
    var label = new draw2d.shape.basic.Label({
      text: txt,
      stroke: 0,
      radius: 0,
      height: 50,
      bgColor: new draw2d.util.Color(6, 135, 112),
      padding: {
        left: 20,
        top: 3,
        right: 20,
        bottom: 5
      },
      fontColor: "#FFFFFF",
      resizeable: true,
    });
    classLabel = new draw2d.shape.basic.Label({
      text: value,
      stroke: 1,
      radius: label.getRadius(),
      padding: 5,
      resizeable: false
    });
    label.add(classLabel, new draw2d.layout.locator.CenterLocator());

    //        label.installEditor(new draw2d.ui.LabelEditor());
    var trigger = label.createPort("input");
    var setValue = label.createPort("input");
    var output = label.createPort("output");

    trigger.setName("trigger");
    setValue.setName("setValue");
    output.setName("output");

    var _table = this;

    if ($.isNumeric(optionalIndex)) {
      this.add(label, new draw2d.layout.locator.BottomLocator(), optionalIndex + 1);
    } else {
      this.add(label, new draw2d.layout.locator.BottomLocator());
    }

    return label;
  },

  /**
   * @method
   * Remove the entity with the given index from the DB table shape.<br>
   * This method removes the entity without care of existing connections. Use
   * a draw2d.command.CommandDelete command if you want to delete the connections to this entity too
   *
   * @param {Number} index the index of the entity to remove
   */
  removeEntity: function(index) {
    this.remove(this.children.get(index + 1).figure);
  },

  /**
   * @method
   * Returns the entity figure with the given index
   *
   * @param {Number} index the index of the entity to return
   */
  getEntity: function(index) {
    return this.children.get(index + 1).figure;
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