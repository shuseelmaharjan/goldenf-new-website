import { useEffect, useState } from "react";
import apiClient from "../apiClient";

const useUserConfig = () => {
    const [userID, setUserId] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');

                if (!accessToken) {
                    console.error('No access token found');
                    return;
                }

                const response = await apiClient.get('user-auth/user-detail/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setUserId(response.data.id);
                setUsername(response.data.username);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserData();
    }, []); // Add an empty dependency array to run only on mount

    return {userID, username};
};

export default useUserConfig;
