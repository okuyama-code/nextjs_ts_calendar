import React from "react";
import Modal from "react-modal";

interface EventFormModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  editingEvent: any;
  newEventDate: string;
  newEventTitle: string;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  closeModal: () => void;
}

const EventFormModal: React.FC<EventFormModalProps> = ({
  isOpen,
  onRequestClose,
  editingEvent,
  newEventDate,
  newEventTitle,
  onDateChange,
  onTitleChange,
  onSubmit,
  closeModal,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Event Form"
      style={{
        overlay: {
          backgroundColor: "rgba(5, 0, 0, 0.5)",
        },
        content: {
          position: "absolute",
          top: "50px",
          left: "50%",
          transform: "translate(-50%, 0)",
          width: "300px",
          height: "250px",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <form onSubmit={onSubmit} className="p-4">
        <input
          type="date"
          value={newEventDate}
          onChange={onDateChange}
          className="mb-2 p-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Event Title"
          value={newEventTitle}
          onChange={onTitleChange}
          className="mb-2 p-2 border rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md mr-2"
        >
          {editingEvent ? "編集する" : "イベントを登録する"}
        </button>
        <button
          onClick={closeModal}
          className="bg-gray-500 text-white p-2 rounded-md"
        >
          閉じる
        </button>
      </form>
    </Modal>
  );
};

export default EventFormModal;
