export function getDashboardRoute(role: string) {
  switch (role) {
    case "admin":
      return "/admin";
    case "institute":
      return "/institute/dashboard";
    case "tutor":
      return "/tutor/dashboard";
    case "student":
      return "/student/dashboard";
    case "parent":
      return "/student/dashboard";
    default:
      return "/";
  }
}