import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

function RatingStars({ rating = 0, reviewCount, size = 16, showValue = true }) {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} size={size} className="text-warning" />)
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} size={size} className="text-warning" />)
    } else {
      stars.push(<FaRegStar key={i} size={size} className="text-warning" />)
    }
  }

  return (
    <div className="d-flex align-items-center gap-1">
      <span className="d-flex">{stars}</span>
      {showValue && (
        <span className="small text-muted">
          {rating.toFixed(1)}
          {reviewCount != null && ` (${reviewCount})`}
        </span>
      )}
    </div>
  )
}

export default RatingStars
