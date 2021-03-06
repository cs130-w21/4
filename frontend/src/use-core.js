import React, {
  useState,
  useContext,
  createContext
} from "react";

/**
 * Frontend API functions
 * @module 
 */

/**
 * Purpose: handles concerns regarding accessing the
 * user's information (login, contacts, etc)
 */
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

  /**
   * Purpose: to contact the backend (which, in turn, contacts the
   * database to add the contact) with the contact object provided
   * via filter-bar.js
   * @param contactObject - includes: first name, last name, etc,
   * which comes from the user's input within the pop-up modal. The
   * object is created in filter-bar.js then routed here.
   * @return returns the result of the fetch, or null if the
   * add was unsuccessful.
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
        return null;
      }
    });

    return result;
  },

  /**
   * Purpose: to contact the backend (which, in turn, contacts the
   * database to update the contact) with the contact object provided
   * from the edits within the expanded contact view
   * @param contactObject - includes changes the user made
   * in the expanded viewing of their contacts. May or may not include
   * every field listed in filter-bar.js; depends on changes user made.
   * @return returns the result of the fetch, or null if the
   * update was unsuccessful.
   */
  updateContact(contactObject) {
    return fetch("/api/contact/update", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Credentials': 'include'
      },
      body: JSON.stringify(contactObject)
    })
    .then(response => {
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch(err => false);
  },

  /**
   * Purpose: to contact the backend (which, in turn, contacts the
   * database to delete the contact) with the contact object provided
   * @param contactObject - includes the information of the
   * contact the user wishes to delete
   * @return returns the result of the fetch, or null if the
   * delete was unsuccessful.
   */
  deleteContact(contactObject) {
    return fetch("/api/contact/delete", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Credentials': 'include'
      },
      body: JSON.stringify(contactObject)
    })
    .then(response => {
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch(err => false);
  }
};

const coreContext = createContext();

/**
 * Purpose: to get the user's core object which is needed
 * in nearly all functionalities of the web app
 * @return returns the core object itself.
 */
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

/**
 * Purpose: to allow user information to be fetched and handled
 * using the core object.
 * @return returns results from core fetch, add contact,
 * delete contact, modify contact, and the core object itself.
 */
function useProvideCore() {

  const [coreObject, setCoreObject] = useState(null);

  /**
   * Purpose: to fetch the core which has the information tied to a
   * registered user; core is used when accessing, adding,
   * modifying, listing, etc
   * @return returns the result from the attempt to get the core. If
   * the attempt was successful then it will return the core, if not it
   * will return null.
   */
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

  /**
   * Purpose: to contact core addContact work that contacts the backend.
   * This is primarily used for routing and updating core object.
   * @param contactObject - includes: first name, last name, etc,
   * which comes from the user's input within the pop-up modal. The
   * object is created in filter-bar.js then routed here.
   * @return returns didAdd which is the result from the addContact
   * work above, and logs whether core.addContact was successful or not.
   */
  const addContact = (contactObject) => {
    return core.addContact(contactObject)
    .then(response => {
      if (response == null) {
        return null;
      }

      console.log(response);
      setCoreObject((prev, props) => {
        prev.networkObject.contacts.push(response);
        return prev;
      });

      return response;
    });
  };


  /**
   * Purpose: to contact core updateContact work that contacts the backend.
   * This is primarily used for routing and updating core object.
   * @param contactObject - includes changes the user made
   * in the expanded viewing of their contacts. May or may not include
   * every field listed in filter-bar.js; depends on changes user made.
   * @return returns didUpdate which is the result from the updateContact
   * work above, and logs whether core.updateContact was successful or not.
   */
  const updateContact = (contactObject) => {
    return core.updateContact(contactObject)
    .then(didUpdate => {
      if (didUpdate) {
        let coreCopy = {...coreObject};
        let contactsCopy = coreCopy.networkObject.contacts.filter((obj) => {
          return obj["_id"] !== contactObject["_id"];
        });
        coreCopy.networkObject.contacts = contactsCopy;
        coreCopy.networkObject.contacts.push(contactObject);
        setCoreObject(coreCopy);
      }

      return didUpdate;
    });
  };

  /**
   * Purpose: to contact core deleteContact work that contacts the backend.
   * This is primarily used for routing and updating core object.
   * @param contactObject - includes information of the contact the
   * user wishes to delete.
   * @return returns didDelete which is the result from the deleteContact
   * work above, and logs whether core.deleteContact was successful or not.
   */
  const deleteContact = (contactObject) => {
    return core.deleteContact(contactObject)
    .then(didDelete => {
      if (didDelete) {
        let coreCopy = {...coreObject};
        let contactsCopy = coreCopy.networkObject.contacts.filter((obj) => {
          return obj["_id"] !== contactObject["_id"];
        });
        coreCopy.networkObject.contacts = contactsCopy;
        setCoreObject(coreCopy);
      }

      return didDelete;
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
