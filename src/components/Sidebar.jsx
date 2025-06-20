import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BiPurchaseTag, BiSolidPurchaseTag } from "react-icons/bi";

// Import icons
import {
  LayoutDashboard,
  BarChart3,
  Users,
  User,
  Settings,
  Shield,
  LogOut,
  ArrowRightLeft,
  FileText,
  Inbox,
  MessageSquare,
  Calendar,
  HelpCircle,
  ChevronRight,
  LucideNotebookText,
  LucideLogs
} from 'lucide-react';
import { MdAssignmentTurnedIn, MdOutlineAssignmentTurnedIn, MdOutlineInventory2 } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa6';
import { getRoleColor, getRoleLabel } from '../utils/roleColorLabel';


export const Sidebar = ({ pageTitle }) => {
  const { user, logout, isAdmin, isLogisticsOfficer, role } = useAuth();
  const location = useLocation();

  // Check if the current path matches the link path
  const isActive = (path) => location.pathname === path;

  // Navigation menu items
  const mainNavigation = [
    {
      name: 'Dashboard',
      path: '/',
      icon: <LayoutDashboard className="h-5 w-5" />,
      roles: ['admin', 'base_commander', 'logistics_officer']
    },
    {
      name: 'Stocks & Inventory',
      path: '/stocks',
      icon: <MdOutlineInventory2 className="h-5 w-5" />,
      roles: ['admin', 'base_commander', 'logistics_officer']
    },
    {
      name: 'Purchased Assets',
      path: '/purchase',
      icon: <BiPurchaseTag className="h-5 w-5" />,
      roles: ['admin', 'logistics_officer']
    },
    {
      name: 'Transfered Assets',
      path: '/transfer',
      icon: <ArrowRightLeft className="h-5 w-5" />,
      roles: ['admin', 'logistics_officer']
    },
    {
      name: 'Assigned Assets',
      path: '/assignment',
      icon: <MdOutlineAssignmentTurnedIn className="h-5 w-5" />,
      roles: ['admin', 'base_commander']
    },
    {
      name: 'Expended Assets',
      path: '/expend',
      icon: <LucideNotebookText className="h-5 w-5" />,
      roles: ['admin', 'base_commander']
    },
    {
      name: 'Movement Logs',
      path: '/reports',
      icon: <LucideLogs className="h-5 w-5" />,
      roles: ['admin']
    }
  ];

  const accountItems = [
    {
      name: 'Profile',
      path: '/profile',
      icon: <User className="h-5 w-5" />,
      roles: ['admin', 'base_commander', 'logistics_officer']
    },
    {
      name: 'Users Page',
      path: '/users',
      icon: <FaUsers className="h-5 w-5" />,
      roles: ['admin']
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <Settings className="h-5 w-5" />,
      roles: ['admin']
    }
  ];

  // NavItem component for consistent styling of each navigation item
  const NavItem = ({ item }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          to={item.path}
          className={`
            flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors
            ${isActive(item.path)
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'hover:bg-muted text-muted-foreground hover:text-foreground'
            }
          `}
        >
          <div className="flex items-center gap-3">
            {item.icon}
            <span>{item.name}</span>
          </div>
          {item.badge && (
            <Badge variant={item.badgeVariant || 'secondary'} className="ml-auto">
              {item.badge}
            </Badge>
          )}
          {isActive(item.path) && (
            <ChevronRight className="ml-auto h-4 w-4" />
          )}
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" align="center" className="z-50">
        {item.name}
      </TooltipContent>
    </Tooltip>
  );

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex h-full w-full flex-col bg-background">
        {/* Admin Panel Logo/Brand */}
        {/* <div className="flex h-16 items-center px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">Admin Panel</span>
          </Link>
        </div> */}

        {/* Page title */}
        <div className="px-4 pt-2 pb-1 mt-2">
          <div className="flex items-center px-4 py-2 rounded-lg border bg-card">
            <h1 className="text-md font-semibold">{pageTitle}</h1>
          </div>
        </div>

        <ScrollArea className="flex-1 px-3 py-2">
          {/* Main Navigation */}
          <div className="py-2">
            <div className="flex items-center justify-between px-1 py-1.5">
              <h3 className="text-xs font-medium uppercase text-muted-foreground tracking-wider">
                Main Navigation
              </h3>
            </div>
            <div className="space-y-1">
              {mainNavigation
                .filter(item => item.roles.includes(role))
                .map(item => (
                  <NavItem key={item.path} item={item} />
                ))}
            </div>
          </div>

          {/* Account Section */}
          <div className="py-2">
            <div className="flex items-center justify-between px-1 py-1.5">
              <h3 className="text-xs font-medium uppercase text-muted-foreground tracking-wider">
                Account
              </h3>
            </div>
            <div className="space-y-1">
              {accountItems
                .filter(item => item.roles.includes(role))
                .map(item => (
                  <NavItem key={item.path} item={item} />
                ))}
            </div>
          </div>
        </ScrollArea>

        {/* Help Section */}
        <div className="px-4 pt-2 pb-3 mt-2">
          <div className="rounded-lg border bg-card p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <HelpCircle className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Need help?</h4>
                <p className="text-xs text-muted-foreground">Check our docs</p>
              </div>
            </div>
            <a
              href="https://github.com/hduraimurugan/military-management-FE/blob/main/README.md"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block w-full"
            >
              <Button variant="outline" size="sm" className="w-full">
                View Documentation
              </Button>
            </a>

          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t px-4 py-3">
          {/* User Profile Summary */}
          <div className="py-2">
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-2.5">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-semibold">
                  {user?.name?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-0.5">
                <span className="text-sm font-medium line-clamp-1">{user?.name || 'Admin User'}</span>
                <div className="flex items-center">
                  <Badge variant="outline" className={getRoleColor(user?.role)}>
                    {getRoleLabel(user?.role)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <Button
            // variant="destructive"
            size="sm"
            onClick={logout}
            className="w-full justify-start bg-red-500 text-white hover:bg-red-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
};