// import { NextResponse } from "next/server";
// import { query } from "@/lib/db";

// export const dynamic = "force-dynamic";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { username, oldPassword, newPassword } = body;

//     // Validate request inputs
//     if (!username || !oldPassword || !newPassword) {
//       return NextResponse.json(
//         { success: false, error: "Username, current password, and new password are required." },
//         { status: 400 }
//       );
//     }

//     if (newPassword.length < 8) {
//       return NextResponse.json(
//         { success: false, error: "New password must be at least 8 characters long." },
//         { status: 400 }
//       );
//     }

//     // 1. Verify user and current password against public.mtc_state_user
//     const checkSql = `
//       SELECT id, username, password 
//       FROM public.mtc_state_user 
//       WHERE LOWER(username) = LOWER($1)
//     `;
//     const checkRes = await query(checkSql, [username.trim()]);

//     if (checkRes.rows.length === 0) {
//       return NextResponse.json(
//         { success: false, error: "State user account not found." },
//         { status: 404 }
//       );
//     }

//     const user = checkRes.rows[0];

//     // Check old password
//     if (user.password !== oldPassword) {
//       return NextResponse.json(
//         { success: false, error: "Current (old) password is incorrect." },
//         { status: 401 }
//       );
//     }

//     // 2. Update password in database
//     const updateSql = `
//       UPDATE public.mtc_state_user 
//       SET password = $1 
//       WHERE id = $2
//     `;
//     await query(updateSql, [newPassword, user.id]);

//     return NextResponse.json({
//       success: true,
//       message: "Password updated successfully in database.",
//     });
//   } catch (error: any) {
//     console.error("Change Password API Error:", error);
//     return NextResponse.json(
//       { success: false, error: "Failed to update password", details: error.message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, oldPassword, newPassword } = body;

    // 1. Validate request inputs
    if (!username || !oldPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: "Username, current password, and new password are required." },
        { status: 400 }
      );
    }

    const cleanUsername = username.trim();
    const cleanOldPassword = oldPassword.trim();
    const cleanNewPassword = newPassword.trim();

    if (cleanNewPassword.length < 8) {
      return NextResponse.json(
        { success: false, error: "New password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    // 2. Verify user and current password
    const checkSql = `
      SELECT id, username, password 
      FROM public.mtc_state_user 
      WHERE LOWER(username) = LOWER($1)
      LIMIT 1
    `;
    const checkRes = await query(checkSql, [cleanUsername]);

    if (checkRes.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "State user account not found." },
        { status: 404 }
      );
    }

    const user = checkRes.rows[0];

    // 3. Match old password
    if (user.password !== cleanOldPassword) {
      return NextResponse.json(
        { success: false, error: "Current (old) password is incorrect." },
        { status: 401 }
      );
    }

    // 4. Update password in database
    const updateSql = `
      UPDATE public.mtc_state_user 
      SET password = $1 
      WHERE id = $2
    `;
    await query(updateSql, [cleanNewPassword, user.id]);

    return NextResponse.json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error: any) {
    console.error("Change Password API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update password", details: error.message },
      { status: 500 }
    );
  }
}