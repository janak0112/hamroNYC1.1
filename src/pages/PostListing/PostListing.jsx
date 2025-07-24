import React, { useState, useEffect } from 'react';
import authService from '../../appwrite/auth'; // Adjust the path to your AuthService file
import listingService from '../../appwrite/config';
import storageService from '../../appwrite/storage';

function PostListing() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [images, setImages] = useState([]); // store multiple files
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null); // State to store userId

  // Fetch the current user's ID when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          setUserId(user.$id); // Store the userId
        } else {
          setError('You must be logged in to create a listing.');
        }
      } catch (err) {
        console.error('❌ Error fetching user:', err);
        setError('You must be logged in to create a listing.');
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check if userId is available
    if (!userId) {
      setError('You must be logged in to create a listing.');
      return;
    }

    // Validate required fields
    if (!title || !description || !category || !contact) {
      setError('Please fill in all required fields.');
      return;
    }

    // Upload the image (if any) and capture its $id
    let imageIds = null;

    if (images.length > 0) {
      try {
        for (const file of images) {
          const uploaded = await storageService.uploadFile(file);
          imageIds=uploaded;
          console.log("uploaded", typeof uploaded)
        }
      } catch (err) {
        console.error('❌ Error uploading images:', err);
        setError('Failed to upload images. Please try again.');
        return;
      }
    }

    console.log("imageIds",imageIds)


    try {
      const newListing = {
        title,
        description,
        category,
        price,
        location,
        contact,
        imageIds,
        userId, // Include userId in the listing data
      };

      const response = await listingService.createListing(newListing);
      alert('✅ Listing created successfully!');
      console.log('Created listing response:', response);

      // Reset form
      setTitle('');
      setDescription('');
      setCategory('');
      setPrice('');
      setLocation('');
      setContact('');
      setImages([]);
    } catch (err) {
      console.error('❌ Error creating listing:', err);
      alert('Failed to create listing.');
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-xl rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-2">Create a New Listing</h1>
        <p className="text-center text-gray-600 mb-4">
          Share opportunities, services, or events with the Nepali community in NYC.
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-center text-red-600 font-medium mb-4">{error}</p>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a clear, descriptive title"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed information about your listing"
              className="w-full border border-gray-300 rounded-md px-4 py-2 h-24 resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            >
              <option value="">Select a category</option>
              <option value="housing">Housing</option>
              <option value="job">Job</option>
              <option value="event">Event</option>
              <option value="service">Service</option>
            </select>
          </div>

          {/* Price and Location */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g., $50 or Free"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Queens, NY"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium mb-1">Contact</label>
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Your email or phone"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Image (optional)</label>
            <input
              type="file"
              multiple
              onChange={(e) => setImages([...e.target.files])} // store all files in an array
              className="w-full border border-dashed border-gray-300 rounded-md px-4 py-2"
            />

          </div>

          {/* Buttons */}
          <div className="flex space-x-4 mt-6">
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
              disabled={!userId} // Disable button if user is not authenticated
            >
              Create Listing
            </button>
            <button
              type="button"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md"
              onClick={() => {
                console.log('Form cancelled.');
                setTitle('');
                setDescription('');
                setCategory('');
                setPrice('');
                setLocation('');
                setContact('');
                setImage(null);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostListing;