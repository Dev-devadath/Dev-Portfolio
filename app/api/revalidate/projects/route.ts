import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// Optional: Add a secret token for security
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

export async function POST(request: NextRequest) {
  try {
    // Check for secret token in headers, query params, or request body
    const authHeader = request.headers.get('authorization');
    const secret = request.nextUrl.searchParams.get('secret');
    
    // If REVALIDATE_SECRET is set, require authentication
    if (REVALIDATE_SECRET) {
      const providedSecret = authHeader?.replace('Bearer ', '') || secret;
      if (providedSecret !== REVALIDATE_SECRET) {
        return NextResponse.json(
          { error: 'Unauthorized. Provide secret token via ?secret=xxx or Authorization: Bearer xxx header' },
          { status: 401 }
        );
      }
    }

    // Revalidate the projects page
    revalidatePath('/projects');
    
    // Also revalidate the home page in case it references projects
    revalidatePath('/');

    return NextResponse.json({
      revalidated: true,
      message: 'Projects page revalidated successfully',
      timestamp: new Date().toISOString(),
      now: Date.now(),
    });
  } catch (error) {
    console.error('Error revalidating projects:', error);
    return NextResponse.json(
      { 
        error: 'Error revalidating projects page',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Also allow GET for easy testing (with secret in query param)
export async function GET(request: NextRequest) {
  return POST(request);
}

