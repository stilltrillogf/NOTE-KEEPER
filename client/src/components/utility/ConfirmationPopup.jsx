import React, { useState } from "react";

import styles from "../../styles/utility/ConfirmationPopup.module.css";

export const ConfirmationPopup = ({ setPopupIsVisible, note }) => {
  const [checkboxIsChecked, setCheckboxIsChecked] = useState(false);

  const handleYesClick = () => {
    // If checkbox was ticked - save this in session storage
    // deleteNote(note) then setPopupIsVisible(false)
    // If checkbox was not ticked
    // deleteNote(note) then setPopupIsVisible(false)
  };

  const handleNoClick = () => {
    // If checkbox was ticked - save this in session storage
    // setPopupIsVisible(false);
    // If checkbox was not ticked - setPopupIsVisible(false)
  };

  return (
    <div className={styles.popup}>
      <div className={styles.information}>
        Are you sure you want to delete this note?
      </div>
      <div className={styles.buttonsField}>
        <button className={styles.button} onClick={handleYesClick}>
          Yes
        </button>
        <button className={styles.button} onClick={handleNoClick}>
          No
        </button>
      </div>
      <div className={styles.checkboxField}>
        <input
          id="doNotAskAgainCheckbox"
          type="checkbox"
          checked={checkboxIsChecked}
          onChange={() => {
            setCheckboxIsChecked(!checkboxIsChecked);
          }}
        />
        <label htmlFor="doNotAskAgainCheckbox">Do not ask me again</label>
      </div>
    </div>
  );
};
