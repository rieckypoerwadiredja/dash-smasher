import { IoWarning } from "react-icons/io5";
import Button from "../../elements/Button";
import { FaCircleCheck } from "react-icons/fa6";
import { MdOutlineError } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";

export interface ModalProps {
  title?: string;
  message?: string;
  notes?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  type?: "success" | "error" | "warning" | "info";
}

export default function Modal({
  title,
  message,
  onConfirm,
  onCancel,
  notes,
  type = "success",
}: ModalProps) {
  if (!open) return null;
  return (
    <>
      <div className="p-4 md:p-5 text-center">
        {/* Icon */}
        {type === "success" && (
          <FaCircleCheck className="text-success mx-auto text-7xl my-3" />
        )}
        {type === "warning" && (
          <IoWarning className="text-warn mx-auto text-7xl my-3" />
        )}
        {type === "error" && (
          <MdOutlineError className="text-failed mx-auto text-7xl my-3" />
        )}
        {type === "info" && (
          <FaInfoCircle className="text-blue-500 mx-auto text-7xl my-3" />
        )}

        {/* Title or Message */}
        {title && (
          <h3 className="text-3xl text-primary font-semibold text-body">
            {title}
          </h3>
        )}
        {message && <p className="mb-3 font-semibold text-black">{message}</p>}
        {notes && <p className="mb-6 font-medium text-dark-gray">{notes}</p>}

        {/* Buttons */}
        <div className="flex items-center space-x-4 justify-center">
          {onCancel && (
            <Button
              className="cursor-pointer w-full! bg-white border-primary! border-2 text-black! hover:text-white!"
              onClick={onCancel}
            >
              No
            </Button>
          )}
          <Button className="cursor-pointer w-full!" onClick={onConfirm}>
            Okay
          </Button>
        </div>
      </div>
    </>
  );
}
