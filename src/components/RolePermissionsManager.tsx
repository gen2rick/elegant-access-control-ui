
import React, { useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PermissionType {
  id: string;
  name: string;
  description: string;
}

interface RoleType {
  id: string;
  name: string;
  color: string;
  description: string;
}

interface PermissionMapType {
  [roleId: string]: {
    canUse: boolean;
    canCreateUpdate: boolean;
  };
}

interface PermissionsDataType {
  [permissionId: string]: PermissionMapType;
}

const roles: RoleType[] = [
  { 
    id: "view-only", 
    name: "View Only", 
    color: "bg-slate-200",
    description: "Can only view content without making changes" 
  },
  { 
    id: "modeller", 
    name: "Modeller", 
    color: "bg-emerald-200",
    description: "Can model and update specific content" 
  },
  { 
    id: "project-admin", 
    name: "Project Admin", 
    color: "bg-blue-200",
    description: "Can manage all aspects of the project" 
  },
];

const permissions: PermissionType[] = [
  { id: "properties", name: "Properties", description: "Access to view and edit property configurations" },
  { id: "tree-view", name: "Tree View", description: "Access to hierarchical tree view of the project" },
  { id: "search-sets", name: "Search Sets", description: "Create and use search patterns and filters" },
  { id: "clash-detection", name: "Clash Detection", description: "Identify and resolve conflicts between components" },
  { id: "appearance-profile", name: "Appearance Profile", description: "Configure visual appearance settings" },
  { id: "annotation", name: "Annotation", description: "Create and manage annotations on models" },
  { id: "appearance-template", name: "Appearance Template", description: "Access appearance templates" },
  { id: "2d-overlay", name: "2D Overlay", description: "Use and create 2D overlays" },
  { id: "issue-tracker", name: "Issue Tracker", description: "Track and manage project issues" },
  { id: "save-points", name: "Save Points", description: "Create and manage save points" },
  { id: "view-fit", name: "View Fit", description: "Access view fit controls" },
];

// Initial permission data based on the screenshot
const initialPermissions: PermissionsDataType = {
  "properties": {
    "view-only": { canUse: true, canCreateUpdate: true },
    "modeller": { canUse: true, canCreateUpdate: true },
    "project-admin": { canUse: true, canCreateUpdate: true },
  },
  "tree-view": {
    "view-only": { canUse: true, canCreateUpdate: true },
    "modeller": { canUse: true, canCreateUpdate: true },
    "project-admin": { canUse: true, canCreateUpdate: true },
  },
  "search-sets": {
    "view-only": { canUse: true, canCreateUpdate: true },
    "modeller": { canUse: true, canCreateUpdate: true },
    "project-admin": { canUse: true, canCreateUpdate: true },
  },
  "clash-detection": {
    "view-only": { canUse: true, canCreateUpdate: true },
    "modeller": { canUse: true, canCreateUpdate: true },
    "project-admin": { canUse: true, canCreateUpdate: true },
  },
  "appearance-profile": {
    "view-only": { canUse: true, canCreateUpdate: true },
    "modeller": { canUse: true, canCreateUpdate: false },
    "project-admin": { canUse: true, canCreateUpdate: true },
  },
  "annotation": {
    "view-only": { canUse: false, canCreateUpdate: true },
    "modeller": { canUse: true, canCreateUpdate: false },
    "project-admin": { canUse: false, canCreateUpdate: false },
  },
  "appearance-template": {
    "view-only": { canUse: false, canCreateUpdate: true },
    "modeller": { canUse: false, canCreateUpdate: false },
    "project-admin": { canUse: false, canCreateUpdate: false },
  },
  "2d-overlay": {
    "view-only": { canUse: false, canCreateUpdate: false },
    "modeller": { canUse: false, canCreateUpdate: false },
    "project-admin": { canUse: false, canCreateUpdate: false },
  },
  "issue-tracker": {
    "view-only": { canUse: false, canCreateUpdate: false },
    "modeller": { canUse: false, canCreateUpdate: false },
    "project-admin": { canUse: false, canCreateUpdate: false },
  },
  "save-points": {
    "view-only": { canUse: false, canCreateUpdate: false },
    "modeller": { canUse: false, canCreateUpdate: false },
    "project-admin": { canUse: false, canCreateUpdate: false },
  },
  "view-fit": {
    "view-only": { canUse: false, canCreateUpdate: false },
    "modeller": { canUse: false, canCreateUpdate: false },
    "project-admin": { canUse: false, canCreateUpdate: false },
  },
};

interface RolePermissionsManagerProps {
  onChangesMade: () => void;
}

const RolePermissionsManager: React.FC<RolePermissionsManagerProps> = ({ onChangesMade }) => {
  const [permissionsData, setPermissionsData] = useState<PermissionsDataType>(initialPermissions);
  const [activePermission, setActivePermission] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const handleTogglePermission = (permissionId: string, roleId: string, type: "canUse" | "canCreateUpdate") => {
    setPermissionsData((prevData) => {
      const newData = {
        ...prevData,
        [permissionId]: {
          ...prevData[permissionId],
          [roleId]: {
            ...prevData[permissionId]?.[roleId],
            [type]: !prevData[permissionId]?.[roleId]?.[type],
          },
        },
      };
      onChangesMade();
      return newData;
    });
  };

  return (
    <div className="relative overflow-hidden rounded-lg border">
      <div className="overflow-x-auto" style={{ maxHeight: "calc(100vh - 250px)" }}>
        <div className="relative">
          <Table>
            <TableHeader className="sticky top-0 z-20">
              <TableRow>
                <TableHead className="sticky left-0 z-30 bg-gray-700 text-white w-64 min-w-[16rem]">
                  <div className="px-6 py-4 text-sm font-medium uppercase tracking-wider">
                    Action
                  </div>
                </TableHead>
                {roles.map((role) => (
                  <TableHead 
                    key={role.id} 
                    colSpan={2}
                    className={`${role.color} z-20`}
                  >
                    <div className="flex flex-col gap-1 items-center px-6 py-3">
                      <span className="font-medium uppercase tracking-wider text-sm">{role.name}</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant="outline" className="bg-white/60 text-xs font-normal">
                              {role.description}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>{role.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
              <TableRow className="bg-gray-100">
                <TableHead className="sticky left-0 z-30 bg-gray-100"></TableHead>
                {roles.map((role) => (
                  <React.Fragment key={`header-${role.id}`}>
                    <TableHead className="px-6 py-2 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Can Use
                    </TableHead>
                    <TableHead className="px-6 py-2 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Can Create/Update
                    </TableHead>
                  </React.Fragment>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map((permission) => (
                <TableRow 
                  key={permission.id} 
                  className={cn(
                    "transition-colors",
                    hoveredRow === permission.id ? "bg-blue-50" : "",
                    activePermission === permission.id ? "bg-blue-50" : ""
                  )}
                  onMouseEnter={() => {
                    setActivePermission(permission.id);
                    setHoveredRow(permission.id);
                  }}
                  onMouseLeave={() => {
                    setActivePermission(null);
                    setHoveredRow(null);
                  }}
                >
                  <TableCell 
                    className={cn(
                      "sticky left-0 z-10 whitespace-nowrap font-medium bg-gray-700 text-white",
                      (activePermission === permission.id || hoveredRow === permission.id) ? "border-r-4 border-blue-500" : ""
                    )}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="px-6 py-4">{permission.name}</div>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-xs bg-gray-800 text-white">
                          <p>{permission.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  {roles.map((role) => (
                    <React.Fragment key={`${permission.id}-${role.id}`}>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleTogglePermission(permission.id, role.id, "canUse")}
                          className={cn(
                            "h-10 w-10 rounded-full flex items-center justify-center transition-all transform hover:scale-110",
                            permissionsData[permission.id]?.[role.id]?.canUse
                              ? "bg-green-500 text-white hover:bg-green-600 shadow-md"
                              : "bg-gray-300 text-gray-500 hover:bg-red-500 hover:text-white"
                          )}
                          aria-label={
                            permissionsData[permission.id]?.[role.id]?.canUse
                              ? "Permission granted"
                              : "Permission denied"
                          }
                        >
                          {permissionsData[permission.id]?.[role.id]?.canUse ? (
                            <Check className="h-6 w-6" />
                          ) : (
                            <X className="h-6 w-6" />
                          )}
                        </button>
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleTogglePermission(permission.id, role.id, "canCreateUpdate")}
                          className={cn(
                            "h-10 w-10 rounded-full flex items-center justify-center transition-all transform hover:scale-110",
                            permissionsData[permission.id]?.[role.id]?.canCreateUpdate
                              ? "bg-green-500 text-white hover:bg-green-600 shadow-md"
                              : "bg-gray-300 text-gray-500 hover:bg-red-500 hover:text-white"
                          )}
                          aria-label={
                            permissionsData[permission.id]?.[role.id]?.canCreateUpdate
                              ? "Permission granted"
                              : "Permission denied"
                          }
                        >
                          {permissionsData[permission.id]?.[role.id]?.canCreateUpdate ? (
                            <Check className="h-6 w-6" />
                          ) : (
                            <X className="h-6 w-6" />
                          )}
                        </button>
                      </TableCell>
                    </React.Fragment>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="p-4 bg-gray-50 border-t border-gray-200 text-center text-sm text-gray-600">
        Click on permission toggles to grant or deny access for each role
      </div>
    </div>
  );
};

export default RolePermissionsManager;
