"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { MonitorCog, MoonIcon, SunIcon } from "lucide-react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <Tabs defaultValue={theme}>
      <TabsList className="border dark:border-neutral-800 dark:bg-[#030303]">
        <TabsTrigger value="light" onClick={(e) => setTheme("light")}>
          <SunIcon size={20} />
        </TabsTrigger>
        <TabsTrigger value="dark" onClick={(e) => setTheme("dark")}>
          <MoonIcon
            size={20}
            className=" rotate-90 transition-all dark:rotate-0"
          />
        </TabsTrigger>
        <TabsTrigger value="system" onClick={(e) => setTheme("system")}>
          <MonitorCog size={20} />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ThemeSwitcher;
