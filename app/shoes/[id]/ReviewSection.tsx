"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import ReviewForm from "@/components/ReviewForm";
import ReviewList from "@/components/ReviewList";

interface ReviewSectionProps {
  productId: string;
}

const ReviewSection = ({ productId }: ReviewSectionProps) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleReviewSubmitted = () => {
    // Trigger a refresh of the review list
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Customer Reviews</h2>
        <Separator />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Review Form */}
        <div>
          <ReviewForm
            productId={productId}
            onReviewSubmitted={handleReviewSubmitted}
          />
        </div>

        {/* Review List */}
        <div>
          <ReviewList
            productId={productId}
            refreshTrigger={refreshTrigger}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;