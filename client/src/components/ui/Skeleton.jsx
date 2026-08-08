import { cn } from '../../utils/cn'

function Skeleton({ className = '' }) {
  return (
    <div className={cn('skeleton', className)} />
  )
}

export default Skeleton
