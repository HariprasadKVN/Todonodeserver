const {
  graphql,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
} = require("graphql");
//const { todos } = require("./sampleData");
const Todo = require("./Todo");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} = require("graphql");

const TodoType = new GraphQLObjectType({
  name: "Todo",
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
  },
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    todos: {
      type: new GraphQLList(TodoType),
      resolve: (root, args) => {
        return Todo.find();
      },
    },
    todo: {
      type: TodoType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Todo.findById(args.id);
      },
    },
  },
});

//-------------------------Mutation-----------
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTodo: {
      type: TodoType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        completed: { type: GraphQLNonNull(GraphQLBoolean) },
      },
      resolve(parent, args) {
        const todo = new Todo({
          title: args.title,
          completed: false,
        });
        return todo.save();
      },
    },
    updateDocument: {
      type: TodoType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLNonNull(GraphQLString) },
        completed: { type: GraphQLNonNull(GraphQLBoolean) },
      },
      async resolve(parent, args) {
        const todo = await Todo.findById(args.id);
        await todo.updateOne({ title: args.title, completed: true });
        todo.save();
        return todo;
        // Todo.findByIdAndUpdate(args.id),
        // {
        //   $set: { title: args.title, completed: args.completed },
        // }
      },
    },
    deleteTodo: {
      type: TodoType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const todo = await Todo.findById(args.id); 
        await todo.deleteOne(todo);        
      },
    },
    toggleTodo: {
      type: TodoType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const todo = await Todo.findById(args.id);

        return (
          Todo.findByIdAndUpdate(args.id),
          {
            $set: { completed: !completed },
          }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation,
});
