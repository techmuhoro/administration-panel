import http from "@/http";
/**
 * List of commonly used server request on uam moduke
 *
 */

export async function getSystemDepartments() {
  try {
    const response = await http({
      url: "/departments/system/",
      includeAuthorization: true,
    }).then((res) => res.data);

    return response?.data || [];
  } catch (error) {
    return []; // default to empyt array
  }
}

export async function getSystemPermissions() {
  try {
    const response = await http({
      url: "/permissions/system/",
      includeAuthorization: true,
    }).then((res) => res.data);

    return response?.data || [];
  } catch (error) {
    return [];
  }
}

// todo -> include endpoint for all system roles
export async function getSystemRoles() {
  try {
    const response = await http({
      url: "/roles",
      includeAuthorization: true,
    }).then((res) => res.data);

    return response?.data?.data || [];
  } catch (error) {
    return []; // default to empyt array
  }
}

export async function getUser(userId) {
  try {
    const response = await http({
      url: `/users/${userId}`,
      includeAuthorization: true,
    }).then((res) => res.data);

    return response?.data || null;
  } catch (error) {
    return null;
  }
}

export async function getRole(roleId) {
  try {
    const response = await http({
      url: `/roles/${roleId}`,
      includeAuthorization: true,
    }).then((res) => res.data);

    return response?.data || null;
  } catch (error) {
    return null;
  }
}
