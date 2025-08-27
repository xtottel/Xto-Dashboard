// app/settings/business/page.tsx
"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ChevronLeft,
  Upload,
  Image as Image2,
  Globe,
  Building2,
  Landmark,
  Plus,
  X,
  FileText,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define types for our new data structures
interface Director {
  id: string;
  name: string;
  position: string;
  telephone: string;
  idFile: string | null;
}


export default function BusinessProfilePage() {
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [businessType, setBusinessType] = useState("private");
  const [businessSector, setBusinessSector] = useState("IT Services");

  // State for new compliance sections
  const [directors, setDirectors] = useState<Director[]>([
    { id: "1", name: "", position: "", telephone: "", idFile: null },
  ]);
  const directorIdRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit
        toast.error("Logo size should be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Handler for compliance document uploads

  // Handler for director ID uploads
  const handleDirectorIdUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error("File size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const updatedDirectors = [...directors];
        updatedDirectors[index].idFile = event.target?.result as string;
        setDirectors(updatedDirectors);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add a new director field
  const addDirector = () => {
    if (directors.length >= 5) {
      toast.error("Maximum of 5 directors allowed");
      return;
    }
    setDirectors([
      ...directors,
      {
        id: Date.now().toString(),
        name: "",
        position: "",
        telephone: "",
        idFile: null,
      },
    ]);
  };

  // Remove a director
  const removeDirector = (index: number) => {
    if (directors.length <= 1) {
      toast.error("At least one director is required");
      return;
    }
    const updatedDirectors = [...directors];
    updatedDirectors.splice(index, 1);
    setDirectors(updatedDirectors);
  };

  // Remove a compliance document
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [businessCertificate, setBusinessCertificate] = useState<any | null>(
    null
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formADocuments, setFormADocuments] = useState<any[]>([]);
  const [allInOne, setAllInOne] = useState(false);

  function handleBusinessCertUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusinessCertificate({
      id: Date.now(),
      name: file.name,
      preview: URL.createObjectURL(file),
    });
  }

  function handleFormAUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (allInOne) {
      const file = files[0];
      if (!file) return;
      setFormADocuments([
        { id: Date.now(), name: file.name, preview: URL.createObjectURL(file) },
      ]);
    } else {
      const newDocs = files.slice(0, 3 - formADocuments.length).map((file) => ({
        id: Date.now() + Math.random(),
        name: file.name,
        preview: URL.createObjectURL(file),
      }));
      setFormADocuments((prev) => [...prev, ...newDocs]);
    }
  }

  function removeFormADocument(id: number) {
    setFormADocuments((prev) => prev.filter((doc) => doc.id !== id));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate directors
    const invalidDirectors = directors.filter(
      (d) => !d.name || !d.position || !d.telephone || !d.idFile
    );
    if (invalidDirectors.length > 0) {
      toast.error(
        "Please complete all director information including ID upload"
      );
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Business profile updated successfully");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/home/settings">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Business Profile
          </h1>
          <p className="text-muted-foreground">
            Update your company details, compliance information and branding
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Company Branding Section */}
          <Card>
            <CardHeader>
              <CardTitle>Company Branding</CardTitle>
              <CardDescription>
                Upload your logo and set brand colors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <Avatar className="h-24 w-24 rounded-lg">
                    <AvatarImage src={logo || "/Sendexa.jpg"} />
                    <AvatarFallback>
                      <Building2 className="h-12 w-12 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2 shadow-sm hover:bg-primary/90 transition-colors group-hover:opacity-100 opacity-0"
                  >
                    <Image2 className="h-4 w-4 text-white" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleLogoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={triggerFileInput}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Logo
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    JPG, GIF or PNG. Max 2MB. Recommended: 500x500px
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Information Section */}
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" defaultValue="Sendexa Inc" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyDescription">Company Description</Label>
                <Textarea
                  id="companyDescription"
                  defaultValue="Leading SMS communication platform in Ghana"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select value={businessType} onValueChange={setBusinessType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sole">Sole Proprietorship</SelectItem>
                      <SelectItem value="private">Private Limited</SelectItem>
                      <SelectItem value="public">Public Limited</SelectItem>
                      <SelectItem value="ngo">NGO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessSector">Business Sector</Label>
                  <Select
                    value={businessSector}
                    onValueChange={setBusinessSector}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select business Sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IT Services">IT Services</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Retail">Retail</SelectItem>
                      <SelectItem value="Manufacturing">
                        Manufacturing
                      </SelectItem>
                      <SelectItem value="Hospitality">Hospitality</SelectItem>
                      <SelectItem value="Transportation">
                        Transportation
                      </SelectItem>
                      <SelectItem value="Real Estate">Real Estate</SelectItem>
                      <SelectItem value="Consulting">Consulting</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Input id="address" defaultValue="123 Business Ave, Accra" />
              </div>
            </CardContent>
          </Card>

          {/* Contact  Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Company Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="ceo@sendexa.co"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Company Phone</Label>
                  <Input id="phone" type="tel" defaultValue="0551196764" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="website"
                      type="url"
                      defaultValue="https://sendexa.co"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax Identification Number</Label>
                  <div className="flex items-center gap-2">
                    <Landmark className="h-4 w-4 text-muted-foreground" />
                    <Input id="taxId" defaultValue="C123456789" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* NEW: Compliance Documents Section */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Documents</CardTitle>
              <CardDescription>
                Upload company registration documents (Business Certificate &
                Form A)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Business Certificate (1 file only) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Business Certificate</Label>
                  <span className="text-sm text-muted-foreground">
                    {businessCertificate ? "1/1 file" : "0/1 file"}
                  </span>
                </div>

                {businessCertificate ? (
                  <div className="relative border rounded-md p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm truncate">
                        {businessCertificate.name}
                      </p>
                    </div>
                    {businessCertificate.preview && (
                      <div className="aspect-video bg-muted rounded-md overflow-hidden">
                        <Image
                          src={businessCertificate.preview}
                          alt={businessCertificate.name}
                          className="object-contain w-full h-full"
                          width={400}
                          height={300}
                        />
                      </div>
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => setBusinessCertificate(null)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Input
                      type="file"
                      id="business-cert"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleBusinessCertUpload(e)}
                    />
                    <Label htmlFor="business-cert" className="cursor-pointer">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">
                            Click to upload certificate
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PDF, JPG, PNG up to 5MB
                          </p>
                        </div>
                      </div>
                    </Label>
                  </div>
                )}
              </div>

              {/* Form A (up to 3 files OR single file if checkbox selected) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Form A</Label>
                  <span className="text-sm text-muted-foreground">
                    {allInOne
                      ? formADocuments.length > 0
                        ? "1/1 file"
                        : "0/1 file"
                      : `${formADocuments.length}/3 files`}
                  </span>
                </div>

                {/* Checkbox: All 3 in one */}
                <div className="flex items-center space-x-2">
                  <input
                    id="all-in-one"
                    type="checkbox"
                    checked={allInOne}
                    onChange={(e) => {
                      setAllInOne(e.target.checked);
                      setFormADocuments([]); // reset if user toggles
                    }}
                    className="h-4 w-4 border-gray-300 rounded"
                  />
                  <Label htmlFor="all-in-one" className="text-sm">
                    All 3 pages are in one file
                  </Label>
                </div>

                {formADocuments.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {formADocuments.map((doc) => (
                      <div
                        key={doc.id}
                        className="relative border rounded-md p-3"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm truncate">{doc.name}</p>
                        </div>
                        {doc.preview && (
                          <div className="aspect-video bg-muted rounded-md overflow-hidden">
                            <Image
                              src={doc.preview}
                              alt={doc.name}
                              width={400}
                              height={300}
                              className="object-contain w-full h-full"
                            />
                          </div>
                        )}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6"
                          onClick={() => removeFormADocument(doc.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {(allInOne
                  ? formADocuments.length < 1
                  : formADocuments.length < 3) && (
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Input
                      type="file"
                      id="form-a-docs"
                      className="hidden"
                      multiple={!allInOne}
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFormAUpload(e)}
                    />
                    <Label htmlFor="form-a-docs" className="cursor-pointer">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">
                            Click to upload Form A
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {allInOne
                              ? "1 file (PDF, JPG, PNG up to 5MB)"
                              : "Up to 3 files (PDF, JPG, PNG max 5MB each)"}
                          </p>
                        </div>
                      </div>
                    </Label>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* NEW: Directors Information Section */}
          <Card>
            <CardHeader>
              <CardTitle>Directors Information</CardTitle>
              <CardDescription>
                Add details of company directors and upload their national ID
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {directors.map((director, index) => (
                <div
                  key={director.id}
                  className="border rounded-lg p-4 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Director {index + 1}</h3>
                    {directors.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeDirector(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`director-name-${index}`}>
                        Full Name
                      </Label>
                      <Input
                        id={`director-name-${index}`}
                        value={director.name}
                        onChange={(e) => {
                          const updatedDirectors = [...directors];
                          updatedDirectors[index].name = e.target.value;
                          setDirectors(updatedDirectors);
                        }}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`director-position-${index}`}>
                        Position
                      </Label>
                      <Input
                        id={`director-position-${index}`}
                        value={director.position}
                        onChange={(e) => {
                          const updatedDirectors = [...directors];
                          updatedDirectors[index].position = e.target.value;
                          setDirectors(updatedDirectors);
                        }}
                        placeholder="Managing Director"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`director-tel-${index}`}>Telephone</Label>
                      <Input
                        id={`director-tel-${index}`}
                        type="tel"
                        value={director.telephone}
                        onChange={(e) => {
                          const updatedDirectors = [...directors];
                          updatedDirectors[index].telephone = e.target.value;
                          setDirectors(updatedDirectors);
                        }}
                        placeholder="+233 XX XXX XXXX"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>National ID Document</Label>
                      <div className="flex items-center gap-4">
                        {director.idFile ? (
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">ID uploaded</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                const updatedDirectors = [...directors];
                                updatedDirectors[index].idFile = null;
                                setDirectors(updatedDirectors);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <Input
                              type="file"
                              id={`director-id-${index}`}
                              className="hidden"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => handleDirectorIdUpload(e, index)}
                              ref={(el) => {
                                directorIdRefs.current[index] = el;
                              }}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() =>
                                directorIdRefs.current[index]?.click()
                              }
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              Upload ID
                            </Button>
                          </>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        PDF, JPG, PNG up to 5MB
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addDirector}
                disabled={directors.length >= 5}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Another Director
              </Button>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" asChild>
              <Link href="/home/settings">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
