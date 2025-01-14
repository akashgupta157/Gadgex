import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import React from "react";

export default function Navbar() {
  return (
    <div className="h-[10svh] px-5 flex justify-between items-center shadow">
      <h1 className="text-2xl font-extrabold">Admin Panel</h1>
      <Button>
        <LogOut /> Logout
      </Button>
    </div>
  );
}
