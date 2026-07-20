"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  User, Settings, Bell, Database, ShieldAlert, ArrowLeft, 
  Download, Trash2, Globe, Save, Building
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// --- UI Components ---
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: 'default' | 'outline' | 'ghost' | 'danger';
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant = 'default', href, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
      variant === 'default' ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 h-11 py-2 px-6" : "",
      variant === 'outline' ? "border border-slate-200 bg-white shadow-sm hover:bg-slate-50 hover:text-slate-900 h-11 py-2 px-6 text-slate-700" : "",
      variant === 'ghost' ? "hover:bg-slate-100 hover:text-slate-900 h-11 py-2 px-6 text-slate-600" : "",
      variant === 'danger' ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 h-11 py-2 px-6" : "",
      className
    );
    if (href) {
      return <a href={href} className={classes} ref={ref as React.ForwardedRef<HTMLAnchorElement>} {...(props as React.ComponentPropsWithoutRef<"a">)} />;
    }
    return <button ref={ref as React.ForwardedRef<HTMLButtonElement>} className={classes} {...props} />;
  }
);
Button.displayName = "Button";

const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm overflow-hidden", className)} {...props} />
);
const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-6 md:p-8", className)} {...props} />
);

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={cn("text-sm font-semibold text-slate-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block", className)} {...props} />
  )
);
Label.displayName = "Label";

interface SelectProps {
  name?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  required?: boolean;
  children: React.ReactNode;
}

interface SelectContentProps {
  children: React.ReactNode;
}

interface SelectItemProps {
  value: string;
  children: string;
}

const Select = ({ name, value, onValueChange, required, children }: SelectProps) => {
  const [internalValue, setInternalValue] = useState(value || "");
  
  useEffect(() => {
    if (value !== undefined) setInternalValue(value);
  }, [value]);

  const options: { value: string; label: string }[] = [];
  
  React.Children.forEach(children, child => {
    if (React.isValidElement(child)) {
      const childType = child.type as unknown as { displayName?: string; name?: string };
      const componentName = childType?.displayName || childType?.name;

      if (componentName === 'SelectContent') {
        const contentChild = child as React.ReactElement<SelectContentProps>;
        React.Children.forEach(contentChild.props.children, itemChild => {
          if (React.isValidElement(itemChild)) {
            const itemChildType = itemChild.type as unknown as { displayName?: string; name?: string };
            const itemComponentName = itemChildType?.displayName || itemChildType?.name;

            if (itemComponentName === 'SelectItem') {
              const selectItemChild = itemChild as React.ReactElement<SelectItemProps>;
              options.push({ value: selectItemChild.props.value, label: selectItemChild.props.children });
            }
          }
        });
      }
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInternalValue(e.target.value);
    if (onValueChange) onValueChange(e.target.value);
  };

  return (
    <select 
      name={name} 
      value={internalValue} 
      onChange={handleChange}
      required={required}
      className={cn(
        "flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
      )}
    >
      {options.map((opt, i) => <option key={i} value={opt.value}>{opt.label}</option>)}
    </select>
  );
};

const SelectTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>;
SelectTrigger.displayName = "SelectTrigger";
const SelectValue = ({ placeholder }: { placeholder?: string }) => <>{placeholder}</>;
SelectValue.displayName = "SelectValue";
const SelectContent = ({ children }: { children: React.ReactNode }) => <>{children}</>;
SelectContent.displayName = "SelectContent";
const SelectItem = ({ children }: { children: React.ReactNode; value: string }) => <>{children}</>;
SelectItem.displayName = "SelectItem";

// Custom Toggle Switch Component
const Switch = ({ checked, onChange, label, description }: { checked: boolean, onChange: (val: boolean) => void, label: string, description?: string }) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex flex-col pr-4">
      <span className="text-sm font-semibold text-slate-800">{label}</span>
      {description && <span className="text-xs text-slate-500 mt-0.5">{description}</span>}
    </div>
    <button 
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
        checked ? "bg-indigo-600" : "bg-slate-200"
      )}
    >
      <span className={cn(
        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
        checked ? "translate-x-5" : "translate-x-0"
      )} />
    </button>
  </div>
);


// --- Main Component ---
export default function SettingsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Profile State
  const [userName, setUserName] = useState("Dr. Rakesh Kumar");
  const [facilityName, setFacilityName] = useState("Bokaro General MTC");
  const [email, setEmail] = useState("rakesh.mtc@jharkhand.gov.in");
  const [phone, setPhone] = useState("9876543210");

  // Preferences State
  const [language, setLanguage] = useState("en");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API delay
    setTimeout(() => {
      toast.success("Settings updated successfully!");
      setIsSaving(false);
    }, 1000);
  };

  const handleExportData = () => {
    // Collect all local storage data created by this app
    const exportData = {
      patients: JSON.parse(localStorage.getItem('registeredChildren') || '[]'),
      maternalRecords: JSON.parse(localStorage.getItem('maternalNutritionRecords') || '[]'),
      compensation: JSON.parse(localStorage.getItem('compensationRecords') || '[]'),
      exportedAt: new Date().toISOString(),
      facility: facilityName
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `MTC_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    toast.success("Database exported to JSON!");
  };

  const handleClearData = () => {
    const isConfirmed = window.confirm(
      "CRITICAL WARNING: This will permanently delete ALL registered patients, maternal records, and compensation data from this browser. This action cannot be undone.\n\nAre you sure you want to proceed?"
    );

    if (isConfirmed) {
      localStorage.removeItem('registeredChildren');
      localStorage.removeItem('maternalNutritionRecords');
      localStorage.removeItem('compensationRecords');
      toast.success("All local databases have been cleared.");
      // Force reload to clear memory
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  if (!mounted) return null;

  interface SectionTitleProps {
    icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
    title: string;
    description?: string;
  }

  const SectionTitle = ({ icon: Icon, title, description }: SectionTitleProps) => (
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
      <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Icon size={20} strokeWidth={2.5} /></div>
      <div>
        <h2 className="text-lg font-bold text-slate-800">{title}</h2>
        {description && <p className="text-sm text-slate-500 mt-0.5">{description}</p>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 flex items-center">
          <Button variant="ghost" onClick={() => router.back()} className="pl-0 text-slate-500">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <Settings className="text-slate-700 h-8 w-8" />
            System Settings
          </h1>
          <p className="mt-2 text-sm text-slate-500">Manage your profile, application preferences, and local data.</p>
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-6">
          
          {/* Profile Section */}
          <Card className="border-0 shadow-sm border-t-4 border-t-indigo-500">
            <CardContent className="p-6 sm:p-8">
              <SectionTitle icon={User} title="User Profile" description="Update your personal and facility details." />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Full Name</Label>
                  <Input value={userName} onChange={(e) => setUserName(e.target.value)} required />
                </div>
                <div>
                  <Label>Facility / MTC Name</Label>
                  <div className="relative">
                    <Input value={facilityName} onChange={(e) => setFacilityName(e.target.value)} required className="pl-10" />
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  </div>
                </div>
                <div>
                  <Label>Email Address</Label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={10} required />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <SectionTitle icon={Globe} title="Regional Preferences" />
                <div className="space-y-4">
                  <div>
                    <Label>System Language</Label>
                    <Select name="language" value={language} onValueChange={setLanguage}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English (Default)</SelectItem>
                        <SelectItem value="hi">Hindi (हिंदी)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Timezone</Label>
                    <Input disabled value="Asia/Kolkata (IST)" className="bg-slate-100" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <SectionTitle icon={Bell} title="Notifications & Automation" />
                <div className="divide-y divide-slate-100">
                  <Switch 
                    label="Email Alerts" 
                    description="Receive daily patient admission summaries."
                    checked={emailAlerts} 
                    onChange={setEmailAlerts} 
                  />
                  <Switch 
                    label="SMS Alerts" 
                    description="Get SMS for critical patient status changes."
                    checked={smsAlerts} 
                    onChange={setSmsAlerts} 
                  />
                  <Switch 
                    label="Auto-Save Drafts" 
                    description="Automatically save form progress."
                    checked={autoSave} 
                    onChange={setAutoSave} 
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={isSaving} className="min-w-[140px]">
              {isSaving ? "Saving..." : <><Save className="w-4 h-4 mr-2" /> Save Settings</>}
            </Button>
          </div>
        </form>

        {/* Danger Zone / Data Management */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Database className="text-slate-600" /> Database Management
          </h3>

          <Card className="border border-red-100 bg-red-50/30 shadow-none">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                
                <div className="flex-1">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Download className="text-indigo-600 h-5 w-5" /> Export Data Backup
                  </h4>
                  <p className="text-sm text-slate-660 mt-1 max-w-md">
                    Download a JSON copy of all registered patients, maternal assessments, and compensation records stored in this browser.
                  </p>
                </div>
                <Button type="button" variant="outline" onClick={handleExportData} className="border-indigo-200 text-indigo-700 bg-white hover:bg-indigo-50 shrink-0">
                  Export JSON
                </Button>

              </div>

              <div className="h-px bg-red-100 my-6 w-full"></div>

              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-base font-bold text-red-700 flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5" /> Factory Reset
                  </h4>
                  <p className="text-sm text-red-600/80 mt-1 max-w-md">
                    Permanently wipe all locally stored database records. Make sure to export a backup first. This action is irreversible.
                  </p>
                </div>
                <Button type="button" variant="danger" onClick={handleClearData} className="shrink-0">
                  <Trash2 className="w-4 h-4 mr-2" /> Clear All Data
                </Button>
              </div>

            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}