/**
 * Ce fichier contient nos composants pour gérer notre liste de tâches.
 * Le but est d'afficher une todo-list fonctionnelle en écrivant
 * <todo-list></todo-list> dans le fichier index.html
 *
 * La todo list a été décomposé entre trois composants :
 * - Le composant "root" todo-list qui assemble les autres composants
 *   et qui maintient les données de notre todos.
 * - Le composant enfant todo-list-form qui affiche le formulaire d'ajout de tâche
 * - Le composant enfant toto-list-items qui affiche la liste des tâches
 *
 * Les composant "enfants" n'agissent pas sur les données de la todo-list,
 * ils émettent uniquement des évènvements qui permet au parent d'agir
 * sur l'ensemble des données; pour respecter le paradigme défendu par VueJS :
 * Un composant ne doit pas modifier l'état d'un autre composant. Les composants
 * parent font "descendre" les données vers les enfants, et les enfants
 * font "remonter" si besoin des évènements vers leurs parent.
 */

/**
 * Composant parent d'affichage de notre todo-list
 */
Vue.component('todo-list', {
  // les données "réactives" de notre composant.
  // Un changement de ces données déclenchera un nouveau rendu
  // pour que le html reflète les changements
  data:function() {
    return {
      newTodo: '',
      tasks:[]
    }
  },
  // les méthodes d'ajout et suppression de taches
  methods: {
    addTask:function(newTask) {
      this.tasks.push({text:newTask, status:0});
    },
    deleteTask:function(itemIndex) {
      this.tasks.splice(itemIndex, 1);
    },
    setTaskStatus:function(itemIndex) {
      this.tasks[itemIndex].status = !this.tasks[itemIndex].status;
    }
  },
  // les "@" sont sont des évènement auxquels notre composant s'incrit
  // par exemple quand todo-list-form émet l'évènement "addTask"; on appelle
  // la méthode addTask() de notre composant
  template:'<div class="todo-list">' +
  '<todo-list-form @addTask="addTask"></todo-list-form>' +
  '<todo-list-tasks :tasks="tasks" @deleteTask="deleteTask" @setTaskStatus="setTaskStatus"></todo-list-tasks>' +
  '</div>'
});

/**
 * Formulaire d'ajout d'une tâche
 * Emet une évènement "addTask"
 */
Vue.component('todo-list-form', {
  data:function() {
    return {
      newTask: ''
    }
  },
  methods: {
    addTask:function() {
      this.$emit('addTask', this.newTask);
      this.newTask = '';
    }
  },
  template:'<form>' +
  '<input placeholder="Entrez une tâche" type="text" v-model="newTask"/>' +
  '<button :disabled="!this.newTask" type="submit" class="button primary" @click.prevent="addTask">' +
  'Ajouter' +
  '</button>'+
  '</form>'
});

/**
 * Liste des taches
 * Emet les évènements "deleteTask" et "setTaskStatus"
 */
Vue.component('todo-list-tasks', {
  // on récupère tous les taches
  props:['tasks'],
  data:function() {
    return {
      newTask: ''
    }
  },
  methods: {
    deleteTask:function(index) {
      this.$emit('deleteTask', index);
    },
    setTaskStatus:function(index) {
      this.$emit('setTaskStatus', index);
    }
  },
  template: '<ul>' +
  '<li v-for="(task, index) in tasks">' +
  '<input type="checkbox" @click="setTaskStatus(index)" :value="index">' +
  '<span :class="{done:tasks[index].status}">{{task.text}}</span>' +
  '<a class="delete" @click.prevent="deleteTask(index)"> - </a>' +
  '</li>' +
  '</ul>'
});

new Vue({
  el: '#todo-list-app'
});

