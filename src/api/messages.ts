"use server";

import { prisma } from "@/utils/prisma/client";
import { createClient } from "@/utils/supabase/server";

export const getMessages = async (gymId: string) => {
  let supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    let messages = await prisma.message.findMany({
      select: {
        id: true,
        userId: true,
        user: {
          select: {
            fullName: true,
          }
        },
        content: true,
      },
      where: {
        gymId: gymId,
      }
    });
    return messages;
  }
};

interface SendMessageRequest {
  gymId: string,
  content: string
}

export const sendMessage = async (request: SendMessageRequest) => {
  let supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    let message = await prisma.message.create({
      data: {
        user: {
          connect: {
            id: user.id,
          }
        },
        gym: {
          connect: {
            id: request.gymId,
          }
        },
        content: request.content,
      }
    });
    return message;
  }
};