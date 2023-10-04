/**
 * Application routes with its version
 * https://github.com/Sairyss/backend-best-practices#api-versioning
 */

const userRoot = '/user';

export const routesV1 = {
  version: 'v1',

  user: {
    root: {
      create: `${userRoot}`,
    },
  },
};
