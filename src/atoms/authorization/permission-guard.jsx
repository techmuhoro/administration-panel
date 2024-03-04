"use client";
/**
 *This component renders the logged in ui depending on whether the logged in user has the specified permission
 *
 * @param allow
 *
 *      1) allow='create_user'
 *            -> User should have the create user permission for children to be visible
 *
 *      2) allow = ['create_user', 'add_user']
 *             -> User must have both permission
 *
 *      3) allow = {
 *              or=['create_user', 'update_user']
 *         }
 *
 *              -> User can have at least one of the permission in the `or` key
 *       4) allow = {
 *              and=['create_user', 'update_user']
 *          }
 *
 *              -> User must have all permission in the `and` key
 *
 *  [NOTE]: Both `or` and `and` keys cannot be specified in the object
 *
 *
 */
import { useSelector } from "react-redux";
import { getUserPermissions } from "@/lib/redux/auth2/otplogin-slice";

export default function PermissionGuard({
  allow = "",
  fallback = "",
  children,
}) {
  const userPermissions = useSelector(getUserPermissions);

  let flag = false;

  // string
  if (typeof allow === "string") {
    // allow is a string
    if (userPermissions.includes(allow)) {
      flag = true;
    }
  }
  // allow is an array
  else if (Array.isArray(allow)) {
    let tempFlag = true;
    if (allow.length < 1) {
      tempFlag = false;
    }
    // have all permission in the array
    for (let perm of allow) {
      if (!userPermissions.includes(perm)) {
        tempFlag = false;
        break;
      }
    }
    flag = tempFlag;
  }
  // allow is an object and contains or key
  else if (typeof allow === "object" && allow !== null) {
    const keys = Object.keys(allow);
    const allowKeys = ["and", "or"];
    for (let key of keys) {
      if (!allowKeys.includes(key)) {
        throw new Error(
          `You have specified an unsupported key in allow object of PermissionGuard. Supported keys are '${allowKeys.join(", ")}'`
        );
      }
    }

    if (`or` in allow && `and` in allow) {
      throw new Error(
        "The keys `and` and `or` cannot be passed to the permission guard at the same time"
      );
    }

    if ("or" in allow) {
      if (typeof allow.or === "string") {
        if (userPermissions.includes(allow.or)) {
          flag = true;
        }
      } else if (Array.isArray(allow.or)) {
        if (allow.or.length === 0) {
          flag = false;
        } else {
          // user can have atleast one permissions
          let tempFlag = false;
          for (let perm of allow.or) {
            if (userPermissions.includes(perm)) {
              tempFlag = true;
            }
          }
          flag = tempFlag;
        }
      }
    }

    if ("and" in allow) {
      if (typeof allow.and === "string") {
        if (userPermissions.includes(allow.and)) {
          flag = true;
        }
      } else if (Array.isArray(allow.and)) {
        if (allow.and.length === 0) {
          flag = false;
        } else {
          let tempFlag = true;

          for (let perm of allow.and) {
            if (!userPermissions.includes(perm)) {
              tempFlag = false;
            }
          }

          flag = tempFlag;
        }
      }
    }
  }

  if (!flag) {
    return <>{fallback ? fallback : ""}</>;
  }
  return <>{children}</>;
}
