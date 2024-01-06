const ContactCard = ({ img, title, item1, item2 }) => {
  return (
    <div className="card  bg-base-100 shadow text-center">
      <div className="card-body">
        <div className="mx-auto text-5xl">{img}</div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-[#787d99]">{item1}</p>
        <p className="text-[#787d99]">{item2}</p>
      </div>
    </div>
  );
};

export default ContactCard;
