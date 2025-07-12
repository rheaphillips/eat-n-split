import { useState } from "react";

export default function AddFriendForm({ onAddFriend, onIsAddingFriend }) {
  let id = new Date().getTime();

  const [name, setName] = useState("");
  const [image, setImage] = useState(`https://i.pravatar.cc/48?u=${id}`);

  function handleAddFriend() {
    onAddFriend({
      id: id,
      name: name,
      image: image,
      balance: 0,
    });
    onIsAddingFriend();
  }

  return (
    <form className="form-add-friend" onSubmit={handleAddFriend}>
      <label>👬 Friend name</label>
      <input value={name} onChange={(e) => setName(e.target.value)}></input>
      <label>🌄 Image URL</label>
      <input value={image} onChange={(e) => setImage(e.target.value)}></input>
      <button className="button">Add</button>
    </form>
  );
}
