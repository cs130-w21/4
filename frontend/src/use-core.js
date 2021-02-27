import React, {
  useState,
  useContext,
  createContext
} from "react";


const core = {
  coreObject: null,
  async getCore() {
    let response = await fetch("/api/core", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Credentials': 'include'
      }
    })
    .then(response => response.json())
    .catch(err => {

      if (err.status === 401) {
        return null;
      }
    });

    return response;
  },

  /*
  addContact(contactObject) {
    return fetch("/api/contact/add", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Credentials': 'include'
      },
      body: JSON.stringify(contactObject)
    })
    // TODO: change to response.json() once backend sends back object
    .then(response => true)
    .catch(err => false);
  },

   */

  addContact(contactObject) {
    let result = fetch("/api/contact/add", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactObject)
    })
        .then(response => response.json())
        .catch(err => {
          if (err.status === 401) {
            alert("Cannot add new contact. Please try again later.");
            return null;
          }
        });
    return result;
  },

  updateContact(contactObject) {
    return fetch("/api/contact/update", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Credentials': 'include'
      },
      body: JSON.stringify(contactObject)
    })
    .then(response => true)
    .catch(err => false);
  },

  deleteContact(contactObject) {
    return fetch("/api/contact/delete", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Credentials': 'include'
      },
      body: JSON.stringify(contactObject)
    })
    .then(response => true)
    .catch(err => false);
  }
};

const coreContext = createContext();

export function ProvideCore({ children }) {
  const core = useProvideCore();

  return (
    <coreContext.Provider value={core}>
      { children }
    </coreContext.Provider>
  );
}

export const useCore = () => {
  return useContext(coreContext);
};

function useProvideCore() {

  const [coreObject, setCoreObject] = useState(null);

  const getCore = () => {
    return core.getCore()
    .then(response => {
      if (response === null) {
        return null;
      }

      setCoreObject(response);
      return response;
    });
  };


  const addContact = (contactObject) => {
    let didAdd = core.addContact(contactObject);
    if (didAdd) {
      console.log("success");
    }
    else {
      console.log("error");
    }
    /*
    return core.addContact(contactObject)
    .then(didAdd => {
      if (didAdd) {
        console.log("success");
        // TODO: udpate core object
      }
      else {
        console.log("error");
        // TODO: handle add error
      }
    });
     */
    return didAdd;
  };



  const updateContact = (contactObject) => {
    return core.updateContact(contactObject)
    .then(didUpdate => {
      if (didUpdate) {
        console.log("success");
        // TODO: update core object
      }
      else {
        console.log("error");
        // TODO: handle update error
      }
    });
  };

  const deleteContact = (contactObject) => {
    return core.deleteContact(contactObject)
    .then(didDelete => {
      if (didDelete) {
        console.log("success");
        // TODO: update core object
      }
      else {
        console.log("error");
        // TODO: handle delete error
      }
    });
  };

  return {
    coreObject,
    getCore,
    addContact,
    updateContact,
    deleteContact
  };
}
