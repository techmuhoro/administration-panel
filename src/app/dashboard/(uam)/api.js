/**
 * Common network request for the uam module
 */

export async function getRole(url, token) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    // cache: "no-store",
  });

  const data = await response.json();

  return {
    data,
    response,
    isError: !response.status.toString().startsWith("2"),
  };
}

// returns all system department(unpaginated)
export async function getSystemDepartments(url, token) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  return {
    data,
    response,
    isError: !response.status.toString().startsWith("2"), // boolean of whether the was an error or not
  };
}

// return all base permissions in the system(unpaginated)
export async function getSystemPermissions(url, token) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  return {
    data,
    response,
    isError: !response.status.toString().startsWith("2"), // bool. whether there was an error or not
  };
}
