var StudentCollection = Backbone.Collection.extend({
	// On lui passe un model de reference
	model: StudentModel
});

// window.StudentCollection = Backbone.Collection.extend({

//   localStorage: new Backbone.LocalStorage("StudentCollection"), // Unique name within your app.

//   // ... everything else is normal.

// });