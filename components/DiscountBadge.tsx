interface DiscountBadgeProps {
  discountPercentage: number;
}

const DiscountBadge = ({ discountPercentage }: DiscountBadgeProps) => {
  return (
    <div className="absolute top-2 left-2 z-10">
      <div className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold shadow-lg">
        -{discountPercentage}%
      </div>
    </div>
  );
};

export default DiscountBadge;