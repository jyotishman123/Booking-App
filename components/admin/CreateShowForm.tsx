"use client";

import React, { useState } from "react";
import supabase from "@/config/supabase";

const CreateShowForm = () => {
  const [formData, setFormData] = useState({
    showName: "",
    description: "",
    time: "",
    address: "",
    imageUrl: "",
  });

  const [uploading, setUploading] = useState(false);
  const [requesting, setRequesting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
       setRequesting(true)
        
       const response = await fetch(`/api/createshow`,{
          method:"POST",
          body:JSON.stringify(formData)
       })

        if (response.status !== 200) {
            alert("Failed to Create the Show")
            setRequesting(false)
        }

        window.location.href = "/admin/dashboard";

    } catch (error) {
        console.log(error)
        alert("SomeThing Went Wrong")
        setRequesting(false)
    } finally {
        setRequesting(false)
    }
  };


   



  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploading(true);
      const file = e?.target?.files?.[0];
      const { data, error } = await supabase.storage
        .from("bookingApp")
        .upload(`${file.name}`, file);
      if (error) {
        alert("Error uploading file");
        setUploading(false);
        return;
      } else {
        const { data: file } = await supabase.storage
          .from("bookingApp")
          .getPublicUrl(data?.path);
        setFormData((prevState) => ({
          ...prevState,
          imageUrl: file.publicUrl,
        }));
        setUploading(false);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Create Show</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Show Name */}
        <div>
          <label
            htmlFor="showName"
            className="block text-sm font-medium text-gray-700"
          >
            Show Name
          </label>
          <input
            type="text"
            id="showName"
            name="showName"
            value={formData.showName}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            required
          />
        </div>

        {/* Time */}
        <div>
          <label
            htmlFor="time"
            className="block text-sm font-medium text-gray-700"
          >
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            required
          />
        </div>

        {/* Custom Upload Button */}

        {formData?.imageUrl.length > 5 && (
          <div>
            <p>Preview Image</p>
            <input
              type="text"
              readOnly
              value={formData?.imageUrl}
              className="bg-slate-100 py-2 px-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
        )}

        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            required
          />
          <button
            type="button"
            className="w-full bg-orange-600 py-2 px-4 text-white rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            disabled={uploading}
          >
            {uploading ? "Uploading Image" : "Upload Image"}
          </button>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-slate-900 py-2 px-4 text-white rounded-md hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            disabled={uploading || requesting}
          >
            Create Show
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateShowForm;
