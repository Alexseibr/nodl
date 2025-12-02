import { UserModel } from "../models/User.model";

export async function seedAdmin() {
  const phone = process.env.NODL_ADMIN_PHONE || "+375000000000";

  const existing = await UserModel.findOne({ phone });
  if (existing) return;

  await UserModel.create({
    phone,
    roles: ["admin", "moderator"],
    language: "ru",
    balance: 0,
  });

  console.log("Admin user seeded:", phone);
}

