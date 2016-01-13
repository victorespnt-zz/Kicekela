
var StudentListView = Backbone.View.extend({

    el: '#app',

    events: {
        'submit form': 'addStudent',
        'change input[type="radio"]': 'hereStudent'
    },

    hereStudent: function(event) {
                var $input = $(event.currentTarget);
                var inputValue = $input.val();

                var studentLastname = $input.parents('li').attr('data-title');

                // Je regarde dans ma collection si j'ai un model
                // Qui porte le nom de celui sur lequel on a cliqué
                // Si oui, on stocke dans TargetModel
                var targetModel = this.myStudentCollection.findWhere({
                    firstname: studentLastname
                });

                if (targetModel) {
                    if (inputValue === 'here') {
                        targetModel.set({
                            here: true
                        });

                    } else {
                        targetModel.set({
                            here: false
                        });

                    }

                     targetModel.save();
                }


                // this.updateCounter();
            },

    addStudent: function(event) {

        event.preventDefault();

        var $form = $(event.currentTarget);
        var studentLastname = $form.find('.student-lastname').val();
        var studentFirstname = $form.find('.student-firstname').val();

        // Avec mes donées, je créé un nouvel etudiant tout beau tout neuf
        // Donc un nouveau model
        var newStudentModel = new StudentModel({
            lastname: studentLastname,
            firstname: studentFirstname,
        });

        this.myStudentCollection.add(newStudentModel);

        newStudentModel.save();

        this.render();
    },


    initialize: function() {

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


                    var isHereChecked = '';
                    var isNotHereChecked = 'checked';


                    if (studentData.here) {
                        isHereChecked = 'checked';
                        isNotHereChecked = '';
                    }


        var studentTemplate = '\
            <li data-title="' + studentData.lastname + '">\
            <h2>' + studentData.lastname  + ' ' +  studentData.firstname + '</h2>\
            <form>\
             <label>Présent</label>\
          <input ' + isHereChecked + ' type="radio" class+"student-here" name="student" value="here" />\
            <label>Absent</label>\
            <input ' + isNotHereChecked + ' type="radio" class+"student-nothere" name="student" value="not_here" />\
            </form>\
            </li>\
        ';

        // On retourne la string 
        // convertie en HTML grâce à jQuery
        return $(studentTemplate);

    },

});