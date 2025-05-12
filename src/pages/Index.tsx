
import { useState } from "react";
import RolePermissionsManager from "../components/RolePermissionsManager";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";
import { toast } from "sonner";

const Index = () => {
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-slate-100 flex flex-col">
      <header className="bg-white shadow-md p-4 border-b sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Role Permission Management
            </h1>
            <p className="text-sm text-gray-500">Configure access levels and capabilities for each role</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-gray-500">Active Project</span>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium text-gray-700">Permission Configuration</h2>
            <p className="text-sm text-gray-500">Define what each role can access and modify</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => {
                setUnsavedChanges(false);
                toast.info("Changes reset", {
                  description: "All changes have been reset to their initial state.",
                });
              }}
              disabled={!unsavedChanges}
              className="border-blue-500 text-blue-500 hover:bg-blue-50 transition-all"
            >
              Reset
            </Button>
            <Button 
              onClick={() => {
                setUnsavedChanges(false);
                toast.success("Changes saved", {
                  description: "Your permission changes have been applied successfully.",
                });
              }}
              disabled={!unsavedChanges}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all"
            >
              Save Changes
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                {unsavedChanges ? "Unsaved changes" : "All changes saved"}
              </div>
              <div className="text-sm font-medium text-gray-600">
                Total Roles: {roles.length} • Total Permissions: {permissions.length}
              </div>
            </div>
          </div>
          <RolePermissionsManager onChangesMade={() => setUnsavedChanges(true)} />
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="font-medium text-lg mb-2 text-gray-800">Role Management</h3>
            <p className="text-gray-600 text-sm">Create, edit, and manage custom roles for your team members.</p>
            <Button variant="link" className="mt-2 text-blue-600 p-0">Manage Roles</Button>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="font-medium text-lg mb-2 text-gray-800">Permission Templates</h3>
            <p className="text-gray-600 text-sm">Save and load common permission sets as reusable templates.</p>
            <Button variant="link" className="mt-2 text-blue-600 p-0">View Templates</Button>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="font-medium text-lg mb-2 text-gray-800">Access Logs</h3>
            <p className="text-gray-600 text-sm">Monitor changes to role permissions and access settings.</p>
            <Button variant="link" className="mt-2 text-blue-600 p-0">View Logs</Button>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </footer>
      
      <Toaster position="top-right" />
    </div>
  );
};

// These variables are needed for the header statistics
const roles = [
  { id: "view-only", name: "View Only", color: "bg-slate-200", description: "Can only view content without making changes" },
  { id: "modeller", name: "Modeller", color: "bg-emerald-200", description: "Can model and update specific content" },
  { id: "project-admin", name: "Project Admin", color: "bg-blue-200", description: "Can manage all aspects of the project" },
];

const permissions = [
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

export default Index;
