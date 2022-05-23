import React, { useEffect, useRef, useState } from 'react';

export default function ListApi() {
  const [guest, setGuest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // get all guests from api
  const baseUrl = 'http://localhost:4000';

  useEffect(() => {
    async function getFullGuestList() {
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      setGuest(allGuests);
      setLoading(false);
    }
    getFullGuestList().catch(() => console.log('fetch went wrong'));
  }, []);

  // adding guest to array
  async function addNewGuest(e) {
    e.preventDefault();
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: `${firstName}-${lastName}`,
        firstName: firstName,
        lastName: lastName,
      }),
    });
    const createdGuest = await response.json();
    console.log(createdGuest);
  }
  addNewGuest().catch(() => console.log('fetch went wrong'));

  // toggles attending/not attending
  function isAttending(id) {
    const newGuests = [...guest];
    const attendee = guest.find((guestList) => guestList.id === id);
    attendee.attending = !attendee.attending;
    setGuest(newGuests);
  }
  // console.log(guest);

  return loading ? (
    <h1>loading...</h1>
  ) : (
    <div data-test-id="guest">
      <div>
        {guest.map((guestList) => {
          return (
            <ul key={guestList.id}>
              <li>
                {guestList.firstName} {guestList.lastName}
              </li>
              <li>
                <input
                  aria-label={`Attending status ${guestList.firstName} ${guestList.lastName}`}
                  type="checkbox"
                  checked={guestList.attending}
                  onChange={() => {
                    isAttending(guestList.id);
                  }}
                />
                {guestList.attending === true ? 'attending' : 'not attending'}
              </li>
              <button
                aria-label={`Remove ${guestList.firstName} ${guestList.lastName}`}
                onClick={() => {
                  const newGuestList = guest.filter((i) => {
                    return i.id !== guestList.id;
                  });
                  setGuest(newGuestList);
                  console.log(guest);
                }}
              >
                remove guest
              </button>
            </ul>
          );
        })}
      </div>

      <h2>New Guest:</h2>
      <form className="input">
        <label>
          First Name
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.currentTarget.value)}
          />
        </label>
        <br />
        <label>
          Last Name
          <input
            value={lastName}
            onChange={(e) => setLastName(e.currentTarget.value)}
          />
        </label>
        <br />
        <button onClick={addNewGuest}>Add new guest</button>
      </form>
    </div>
  );
}
