import { useEffect, useState } from 'react'

import { useCurrentUser } from '../contexts/CurrentUserContext';
import { axiosReq } from '../api/axiosDefaults';


const useFetchVenues = ({setVenueOptions, setFavouriteVenues}) => {
  const currentUser = useCurrentUser();
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchVenues = async() => {
        try {
          const [venuesResponse, userVenuesResponse] = await Promise.all([
            axiosReq.get('/venues/'),
            axiosReq.get(`/user_venues/?user=${currentUser.pk}`),
        ])
          const userVenueIds = userVenuesResponse.data.results.map(userVenue => userVenue.venue);
          const filteredVenues = venuesResponse.data.results.filter(venue => !userVenueIds.includes(venue.id));
          setVenueOptions(filteredVenues)
          setFavouriteVenues(userVenuesResponse.data.results);
          setHasLoaded(true);
        } catch(err){
          console.log(err)
        }
    }
    setHasLoaded(false);
    if (currentUser) {
      fetchVenues();
    }
  }, [setVenueOptions])
  
  return hasLoaded;
}

export default useFetchVenues