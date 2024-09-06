"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import blogCategories from "@/static/blogCategoryList";
import { TagsInput } from "react-tag-input-component";
import { Button } from "@/components/ui/button";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storageDB } from "@/config/firebase";
import { db } from "@/config/db";
import { BlogPost } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// Import ReactQuill dynamically with SSR disabled
const ReactQuill =
  typeof window !== "undefined" ? require("react-quill") : () => null;
import "react-quill/dist/quill.snow.css";

const BlogCreatePage = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [blogContent, setBlogContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [file, setFile] = useState<File | undefined>();
  const [category, setCategory] = useState<string>("");
  const [loader, setLoader] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { isLoaded, isSignedIn, user: authUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Set to true when component is mounted on the client
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    setLoader(true);

    // Create a reference to the storage location
    const fileRef = ref(storageDB, `blogs/${file.name}`);

    try {
      // Upload the file to Firebase Storage
      const uploadResult = await uploadBytes(fileRef, file);

      // Get the file URL from Firebase Storage
      const fileURL = await getDownloadURL(uploadResult.ref);
      console.log("File uploaded successfully. Download URL:", fileURL);

      if (fileURL) {
        try {
          // @ts-ignore
          const result = await db.insert(BlogPost).values({
            title: title,
            category: category,
            tags: selected,
            content: blogContent,
            createdBy: authUser?.primaryEmailAddress?.emailAddress,
            author: authUser?.fullName || "Tabish",
            coverImageUrl: fileURL,
          });
          console.log(result);
          setLoader(false);
          router.push("/blog");
        } catch (error) {
          console.log("Uploading to db main errorir is ", error);
          setLoader(false);
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoader(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-20">
      <div className="shadow-md p-10">
        <div className="grid md:grid-cols-2 items-center gap-4 justify-center">
          <div>
            <Label className="">Title</Label>
            <Input
              type="text"
              placeholder="Blog Title"
              className="mt-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="category" className="block mb-2">
              Category
            </Label>
            <Select onValueChange={(e: string) => setCategory(e)}>
              <SelectTrigger className="">
                <SelectValue placeholder="Category" className="" />
              </SelectTrigger>
              <SelectContent className="">
                {blogCategories.map((item, index) => (
                  <SelectItem value={item.name} key={index} className="">
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid-cols-12 my-5">
          <Label className="block mb-2">Blog Tags</Label>
          <TagsInput
            value={selected}
            onChange={setSelected}
            name="tags"
            placeHolder="Enter tags"
          />
        </div>
        <div className="my-4 grid-cols-12">
          {isClient && (
            <ReactQuill
              style={{ height: 200 }}
              theme="snow"
              value={blogContent}
              onChange={setBlogContent}
              className="min-h-[40vh]"
            />
          )}
        </div>
        <div className="grid md:grid-cols-12 mt-8">
          <Input
            type="file"
            className="mt-3 w-[800px] block"
            onChange={(e) =>
              setFile(e.target.files ? e.target.files[0] : undefined)
            }
          />
        </div>

        <Button
          className="w-full my-5"
          onClick={handleUpload}
          disabled={loader}
          size={"lg"}
        >
          {loader ? "Uploading" : "Upload"}
        </Button>
      </div>
    </div>
  );
};

export default BlogCreatePage;
