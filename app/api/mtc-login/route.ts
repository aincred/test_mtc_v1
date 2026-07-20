// // app/api/mtc-login/route.ts
// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db'; 

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { username, password } = body;

//     if (!username || !password) {
//       return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
//     }

//     // Query the database to find a match
//     const sqlText = `
//       SELECT id, district, mtc_name, login_id 
//       FROM mtc_users 
//       WHERE login_id = $1 AND password = $2
//     `;
    
//     const result = await query(sqlText, [username, password]);

//     // If no rows are returned, credentials are wrong
//     if (result.rows.length === 0) {
//       return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
//     }

//     const user = result.rows[0];

//     return NextResponse.json({ 
//       success: true, 
//       message: 'Login successful',
//       user: {
//         id: user.id,
//         district: user.district,
//         mtcName: user.mtc_name,
//         loginId: user.login_id
//       }
//     }, { status: 200 });

//   } catch (error) {
//     console.error('Login Error:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { query } from '@/lib/db'; 

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const sqlText = `
      SELECT 
        u.id as user_id, 
        u.district, 
        u.mtc_name, 
        u.login_id, 
        c.mtc_id, 
        c.mtc_code 
      FROM mtc_users u
      LEFT JOIN mtc_centers c ON TRIM(UPPER(u.mtc_name)) = TRIM(UPPER(c.mtc_name))
      WHERE u.login_id = $1 AND u.password = $2
    `;
    
    const result = await query(sqlText, [username.trim().toUpperCase(), password]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const user = result.rows[0];

    return NextResponse.json({ 
      success: true, 
      message: 'Login successful',
      user: {
        id: user.user_id,
        district: user.district,
        mtcName: user.mtc_name,
        loginId: user.login_id,
        mtcId: user.mtc_id,     
        mtcCode: user.mtc_code  
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Login Route Server Error:', error);
    return NextResponse.json({ error: 'Internal server error occurred' }, { status: 500 });
  }
}