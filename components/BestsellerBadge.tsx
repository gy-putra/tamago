import { Crown } from "lucide-react";

interface BestsellerBadgeProps {
  className?: string;
}

const BestsellerBadge = ({ className = "" }: BestsellerBadgeProps) => {
  return (
    <div className={`absolute top-2 left-2 z-10 ${className}`}>
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-md text-xs font-bold shadow-lg flex items-center gap-1">
        <Crown className="h-3 w-3" />
        Bestseller
      </div>
    </div>
  );
};

export default BestsellerBadge;