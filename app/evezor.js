function paramHandler(form) {
  var test = form.name.value;
  app.view.getFigure(form.figureID.value).setName(form.name.value);
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