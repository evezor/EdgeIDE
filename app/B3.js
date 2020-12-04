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
   * Add an entity to the db shape
   *
   * @param {String} txt the label to show
   * @param {Number} [optionalIndex] index where to insert the entity
   */
  addEntity: function(txt, optionalIndex) {
    var label = new draw2d.shape.basic.Label({
      text: txt,
      stroke: 0,
      radius: 0,
      bgColor: new draw2d.util.Color(6, 135, 112),
      padding: {
        left: 10,
        top: 3,
        right: 10,
        bottom: 5
      },
      fontColor: "#FFFFFF",
      resizeable: false,
    });

    //        label.installEditor(new draw2d.ui.LabelEditor());
    var input = label.createPort("input");
    var output = label.createPort("output");

    input.setName("input_" + label.id);
    output.setName("output_" + label.id);

    var _table = this;


    if ($.isNumeric(optionalIndex)) {
      this.add(label, new draw2d.layout.locator.BottomLocator(this.children.last()), optionalIndex + 1);
    } else {
      this.add(label, new draw2d.layout.locator.BottomLocator(this.children.last()));
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
  },


  /**
   * @method
   *  Generate the parameter table
   *
   * @param board
   * @param name
   * @param mouseX
   * @param mouseY
   */
  generateParameterTable: function(board, name, mouseX, mouseY) {
    template = document.getElementsByTagName("template")[0];
    table = template.content.querySelector(".paramTable");
    base = document.importNode(table, true);
    base.setAttribute("id", name);
    document.body.appendChild(base);

    var obj = this;
    $.getJSON("../manifests/b3.json", function(data) {
      params = data.params;
      var i;
      for (i = 0; i < params.length; i++) {
        obj.attachParam(template, base, ".textParam", params[i].name, params[i].label);
      }
      submit = template.content.querySelector(".submitButton");
      item = document.importNode(submit, true);
      base.appendChild(item);
    });



    form = document.getElementById(name);
    form.elements["name"].value = name;
    form.elements["figureID"].value = this.getId();
    form.elements["domID"].value = name;

    $("#" + name).dialog({
      position: [mouseX, mouseY]
    });
  },
  /**
   * @method
   *  Add parameter to the parameter table
   *
   * @param template
   * @param base
   * @param param
   * @param name
   * @param label
   */
  attachParam: function(template, base, param, name, label) {
    param = template.content.querySelector(param);
    item = document.importNode(param, true);
    base.appendChild(item);
    document.getElementById("paramLabel").innerHTML = label;
    document.getElementById("paramLabel").id = name + "Label";
    document.getElementById("paramInput").name = name + "Input";
    document.getElementById("paramInput").id = name + "Input";
    document.getElementById("paramCheckbox").name = name + "Checkbox";
    document.getElementById("paramCheckbox").id = name + "Checkbox";
  },
  /**
   * @method
   *  Show parameters in the IDE
   *
   * @param form
   */
  showParams: function(form,figure) {
    //this.addEntity(form.debounceAInput.value,0);
    $(form).children().filter(".textParam").children().filter("input:checkbox:checked").each(function(index,checkbox){
      var value = $(this).siblings(".paramLabel")[0].innerHTML;
      figure.addEntity(value);
    });
  }
});