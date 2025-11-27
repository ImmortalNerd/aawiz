import { IconDashboard } from "@/icons/icon-dashbaord";
import { IconUser } from "@/icons/icon-users";
import { paths } from "@/routes/paths";
import { useMemo } from "react";
// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      {
        title: "Dashboard",
        path: paths.dashboard.root,
        icon: <IconDashboard />,
        type: "header",
      },
      {
        title: "Users",
        path: paths.dashboard.users,
        icon: <IconUser />,
      },
    ],
    []
  );

  return data;
}
