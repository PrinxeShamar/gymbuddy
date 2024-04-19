"use server";

import { prisma } from "@/utils/prisma/client";
import { createClient } from "@/utils/supabase/server";
import { Client } from '@googlemaps/google-maps-services-js';

export const getGym = async (id: string) => {
  let supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    const google = new Client({});

    const gymDetailsResponse = await google.placeDetails({
      params: {
        place_id: id,
        key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
      },
      timeout: 1000
    });

    let gym = await prisma.gym.upsert({
      select: {
        id: true,
        name: true,
        address: true,
      },
      create: {
        id: id,
        name: gymDetailsResponse.data.result.name,
        address: gymDetailsResponse.data.result.formatted_address,
        users: {
          connect: {
            id: user.id,
          }
        }
      },
      update: {
        users: {
          connect: {
            id: user.id,
          }
        }
      },
      where: {
        id: id,
      }
    });
    return gym;
  }
};