// app/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import pidusage from 'pidusage';

export async function middleware(request: NextRequest) {
  try {
  } catch (error) {
    console.error('Failed to get CPU usage', error);
  }

  return NextResponse.next();
}
