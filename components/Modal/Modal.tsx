"use client";

import type React from "react";
import css from "./Modal.module.css";
import { useEffect } from "react";
import PortalModal from "./Modal.client";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <PortalModal>
      <div
        onClick={onClose}
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
      >
        <div onClick={(e) => e.stopPropagation()} className={css.modal}>
          {children}
        </div>
      </div>
    </PortalModal>
  );
}
