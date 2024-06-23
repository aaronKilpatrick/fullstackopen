const ContactListing = ({ list }) => {
  return (
    <>
      {list.map((entry) => (
        <p key={entry.name}>{entry.name}</p>
      ))}
    </>
  );
};

export default ContactListing;