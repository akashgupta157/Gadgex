import React from "react";
import { Star } from "lucide-react";

const RatingDisplay = ({ rating, maxStars = 5 }) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = maxStars - fullStars - halfStars;

  return (
    <div className="flex items-center mt-2">
      {/* Render full stars */}
      {Array.from({ length: fullStars }, (_, index) => (
        <Star key={`full-${index}`} color="#FFC501" fill="#FFC501" size={16} />
      ))}
      {/* Render half stars */}
      {Array.from({ length: halfStars }, (_, index) => (
        <div key={`half-${index}`} className="relative inline-block size-4">
          <Star className="absolute" color="#FFC501" size={16} />
          <Star
            className="absolute [clip-path:inset(0_50%_0_0)]"
            fill="#FFC501"
            color="#FFC501"
            size={16}
          />
        </div>
      ))}
      {/* Render empty stars */}
      {Array.from({ length: emptyStars }, (_, index) => (
        <Star key={`empty-${index}`} color="#FFC501" size={16} />
      ))}
    </div>
  );
};

export default RatingDisplay;
