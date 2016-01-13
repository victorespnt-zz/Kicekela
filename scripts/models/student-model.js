var StudentModel = Backbone.Model.extend({
	// Dans mon model étudiant, je vais avoir un nom et un prénom
	// Et si il est présent, ou absent
	defaults: {
		lastname: 'Majax',
		firstname: 'Gerard',
		here: false
	}
});