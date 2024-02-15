// permisssion data
const allPermission = {
  users: ["create_user", "delete_user", "update_user", "list_users"],
  roles: ["create_role", "delete_role", "update_role", "list_roles"],
  events: ["create_event", "delete_event", "update_event", "list_events"],
  bookings: [
    "create_booking",
    "delete_booking",
    "update_booking",
    "list_bookings",
  ],
  user_role: [
    "create_user_role",
    "delete_user_role",
    "update_user_role",
    "list_user_roles",
  ],
};

export function getShapedPermissions() {
  const permissions = [];

  for (let [key, value] of Object.entries(allPermission)) {
    value.forEach((permission) => {
      permissions.push({
        name: permission,
        category: key,
        checked: false,
      });
    });
  }

  return permissions;
}

export const permissionCategories = Object.keys(allPermission);
