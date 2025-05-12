
import React, { useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

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
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="bg-gray-700 text-white px-6 py-4 text-left text-sm font-medium uppercase tracking-wider w-64">
              Action
            </th>
            {roles.map((role) => (
              <React.Fragment key={role.id}>
                <th className={`${role.color} px-6 py-3 text-center text-sm font-medium uppercase tracking-wider`} colSpan={2}>
                  <div className="flex flex-col gap-1 items-center">
                    <span>{role.name}</span>
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
                </th>
              </React.Fragment>
            ))}
          </tr>
          <tr className="bg-gray-100">
            <th className="px-6 py-3"></th>
            {roles.map((role) => (
              <React.Fragment key={role.id}>
                <th className="px-6 py-2 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Can Use
                </th>
                <th className="px-6 py-2 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Can Create/Update
                </th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {permissions.map((permission) => (
            <tr 
              key={permission.id} 
              className={cn(
                "hover:bg-gray-50 transition-colors", 
                activePermission === permission.id ? "bg-blue-50" : ""
              )}
              onClick={() => setActivePermission(permission.id)}
              onMouseEnter={() => setActivePermission(permission.id)}
              onMouseLeave={() => setActivePermission(null)}
            >
              <td className={cn(
                "px-6 py-4 whitespace-nowrap text-sm font-medium bg-gray-700 text-white",
                activePermission === permission.id ? "border-r-4 border-blue-500" : ""
              )}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>{permission.name}</div>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs bg-gray-800 text-white">
                      <p>{permission.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </td>
              {roles.map((role) => (
                <React.Fragment key={`${permission.id}-${role.id}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleTogglePermission(permission.id, role.id, "canUse")}
                      className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center transition-all",
                        permissionsData[permission.id]?.[role.id]?.canUse
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-gray-300 text-gray-500 hover:bg-red-500 hover:text-white"
                      )}
                      aria-label={
                        permissionsData[permission.id]?.[role.id]?.canUse
                          ? "Permission granted"
                          : "Permission denied"
                      }
                    >
                      {permissionsData[permission.id]?.[role.id]?.canUse ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <X className="h-5 w-5" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleTogglePermission(permission.id, role.id, "canCreateUpdate")}
                      className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center transition-all",
                        permissionsData[permission.id]?.[role.id]?.canCreateUpdate
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-gray-300 text-gray-500 hover:bg-red-500 hover:text-white"
                      )}
                      aria-label={
                        permissionsData[permission.id]?.[role.id]?.canCreateUpdate
                          ? "Permission granted"
                          : "Permission denied"
                      }
                    >
                      {permissionsData[permission.id]?.[role.id]?.canCreateUpdate ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <X className="h-5 w-5" />
                      )}
                    </button>
                  </td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 bg-gray-50 border-t border-gray-200 text-center text-sm text-gray-600">
        Click on permission toggles to grant or deny access for each role
      </div>
    </div>
  );
};

export default RolePermissionsManager;
