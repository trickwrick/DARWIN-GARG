import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { uploadAdminImage } from "@/app/actions/uploadActions";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (session?.value !== "authenticated") {
    return NextResponse.json(
      { success: false, data: { error: "Unauthorized" } },
      { status: 401 }
    );
  }

  const formData = await request.formData();
  const result = await uploadAdminImage(formData);

  if (result.success && result.url) {
    return NextResponse.json({
      success: true,
      data: {
        files: [result.url],
        baseurl: "",
        message: "Image uploaded",
        error: "",
        path: "",
      },
    });
  }

  return NextResponse.json(
    {
      success: false,
      data: {
        files: [],
        message: result.message,
        error: result.message,
      },
    },
    { status: 400 }
  );
}
