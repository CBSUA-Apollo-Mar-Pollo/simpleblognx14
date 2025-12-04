"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { completeOnboarding } from "@/actions/completeOnboarding";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const OnboardingClient = () => {
  const router = useRouter();
  const { data: session, update } = useSession();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    handleName: "",
    bio: "",
    birthdate: "",
    image: session?.user?.image || "",
  });

  if (session?.user?.onboarded) {
    router.replace("/");
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await completeOnboarding(formData);

      if (result.success) {
        // Update session
        await update({
          onboarded: true,
        });

        toast({
          title: "Success!",
          description: "Your profile has been created",
          variant: "success",
        });

        router.push("/");
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to complete onboarding",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 lg:h-screen items-center justify-center gap-20">
      {/* Left side - branding */}
      <div className="bg-gray-900 h-full lg:block hidden">
        <div className="absolute top-6 left-7">
          <h1 className="text-4xl font-bold text-white">Estorias</h1>
        </div>
        <div className="flex items-center h-full px-24">
          <h3 className="text-justify text-white leading-loose text-lg">
            "Welcome to Estorias! Complete your profile to get started and
            connect with friends."
          </h3>
        </div>
      </div>

      {/* Right side - form */}
      <div className="lg:mx-auto flex flex-col items-center lg:py-14 py-2 gap-5 lg:w-full w-screen px-7">
        <h1 className="text-3xl font-bold text-slate-800">
          Complete Your Profile
        </h1>
        <p className="text-sm text-slate-600 text-center">
          Tell us a bit about yourself to get started
        </p>

        <form onSubmit={handleSubmit} className="my-4 md:w-96 w-full space-y-4">
          {/* Profile Picture */}
          {formData.image && (
            <div className="flex justify-center">
              <Image
                src={formData.image}
                alt="Profile"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Full Name
            </label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="lg:h-[5vh] h-[6vh] focus-visible:ring-transparent border border-gray-300 focus:border-gray-400 focus:border-2 py-5 dark:bg-white dark:text-neutral-800"
              required
            />
          </div>

          {/* Handle Name / Username */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Username (Handle)
            </label>
            <Input
              type="text"
              name="handleName"
              value={formData.handleName}
              onChange={handleChange}
              placeholder="Your unique username"
              className="lg:h-[5vh] h-[6vh] focus-visible:ring-transparent border border-gray-300 focus:border-gray-400 focus:border-2 py-5 dark:bg-white dark:text-neutral-800"
              required
            />
          </div>

          {/* Bio */}
          <div>
            <label className="text-sm font-medium text-slate-700">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself (optional)"
              className="w-full p-3 border border-gray-300 rounded-md focus:border-gray-400 focus:border-2 focus:outline-none dark:bg-white dark:text-neutral-800"
              rows={3}
            />
          </div>

          {/* Birth Date */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Birth Date
            </label>
            <Input
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              className="lg:h-[5vh] h-[6vh] focus-visible:ring-transparent border border-gray-300 focus:border-gray-400 focus:border-2 py-5 dark:bg-white dark:text-neutral-800"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full mt-4"
          >
            {isLoading ? "Setting up..." : "Complete Profile"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingClient;
