window.StudentCollection = Backbone.Collection.extend({

  localStorage: new Backbone.LocalStorage("StudentCollection"), // Unique name within your app.
  model: StudentModel

  // ... everything else is normal.

});