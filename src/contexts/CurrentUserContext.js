import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { removeTokenTimestamp, shouldRefreshToken } from '../utils/utils';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get('dj-rest-auth/user/');
      setCurrentUser(data);
    // eslint-disable-next-line no-empty, no-unused-vars
    } catch (err) {}
  };

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            await axios.post('/dj-rest-auth/token/refresh/');
          // eslint-disable-next-line no-unused-vars
          } catch (err) { 
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate('/login/');
              }
              return null;
            });
            removeTokenTimestamp();
            return config;
          }
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post('/dj-rest-auth/token/refresh/');
          // eslint-disable-next-line no-unused-vars
          } catch (err) { 
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate('/login/');
              }
              return null;
            });
            removeTokenTimestamp();
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};