const {
  graphql,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
} = require("graphql");

const Schedule = require("../schema/HAPP");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} = require("graphql");

const ScheduleType = new GraphQLObjectType({
  name: "Schedule",
  fields: {
    id: { type: GraphQLID },
    when: { type: GraphQLString },
    patientName: { type: GraphQLString },
    age: { type: GraphQLInt },
    gender: { type: GraphQLString },
    contactNumber: { type: GraphQLString },
    doctorName: { type: GraphQLString },
  },
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    schedules: {
      type: new GraphQLList(ScheduleType),
      resolve: (root, args) => {
        return Schedule.find();
      },
    },
    schedule: {
      type: ScheduleType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Schedule.findById(args.id);
      },
    },
  },
});

//-------------------------Mutation-----------
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addSchedule: {
      type: ScheduleType,
      args: {
        when: { type: GraphQLNonNull(GraphQLString) },
        patientName: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt },
        gender: { type: GraphQLString },
        contactNumber: { type: GraphQLNonNull(GraphQLString) },
        doctorName: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const schedule = new Schedule({
          when: args.when,
          patientName: args.patientName,
          age: args.age,
          gender: args.gender,
          contactNumber: args.contactNumber,
          doctorName: args.doctorName,
        });
        return schedule.save();
      },
    },
    // updateDocument: {
    //   type: TodoType,
    //   args: {
    //     id: { type: GraphQLID },
    //     title: { type: GraphQLNonNull(GraphQLString) },
    //     completed: { type: GraphQLNonNull(GraphQLBoolean) },
    //   },
    //   async resolve(parent, args) {
    //     const todo = await Todo.findById(args.id);
    //     await todo.updateOne({ title: args.title, completed: true });
    //     todo.save();
    //     return todo;
    //     // Todo.findByIdAndUpdate(args.id),
    //     // {
    //     //   $set: { title: args.title, completed: args.completed },
    //     // }
    //   },
    // },
    // deleteTodo: {
    //   type: TodoType,
    //   args: {
    //     id: { type: GraphQLID },
    //   },
    //   async resolve(parent, args) {
    //     const todo = await Todo.findById(args.id);
    //     await todo.deleteOne(todo);
    //   },
    // },
    // toggleTodo: {
    //   type: TodoType,
    //   args: {
    //     id: { type: GraphQLNonNull(GraphQLID) },
    //   },
    //   async resolve(parent, args) {
    //     const todo = await Todo.findById(args.id);

    //     return (
    //       Todo.findByIdAndUpdate(args.id),
    //       {
    //         $set: { completed: !completed },
    //       }
    //     );
    //   },
    // },
  },
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation,
});
