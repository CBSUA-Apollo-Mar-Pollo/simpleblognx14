"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { useToast } from "@/hooks/use-toast";

const NewVerificationForm = () => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const { toast } = useToast();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch((e) => {
        setError("Something went wrong!");
        return toast({
          description: "Something went wrong",
          variant: "destructive",
        });
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-[550px] shadow-md flex flex-col items-center">
        <CardHeader>
          <h2 className="font-bold text-2xl">Confirming your verification</h2>
        </CardHeader>
        <CardContent>
          {!success && !error && <BeatLoader />}
          {success && (
            <p className="text-sm text-red-700 bg-red-200 py-3 px-4 rounded flex items-center">
              {success}
            </p>
          )}

          {!success && (
            <p className="text-sm text-red-700 bg-red-200 py-3 px-4 rounded flex items-center">
              {error}
            </p>
          )}
        </CardContent>

        <CardFooter>
          <Link
            href="/sign-in"
            className={buttonVariants({ variant: "outline" })}
          >
            Back to sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewVerificationForm;
