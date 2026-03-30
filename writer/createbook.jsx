import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "./dashvavigation";

export function CreateBook() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [languages, setLanguages] = useState([]); 
  const [language, setLanguage] = useState("");   

  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const [coverImage, setCoverImage] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [priceCoins, setPriceCoins] = useState(10);
  const [error, setError] = useState("");


  useEffect(() => {
    axios.get("http://localhost/project/PHP/get_book_meta.php")
      .then(res => {
        setLanguages(res.data.languages); 
        setTags(res.data.tags);
      })
      .catch(err => console.log(err));
  }, []);

  
  const handleTagChange = (id) => {
    if (selectedTags.includes(id)) {
      setSelectedTags(selectedTags.filter(t => t !== id));
    } else {
      setSelectedTags([...selectedTags, id]);
    }
  };

  //  Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("language", language); 
      formData.append("cover_image", coverImage);
      formData.append("is_premium", isPremium ? 1 : 0);
      formData.append("price_coins", priceCoins);

      selectedTags.forEach(tag => {
        formData.append("tags[]", tag);
      });

    await axios.post("http://localhost/project/PHP/create_book.php", formData, {
  withCredentials: true
});
      alert("Book created!");
      window.location.href = "/writer/Writerstudio";
    } catch (err) {
      setError("Something went wrong");
      console.log(err);
    }
  };

  return (
    <DashboardLayout type="writer">
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-2">Create New Book</h2>
          <p className="text-gray-500 mb-6">Start your new writing project</p>

          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Title */}
            <div>
              <label className="block font-medium">Book Title *</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium">Description</label>
              <textarea
                rows="4"
                className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/*  LANGUAGE */}
            <div>
              <label className="block font-medium">Language</label>
              <select
                className="w-full border rounded-lg p-2 mt-1"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="">Select Language</option>

                {languages.map(lang => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Cover Image */}
            <div>
              <label className="block font-medium">Cover Image</label>
              <input
                type="file"
                className="w-full border rounded-lg p-2 mt-1"
                onChange={(e) => setCoverImage(e.target.files[0])}
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block font-medium mb-2">Tags</label>

              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <label
                    key={tag.id}
                    className={`cursor-pointer px-3 py-1 rounded-full border text-sm transition
                      ${
                        selectedTags.includes(tag.id)
                          ? "bg-[#b13a2d] text-white border-[#b13a2d]"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={selectedTags.includes(tag.id)}
                      onChange={() => handleTagChange(tag.id)}
                    />
                    {tag.name}
                  </label>
                ))}
              </div>
            </div>

            {/* Premium */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isPremium}
                onChange={() => setIsPremium(!isPremium)}
              />
              <label>Premium Book</label>
            </div>

            {isPremium && (
              <div>
                <label>Coins per Chapter</label>
                <input
                  type="number"
                  value={priceCoins}
                  onChange={(e) => setPriceCoins(e.target.value)}
                  className="w-full border rounded-lg p-2 mt-1"
                />
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#b13a2d] text-white py-2 rounded-lg hover:bg-[#9a3124] transition"
            >
              Create Book
            </button>

          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CreateBook;