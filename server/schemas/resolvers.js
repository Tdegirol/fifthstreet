const { User, productSchema } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
require("dotenv").config();

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const username = context.user.username;
        const userData = await User.findOne({ username }).select(
          "-__v -password"
        );

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    getUser: async (parent, args) => {
      const users = await User.find({}).select("-__v -password");
      return users;
    },
    getSingleUser: async (parent, { username }) => {
      const userData = await User.findOne({ username }).select(
        "-__v -password"
      );
      return userData;
    },
    },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    saveProduct: async (parent, args, context) => {
      if (context.user) {
        console.log(args);
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              cartProducts: args,
            },
          },
          { new: true, runValidators: true }
        );

        return user;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeProduct: async (parent, { id, quantity }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              cartProducts: {
                id: id,
                quantity: quantity,
              },
            },
          },
          { new: true, runValidators: true }
        );
        return user;
      }
    },
  },
};

module.exports = resolvers;