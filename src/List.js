import React, { useRef, useState } from 'react';

export default function List() {
  const [guest, setGuest] = useState([]);
  const newFirstName = useRef();
  const newLastName = useRef();

  function addNewGuest() {
    const firstName = newFirstName.current.value;
    const lastName = newLastName.current.value;
    setGuest((guestList) => {
      return [
        ...guestList,
        {
          key: `${guestList.firstName}-${guestList.lastName}`,
          firstName: firstName,
          lastName: lastName,
        },
      ];
    });
    newFirstName.current.value = null;
    newLastName.current.value = null;
  }

  // useEffect(() => {
  //   addNewGuest();
  // }, []);

  return (
    <>
      <h2>New Guest:</h2>
      <form
        className="input"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label>
          First Name
          <input ref={newFirstName} />
        </label>
        <br />
        <label>
          Last Name
          <input ref={newFirstName} />
        </label>
        <br />
        <button onClick={addNewGuest}>Return</button>
      </form>
      <div>
        {guest.map((guestList) => {
          return (
            <div key={`${guestList.firstName}-${guestList.lastName}`}>
              <p>
                {guestList.firstName} {guestList.lastName}
              </p>
            </div>
          );
        })}
      </div>
      <button>remove</button>
    </>
  );
}
