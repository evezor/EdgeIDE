b3 = draw2d.shape.basic.Rectangle.extend({

  NAME: "b3",
  init: function(attr, boardType) {
    this._super($.extend({
      bgColor: "#999999",
    }, attr));

    this.classLabel = new draw2d.shape.basic.Label({
      text: boardType,
      stroke: 1,
      fontColor: "#5856d6",
      bgColor: "#f7f7f7",
      radius: this.getRadius(),
      padding: 10,
      resizeable: false,
    });
    this.add(this.classLabel, new draw2d.layout.locator.CenterLocator());

    /** Init Shape
     *  This section is used to initialize the required IO for a board
     *
     **/
    this.boardType = boardType;
    var userData = {};
    userData.boardType = boardType;
    var obj = this;
    $.getJSON("../manifests/" + boardType + ".json", function(data) {
      inputs = data.inputs;
      outputs = data.outputs;
      io = {};
      var i;
      for (i = 0; i < inputs.length; i++) {
        io[inputs[i].name] = obj.createPort("output");
        if ('label' in inputs[i]) {
          io[inputs[i].name].add(new draw2d.shape.basic.Label({
            text: inputs[i].label,
          }), new draw2d.layout.locator.LeftLocator());
        } else {
          io[inputs[i].name].add(new draw2d.shape.basic.Label({
            text: inputs[i].name,
          }), new draw2d.layout.locator.LeftLocator());
        }
        io[inputs[i].name].repaint(); // Fix some other drawing glitches
        io[inputs[i].name].setName(inputs[i].name);
      }
      for (i = 0; i < outputs.length; i++) {
        io[outputs[i].name] = obj.createPort("input");
        if ('label' in outputs[i]) {
          io[outputs[i].name].add(new draw2d.shape.basic.Label({
            text: outputs[i].label,
          }), new draw2d.layout.locator.RightLocator());
        } else {
          io[outputs[i].name].add(new draw2d.shape.basic.Label({
            text: outputs[i].name,
          }), new draw2d.layout.locator.RightLocator());
        }
        io[outputs[i].name].repaint(); // Fix some other drawing glitches
        io[outputs[i].name].setName(outputs[i].name);
      }
      obj.repaint(); //Fix some drawing glitches
    });

    /** Init ParameterTable
     *  This section is used to initialize the parametertable
     **/

    this.paramTable = new draw2d.shape.layout.VerticalLayout({
      stroke: 1,
      radius: 4,
    });
    this.add(this.paramTable, new draw2d.layout.locator.BottomLocator());
    this.setUserData(userData);
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
        top: 5,
        right: 10,
        bottom: 5
      },
      fontColor: "#FFFFFF",
      resizeable: true,
    });
    var setVal = label.createPort("input");
    var trigger = label.createPort("input");
    var output = label.createPort("output");

    setVal.setName("setVal_" + label.id);
    trigger.setName("trigger_" + label.id);
    output.setName("output_" + label.id);

    var _table = this;


    if ($.isNumeric(optionalIndex)) {
      this.paramTable.add(label, new draw2d.layout.locator.BottomLocator(), optionalIndex);
    } else {
      this.paramTable.add(label, new draw2d.layout.locator.BottomLocator());
      alert("PING");
    }
    label.setMinWidth(1000);
    return label;
  },

  /**
   * @method
   * Remove the entity with the given index from the DB table shape.<br>
   * This method removes the entity without care of existing connections. Use
   * a draw2d.command.CommandDelete command if you want to delete the connections to this entity too
   *
   * @param {object} parameter the entity to remove
   */
  removeEntity: function(parameter) {
    this.paramTable.remove(parameter);
  },

  /**
   * @method
   * Returns the entity figure with the given index
   *
   * @param {Number} index the index of the entity to return
   */
  getEntity: function(index) {
    return this.paramTable.children.get(index).figure;
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

    //Attempt to get the element using document.getElementById
    var element = document.getElementById(name);

    //If it isn't "undefined" and it isn't "null", then it exists.
    if (typeof(element) != 'undefined' && element != null) {
      //do nothing
    } else {
      template = document.getElementsByTagName("template")[0];
      table = template.content.querySelector(".paramTable");
      base = document.importNode(table, true);
      base.setAttribute("id", name);
      document.body.appendChild(base);

      var obj = this;
      $.getJSON("../manifests/" + this.boardType + ".json", function(data) {
        params = data.parameters;
        var i;
        for (i = 0; i < params.length; i++) {
          if ('label' in params[i]) {
            obj.attachParam(template, base, ".textParam", params[i].name, params[i].label, i);
          } else {
            obj.attachParam(template, base, ".textParam", params[i].name, params[i].name, i);
          }
        }
        submit = template.content.querySelector(".submitButton");
        item = document.importNode(submit, true);
        base.appendChild(item);
      });
    }

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
   * @param index
   */
  attachParam: function(template, base, param, name, label, index) {
    param = template.content.querySelector(param);
    item = document.importNode(param, true);
    base.appendChild(item);
    document.getElementById("paramLabel").innerHTML = label;
    document.getElementById("paramLabel").id = name + "Label";
    document.getElementById("paramInput").name = name + "Input";
    document.getElementById("paramInput").id = name + "Input";
    document.getElementById("paramCheckbox").name = name + "Checkbox";
    document.getElementById("paramCheckbox").id = name + "Checkbox";
    document.getElementById("paramIndex").value = index;
    document.getElementById("paramIndex").id = name + "Index";
  },
  /**
   * @method
   *  Show parameters in the IDE
   *
   * @param form
   */
  showParams: function(form, figure) {
    //this.addEntity(form.debounceAInput.value,0);
    $(form).children().filter(".textParam").children().filter("input:checkbox").each(function(index, checkbox) {
      var value = $(this).siblings(".paramLabel")[0].innerHTML;
      var paramIndex = parseInt($(this).siblings(".paramIndex")[0].value);
      paramTable = figure.getChildren().find(function(object) {
        return object.cssClass == "draw2d_shape_layout_VerticalLayout";
      });
      parameter = paramTable.getChildren().find(function(figure) {
        return figure.text === value;
      });
      if (checkbox.checked) {
        if (parameter == null) {
          figure.addEntity(value, paramIndex);
        }
      } else {
        if (parameter != null) {
          figure.removeEntity(parameter);
        }
      }

    });
  }
});