
import { useState } from "react";
import RolePermissionsManager from "../components/RolePermissionsManager";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";

const Index = () => {
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm p-4 border-b">
        <h1 className="text-2xl font-semibold text-gray-800">Role Permission Management</h1>
      </header>
      <main className="flex-1 container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-700">Configure permissions for each role</h2>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setUnsavedChanges(false)}
              disabled={!unsavedChanges}
              className="border-blue-500 text-blue-500 hover:bg-blue-50"
            >
              Reset
            </Button>
            <Button 
              onClick={() => {
                setUnsavedChanges(false);
                // Show success toast when changes are saved
                window.toast({
                  title: "Changes saved",
                  description: "Your permission changes have been applied successfully.",
                });
              }}
              disabled={!unsavedChanges}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Save Changes
            </Button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow">
          <RolePermissionsManager onChangesMade={() => setUnsavedChanges(true)} />
        </div>
      </main>
      <Toaster position="top-right" />
    </div>
  );
};

export default Index;
