import User from "../../../models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectToDB } from "@/database";

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const userData = body;

    const duplicate = await User.findOne({ email: userData.email }).lean().exec();

    if (duplicate) {
      return NextResponse.json({ message: "Duplicate Email" }, { status: 409 });
    }

    const hashPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashPassword;

    await User.create(userData);
    return NextResponse.json({ message: "User Created." }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
  }
}
