import { useParams } from 'react-router-dom';

function NoteDetails() {
  const { id } = useParams();
  return (
    <>
      <div>Note Details for {id}</div>
      <br />
    </>
  );
}

export default NoteDetails;
