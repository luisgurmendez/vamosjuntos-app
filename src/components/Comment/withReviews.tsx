import { getReviews } from 'api/adedo';
import HideIfLoading from 'components/Loading/HideIfLoading';
import React, { useEffect, useState } from 'react';
import { Review } from 'types/models';

interface WithReviews {
  reviews: Review[]
}

interface WithUserId {
  userId: string;
}

export default function withReviews<P extends WithReviews>(
  WrappedComponent: React.ComponentType<P>,
): React.ComponentType<WithUserId> {

  const Component: React.FC<WithUserId> = ({ userId, ...props }) => {

    const [fetching, setFetching] = useState(false);
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
      setFetching(true)
      getReviews(userId).then((rs) => {
        setReviews(rs);
      }).finally(() => {
        setFetching(false)
      })
    }, [])

    const wrapperProps = {
      ...props,
      reviews
    } as unknown as P

    return (
      <HideIfLoading loading={fetching}>
        <WrappedComponent {...wrapperProps} />
      </HideIfLoading>
    )
  };

  Component.displayName = `withReviews(${WrappedComponent.displayName})`
  return Component;
}
