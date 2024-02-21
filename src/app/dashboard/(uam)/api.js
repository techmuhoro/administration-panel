/**
 * Common network request for the uam module
 */

export async function getRole(url, token) {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return {
      data,
      response,
      isError: !response.status.toString().startsWith("2"),
    };
  } catch (e) {
    return { data: null, response: null, isError: true };
  }
}

// returns all system department(unpaginated)
export async function getSystemDepartments(url, token) {
  try {
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
  } catch (e) {
    return { data: null, response: null, isError: true };
  }
}

// return all base permissions in the system(unpaginated)
export async function getSystemPermissions(url, token) {
  try {
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
  } catch (error) {
    return { data: null, response: null, isError: true };
  }
}
