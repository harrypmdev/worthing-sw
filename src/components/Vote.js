import React, { useState } from 'react'
import { Button } from 'react-bootstrap';

import { axiosReq } from '../api/axiosDefaults';


const Vote = ({song=null, post=null}) => {
  const item = song || post;
  const endpoint = song ? '/song_votes/' : '/post_votes/';
  const foreignKey = song ? 'song' : 'post'; // The foreign key that should be set for new votes
  const [loading, setLoading] = useState(false);

  // Local state for user votes, net votes and the id of the existing vote
  const [userUpvoted, setUserUpvoted] = useState(!!item?.user_upvoted);
  const [userDownvoted, setUserDownvoted] = useState(!!item?.user_downvoted);
  const [netVotes, setNetVotes] = useState(item?.net_votes || 0);
  const [userVoteId, setUserVoteId] = useState(item?.user_vote_id || null)

  const handleUpvote = async () => {
    if (loading) return;
    setLoading(true);
    if (userUpvoted) { // If upvote already exists
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
    } else {
      if (userDownvoted) { // If downvote already exists
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
      } else { // If no downvote already exists
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
    }
    setLoading(false);
  };

  const handleDownvote = async () => {
    if (loading) return;
    setLoading(true);
    if (userDownvoted) { // If downvote already exists
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
    } else {
      if (userUpvoted) { // If upvote already exists
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
      } else { // If no downvote already exists
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
    }
    setLoading(false);
  };


  return (
    <div className='d-flex align-items-center justify-content-center rounded p-1 bg-light '>
      <Button 
        variant="light" 
        onClick={handleDownvote}
        disabled={loading} 
        className={`border-0 p-0 ${userDownvoted && 'opacity-25'}`}
      >
        <i className="fa-solid fa-square-minus px-1 fa-lg text-danger"></i>
      </Button>
      <div className="text-center fw-bold mx-2">{netVotes}</div>
      <Button 
        variant="light" 
        onClick={handleUpvote}
        disabled={loading} 
        className={`border-0 p-0 ${userUpvoted && 'opacity-25'}`}
      >
        <i className="fa-solid fa-square-plus px-1 fa-lg text-success"></i>
      </Button>
    </div>
  );
}

export default Vote
