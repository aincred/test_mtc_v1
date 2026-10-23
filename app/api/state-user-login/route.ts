// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db'; 

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { username, password } = body;

//     if (!username || !password) {
//       return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
//     }

//     const sqlText = `
//       SELECT 
//         id, 
//         username, 
//         password 
//       FROM mtc_state_user 
//       WHERE TRIM(UPPER(username)) = TRIM(UPPER($1)) AND password = $2
//     `;
    
//     const result = await query(sqlText, [username, password]);

//     if (result.rows.length === 0) {
//       return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
//     }

//     const user = result.rows[0];

//     return NextResponse.json({ 
//       success: true, 
//       message: 'Login successful',
//       user: {
//         id: user.id,
//         username: user.username,
//       }
//     }, { status: 200 });

//   } catch (error) {
//     console.error('State User Login Route Server Error:', error);
//     return NextResponse.json({ error: 'Internal server error occurred' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface StateUser {
  id: number;
  username: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    console.log("--> [LOGIN ATTEMPT]:", { 
      receivedUser: username, 
      receivedPass: password 
    });

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' }, 
        { status: 400 }
      );
    }

    const cleanUsername = String(username).trim();
    const cleanPassword = String(password).trim();

    const sqlText = `
      SELECT id, username, password 
      FROM public.mtc_state_user 
      WHERE UPPER(TRIM(username)) = UPPER(TRIM($1))
      LIMIT 1
    `;
    
    const result = await query(sqlText, [cleanUsername]);

    if (!result.rows || result.rows.length === 0) {
      console.log(`--> [LOGIN FAILED]: User "${cleanUsername}" was not found in public.mtc_state_user.`);
      return NextResponse.json(
        { error: 'Invalid username or password' }, 
        { status: 401 }
      );
    }

    // Double-cast to resolve TS2352
    const user = result.rows[0] as unknown as StateUser;

    console.log("--> [DB MATCH]:", {
      dbUser: user.username,
      dbPass: user.password,
      passwordsMatch: String(user.password).trim() === cleanPassword
    });

    if (String(user.password).trim() !== cleanPassword) {
      console.log(`--> [LOGIN FAILED]: Password mismatch for user "${cleanUsername}".`);
      return NextResponse.json(
        { error: 'Invalid username or password' }, 
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
      }
    });

  } catch (error: any) {
    console.error('State User Login Route Server Error:', error);
    return NextResponse.json(
      { error: 'Internal server error occurred', details: error?.message }, 
      { status: 500 }
    );
  }
}