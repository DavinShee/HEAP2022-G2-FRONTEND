import React, { useEffect, useState } from 'react';
import PostList from '../PostList';
import useFetchNotes from '../useFetchNotes';

const Home = () => {
  const [notes, setNotes] = useState({});
  const { data, loading, error } = useFetchNotes(
    'https://ff4b-2406-3003-206f-4ac0-e97e-a025-b0bf-6e90.ap.ngrok.io/routes/buyer' /* ngrok link */,
    '' /* modId */,
    '' /* profId */
  );
  useEffect(() => {
    setNotes(data.notes);
  }, [data, notes]);

  return (
    <>
      {!error && !loading && console.log(notes)}
      <hr></hr>
      THIS IS THE HOME PAGE
      <br />
      Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum
      definitiones no quo, maluisset concludaturque et eum, altera fabulas ut
      quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert
      laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no
      molestiae voluptatibus. <br />
      <br />
      Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum
      definitiones no quo, maluisset concludaturque et eum, altera fabulas ut
      quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert
      laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no
      molestiae voluptatibus. <br />
      <br />
      Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum
      definitiones no quo, maluisset concludaturque et eum, altera fabulas ut
      quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert
      laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no
      molestiae voluptatibus. <br />
      <br />
      Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum
      definitiones no quo, maluisset concludaturque et eum, altera fabulas ut
      quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert
      laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no
      molestiae voluptatibus. <br />
      <br />
      Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum
      definitiones no quo, maluisset concludaturque et eum, altera fabulas ut
      quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert
      laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no
      molestiae voluptatibus. <br />
      <br />
      Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum
      definitiones no quo, maluisset concludaturque et eum, altera fabulas ut
      quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert
      laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no
      molestiae voluptatibus. <br />
      <br />
      Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum
      definitiones no quo, maluisset concludaturque et eum, altera fabulas ut
      quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert
      laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no
      molestiae voluptatibus. <br />
      <br />
      Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum
      definitiones no quo, maluisset concludaturque et eum, altera fabulas ut
      quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert
      laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no
      molestiae voluptatibus. <br />
      <br />
      Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum
      definitiones no quo, maluisset concludaturque et eum, altera fabulas ut
      quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert
      laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no
      molestiae voluptatibus. <br />
      <br />
      Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum
      definitiones no quo, maluisset concludaturque et eum, altera fabulas ut
      quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert
      laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no
      molestiae voluptatibus. <br />
      <br />
      Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum
      definitiones no quo, maluisset concludaturque et eum, altera fabulas ut
      quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert
      laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no
      molestiae voluptatibus. <br />
      <br />
      Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum
      definitiones no quo, maluisset concludaturque et eum, altera fabulas ut
      quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert
      laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no
      molestiae voluptatibus. <br />
      <br />
      Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum
      definitiones no quo, maluisset concludaturque et eum, altera fabulas ut
      quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert
      laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no
      molestiae voluptatibus. <br />
      <br />
      Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum
      definitiones no quo, maluisset concludaturque et eum, altera fabulas ut
      quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert
      laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no
      molestiae voluptatibus. <br />
      <br />
      Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum
      definitiones no quo, maluisset concludaturque et eum, altera fabulas ut
      quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert
      laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no
      molestiae voluptatibus. <br />
      <br />
      Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum
      definitiones no quo, maluisset concludaturque et eum, altera fabulas ut
      quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert
      laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no
      molestiae voluptatibus. <br />
      <br />
      Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum
      definitiones no quo, maluisset concludaturque et eum, altera fabulas ut
      quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert
      laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no
      molestiae voluptatibus. <br />
      <br />
      Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum
      definitiones no quo, maluisset concludaturque et eum, altera fabulas ut
      quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert
      laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no
      molestiae voluptatibus. <br />
      <br />
      Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum
      definitiones no quo, maluisset concludaturque et eum, altera fabulas ut
      quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert
      laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no
      molestiae voluptatibus. <br />
      <br />
      Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum
      definitiones no quo, maluisset concludaturque et eum, altera fabulas ut
      quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert
      laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no
      molestiae voluptatibus. <br />
      <br />
      Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum
      definitiones no quo, maluisset concludaturque et eum, altera fabulas ut
      quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert
      laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no
      molestiae voluptatibus. <br />
      <br />
      Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum
      definitiones no quo, maluisset concludaturque et eum, altera fabulas ut
      quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert
      laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no
      molestiae voluptatibus. <br />
      <br />
      Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum
      definitiones no quo, maluisset concludaturque et eum, altera fabulas ut
      quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert
      laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no
      molestiae voluptatibus. <br />
    </>
  );
};

export default Home;
