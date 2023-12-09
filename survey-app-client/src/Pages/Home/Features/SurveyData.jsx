const SurveyData = ({ item }) => {
  const { question, short_description, vote } = item;
  return (
    <div className="card bg-neutral text-neutral-content">
      <div className="card-body items-center text-center">
        <h2 className="card-title">{question}</h2>
        <p>{short_description}</p>
        <div className="card-actions">
          <h2 className="text-xl">Vote : <span className="font-bold">{vote}</span></h2>
        </div>
      </div>
    </div>
  );
};

export default SurveyData;
