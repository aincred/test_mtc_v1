import { NextResponse } from 'next/server';
import { getChildBySamNo, getDailyWeights, updateDailyWeight } from '@/lib/db';

// 1. Update GET to await params
export async function GET(
  request: Request,
  { params }: { params: Promise<{ samNo: string }> } // Type definition changed to Promise
) {
  try {
    // AWAIT params here before accessing properties
    const resolvedParams = await params;
    const samNo = decodeURIComponent(resolvedParams.samNo);

    // 1. Fetch Child Details
    const childProfile = await getChildBySamNo(samNo);
    
    if (!childProfile) {
      return NextResponse.json({ error: "Child not found" }, { status: 404 });
    }

    // 2. Fetch Weight Data
    const weightData = await getDailyWeights(samNo);

    return NextResponse.json({
      profile: childProfile,
      weights: weightData || {}
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// 2. Update POST to await params
export async function POST(
  request: Request,
  { params }: { params: Promise<{ samNo: string }> } // Type definition changed to Promise
) {
  try {
    // AWAIT params here too
    const resolvedParams = await params;
    const samNo = decodeURIComponent(resolvedParams.samNo);
    
    const body = await request.json();
    const { day, value, mtcCode } = body;

    // Call the DB update function
    const result = await updateDailyWeight(samNo, mtcCode, day, parseFloat(value));

    return NextResponse.json(result);

  } catch (error) {
    console.error("Save Error:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}