import { useState } from "react";
import { axiosReq } from "../api/axiosDefaults";

/**
 * A hook to handle the functionality for the voting feature. 
 * 
 * @param {Object} item Either the song object or post object the voting
 *                      functionality is being used for, returned from
 *                      either '/songs/:id' or /posts/:id' respectively.
 * 
 * @returns {[Function, Function, boolean, boolean, boolean, number]}
 *          An array containing:
 *          1) The upvote handler function
 *          2) The downvote handler function
 *          3) Whether the vote process is currently loading
 *          4) Whether there is currently an upvote
 *          5) Whether there is currently a downvote
 *          6) The current net votes
 */
const useVoteHandler = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const [userUpvoted, setUserUpvoted] = useState(!!item?.user_upvoted);
  const [userDownvoted, setUserDownvoted] = useState(!!item?.user_downvoted);
  const [netVotes, setNetVotes] = useState(item?.net_votes || 0);
  const [userVoteId, setUserVoteId] = useState(item?.user_vote_id || null)
  const endpoint = item.audio_url ? '/song_votes/' : '/post_votes/';
  const foreignKey = item.audio_url ? 'song' : 'post'; // The foreign key that should be set for new votes

  /**
   * Handle the downvote click if a downvote already exists.
   * This means the user is undoing their downvote, so sends a
   * DELETE request to the backend for the existing downvote.
   */
  const downvoteIfDownvoteAlreadyExists = async () => {
    setUserDownvoted(false);
    setNetVotes((prev) => prev + 1);
    try {
      await axiosReq.delete(`${endpoint}${userVoteId}/`);
      setUserVoteId(null);
    } catch (err) {
      console.error('Error during downvote removal:', err);
      // Revert optimistic updates
      setUserDownvoted(true);
      setNetVotes((prev) => prev - 1);
    }
  }

  /**
   * Handle the downvote click if an upvote already exists.
   * The existing upvote is altered to a downvote via a PUT request.
   */
  const downvoteIfUpvoteAlreadyExists = async () => {
    setUserUpvoted(false);
    setUserDownvoted(true);
    setNetVotes((prev) => prev - 2);
    try {
      await axiosReq.put(`${endpoint}${userVoteId}/`, {[foreignKey]: item.id, downvote: true});
    } catch (err) {
      console.error('Error during upvote removal:', err);
      // Revert optimistic updates
      setUserUpvoted(true);
      setUserDownvoted(false);
      setNetVotes((prev) => prev + 2);
      return;
    }
  }

  /**
   * Handle the downvote click if no vote currently exists.
   * A new vote is create via a POST request.
   */
  const downvoteIfNoVoteAlreadyExists = async () => {
    setUserDownvoted(true);
    setNetVotes((prev) => prev - 1);
    try {
      const { data } = await axiosReq.post(endpoint, {[foreignKey]: item.id, downvote: true});
      setUserVoteId(data.id);
    } catch (err) {
      console.error('Error during downvote addition:', err);
      // Revert optimistic updates
      setUserDownvoted(false);
      setNetVotes((prev) => prev + 1);
    }
  }

  /**
   * Handle the upvote click if an upvote already exists.
   * This means the user is undoing their upvote, so sends a
   * DELETE request to the backend for the existing upvote.
   */
  const upvoteIfUpvoteAlreadyExists = async () => {
    setUserUpvoted(false);
    setNetVotes((prev) => prev - 1);
    try {
      await axiosReq.delete(`${endpoint}${userVoteId}/`);
      setUserVoteId(null);
    } catch (err) {
      console.error('Error during upvote removal:', err);
      // Revert optimistic updates
      setUserUpvoted(true);
      setNetVotes((prev) => prev + 1);
    }
  }

  /**
   * Handle the upvote click if a downvote already exists.
   * The existing downvote is altered to an upvote via a PUT request.
   */
  const upvoteIfDownvoteAlreadyExists = async () => {
    setUserDownvoted(false);
    setUserUpvoted(true);
    setNetVotes((prev) => prev + 2);
    try {
      await axiosReq.put(`${endpoint}${userVoteId}/`, {[foreignKey]: item.id, downvote: false});
    } catch (err) {
      console.error('Error during downvote removal:', err);
      // Revert optimistic updates
      setUserDownvoted(true);
      setUserUpvoted(false);
      setNetVotes((prev) => prev - 2);
    }
  }

  /**
   * Handle the upvote click if no vote currently exists.
   * A new vote is create via a POST request.
   */
  const upvoteIfNoVoteAlreadyExists = async () => {
    setUserUpvoted(true);
    setNetVotes((prev) => prev + 1);
    try {
      const { data } = await axiosReq.post(endpoint, {[foreignKey]: item.id, downvote: false});
      setUserVoteId(data.id);
    } catch (err) {
      console.error('Error during upvote addition:', err);
      // Revert optimistic updates
      setUserUpvoted(false);
      setNetVotes((prev) => prev - 1);
    }
  }

  /**
   * Handle the upvote click.
   * Accounts for three different scenarios for which
   * distinct functionality is needed:
   * 1) An upvote already exists.
   * 2) A downvote already exists.
   * 3) No vote currently exists.
   * Sets loading to true for duration of process.
   */
  const handleUpvote = async () => {
    if (loading) return;
    setLoading(true);
    if (userUpvoted) await upvoteIfUpvoteAlreadyExists();
    if (userDownvoted) await upvoteIfDownvoteAlreadyExists();
    if (!userUpvoted && !userDownvoted) await upvoteIfNoVoteAlreadyExists();
    setLoading(false);
  };

  /**
   * Handle the downvote click.
   * Accounts for three different scenarios for which
   * distinct functionality is needed:
   * 1) An upvote already exists.
   * 2) A downvote already exists.
   * 3) No vote currently exists.
   * Sets loading to true for duration of process.
   */
  const handleDownvote = async () => {
    if (loading) return;
    setLoading(true);
    if (userDownvoted) await downvoteIfDownvoteAlreadyExists();
    if (userUpvoted) await downvoteIfUpvoteAlreadyExists();
    if (!userUpvoted && !userDownvoted) await downvoteIfNoVoteAlreadyExists();
    setLoading(false);
  };

  return [
    handleUpvote, 
    handleDownvote, 
    loading, 
    userUpvoted,
    userDownvoted,
    netVotes,
  ];
}

export default useVoteHandler
