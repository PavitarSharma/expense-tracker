import { useEffect, useRef, useState } from "react";
import styles from "./Modal.module.css";

const Modals = ({ open, onClose, body, title }) => {
  const [isOpen, setIsOpen] = useState(open);
  const modalRef = useRef(null);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    const handleClose = (event) => {
      if (modalRef.current && !modalRef.current?.contains(event.target)) {
        setIsOpen(false);

        onClose();
      }
    };
    document.addEventListener("mousedown", handleClose);

    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [onClose]);

  return (
    isOpen && (
      <div ref={modalRef} className={styles.modal}>
        <div className={styles.container}>
          <h1 className={styles.title}>{title}</h1>
          {body}
        </div>
      </div>
    )
  );
};

export default Modals;
