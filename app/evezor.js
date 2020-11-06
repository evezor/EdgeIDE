function paramHandler(form) {
  figure = app.view.getFigure(form.figureID.value);
  figure.setName(form.name.value);
  figure.addEntity(form.debounceA.name,0);
  $(form).closest(".ui-dialog-content").dialog("close");
}

function downloadToFile(content, filename, contentType) {
  const a = document.createElement('a');
  const file = new Blob([content], {
    type: contentType
  });

  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();

  URL.revokeObjectURL(a.href);
}

function createExportObject(json) {
  rolodex = {}; //Object to store DRAW2d IDs mapped to board names
  output = {
    "version": 1,
    "boards": {}
  };
  //Loop through all of the Draw2d objects, but not the one that contains routes
  for (i = 0; i < json.length; i++) {
    if (json[i].type != "draw2d.Connection") {
      name = json[i].label.text;
      id = json[i].primary.id;
      rolodex[id] = name;
      output.boards[name] = {};
      output.boards[name].model = json[i].primary.type;
      output.boards[name].inputs = [];
      output.boards[name].outputs = [];
      output.boards[name].parameters = [];
    } else {
      source = rolodex[json[i].source.node];
      inData = {
        "type": "FN",
        "priority": "_MD"
      }
      inData.input_function_name = json[i].source.port;
      output.boards[source].inputs.push(inData);

      target = rolodex[json[i].target.node];
      outData = {};
      outData.source = inData;
      outData.source.board = source;
      outData.output_function_name = json[i].target.port;
      output.boards[target].outputs.push(outData);
    }
  }
  return output;
}