export default function Friend({ friend, isSelected, onSelectedID }) {
  const { id, name, image, balance } = friend;

  let message = "";

  if (balance < 0)
    message = (
      <p className="red">
        You owe {name} ${Math.abs(balance)}
      </p>
    );
  else if (balance > 0)
    message = (
      <p className="green">
        {name} owes you ${Math.abs(balance)}
      </p>
    );
  else message = <p>You and {name} are even</p>;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      {message}
      <button className="button" onClick={() => onSelectedID(id)}>
        {isSelected ? "Close" : "Select"}
      </button>
    </li>
  );
}
