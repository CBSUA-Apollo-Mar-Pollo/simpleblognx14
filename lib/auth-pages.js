// import { dbPages } from "./db-pages";

import { getAuthSession } from "./auth";

export const currentAuthPages = async (req) => {
  const session = await getAuthSession();

  console.log(session);
  if (!session) {
    return null;
  }

  const profile = await dbPages.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  return profile;
};
