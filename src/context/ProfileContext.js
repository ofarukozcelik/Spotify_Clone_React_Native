import axios from 'axios';
import {createContext, useEffect, useState} from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({children}) => {
  const [profilData, setProfilData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProfilData = async () => {
    const options = {
      method: 'GET',
      url: `https://${process.env.RAPIDAPI_HOST}/user_profile/`,
      params: {
        id: 'nocopyrightsounds',
        playlistLimit: '10',
        artistLimit: '10',
      },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': process.env.RAPIDAPI_HOST,
      },
    };

    try {
      const response = await axios.request(options);
      setProfilData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfilData();
  }, []);

  return (
    <ProfileContext.Provider value={{profilData, loading, error}}>
      {children}
    </ProfileContext.Provider>
  );
};
