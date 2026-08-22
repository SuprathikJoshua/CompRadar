import {
  LayoutGrid,
  BriefcaseBusiness,
  Globe,
  Bell,
  Activity,
  Settings,
} from "lucide-react";

export const WORKSPACE_NAV = [
  {
    label: "Overview",
    icon: LayoutGrid,
    active: true,
  },
  {
    label: "Workspace",
    icon: BriefcaseBusiness,
  },
  {
    label: "Rivals",
    icon: Globe,
    badge: 3,
  },
  {
    label: "Alerts",
    icon: Bell,
    badge: 4,
  },
];

export const SYSTEM_NAV = [
  {
    label: "Self-heal log",
    icon: Activity,
  },
  {
    label: "Settings",
    icon: Settings,
  },
];