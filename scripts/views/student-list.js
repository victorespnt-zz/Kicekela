
var StudentListView = Backbone.View.extend({

    el: '#app',

    events: {
        'submit form': 'addStudent',
        // 'change input[type="radio"]': 'studentHere'
    },

    addStudent: function(event) {
        
        event.preventDefault();

        var $form = $(event.currentTarget);
        var studentLastname = $form.find('.student-lastname').val();
        var studentFirstname = $form.find('.student-firstname').val();

        // Avec mes donées, je créé un nouvel etudiant tout beau tout neuf
        // Donc un nouveau model
        var newStudentModel = new StudentModel({
            nom: studentLastname,
            prenom: studentFirstname,
        });

        this.myStudentCollection.add(newStudentModel);
        
        newStudentModel.save();

        this.render();
    },


    initialize: function() {

        // l'instanciant à l'intérieur de la vue
        this.myStudentCollection = new StudentCollection();

        this.myStudentCollection.fetch();

        // On rend la vue une première fois 
        this.render();

    },



    render: function() {
        // On récuppère la cible
        var $renderTarget = this.$('.student-list');

        // On le vide
        $renderTarget.empty();

        // Je récupère tous les etudiants de ma collection avec .toJSON (cf cours)
        var allMyStudents = this.myStudentCollection.toJSON();

        // console.log("allMyStudents", allMyStudents);
        // On récupère un tableau d'objets

        for (var i = 0; i < allMyStudents.length; i++) {
            var student = allMyStudents[i];

            var studentTemplate = this.getTemplate(student);

            $renderTarget.append(studentTemplate);
        }
    },




        getTemplate: function(studentData) {


            var studentTemplate = '\
            <h2>' + studentData.nom + '</h2>\
            <h2>' + studentData.prenom + '</h2>\
        ';

        // On retourne la string 
        // convertie en HTML grâce à jQuery
        return $(studentTemplate);

    },

});