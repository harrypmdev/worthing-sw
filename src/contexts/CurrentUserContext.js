import axios from 'axios';
import { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { axiosReq, axiosRes } from '../api/axiosDefaults';

export const CurrentUserContext = createContext();
export const setCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(setCurrentUserContext);

export const CurrentUserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleMount = async() => {
    try {
      const {data} = await axiosRes.get('dj-rest-auth/user/');
      setCurrentUser(data);
    } catch(err) {
      console.log(err);
    }
  }
    
  useEffect(() => {
    handleMount();
  }, [])

  useMemo(() => {
    axiosReq.interceptors.request.use(
        async config => {
          try {
            await axios.post('/dj-rest/auth/token/refresh/')
          } catch (err) {
            setCurrentUser(prevCurrentUser => {
                if (prevCurrentUser) {
                    navigate('/');
                }
                return null;
            })
            return config;
          }
        },
        err => {
            return Promise.reject(err);
        }
    );

    axiosRes.interceptors.response.use(
      response => response,
      async err => {
        if (err.response?.status === 401) {
          try {
            await axios.post('/dj-rest-auth/token/refresh/')
          } catch (err) {
            setCurrentUser(prevCurrentUser => {
              if (prevCurrentUser) {
                navigate('/');
              }
              return null;
            })
            return axios(err.config);
          }
        }
        return Promise.reject(err);
      }
    );
  }, [navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <setCurrentUserContext.Provider value={setCurrentUser}> 
        {children}
      </setCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  )
}

