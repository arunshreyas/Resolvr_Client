import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, userId, userEmail, userName, ward, priority } = body;

    // Log the Complaint transmission as per schema
    console.log('\n===================================');
    console.log('📬 NEW COMPLAINT TRANSMISSION');
    console.log('TITLE:      ', title);
    console.log('DESCRIPTION:', description);
    console.log('STATUS:      PENDING');
    console.log('-----------------------------------');
    console.log('👤 ASSOCIATED USER (CLERK)');
    console.log('ID:         ', userId);
    console.log('NAME:       ', userName);
    console.log('EMAIL:      ', userEmail);
    console.log('-----------------------------------');
    console.log('📍 LOCATION DATA');
    console.log('WARD:       ', ward);
    console.log('PRIORITY:   ', priority);
    console.log('===================================\n');

    // Mocking DB success
    return NextResponse.json({ 
      success: true, 
      message: 'Complaint registered and user linked successfully',
      complaintId: Math.floor(Math.random() * 10000)
    }, { status: 201 });
  } catch (error) {
    console.error('API Error in /api/complaints:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Transmission Failure' 
    }, { status: 500 });
  }
}
