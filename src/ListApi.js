import React, { useEffect, useState } from 'react';

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
    getFullGuestList().catch(() =>
      console.log('fetching all guests went wrong'),
    );
  }, [guest]);

  // adding guest to array
  async function addNewGuest(e) {
    e.preventDefault();
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      }),
    });
    const createdGuest = await response.json();
    console.log(createdGuest);
    setGuest([...guest], createdGuest);
  }
  // addNewGuest().catch(() => console.log('adding guest went wrong'));

  // deleting from array
  async function deleteGuest(id) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    const newGuestList = guest.filter((i) => {
      return i.id !== deletedGuest.id;
    });
    setGuest(newGuestList);
  }

  // toggles attending/not attending
  async function isAttending(id, value) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: !value }),
    });
    const updatedGuest = await response.json();
    const updatedGuestList = guest.filter((i) => {
      return i.id !== updatedGuest.id;
    });
    setGuest([...guest], updatedGuestList);
  }

  // reset

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
                <label>
                  <input
                    aria-label={`Attending status ${guestList.firstName} ${guestList.lastName}`}
                    type="checkbox"
                    checked={guestList.attending}
                    onChange={() => {
                      isAttending(guestList.id, guestList.attending).catch(() =>
                        console.log('adding guest went wrong'),
                      );
                    }}
                  />
                  {guestList.attending === true ? 'attending' : 'not attending'}
                </label>
              </li>
              <button
                aria-label={`Remove ${guestList.firstName} ${guestList.lastName}`}
                onClick={() => {
                  deleteGuest(guestList.id).catch(() =>
                    console.log('adding guest went wrong'),
                  );
                  document.form.reset();
                }}
              >
                remove guest
              </button>
            </ul>
          );
        })}
      </div>

      <h2>New Guest:</h2>
      <form name="form">
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
            // onKeyDown={(e) => {
            //   if (e.key === 'Enter') {
            //     e.preventDefault();
            //     addNewGuest().catch(() =>
            //       console.log('adding guest went wrong'),
            //     );
            // document.form.reset();
            //   }
            // }}
          />
        </label>
        <br />
        <button onClick={addNewGuest}>Add new guest</button>
      </form>
    </div>
  );
}
