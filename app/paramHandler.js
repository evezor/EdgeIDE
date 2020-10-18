function paramHandler(form) {
  var test = form.name.value;
  app.view.getFigure(form.figureID.value).getChildren().get(0).setText(form.name.value);
  $(form).closest(".ui-dialog-content").dialog("close");
}