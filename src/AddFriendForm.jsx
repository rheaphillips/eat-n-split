import { useState } from "react";

export default function AddFriendForm({ onAddFriend, onIsAddingFriend }) {
  let id = crypto.randomUUID;

  const [name, setName] = useState("");
  const [image, setImage] = useState(`https://i.pravatar.cc/48?`);

  function handleAddFriend(e) {
    if (!name || !image) return;

    e.preventDefault();
    onAddFriend({
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    });

    setName("");
    setImage(`https://i.pravatar.cc/48?`);

    onIsAddingFriend();
  }

  return (
    <form className="form-add-friend" onSubmit={handleAddFriend}>
      <label>👬 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label>🌄 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>
      <button className="button">Add</button>
    </form>
  );
}
