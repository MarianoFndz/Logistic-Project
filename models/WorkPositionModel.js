// const employees = {
//   data: [
//     {
//       id: 1,
//       firstName: "Roberto",
//       lastName: "Gomez",
//       rol: "cashier",
//     },
//     {
//       id: 2,
//       firstName: "Mariano",
//       lastName: "Fernández",
//       rol: "security",
//     },
//   ],

//   create: function ({ ...data }) {
//     this.data.push({
//       id: this.data.length + 1,
//       ...data,
//     });
//   },

//   update: function ({ id, ...data }) {
//     let employee = this.data.findIndex((element) => element.id === Number(id));
//     this.data[employee] = {
//       id,
//       ...data,
//     };
//   },
// };

// module.exports = employees;

const { Schema, model } = require('mongoose')

const WorkPositionSchema = Schema({
  description: {
    type: String,
    required: true
  },
  permissions: {
    type: Map,
    of: Boolean,
    required: true
  },
  tsCreate: {
    type: Date,
    default: Date.now
  },
  enable: {
    type: Boolean,
    default: false
  }
})

module.exports = model('workPosition', WorkPositionSchema)
