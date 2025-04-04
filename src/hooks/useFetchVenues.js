import { useEffect, useState } from 'react'

import { axiosReq } from '../api/axiosDefaults';

/**
 * Hook to fetch the available venue options and favoured venues for a specific user.
 * 
 * @param {number} id The id of the user for which favoured venues (UserVenues) should be fetched.
 * 
 * @param {Function} setVenueOptions The setter function for 'venueOptions', the selector options the
 *                                   user should have when adding a venue.
 * 
 * @param {Function} setFavouriteVenues The setter function for 'favouriteVenues', the favoured venues
 *                                      of the given user.
 * 
 * @returns {boolean} Whether or not the hook functionality has finished processing yet -
 *                    false if it is still processing, true once it has finished.
 */
const useFetchVenues = ({id, setVenueOptions, setFavouriteVenues}) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchVenues = async() => {
        try {
          const [venuesResponse, userVenuesResponse] = await Promise.all([
            axiosReq.get('/venues/'),
            axiosReq.get(`/user_venues/?user=${id}`),
        ])
          const userVenueNames = userVenuesResponse.data.results.map(userVenue => userVenue.name);
          const filteredVenues = venuesResponse.data.results.filter(venue => !userVenueNames.includes(venue.name));
          setVenueOptions(filteredVenues)
          setFavouriteVenues(userVenuesResponse.data.results);
          setHasLoaded(true);
        } catch(err){
          console.log(err)
        }
    }
    setHasLoaded(false);
    fetchVenues();
  }, [setVenueOptions])
  
  return hasLoaded;
}

export default useFetchVenues