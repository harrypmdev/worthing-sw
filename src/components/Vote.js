import React from 'react'
import { Button } from 'react-bootstrap';

import { useCurrentUser } from '../contexts/CurrentUserContext';
import useVoteHandler from '../hooks/useVoteHandler';

/**
 * Render the 'vote' segment which allows users to track votes,
 * make upvotes or make downvotes.
 * 
 * @param {Object} [song=null] The song returned from '/songs/:id' that this vote segment
 *                             should alter the votes for.
 * 
 * @param {Object} [post=null] The post returned from '/posts/:id' that this vote segment
 *                             should alter the votes for. Mutually exclusive with the 'song'
 *                             prop - an error will be thrown if both are provided.
 * 
 * @returns {ReactNode} An element displaying the net votes for a song or post alongside upvote
 *                      and downvote buttons.
 */
const Vote = ({song=null, post=null}) => {
  const currentUser = useCurrentUser();
  if (song && post) {
    throw new Error('Props conflict: the vote component can be rendered for either a song or a post, not both.');
  }
  const bgColor = song ? 'light' : 'secondary-subtle';
  const item = song || post;
  const {
    handleUpvote, 
    handleDownvote, 
    loading, 
    userUpvoted, 
    userDownvoted, 
    netVotes
  } = useVoteHandler({item});

  return (
    <div className={`d-flex align-items-center justify-content-center rounded p-1 bg-${bgColor}`}>
      { currentUser && (
        <Button 
          variant={bgColor}
          onClick={handleDownvote}
          disabled={loading} 
          className={`border-0 p-0 ${userDownvoted && 'opacity-25'}`}
        >
          <i className="fa-solid fa-square-minus px-1 fa-lg text-danger"></i>
        </Button>
      )}
      <div className="text-center fw-bold mx-2">{!currentUser && 'Net Votes: '}{netVotes}</div>
      { currentUser && (
        <Button 
          variant={bgColor}
          onClick={handleUpvote}
          disabled={loading} 
          className={`border-0 p-0 ${userUpvoted && 'opacity-25'}`}
        >
          <i className="fa-solid fa-square-plus px-1 fa-lg text-success"></i>
        </Button>
      )}
    </div>
  );
}

export default Vote
