"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

function optionalText(value: FormDataEntryValue | null) {
  const text = typeof value === "string" ? value.trim() : "";
  return text.length > 0 ? text : null;
}

export async function completeOnboarding(formData: FormData) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/register");
  }

  const isEditing = formData.get("mode") === "edit";
  const invalidRedirect = isEditing
    ? "/onboarding?edit=1&error=invalid-profile"
    : "/onboarding?error=invalid-profile";

  const fullName = String(formData.get("fullName") ?? "").trim();
  const age = Number(formData.get("age"));
  const university = String(formData.get("university") ?? "").trim();

  if (!fullName || !university || !Number.isInteger(age) || age < 15 || age > 100) {
    redirect(invalidRedirect);
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email.toLowerCase() },
    select: { id: true },
  });

  if (!user) {
    redirect("/register?error=account-not-found");
  }

  await prisma.$transaction([
    prisma.profile.upsert({
      where: { userId: user.id },
      update: {
        fullName,
        age,
        university,
        headline: optionalText(formData.get("headline")),
        bio: optionalText(formData.get("bio")),
        location: optionalText(formData.get("location")),
        github: optionalText(formData.get("github")),
        linkedin: optionalText(formData.get("linkedin")),
        instagram: optionalText(formData.get("instagram")),
      },
      create: {
        userId: user.id,
        fullName,
        age,
        university,
        headline: optionalText(formData.get("headline")),
        bio: optionalText(formData.get("bio")),
        location: optionalText(formData.get("location")),
        github: optionalText(formData.get("github")),
        linkedin: optionalText(formData.get("linkedin")),
        instagram: optionalText(formData.get("instagram")),
      },
    }),
    prisma.user.update({
      where: { id: user.id },
      data: {
        name: fullName,
        registrationCompleted: true,
      },
    }),
  ]);

  redirect("/dashboard");
}
