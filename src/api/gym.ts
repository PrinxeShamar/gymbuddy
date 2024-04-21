"use server";

import { prisma } from "@/utils/prisma/client";
import { createClient } from "@/utils/supabase/server";
import { Client } from '@googlemaps/google-maps-services-js';

export const getGym = async (id: string) => {
  let supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    let gym = await prisma.gym.findUnique({
      select: {
        id: true,
        name: true,
        address: true,
      },
      where: {
        id: id,
      },
    })

    if (!gym) {
      const google = new Client({});
      const gymDetailsResponse = await google.placeDetails({
        params: {
          place_id: id,
          key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
        },
        timeout: 1000
      });

      gym = await prisma.gym.create({
        select: {
          id: true,
          name: true,
          address: true,
        },
        data: {
          id: id,
          name: gymDetailsResponse.data.result.name,
          address: gymDetailsResponse.data.result.formatted_address,
        },
      });
    }
    return gym;
  }
};