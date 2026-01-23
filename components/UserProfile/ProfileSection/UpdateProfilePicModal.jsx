import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { LoaderContext } from "@/context/LoaderContext";
import { useToast } from "@/hooks/use-toast";
import { uploadFiles } from "@/lib/uploadThing";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Camera, Loader2, Minus, Pencil, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import dynamic from "next/dynamic";
const Avatar = dynamic(() => import("react-avatar-edit"), { ssr: false });
import Cropper from "react-easy-crop";
import { Separator } from "@/components/ui/Separator";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Slider } from "@/components/ui/Slider";
import { Icons } from "@/components/utils/Icons";
import getCroppedImg from "@/lib/crop-image";
import { getProfilePicsSuggestion } from "@/actions/get-profilepics-suggestion";
import { useSession } from "next-auth/react";
import Image from "next/image";

const UpdateProfilePicModal = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);
  const [orientation, setOrientation] = useState();

  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const textAreaContainerRef = useRef(null);
  const router = useRouter();
  const [descriptionToggle, setDescriptionToggle] = useState(false);
  const { setIsLoading, setLoaderDescription } = useContext(LoaderContext);
  const { toast } = useToast();
  const [src, setSrc] = useState(
    "https://utfs.io/f/dfc00bb0-e905-45e1-a6b3-b8794eedd42e-naku7h.webp",
  );
  const [toggleUpload, setToggleUpload] = useState(false);
  const avatarRef = useRef(null);
  const [file, setFile] = useState({
    name: "",
    type: "",
  });
  const [open, setOpen] = useState(false);
  const [newfile, setNewfile] = useState();

  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        textAreaContainerRef.current &&
        !textAreaContainerRef.current.contains(event.target)
      ) {
        setDescriptionToggle(false);
      }
    }

    if (descriptionToggle) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [descriptionToggle]);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    const img = new window.Image();

    setOriginalFile(file);
    setImageSrc(objectUrl);

    img.onload = () => {
      if (img.width > img.height) setOrientation("landscape");
      else if (img.height > img.width) setOrientation("portrait");
      else setOrientation("square");
    };

    img.src = objectUrl;
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to calculate correctly
      textarea.style.height = "auto";
      // Set height to scrollHeight
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const isUserReady = status === "authenticated" && !!userId;

  // fetch user's uploaded images so that user can choose between their past  or uploaded images in using it as profile pic
  const { data: profilePicSuggestions } = useQuery({
    queryKey: ["profilepicsuggestions", { userId }],
    queryFn: async () => await getProfilePicsSuggestion(userId),
    enabled: isUserReady && open,
  });

  console.log(orientation, "orientation");

  const onClose = () => {
    setToggleUpload(false);
  };

  const FileLoad = (e) => {
    setFile({ ...file, name: e.name, type: e.type });
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  console.log(originalFile, "original file");

  const { mutate: save, isPending } = useMutation({
    mutationFn: async () => {
      if (!originalFile) return;

      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);

      const croppedFile = new File([croppedBlob], originalFile.name, {
        type: croppedBlob.type,
      });

      const [uploaded] = await uploadFiles("imageUploader", {
        files: [croppedFile],
      });

      const [originalImageUploaded] = await uploadFiles("imageUploader", {
        files: [originalFile],
      });

      const payload = {
        imageUrl: uploaded,
        originalImage: originalImageUploaded,
      };

      const { data } = await axios.post(
        "/api/userProf/updateProfilePic",
        payload,
      );

      return data;
    },
    onMutate: () => {
      setIsLoading(true);
      setLoaderDescription("Updating profile picture...");
    },
    onSuccess: () => {
      setToggleUpload(false);
      setOpen(false);
      router.refresh();
    },
    onError: (err) => {
      console.log(err, "err");
      toast({
        title: "Error",
        description: "Error uploading file",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  return (
    <Dialog
      open={open}
      className="z-10"
      onOpenChange={() => {
        setToggleUpload(false);
        setOpen((prevState) => !prevState);
      }}
    >
      <DialogTrigger>
        <div className="flex items-center ">
          <Camera className="text-neutral-50 h-8 w-8 fill-black dark:fill-neutral-200 dark:stroke-neutral-700 dark:hover:stroke-neutral-600" />
        </div>
      </DialogTrigger>
      <DialogContent className="[&>button]:hidden rounded-xl p-0 min-w-[44rem]  outline-none  shadow-md drop-shadow-md text-white border-none z-50">
        <DialogHeader className="pt-4 relative">
          <DialogTitle className="text-xl text-center font-bold text-black">
            Choose profile picture
          </DialogTitle>
          <DialogClose asChild>
            <X className="w-9 h-9 absolute right-4 top-1 cursor-pointer p-1.5 bg-neutral-300 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-full" />
          </DialogClose>
        </DialogHeader>

        <Separator className="dark:bg-neutral-700  h-[0.1px] bg-neutral-400/60" />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{ display: "none" }}
        />

        <div className=" py-1  space-y-2">
          {/* profile edit */}
          {imageSrc && descriptionToggle && (
            <div
              ref={textAreaContainerRef}
              className={`border-2  rounded-2xl pt-2 px-3 mx-4 ${
                descriptionToggle ? "border-blue-600" : "border-neutral-400/60"
              }`}
            >
              <Label className="text-[13px] text-blue-600 font-normal">
                Description
              </Label>
              <Textarea
                ref={textareaRef}
                onInput={handleInput}
                autoFocus
                className="border-none p-0 text-black resize-none mb-2 overflow-hidden "
              />
            </div>
          )}

          {imageSrc && !descriptionToggle && (
            <div
              onClick={() => setDescriptionToggle(true)}
              className="border border-neutral-400/60 rounded-2xl pt-3 px-3 mx-4 pb-10 cursor-pointer"
            >
              <Label className="text-neutral-800 text-[15px] font-light  ">
                Description
              </Label>
            </div>
          )}

          {imageSrc ? (
            <div className="">
              <div className="flex flex-col items-center justify-center">
                <div
                  style={{
                    position: "relative",
                    width: `${orientation === "landscape" ? "100%" : "300px"}`,
                    height: 300,
                  }}
                >
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    cropShape="round"
                    showGrid={false}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    objectFit="cover"
                  />
                </div>

                <div className="mt-5 flex items-center gap-x-2">
                  <Minus className="text-neutral-800" />
                  <Slider
                    value={[zoom]}
                    min={1}
                    max={3}
                    step={0.1}
                    className="w-[20vw]"
                    onValueChange={(vals) => setZoom(vals[0])}
                  />
                  <Plus className="text-neutral-800" />
                </div>
              </div>

              <div className="flex items-center justify-start gap-x-2 ml-4 mt-4">
                <Icons.earthIcon className="h-4 w-4 fill-neutral-800" />
                <p className="text-neutral-500 ">
                  Your profile picture is public
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center mb-2 gap-x-3 px-2">
              <Button
                className="w-full py-2 bg-blue-400/25 hover:bg-blue-200 flex gap-x-2 rounded-lg"
                onClick={() => {
                  setSrc("");

                  fileInputRef.current?.click();
                }}
              >
                <Plus className="text-blue-600" />
                <span className="text-blue-600 font-semibold text-[15px]">
                  Upload photo
                </span>
              </Button>
              <Button className="bg-neutral-300 hover:bg-neutral-200 rounded-lg">
                <Pencil className="text-transparent fill-neutral-800 h-5 w-5" />
              </Button>
            </div>
          )}

          {previewUrl && (
            <img
              src={previewUrl}
              alt="Avatar preview"
              className="w-24 h-24 rounded-full object-cover"
            />
          )}

          {imageSrc && (
            <Separator className="dark:bg-neutral-700  h-[0.1px] bg-neutral-400/60" />
          )}

          {imageSrc && (
            <div className="flex justify-end gap-x-2 mr-2">
              <Button
                className="text-blue-600 hover:bg-neutral-600 font-semibold"
                variant="ghost"
                onClick={() => {
                  setToggleUpload(false);
                  setImageSrc(null);
                }}
              >
                Cancel
              </Button>

              <Button
                className=" bg-blue-600 hover:bg-blue-400 h-9 w-28 mb-3"
                onClick={save}
              >
                Save
              </Button>
            </div>
          )}

          {/* profile pic suggestions */}
          {profilePicSuggestions && !imageSrc && (
            <div className="px-3 py-2">
              <h2 className="text-black mb-2 font-semibold">
                Profile pictures
              </h2>

              <div className="flex items-center gap-x-3">
                {profilePicSuggestions.map((profilePic, index) => (
                  <Image
                    sizes="100vw"
                    width={0}
                    height={0}
                    src={profilePic.image.url}
                    alt="profile image"
                    referrerPolicy="no-referrer"
                    className="h-32 w-32 transition bg-black rounded-md object-cover"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfilePicModal;
