"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "shrink-0 flex border-b",
      className,
    )}
    {...props}
  >
    {children}
  </TabsPrimitive.List>
));
TabList.displayName = TabsPrimitive.List.displayName;

const TabTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "px-10 flex justify-start gap-6 text-2xl leading-none select-none data-[state=active]:text-green-400 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] cursor-default",
      className,
    )}
    {...props}
  >
    {children}
  </TabsPrimitive.Trigger>
));
TabTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabContent = TabsPrimitive.Content;

export { Tabs, TabList, TabTrigger, TabContent };

