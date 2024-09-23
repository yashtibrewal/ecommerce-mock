import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface RatingProps {
  rating: number; // Pass the rating value (e.g., 4.5)
  outOf?: number; // Total stars (default is 5)
  count: number;
}

const Rating: React.FC<RatingProps> = ({ rating, outOf = 5, count }) => {
  // Create an array of stars based on the rating
  const fullStars = Math.floor(rating); // Full stars count
  const hasHalfStar = rating % 1 !== 0; // Determine if there's a half-star
  const emptyStars = outOf - fullStars - (hasHalfStar ? 1 : 0); // Empty stars count

  return (
    <div>
      <div className='font-light'>Rating</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Full stars */}
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} color="gold" />
        ))}

        {/* Half star (if applicable) */}
        {hasHalfStar && <FaStarHalfAlt color="gold" />}

        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={index} color="gold" />
        ))}
        ({count})
      </div>
    </div>
  );
};

export default Rating;
