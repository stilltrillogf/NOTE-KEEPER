import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { deleteNoteRequest } from "../../API/deleteNoteRequest";

import styles from "../../styles/utility/ConfirmationPopup.module.css";

export const ConfirmationPopup = ({
  setPopupIsVisible,
  setPopupStorage,
  note,
}) => {
  const [checkboxIsChecked, setCheckboxIsChecked] = useState(false);
  const popupRef = useRef(null);

  const queryClient = useQueryClient();

  const { mutate: deleteNote } = useMutation(
    (note) => {
      return deleteNoteRequest(note);
    },
    {
      onSettled: (_, err) => {
        err && console.log(err);
        queryClient.invalidateQueries("notes");
      },
    }
  );

  const handleYesBtnClick = () => {
    if (checkboxIsChecked) {
      window.sessionStorage.setItem("displayPopup", true);
      setPopupStorage(
        JSON.parse(window.sessionStorage.getItem("displayPopup"))
      );
    }
    setPopupIsVisible(false);
    deleteNote(note);
  };

  const handleNoBtnClick = () => {
    if (checkboxIsChecked) {
      window.sessionStorage.setItem("displayPopup", true);
      setPopupStorage(
        JSON.parse(window.sessionStorage.getItem("displayPopup"))
      );
    }
    setPopupIsVisible(false);
  };

  const handleClickOutside = (e) => {
    if (popupRef && !popupRef.current.contains(e.target)) {
      setPopupIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div ref={popupRef} className={styles.popup}>
      <div className={styles.information}>
        Are you sure you want to delete this note?
      </div>
      <div className={styles.buttonsField}>
        <button className={styles.button} onClick={handleYesBtnClick}>
          Yes
        </button>
        <button className={styles.button} onClick={handleNoBtnClick}>
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
