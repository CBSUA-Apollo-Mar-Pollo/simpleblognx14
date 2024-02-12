import { buttonVariants } from "@/components/ui/Button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { AlertTriangle, MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col items-center justify-center h-screen ">
        <Card className="px-16 py-2">
          <CardHeader className="flex items-center">
            <CardTitle>
              <AlertTriangle className="h-12 w-12 text-red-700" />
            </CardTitle>
            <CardDescription className="text-2xl font-semibold">
              Opps Something went wrong!
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link
              href="/sign-in"
              className={cn(buttonVariants({ variant: "outline" }), "text-xs")}
            >
              <MoveLeftIcon className="mr-2" />
              Back to sign in page
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ErrorPage;
