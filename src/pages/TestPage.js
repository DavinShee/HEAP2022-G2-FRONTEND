import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
const TestPage = () => {
  const [rating] = useState(4.7);

  return (
    <>
      <Rating initialValue={rating} allowHalfIcon={true} readonly={true} />
    </>
  );
};

export default TestPage;
