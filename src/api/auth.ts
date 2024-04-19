'use server'

import { prisma } from '@/utils/prisma/client';
import { createClient } from '@/utils/supabase/server'

interface SignInRequest {
  email: string;
  password: string;
}

interface SignUpRequest {
  fullName: string;
  email: string;
  password: string;
}

export async function signIn(request: SignInRequest) {
  const supabase = createClient()

  const signInData = {
    email: request.email,
    password: request.password,
  }

  const { data, error } = await supabase.auth.signInWithPassword(signInData);
  if (error) {
    throw error;
  } else {
    return data;
  }
}

export async function signUp(request: SignUpRequest) {
  const supabase = createClient()

  const signUpData = {
    email: request.email,
    password: request.password,
    options: {
      data: {
        fullName: request.fullName,
      }
    }
  }

  const { data, error } = await supabase.auth.signUp(signUpData)
  if (error) {
    throw error;
  } else {
    return data;
  }
}

export async function signOut() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()
  if (error) {
    throw error;
  }
}

export async function getUser() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    let userData = await prisma.user.upsert({
      create: {
        id: user.id,
        fullName: user.user_metadata.fullName
      },
      update: {},
      where: {
        id: user.id,
      }
    })
    return userData;
  } else {
    return null;
  }
}