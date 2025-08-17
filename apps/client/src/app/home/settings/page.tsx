// app/settings/page.tsx
import { Card } from "@/components/ui/card";
import { 
  User, 
  Building, 
  Key, 
  Shield, 
  Bell, 
  Users, 
  CreditCard, 
  SlidersHorizontal 
} from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const settingsSections = [
    {
      title: "Profile",
      description: "Manage your personal information",
      icon: <User className="h-5 w-5" />,
      href: "/home/settings/profile",
    },
    {
      title: "Business Profile",
      description: "Update your company details",
      icon: <Building className="h-5 w-5" />,
      href: "/home/settings/business",
    },
    {
      title: "Preferences",
      description: "Set your theme, notifications and language preferences",
      icon: <SlidersHorizontal className="h-5 w-5" />,
      href: "/home/settings/preferences",
    },
    {
      title: "Security",
      description: "Configure authentication and security settings",
      icon: <Shield className="h-5 w-5" />,
      href: "/home/settings/security",
    },
    {
      title: "Compliance",
      description: "Configure compliance and verification settings",
      icon: <Shield className="h-5 w-5" />,
      href: "/home/settings/compliance",
    },
    {
      title: "API Keys & Webhooks",
      description: "Manage your API access credentials",
      icon: <Key className="h-5 w-5" />,
      href: "/home/settings/api-keys",
    },
    {
      title: "Team",
      description: "Manage team members and roles",
      icon: <Users className="h-5 w-5" />,
      href: "/home/settings/team",
    },
    {
      title: "Billing",
      description: "View and manage your billing information",
      icon: <CreditCard className="h-5 w-5" />,
      href: "/home/settings/billing",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and application preferences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {settingsSections.map((section) => (
          <Card 
            key={section.title} 
            className="hover:border-primary transition-colors"
          >
            <Link href={section.href} className="p-6 block">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {section.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {section.description}
                  </p>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
