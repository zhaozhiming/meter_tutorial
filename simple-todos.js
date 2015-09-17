Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
    "submit .new-task": function (event) {
      event.preventDefault();
      var text = event.target.taskText.value;

      Tasks.insert({
        text: text,
        createdAt: new Date()
      });

      event.target.taskText.value = "";
    },
  });

  Template.task.events({
    "click .toggle-checked": function () {
      Tasks.update(this._id, {
        $set: { checked: ! this.checked}
      });
    },
    "click .delete": function () {
      Tasks.remove(this._id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
