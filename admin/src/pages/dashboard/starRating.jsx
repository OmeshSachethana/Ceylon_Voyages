import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key={fullStars} />);
    }

    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={fullStars + (hasHalfStar ? 1 : 0) + i} />);
    }

    return stars;
  };

  return <div className="flex">{renderStars()}</div>;
};

export default StarRating;
