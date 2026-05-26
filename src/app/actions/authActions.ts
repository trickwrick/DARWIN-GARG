'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAdmin(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const validUser = process.env.ADMIN_USER || 'admin';
  const validPass = process.env.ADMIN_PASSWORD || 'admin123';

  // For this simple login, we're accepting the username OR email field.
  // The UI has an email field, but we'll accept 'admin' or 'admin@example.com'.
  if ((email === validUser || email === 'admin@example.com') && password === validPass) {
    // Set a secure HTTP-only cookie
    (await cookies()).set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 1 day
    });

    return { success: true };
  }

  return { success: false, message: 'Invalid credentials. Please try again.' };
}

export async function logoutAdmin() {
  (await cookies()).delete('admin_session');
  redirect('/admin/login');
}
