import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    themeColor: {
      type: String,
      default: "blue",
    },
    themeMode: {
      type: String,
      enum: ["Light", "Dark"],
      default: "Light",
    },
    notifications: [
      {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      }
    ],
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
    websites: [
      {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
    ],
    apis: [
      {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
    ],
    databases: [
      {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
    ],
    lineChartData: [
      {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
    ],
    pieChartData: [
      {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
    ],

  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
