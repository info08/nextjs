import mongoose from "mongoose";
//import { User } from "../dbConfig/dbConfig";

export interface UserModel {
  username: string;
  email: string;
  password: string;
  isVerified?: boolean;
  isAdmin?: boolean;  
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;  
  verifyToken?: string;
  verifyTokenExpires?: Date;
}

const userSchema = new mongoose.Schema<UserModel>({
  username: { type: String, required: [true,"Please provide a username"] ,unique: true },
  email: { type: String, required: [true ,"Please provide a email"], unique: true },
  password: { type: String, required: [true ,"Please provide a password"]},
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false},
  forgotPasswordToken: { type: String, default: "" },
  forgotPasswordTokenExpiry: { type: Date, default: null },
  verifyToken: { type: String, default:'' },
  verifyTokenExpires: { type: Date, default: null }
}, {
  timestamps: true
}); 

const User = mongoose.models.Users || mongoose.model<UserModel>("Users", userSchema);
export default User;
