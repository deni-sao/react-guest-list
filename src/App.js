import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [allGuests, setAllGuests] = useState([]);
  const baseUrl = 'http://localhost:4000';

  useEffect(() => {
    const getGuests = () => {
      axios
        .get(`${baseUrl}/guests`)
        .then((response) => {
          setAllGuests(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getGuests();
  }, []);

  const clearField = () => {
    // 👇️ clear input value
    setFirstName('');
    setLastName('');
  };

  const makeGuest = useEffect(() => {
    const getGuestList = () => {
      axios
        .post(`${baseUrl}/guests`, {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ firstName: 'Karl', lastName: 'Horky' }),
        })

        .then(() => {
          clearField();
        })
        .catch((err) => {
          console.log(err);
        });
      async function createdGuest(response) {
        await response.json();
      }
      console.log(createdGuest);
    };
    function handleKeyPress(e) {
      const key = e.key;
      if (key === 'Enter') {
        getGuestList();
      }
    }
    handleKeyPress();
  }, []);

  // function handleKeyPress(e) {
  //   const key = e.key;
  //   if (key === 'Enter') {
  //     makeGuest();
  //   }
  // }

  return (
    <form>
      <h1>Guest List</h1>
      <div className="preference">
        <label htmlFor="firstName">First name</label>
        <input
          name="firstName"
          id="firstName"
          value={firstName}
          onChange={(event) => {
            event.preventDefault();
            setFirstName(event.currentTarget.value);
          }}
        />
      </div>

      <div className="preference">
        <label htmlFor="lastName">Last name</label>
        <input
          name="lastName"
          id="lastName"
          value={lastName}
          onChange={(event) => {
            event.preventDefault();
            setLastName(event.currentTarget.value);
          }}
          onKeyPress={() => makeGuest()}
        />
      </div>

      <div>
        {allGuests.map((option) => (
          <div defaultValue={option} key="me">
            {option}
          </div>
        ))}
      </div>
    </form>
  );
}

export default App;
