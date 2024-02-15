import { roles } from "./roles-data";

export async function getRoles({ take, skip, where }) {
  const filteredRoles = getFilterResults(where);

  const paginatedResults = getPaginatedResults(filteredRoles, {
    take,
    skip,
  });

  return paginatedResults;
}

export async function getRolesCount(where) {
  if (!where) {
    return roles.length;
  }

  const filteredRoles = getFilterResults(where);
  return filteredRoles.length;
}

function getFilterResults(where) {
  let rolesList = [...roles];

  // support filtering
  for (let key in where) {
    if (key === "role") {
      rolesList = rolesList.filter((r) => r.role === where.role);
    }
  }

  return rolesList;
}

function getPaginatedResults(data, { take, skip }) {
  const roles = [...data];

  if (take && skip) {
    return roles.slice(skip, skip + take);
  }

  if (take && !skip) {
    return roles.slice(0, take);
  }

  if (!take && skip) {
    return roles.slice(skip);
  }

  return roles;
}
