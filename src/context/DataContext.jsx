import { createContext, useState, useCallback, useEffect } from "react";
import { Client, Databases, Storage } from "appwrite";
import conf from "./../conf/conf"; // Adjust the import path as needed

// Create the DataContext
export const DataContext = createContext();

// DataProvider component to fetch and provide data
export const DataProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Initialize Appwrite client
    const client = new Client();
    client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId);

    const databases = new Databases(client);
    const storage = new Storage(client);

    // Function to fetch posts from Appwrite collection
    const fetchPosts = useCallback(async () => {
        setLoading(true);
        try {
            const response = await databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId
            );
            const postsWithImages = await Promise.all(
                response.documents.map(async (post) => {
                    let imageUrls = [];
                    if (post.imageIds && Array.isArray(post.imageIds)) {
                        // Fetch URLs for all image IDs in the imageIds array
                        imageUrls = await Promise.all(
                            post.imageIds.map(async (imageId) => {
                                try {
                                    const file = await storage.getFileView(
                                        conf.appWriteBucketId,
                                        imageId
                                    );
                                    return file.href;
                                } catch (err) {
                                    console.error(`Error fetching image ${imageId}:`, err);
                                    return null;
                                }
                            })
                        );
                        // Filter out any null URLs
                        imageUrls = imageUrls.filter((url) => url !== null);
                    }
                    return { ...post, imageUrls };
                })
            );
            setPosts(postsWithImages);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching posts:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Function to fetch rooms from Appwrite collection
    const fetchRooms = useCallback(async () => {
        setLoading(true);
        try {
            const response = await databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionIdRooms
            );
            setRooms(response.documents);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching rooms:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch data when the component mounts
    useEffect(() => {
        fetchPosts();
        fetchRooms();
    }, [fetchPosts, fetchRooms]);

    return (
        <DataContext.Provider
            value={{
                posts,
                rooms,
                loading,
                error,
                fetchPosts,
                fetchRooms,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default conf;