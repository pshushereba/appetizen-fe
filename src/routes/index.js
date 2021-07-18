// Dashboard components
import Overview from "../components/dashboard/Overview.js";
import { MemoizedLiveStream } from "../components/dashboard/LiveStream.js";
import { MemoizedViewStream } from "../components/dashboard/ViewStream.js";
import Settings from "../components/dashboard/Settings.js";


export const dashboardRoutes = {
  path: "/dashboard",
  children: [
    {
      path: "/dashboard/overview",
      name: "Overview",
      component: Overview
    },
    {
      path: "/:username/:id",
      name: "Live",
      component: MemoizedLiveStream
    },
    {
      path: "/dashboard/settings",
      name: "Settings",
      component: Settings,
    }
  ],
}